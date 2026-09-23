// CookInQuest prototype — rules engine and state machine.
//
// Source of truth: FIGMA-MAKE-SPEC-2026.md section 4 (STATE MODEL), section 5
// (RULES), section 6 (ECONOMY CHECK), section 9 (TRANSITION TABLE). Content
// shape follows js/data.js (window.CIQ_DATA) exactly — read that file for the
// courses/items/ladders/cooking/plating/scoring records this module reads.
//
// Plain browser JavaScript. No modules, no imports/exports, no build step,
// no DOM. Loaded via <script src="js/engine.js">, after js/data.js. Exposes
// exactly one global: window.CIQ_ENGINE.

(function () {
  'use strict';

  if (!window.CIQ_DATA) {
    throw new Error('[CIQ_ENGINE] window.CIQ_DATA must be loaded before engine.js (check <script> order).');
  }

  var data = window.CIQ_DATA;

  // ======================================================================
  // Station index resolution (section 10.4: five station responsibilities,
  // in the order data.cooking.stations lists them: boiler, fryer, roti,
  // steamer, saucepan). stationState[5], doneness[5], stationOutcome[5]
  // and stationLoadedBundleIds[5] in the state model are all indexed
  // against this same order.
  // ======================================================================
  var STATION_IDS = data.cooking.stations.map(function (s) { return s.id; });
  if (STATION_IDS.length !== 5) {
    console.error('[CIQ_ENGINE] expected 5 cooking stations in CIQ_DATA.cooking.stations, found ' + STATION_IDS.length);
  }
  var FRYER_INDEX = STATION_IDS.indexOf('fryer');
  var ROTI_INDEX = STATION_IDS.indexOf('roti');

  // ======================================================================
  // Transition table — FIGMA-MAKE-SPEC-2026.md section 9, one row per edge.
  // 'to' of '__RETURN__' means "the screen that opened it". Section 4's
  // documented state model has a single pauseReturnRoute field for this,
  // but the table has TWO independent '__RETURN__' edges — help-sheet's
  // Close and pause-sheet's Resume — and pause-sheet can itself open
  // help-sheet (pause -> tapHelp -> help). A single shared field cannot
  // represent both "what help should return to" and "what pause should
  // return to" at once: opening help from pause overwrites the pause
  // return route with 'pause', so resuming from pause after closing help
  // lands back on help instead of the original screen. Fixed with two
  // independent fields, helpReturnRoute and pauseReturnRoute, each set
  // only when its own overlay opens and cleared only when its own
  // '__RETURN__' edge resolves. from '*' means any gameplay screen, i.e.
  // every route except title, help and pause (see GAMEPLAY_ROUTES). Any
  // (from, trigger) pair not listed here is not a legal edge.
  // ======================================================================
  var TRANSITIONS = [
    { from: 'title', trigger: 'tapPlay', to: 'map' },
    { from: 'title', trigger: 'tapContinue', to: 'map' },
    { from: 'title', trigger: 'tapHelp', to: 'help' },
    { from: 'help', trigger: 'tapClose', to: '__RETURN__' },

    { from: 'map', trigger: 'tapRestaurant', to: 'courseHub' },
    { from: 'map', trigger: 'tapHelp', to: 'help' },

    { from: 'courseHub', trigger: 'selectCourse', to: 'hunt' },
    { from: 'courseHub', trigger: 'tapHelp', to: 'help' },
    { from: 'courseHub', trigger: 'prepareMeal', to: 'prep' },

    // Same-route rows: correct/wrong taps and hints do not change screens
    // (section 9: "no screen change"). Encoded anyway so every legal edge
    // in the table is real data, not implied by omission.
    { from: 'hunt', trigger: 'correctTapFact', to: 'hunt' },
    { from: 'hunt', trigger: 'correctTapItem', to: 'hunt' },
    { from: 'hunt', trigger: 'wrongTap', to: 'hunt' },
    { from: 'hunt', trigger: 'requestHint', to: 'hunt' },
    { from: 'hunt', trigger: 'courseComplete', to: 'levelComplete' },

    { from: 'levelComplete', trigger: 'continue', to: 'shop' },

    { from: 'shop', trigger: 'buyTier', to: 'purchaseConfirm' },

    { from: 'purchaseConfirm', trigger: 'continue', to: 'courseHub' },

    { from: 'prep', trigger: 'allStationsResolved', to: 'plating' },

    { from: 'plating', trigger: 'placeComponent', to: 'plating' },
    { from: 'plating', trigger: 'presentDish', to: 'verdict' },

    { from: 'verdict', trigger: 'viewScoreDetail', to: 'verdict' },
    { from: 'verdict', trigger: 'seeRestaurantRow', to: 'map' },
    { from: 'verdict', trigger: 'replayTajMahal', to: 'courseHub' },
    { from: 'verdict', trigger: 'continueLater', to: 'title' },

    { from: '*', trigger: 'tapPause', to: 'pause' },
    { from: 'pause', trigger: 'tapResume', to: '__RETURN__' },
    { from: 'pause', trigger: 'tapHelp', to: 'help' },
    { from: 'pause', trigger: 'tapLeaveRestaurant', to: 'map' },
  ];

  // Routes eligible for the '*' (any gameplay screen) wildcard in the Pause
  // row above: every route except title (nothing is "running" yet), help
  // and pause themselves (overlays don't stack).
  var GAMEPLAY_ROUTES = ['map', 'courseHub', 'hunt', 'levelComplete', 'shop', 'purchaseConfirm', 'prep', 'plating', 'verdict'];

  // ======================================================================
  // Tiny pub/sub.
  // ======================================================================
  var listeners = {};
  function on(event, fn) {
    (listeners[event] = listeners[event] || []).push(fn);
    return function off() {
      listeners[event] = (listeners[event] || []).filter(function (f) { return f !== fn; });
    };
  }
  function emit(event, payload) {
    (listeners[event] || []).forEach(function (fn) {
      try { fn(payload); } catch (err) { console.error('[CIQ_ENGINE] listener threw for "' + event + '"', err); }
    });
  }

  // ======================================================================
  // State — FIGMA-MAKE-SPEC-2026.md section 4, field for field.
  // Sets are represented as arrays of unique string IDs (JSON/localStorage
  // have no native Set); every place that adds to one of these arrays
  // checks for the ID first so no field ever accumulates a duplicate.
  // ======================================================================
  function freshState() {
    return {
      budget: data.meta.startingBudget,
      transactions: [],
      route: 'title',
      pauseReturnRoute: null,
      helpReturnRoute: null,
      course: 0,
      foundItemIds: [[], [], [], []],
      assistedItemIds: [[], [], [], []],
      factsUnlocked: [],
      tierBought: [-1, -1, -1, -1],
      shopPreviewTier: -1,
      findBonus: [0, 0, 0, 0],
      hintsUsed: 0,
      misses: 0,
      activeHintItemId: null,
      stationState: ['empty', 'empty', 'empty', 'empty', 'empty'],
      stationLoadedBundleIds: [[], [], [], [], []],
      doneness: [0, 0, 0, 0, 0],
      stationOutcome: [-1, -1, -1, -1, -1],
      fryerBatchIndex: 0,
      fryerBatchOutcome: [-1, -1, -1],
      rotiStage: 'ingredients',
      plateComponents: [],
      currentStars: 0,
      bestStars: 0,
      restaurantsUnlocked: 1,
      hasSave: false,
    };
  }

  var state = freshState();

  // Wrong-tap input lock. Deliberately NOT a setTimeout/window timer (this
  // module is pure logic, no DOM/window access besides the final global
  // assignment) — callers pass an explicit "now" so the lock is testable
  // and frame-driven rather than wall-clock driven.
  var missLockUntil = 0;
  function isInputLocked(now) {
    return now < missLockUntil;
  }

  // ======================================================================
  // Ledger integrity — section 6: "Every balance shown ... must derive
  // from transactions, never from manually typed totals."
  // ======================================================================
  function deriveBalance() {
    return state.transactions.reduce(function (sum, t) { return sum + t.amount; }, data.meta.startingBudget);
  }

  function assertLedgerIntegrity() {
    var derived = deriveBalance();
    if (derived !== state.budget) {
      console.error('[CIQ_ENGINE] ledger mismatch: deriveBalance() = ' + derived + ', state.budget = ' + state.budget);
    }
  }

  function currentCourseId() {
    var c = data.courses[state.course];
    return c ? c.id : null;
  }

  // amount is the exact signed delta already applied (e.g. a clamped miss
  // near $0 records the true delta, not a fixed -2), so balanceAfter and
  // deriveBalance() always agree by construction.
  function applyTransaction(type, amount, courseId, label) {
    var balanceAfter = state.budget + amount;
    state.transactions.push({ type: type, amount: amount, courseId: courseId, label: label, balanceAfter: balanceAfter });
    state.budget = balanceAfter;
    assertLedgerIntegrity();
  }

  // ======================================================================
  // Transitions.
  // ======================================================================
  function findRow(fromRoute, trigger) {
    for (var i = 0; i < TRANSITIONS.length; i++) {
      var row = TRANSITIONS[i];
      if (row.trigger !== trigger) continue;
      if (row.from === fromRoute) return row;
      if (row.from === '*' && GAMEPLAY_ROUTES.indexOf(fromRoute) !== -1) return row;
    }
    return null;
  }

  function canTransition(trigger) {
    return !!findRow(state.route, trigger);
  }

  function transition(trigger) {
    var row = findRow(state.route, trigger);
    if (!row) {
      console.warn('[CIQ_ENGINE] illegal transition: no edge for trigger "' + trigger + '" from route "' + state.route + '"');
      return false;
    }
    var from = state.route;
    var to;
    // Branch on the RAW table target (row.to), never the resolved 'to' —
    // a resolved '__RETURN__' can legitimately land back on the literal
    // route 'pause' (e.g. help closing back into pause), and that must
    // NOT be mistaken for freshly opening pause (which would stomp
    // pauseReturnRoute with 'help' and reproduce the original bug).
    if (row.to === '__RETURN__') {
      // from is always 'help' or 'pause' here (the only two '__RETURN__'
      // rows), so each resolves from and clears its own dedicated field.
      if (from === 'help') {
        to = state.helpReturnRoute || 'title';
        state.helpReturnRoute = null;
      } else {
        to = state.pauseReturnRoute || 'title';
        state.pauseReturnRoute = null;
      }
    } else {
      to = row.to;
      if (to === 'help') {
        state.helpReturnRoute = from;
      } else if (to === 'pause') {
        state.pauseReturnRoute = from;
      }
    }

    state.route = to;
    emit('routeChange', { from: from, to: to, trigger: trigger });
    emit('stateChange', getState());
    return true;
  }

  // ======================================================================
  // Hunt-scene rules — section 5.
  // ======================================================================
  function wrongTap(now) {
    if (isInputLocked(now)) return false;
    var delta = -Math.min(data.meta.missPenalty, state.budget); // budget = max(0, budget - 2), never negative
    applyTransaction('miss', delta, currentCourseId(), 'Wrong tap');
    state.misses += 1;
    missLockUntil = now + data.meta.missCooldownMs;
    transition('wrongTap');
    emit('miss', { misses: state.misses, budget: state.budget });
    return true;
  }

  // tapItem(itemId, opts): opts.now overrides Date.now() for deterministic
  // testing of the 1-second input lock.
  function tapItem(itemId, opts) {
    opts = opts || {};
    var now = opts.now != null ? opts.now : Date.now();

    if (state.route !== 'hunt') {
      console.warn('[CIQ_ENGINE] tapItem ignored: not on the hunt screen (route = "' + state.route + '")');
      return { result: 'invalid-route' };
    }
    if (isInputLocked(now)) {
      return { result: 'locked' };
    }

    var courseIndex = state.course;
    var course = data.courses[courseIndex];

    // "course-hub -> tap a completed course card -> course review state ...
    // do not replay within run" (section 9). A completed course's hunt
    // screen is view-only: facts/ledger/purchase remain visible, but finds
    // and misses no longer mutate state.
    if (state.foundItemIds[courseIndex].length >= 15) {
      console.warn('[CIQ_ENGINE] tapItem ignored: course "' + course.id + '" is already complete (review only)');
      return { result: 'course-complete' };
    }

    var item = course.items.filter(function (i) { return i.id === itemId; })[0];
    var alreadyFound = item && state.foundItemIds[courseIndex].indexOf(itemId) !== -1;

    if (!item || alreadyFound) {
      wrongTap(now);
      return { result: 'miss' };
    }

    // Correct tap.
    state.foundItemIds[courseIndex].push(itemId);
    if (itemId === state.activeHintItemId) {
      state.activeHintItemId = null; // the shimmering assisted target has been found
    }
    var wasAssisted = state.assistedItemIds[courseIndex].indexOf(itemId) !== -1;
    if (item.isFact && state.factsUnlocked.indexOf(itemId) === -1) {
      state.factsUnlocked.push(itemId);
    }

    transition(item.isFact ? 'correctTapFact' : 'correctTapItem');
    emit('find', { courseId: course.id, itemId: itemId, isFact: !!item.isFact, provisionalBonus: !wasAssisted });

    if (state.foundItemIds[courseIndex].length === 15) {
      completeCourse(courseIndex, course);
    }

    return { result: 'find', isFact: !!item.isFact, provisionalBonus: !wasAssisted };
  }

  // "foundItemIds[course] reaches 15: findBonus[course] = 15 minus the
  // number of unique assisted IDs in that course; append that bonus to the
  // ledger exactly once, clear activeHintItemId, and go to level-complete."
  function completeCourse(courseIndex, course) {
    var alreadyPosted = state.transactions.some(function (t) {
      return t.type === 'findBonus' && t.courseId === course.id;
    });
    if (!alreadyPosted) {
      var bonus = 15 - state.assistedItemIds[courseIndex].length;
      state.findBonus[courseIndex] = bonus;
      applyTransaction('findBonus', bonus, course.id, 'Find Bonus');
    }
    state.activeHintItemId = null;
    transition('courseComplete');
    emit('courseComplete', { courseId: course.id, course: courseIndex, findBonus: state.findBonus[courseIndex] });
  }

  // "Hint, available only when budget is at least 20 and activeHintItemId
  // is null ... select one remaining target, add its ID to assistedItemIds
  // and set activeHintItemId."
  function requestHint() {
    if (state.route !== 'hunt') {
      console.warn('[CIQ_ENGINE] requestHint ignored: not on the hunt screen');
      return false;
    }
    if (state.activeHintItemId !== null) {
      console.warn('[CIQ_ENGINE] hint refused: a hint is already active');
      return false;
    }
    if (state.budget < data.meta.hintCost) {
      console.warn('[CIQ_ENGINE] hint refused: Need $' + data.meta.hintCost);
      return false;
    }
    var courseIndex = state.course;
    var course = data.courses[courseIndex];
    var remaining = course.items.filter(function (i) {
      return state.foundItemIds[courseIndex].indexOf(i.id) === -1;
    });
    if (remaining.length === 0) {
      console.warn('[CIQ_ENGINE] hint refused: nothing left to find');
      return false;
    }
    // JUDGMENT CALL: the spec says "select one remaining target" without
    // specifying an order. This picks the first unfound item in the
    // course's fixed list order, so hint behaviour is deterministic and
    // testable rather than randomised.
    var target = remaining[0];

    applyTransaction('hint', -data.meta.hintCost, course.id, 'Hint');
    state.hintsUsed += 1;
    state.assistedItemIds[courseIndex].push(target.id);
    state.activeHintItemId = target.id;

    transition('requestHint');
    emit('hint', { courseId: course.id, itemId: target.id, budget: state.budget });
    return true;
  }

  function previewTier(tierIndex) {
    state.shopPreviewTier = tierIndex;
    emit('stateChange', getState());
  }

  // "Tier row is selectable only if tier price is less than or equal to
  // budget ... Buy tier n: budget -= price, tierBought[course] = n, go to
  // purchase-confirm."
  function buyTier(tierIndex) {
    if (state.route !== 'shop') {
      console.warn('[CIQ_ENGINE] buyTier ignored: not on the shop screen');
      return false;
    }
    var courseIndex = state.course;
    var course = data.courses[courseIndex];
    var row = course.ladder[tierIndex];
    if (!row) {
      console.warn('[CIQ_ENGINE] buyTier ignored: no tier ' + tierIndex + ' for ' + course.id);
      return false;
    }
    if (row.price > state.budget) {
      console.warn('[CIQ_ENGINE] shop row disabled: Need $' + (row.price - state.budget) + ' more');
      return false;
    }
    applyTransaction('purchase', -row.price, course.id, row.brand + ' ' + course.keyIngredient);
    state.tierBought[courseIndex] = tierIndex;
    state.shopPreviewTier = -1;
    transition('buyTier');
    emit('purchase', { courseId: course.id, tier: tierIndex, price: row.price, budget: state.budget });
    return true;
  }

  function confirmPurchase() {
    return transition('continue'); // purchaseConfirm -> courseHub
  }

  function continueToShop() {
    return transition('continue'); // levelComplete -> shop
  }

  // "All four foundItemIds sets contain 15 IDs and all four tierBought
  // values are not -1: enable Prepare Meal ... only when the player
  // selects it."
  function prepareMeal() {
    var allFound = state.foundItemIds.every(function (arr) { return arr.length === 15; });
    var allBought = state.tierBought.every(function (t) { return t !== -1; });
    if (!allFound || !allBought) {
      console.warn('[CIQ_ENGINE] prepareMeal refused: courses are not all complete and bought');
      return false;
    }
    return transition('prepareMeal');
  }

  // ======================================================================
  // Prep-station rules — section 5 and 10.4.
  //
  // JUDGMENT CALL: section 10.4 states each bundle's ingredient list as
  // prose ("Milk + Sugar + purchased Tea + Chai Spice Bundle...") and
  // data.js explicitly declines to resolve those names to course-scoped
  // item IDs (see the "SPEC GAP" comment on CIQ_DATA.cooking). Validating
  // that a station's *correct* bundle was loaded is therefore a content
  // question this build cannot answer from data alone. loadStationBundle()
  // records whatever bundle ID the caller (UI) says it placed, without
  // judging correctness; "invalid placement snaps back ... no money
  // penalty" is scene/UI behaviour (rejecting a bad drag target before it
  // ever reaches the engine), not a rule the engine enforces here.
  // ======================================================================
  function loadStationBundle(stationIndex, bundleId) {
    if (stationIndex < 0 || stationIndex > 4) return false;
    if (state.stationState[stationIndex] === 'resolved' || state.stationState[stationIndex] === 'heating') {
      console.warn('[CIQ_ENGINE] loadStationBundle ignored: station busy or resolved');
      return false;
    }
    if (state.stationLoadedBundleIds[stationIndex].indexOf(bundleId) === -1) {
      state.stationLoadedBundleIds[stationIndex].push(bundleId);
    }
    if (state.stationState[stationIndex] === 'empty') {
      state.stationState[stationIndex] = 'partial';
    }
    emit('stateChange', getState());
    return true;
  }

  // Explicit "this station is fully loaded, Start is available" marker.
  // Kept separate from loadStationBundle for the same reason noted above:
  // the engine cannot independently verify bundle completeness from data.
  function markStationReadyToCook(stationIndex) {
    if (stationIndex < 0 || stationIndex > 4) return false;
    if (state.stationState[stationIndex] === 'resolved' || state.stationState[stationIndex] === 'heating') return false;
    state.stationState[stationIndex] = 'readyToCook';
    emit('stateChange', getState());
    return true;
  }

  function outcomeFromDoneness(d) {
    // section 5, "Note on doneness[5] and scoring":
    //   0        -> not completed / raw -> 0
    //   1-39     -> Heating              -> 1
    //   40-69    -> Ready                -> 2
    //   70-89    -> Overcooking          -> 1
    //   90-100   -> Burned               -> 0
    if (d <= 0) return 0;
    if (d < 40) return 1;
    if (d < 70) return 2;
    if (d < 90) return 1;
    return 0;
  }

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  // "When a station has its required bundle the player explicitly starts
  // it, watches the labelled gauge, and explicitly finishes it."
  function startStation(stationIndex) {
    if (stationIndex < 0 || stationIndex > 4) return false;
    if (stationIndex === ROTI_INDEX && state.rotiStage !== 'pan') {
      console.warn('[CIQ_ENGINE] roti: advance through ingredients/dough/rotiMaker to pan before starting the cook');
      return false;
    }
    if (stationIndex === FRYER_INDEX && state.fryerBatchIndex >= 3) {
      console.warn('[CIQ_ENGINE] fryer: all three batches are already resolved');
      return false;
    }
    if (state.stationState[stationIndex] === 'resolved') {
      console.warn('[CIQ_ENGINE] startStation refused: already resolved');
      return false;
    }
    if (state.stationState[stationIndex] === 'heating') {
      console.warn('[CIQ_ENGINE] startStation refused: already heating');
      return false;
    }
    state.doneness[stationIndex] = 0;
    state.stationState[stationIndex] = 'heating';
    emit('stateChange', getState());
    return true;
  }

  // Advances the labelled gauge. Caller-driven (e.g. by requestAnimationFrame
  // in the UI layer) rather than a timer owned by this module, per the
  // "zero DOM code" / no-window-timers constraint.
  function advanceDoneness(stationIndex, delta) {
    if (stationIndex < 0 || stationIndex > 4) return false;
    var s = state.stationState[stationIndex];
    if (s !== 'heating' && s !== 'ready' && s !== 'overcooking') {
      console.warn('[CIQ_ENGINE] advanceDoneness refused: station not started');
      return false;
    }
    state.doneness[stationIndex] = clamp(state.doneness[stationIndex] + delta, 0, 100);
    var d = state.doneness[stationIndex];
    // Words + position, not colour alone (section 8): the zone label is a
    // first-class state value, always paired with the numeric doneness.
    if (d < 40) state.stationState[stationIndex] = 'heating';
    else if (d < 70) state.stationState[stationIndex] = 'ready';
    else state.stationState[stationIndex] = 'overcooking'; // covers both 70-89 Overcooking and 90-100 Burned; section 4's stationState enum has no separate "burned" value, so the Burned zone is scored (0 pts, see outcomeFromDoneness) but not separately labelled in this field.
    emit('stateChange', getState());
    return true;
  }

  function maybeAdvanceFromPrep() {
    if (state.route === 'prep' && state.stationState.every(function (s) { return s === 'resolved'; })) {
      transition('allStationsResolved');
    }
  }

  // "Fryer: resolve three batches in order ... average them, rounded to
  // the nearest integer, for the fryer's one 0-to-2 station score. The
  // next batch cannot load until the previous one resolves."
  // "Roti station: ingredients to dough to roti maker to pan to resolved.
  // Each substage is visible."
  // "All five station responsibilities resolved: go to plating."
  function finishStation(stationIndex) {
    if (stationIndex < 0 || stationIndex > 4) return false;
    if (state.stationState[stationIndex] === 'resolved') {
      console.warn('[CIQ_ENGINE] finishStation refused: already resolved');
      return false;
    }
    var outcome = outcomeFromDoneness(state.doneness[stationIndex]);

    if (stationIndex === FRYER_INDEX) {
      state.fryerBatchOutcome[state.fryerBatchIndex] = outcome;
      state.fryerBatchIndex += 1;
      if (state.fryerBatchIndex >= 3) {
        var sum = state.fryerBatchOutcome.reduce(function (a, b) { return a + b; }, 0);
        state.stationOutcome[stationIndex] = Math.round(sum / 3);
        state.stationState[stationIndex] = 'resolved';
      } else {
        // Next batch cannot load until this one resolves; resetting to
        // 'empty' here is what enforces that gate, since startStation()
        // requires leaving 'heating'/'resolved' before it will fire again.
        state.doneness[stationIndex] = 0;
        state.stationState[stationIndex] = 'empty';
        state.stationLoadedBundleIds[stationIndex] = [];
      }
    } else if (stationIndex === ROTI_INDEX) {
      state.stationOutcome[stationIndex] = outcome;
      state.stationState[stationIndex] = 'resolved';
      state.rotiStage = 'resolved';
    } else {
      state.stationOutcome[stationIndex] = outcome;
      state.stationState[stationIndex] = 'resolved';
    }

    maybeAdvanceFromPrep();
    emit('stateChange', getState());
    return true;
  }

  // Discrete roti substages ahead of the pan's heat gauge: ingredients ->
  // dough -> rotiMaker -> pan. "Each substage is visible; do not collapse
  // it into one automatic animation" -> each step is its own explicit call.
  function advanceRotiStage() {
    var seq = ['ingredients', 'dough', 'rotiMaker', 'pan'];
    var idx = seq.indexOf(state.rotiStage);
    if (idx === -1 || idx >= seq.length - 1) {
      console.warn('[CIQ_ENGINE] advanceRotiStage refused: at "' + state.rotiStage + '", use startStation/finishStation for the pan cook');
      return false;
    }
    state.rotiStage = seq[idx + 1];
    emit('stateChange', getState());
    return true;
  }

  // ======================================================================
  // Plating — section 5.
  // ======================================================================
  function placePlateComponent(slotName) {
    if (state.route !== 'plating') {
      console.warn('[CIQ_ENGINE] placePlateComponent ignored: not on the plating screen');
      return false;
    }
    if (data.plating.slots.indexOf(slotName) === -1) {
      console.warn('[CIQ_ENGINE] placePlateComponent refused: unknown slot "' + slotName + '"');
      return false;
    }
    if (state.plateComponents.indexOf(slotName) !== -1) {
      return true; // already placed, idempotent
    }
    if (state.plateComponents.length >= 6) {
      console.warn('[CIQ_ENGINE] placePlateComponent refused: all six slots already filled');
      return false;
    }
    state.plateComponents.push(slotName);
    transition('placeComponent');
    return true;
  }

  function starsFromTotal(total) {
    var bands = data.scoring.starBands;
    for (var i = 0; i < bands.length; i++) {
      if (total >= bands[i].min && total <= bands[i].max) return bands[i].stars;
    }
    return 1;
  }

  // "Verdict scoring: ingredientScore = sum of tierBought[0..3], max 12.
  // cookScore = sum over 5 appliances of 2/1/0, max 10. total = both, max
  // 22." tierBought values are the tier index itself (0-3), which is
  // already the point value the ladder awards per tier, so summing
  // tierBought directly gives ingredientScore with no extra lookup table.
  function computeVerdict() {
    var ingredientScore = state.tierBought.reduce(function (s, t) { return s + (t === -1 ? 0 : t); }, 0);
    var cookScore = state.stationOutcome.reduce(function (s, o) { return s + (o === -1 ? 0 : o); }, 0);
    var total = ingredientScore + cookScore;
    var stars = starsFromTotal(total);
    state.currentStars = stars;
    if (stars > state.bestStars) state.bestStars = stars;
    return { ingredientScore: ingredientScore, cookScore: cookScore, total: total, stars: stars };
  }

  // "Enable Present Dish after all six are placed. Present Dish saves the
  // run, reveals the finished plate, then goes to verdict."
  function presentDish() {
    if (state.route !== 'plating') {
      console.warn('[CIQ_ENGINE] presentDish ignored: not on the plating screen');
      return false;
    }
    if (state.plateComponents.length !== 6) {
      console.warn('[CIQ_ENGINE] presentDish refused: ' + (6 - state.plateComponents.length) + ' slot(s) still empty');
      return false;
    }
    var verdict = computeVerdict();
    var ok = transition('presentDish');
    if (!ok) return false;
    save();
    emit('verdict', verdict);
    return true;
  }

  function viewScoreDetail() {
    return transition('viewScoreDetail');
  }

  // Clears every run-scoped field back to a fresh $100 run while
  // preserving the campaign-scoped fields: bestStars, restaurantsUnlocked,
  // hasSave. Shared by "See Restaurant Row" and "Replay Taj Mahal", which
  // differ only in restaurantsUnlocked and destination route.
  function resetRunState() {
    var preserved = {
      bestStars: state.bestStars,
      restaurantsUnlocked: state.restaurantsUnlocked,
      hasSave: state.hasSave,
    };
    var next = freshState();
    next.bestStars = preserved.bestStars;
    next.restaurantsUnlocked = preserved.restaurantsUnlocked;
    next.hasSave = preserved.hasSave;
    next.route = state.route; // transition() below will move it on
    state = next;
  }

  // "See Restaurant Row: persist current and best stars, set
  // restaurantsUnlocked to min(6, value + 1), return to the map, and show
  // Taj Mahal as Completed plus slot 2 as New/Unlocked. A new restaurant
  // receives a fresh $100; do not add it to Taj Mahal's remaining balance."
  function seeRestaurantRow() {
    if (state.route !== 'verdict') return false;
    var nextUnlocked = Math.min(6, state.restaurantsUnlocked + 1);
    resetRunState();
    state.restaurantsUnlocked = nextUnlocked;
    var ok = transition('seeRestaurantRow');
    if (ok) save();
    return ok;
  }

  // "Replay Taj Mahal: preserve bestStars and campaign unlocks, reset only
  // the Taj Mahal run state, and return to its course hub with $100."
  function replayTajMahal() {
    if (state.route !== 'verdict') return false;
    resetRunState();
    var ok = transition('replayTajMahal');
    if (ok) save();
    return ok;
  }

  // "Continue Later: save exact state and return to title, where Continue
  // resumes it."
  function continueLater() {
    if (state.route !== 'verdict') return false;
    save();
    return transition('continueLater');
  }

  // ======================================================================
  // Title / map / course-hub / help / pause navigation.
  // ======================================================================
  function tapPlay() {
    return transition('tapPlay');
  }

  // JUDGMENT CALL: section 4 explicitly lists route among the persisted,
  // resumed fields ("Resume restores route, course, exact found IDs,
  // ledger, active hint, station progress, fryer queue, roti substage,
  // plating and judgment state"), which would mean Continue can land
  // anywhere (mid-hunt, mid-shop, even mid-verdict). Section 9's transition
  // table, however, gives Continue exactly one edge: title -> map. Rather
  // than pick one source and silently ignore the other, tapContinue() does
  // both: load() first, faithfully restoring every persisted field
  // (including whatever route was saved), and then applies the table's
  // title->map edge on top. The result: all deep progress (found items,
  // budget, tiers, station/plating state) comes back exactly as saved, the
  // player always lands on the map per the table, and getResumeLabel() is
  // what surfaces the "exact location" (e.g. "Taj Mahal · Beverage 6/15")
  // the zero-tutorial section asks for on the Continue button itself.
  function tapContinue() {
    if (!state.hasSave) {
      console.warn('[CIQ_ENGINE] tapContinue refused: no save to continue');
      return false;
    }
    if (!load()) {
      console.warn('[CIQ_ENGINE] tapContinue refused: save could not be read');
      return false;
    }
    return transition('tapContinue');
  }

  function tapHelp() {
    return transition('tapHelp');
  }

  function closeHelp() {
    return transition('tapClose');
  }

  function tapPause() {
    return transition('tapPause');
  }

  function resumeFromPause() {
    return transition('tapResume');
  }

  // "pause-sheet -> tap Leave restaurant -> map, progress kept."
  function leaveRestaurant() {
    return transition('tapLeaveRestaurant');
  }

  function isFreshRun() {
    var noFinds = state.foundItemIds.every(function (arr) { return arr.length === 0; });
    var noTiers = state.tierBought.every(function (t) { return t === -1; });
    return noFinds && noTiers && state.transactions.length === 0;
  }

  // "map -> tap Taj Mahal -> course-hub ..., initialize $100 ledger, sets
  // hasSave true." Only restaurant slot 1 (Taj Mahal) has content in this
  // build (section 4's scope boundary); slots 2-6 exist on the map as
  // unlocked-but-empty per section 9's closing note and are out of scope
  // here. JUDGMENT CALL: the $100 ledger is only (re)initialized when
  // there's no run in progress yet (isFreshRun()) — re-entering an
  // already-started run must not wipe its budget/progress, since section 4
  // says Resume restores "exact found IDs, ledger ... station progress".
  function selectRestaurant(slot) {
    if (state.route !== 'map') {
      console.warn('[CIQ_ENGINE] selectRestaurant ignored: not on the map');
      return false;
    }
    if (slot !== 1) {
      console.warn('[CIQ_ENGINE] selectRestaurant refused: slot ' + slot + ' has no content in this build (Taj Mahal only)');
      return false;
    }
    if (isFreshRun()) {
      state.budget = data.meta.startingBudget;
      state.transactions = [];
    }
    state.hasSave = true;
    return transition('tapRestaurant');
  }

  function selectCourse(courseIndex) {
    if (state.route !== 'courseHub') {
      console.warn('[CIQ_ENGINE] selectCourse ignored: not on the course hub');
      return false;
    }
    if (courseIndex < 0 || courseIndex > 3) {
      console.warn('[CIQ_ENGINE] selectCourse refused: invalid course index ' + courseIndex);
      return false;
    }
    state.course = courseIndex;
    // Covers both transition-table rows for course-hub cards: an
    // incomplete card starts the hunt; a completed card enters the same
    // route in review-only mode (tapItem() refuses finds once a course
    // already has 15/15 — see the "course-complete" guard above), per
    // section 9's "do not replay within run".
    return transition('selectCourse');
  }

  // ======================================================================
  // Save / load — localStorage key "ciq2026". Persist everything in the
  // state block except pauseReturnRoute, helpReturnRoute and
  // shopPreviewTier (section 4; helpReturnRoute is this engine's addition
  // to pauseReturnRoute, same "not persisted, always cleared" treatment).
  // ======================================================================
  var STORAGE_KEY = 'ciq2026';

  function toPersistable(s) {
    var clone = JSON.parse(JSON.stringify(s));
    delete clone.pauseReturnRoute;
    delete clone.helpReturnRoute;
    delete clone.shopPreviewTier;
    return clone;
  }

  function save() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersistable(state)));
      return true;
    } catch (err) {
      console.error('[CIQ_ENGINE] save() failed', err);
      return false;
    }
  }

  function load() {
    var raw;
    try {
      raw = window.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      console.error('[CIQ_ENGINE] load() failed reading storage', err);
      return false;
    }
    if (!raw) return false;
    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error('[CIQ_ENGINE] load() failed parsing storage', err);
      return false;
    }
    var next = freshState();
    Object.keys(parsed).forEach(function (key) {
      if (key === 'pauseReturnRoute' || key === 'helpReturnRoute' || key === 'shopPreviewTier') return;
      next[key] = parsed[key];
    });
    next.pauseReturnRoute = null; // not persisted; always clear on load
    next.helpReturnRoute = null;  // not persisted; always clear on load
    next.shopPreviewTier = -1;    // not persisted; always clear on load
    state = next;
    emit('stateChange', getState());
    emit('routeChange', { from: null, to: state.route, trigger: 'load' });
    return true;
  }

  function clear() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (err) {
      console.error('[CIQ_ENGINE] clear() failed', err);
      return false;
    }
  }

  function getResumeLabel() {
    var course = data.courses[state.course] || data.courses[0];
    var found = (state.foundItemIds[state.course] || []).length;
    return data.meta.restaurant + ' · ' + course.name + ' ' + found + '/15';
  }

  // ======================================================================
  // Public surface.
  // ======================================================================
  function getState() {
    return JSON.parse(JSON.stringify(state));
  }

  function reset() {
    state = freshState();
    missLockUntil = 0;
    emit('stateChange', getState());
    emit('routeChange', { from: null, to: state.route, trigger: 'reset' });
  }

  var debug = {
    // Shallow-merges an arbitrary patch into state, bypassing every rule
    // and transition guard. For tests and dev tooling only.
    setState: function (patch) {
      state = Object.assign({}, state, patch);
      emit('stateChange', getState());
    },
    getRawState: function () { return state; },
    deriveBalance: deriveBalance,
  };

  window.CIQ_ENGINE = {
    // lifecycle
    getState: getState,
    reset: reset,
    // events
    on: on,
    emit: emit,
    // transitions (section 9)
    canTransition: canTransition,
    transition: transition,
    // title / map / course hub / overlays
    tapPlay: tapPlay,
    tapContinue: tapContinue,
    tapHelp: tapHelp,
    closeHelp: closeHelp,
    tapPause: tapPause,
    resumeFromPause: resumeFromPause,
    leaveRestaurant: leaveRestaurant,
    selectRestaurant: selectRestaurant,
    selectCourse: selectCourse,
    // hunt
    tapItem: tapItem,
    requestHint: requestHint,
    // shop
    previewTier: previewTier,
    buyTier: buyTier,
    confirmPurchase: confirmPurchase,
    continueToShop: continueToShop,
    // prep -> plating
    prepareMeal: prepareMeal,
    loadStationBundle: loadStationBundle,
    markStationReadyToCook: markStationReadyToCook,
    startStation: startStation,
    advanceDoneness: advanceDoneness,
    finishStation: finishStation,
    advanceRotiStage: advanceRotiStage,
    // plating -> verdict
    placePlateComponent: placePlateComponent,
    presentDish: presentDish,
    viewScoreDetail: viewScoreDetail,
    seeRestaurantRow: seeRestaurantRow,
    replayTajMahal: replayTajMahal,
    continueLater: continueLater,
    // save/load
    save: save,
    load: load,
    clear: clear,
    getResumeLabel: getResumeLabel,
    // testing
    debug: debug,
  };
})();
