// CookInQuest prototype — boot, routing, resize/scale, keyboard.
//
// Wires engine events to screen renderers. Owns nothing about game rules.
// If CIQ_DATA or CIQ_ENGINE are missing (other agent still writing them),
// falls back to a clearly-marked local stub so the shell is demonstrable.

(function () {
  'use strict';

  // ------------------------------------------------------------------
  // Fallback data stub — only used if js/data.js failed to load or
  // defines an incomplete window.CIQ_DATA. Do not edit data.js from here.
  // ------------------------------------------------------------------
  if (!window.CIQ_DATA) {
    console.warn('[CIQ] CIQ_DATA missing — using local fallback stub for section-1 shell demo.');
    window.CIQ_DATA = {
      meta: { restaurant: 'Taj Mahal', town: 'KhannaTown', startingBudget: 100 },
      restaurants: [
        { slot: 1, name: 'TajMahal', cuisine: 'Mughlai, North Indian, Delhi', status: 'playable', order: 1 },
        { slot: 2, name: 'ChettinadKitchen', cuisine: 'Chettinad, Tamil Nadu', status: 'playable', order: 2 },
        { slot: 3, name: 'BengalGhat', cuisine: 'Bengali, Kolkata', status: 'playable', order: 3 },
        { slot: 4, name: 'GujaratThal', cuisine: 'Gujarati', status: 'playable', order: 4 },
        { slot: 5, name: 'GoaBeachShack', cuisine: 'Goan coastal', status: 'playable', order: 5 },
        { slot: 6, name: 'KashmirWazwanHouse', cuisine: 'Kashmiri', status: 'playable', order: 6 },
        { slot: 7, name: 'HyderabadHouse', cuisine: 'Hyderabadi', status: 'comingSoon', order: 7 },
        { slot: 8, name: 'MalabarCoast', cuisine: 'Keralan', status: 'comingSoon', order: 8 },
        { slot: 9, name: 'RajasthanHaveli', cuisine: 'Rajasthani', status: 'comingSoon', order: 9 },
      ],
      courses: [
        { id: 'beverage', index: 0, name: 'Beverage', dish: 'Chai Tea' },
        { id: 'appetizer', index: 1, name: 'Appetizer', dish: 'Pakoda' },
        { id: 'entree', index: 2, name: 'Entree', dish: 'Thaali' },
        { id: 'dessert', index: 3, name: 'Dessert', dish: 'Gulab Jamun' },
      ],
      help: [
        { title: 'The Challenge', body: "Restaurant Row's Chef's Challenge, KhannaTown, the goal." },
        { title: 'Finding items', body: 'How taps, misses and hints work.' },
        { title: 'The budget', body: 'One shared $100 pool across all four courses.' },
        { title: 'Choosing ingredients', body: 'The four tier ladder, and why the best of everything is not always affordable.' },
        { title: 'Cooking', body: 'Bundles, station dependencies, labelled doneness ranges, Start and Finish.' },
        { title: 'Accessibility', body: 'Pinch to zoom, scene contrast, VoiceOver spatial search, and full input parity across touch, Apple Pencil, pointer, keyboard, controller, VoiceOver and Switch Control.' },
      ],
    };
  }

  // ------------------------------------------------------------------
  // Fallback engine stub — only used if js/engine.js has not landed yet
  // (or fails to load). Mirrors js/engine.js's REAL public surface for
  // the section-1 subset (route/pauseReturnRoute state shape, tapPlay/
  // tapContinue/tapHelp/tapPause naming, a 'stateChange' event, and a
  // debug.setState escape hatch) so screens.js and the rest of this file
  // need exactly one code path regardless of which engine is active.
  // Do not edit engine.js from here.
  // ------------------------------------------------------------------
  if (!window.CIQ_ENGINE) {
    console.warn('[CIQ] CIQ_ENGINE missing — using local fallback stub for section-1 shell demo.');
    window.CIQ_ENGINE = (function () {
      const STORAGE_KEY = 'ciq_save_v1_fallback';
      const listeners = {};

      function on(event, fn) {
        (listeners[event] = listeners[event] || []).push(fn);
        return function off() {
          listeners[event] = (listeners[event] || []).filter(function (f) { return f !== fn; });
        };
      }
      function emit(event, payload) {
        (listeners[event] || []).forEach(function (fn) {
          try { fn(payload); } catch (err) { console.error('[CIQ_ENGINE fallback]', err); }
        });
      }

      function freshState() {
        return {
          budget: 100,
          transactions: [],
          route: 'title',
          pauseReturnRoute: null,
          course: 0,
          foundItemIds: [[], [], [], []],
          tierBought: [-1, -1, -1, -1],
          currentStars: 0,
          bestStars: 0,
          restaurantsUnlocked: 1,
          hasSave: false,
        };
      }

      function loadPersisted() {
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : null;
        } catch (err) {
          return null;
        }
      }

      let state = Object.assign(freshState(), loadPersisted() || {});
      // The app always boots on the title screen; any help/pause route left
      // open in a stale save is also cleared.
      state.route = 'title';
      state.pauseReturnRoute = null;

      function persist() {
        try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (err) { /* ignore */ }
      }
      function setState(patch) {
        state = Object.assign({}, state, patch);
        persist();
        emit('stateChange', state);
      }
      function getState() { return state; }

      function getResumeLabel() {
        const data = window.CIQ_DATA;
        const course = data.courses[state.course] || data.courses[0];
        const found = (state.foundItemIds[state.course] || []).length;
        return data.meta.restaurant + ' · ' + course.name + ' ' + found + '/15';
      }

      // Same-shaped subset of engine.js's TRANSITIONS table this stub
      // needs for title/map/courseHub/help/pause.
      const GAMEPLAY_ROUTES = ['map', 'courseHub', 'hunt', 'levelComplete', 'shop', 'purchaseConfirm', 'prep', 'plating', 'verdict'];
      function canTransition(trigger) {
        if (trigger === 'tapPause') return GAMEPLAY_ROUTES.indexOf(state.route) !== -1;
        return true;
      }

      function tapPlay() {
        setState({ hasSave: true, route: 'map' });
      }
      function tapContinue() {
        setState({ route: 'map' });
      }
      function selectRestaurant(slot) {
        const data = window.CIQ_DATA;
        const restaurant = data.restaurants.find(function (r) { return r.slot === slot; });
        if (!restaurant || slot !== 1) return false;
        const unlocked = restaurant.status === 'playable' && restaurant.order <= state.restaurantsUnlocked;
        if (!unlocked) return false;
        setState({ route: 'courseHub', hasSave: true });
        return true;
      }
      function selectCourse(index) {
        setState({ course: index, route: 'hunt' });
        return true;
      }
      function prepareMeal() {
        const allFound = state.foundItemIds.every(function (arr) { return arr.length === 15; });
        const allBought = state.tierBought.every(function (t) { return t !== -1; });
        if (!allFound || !allBought) return false;
        setState({ route: 'prep' });
        return true;
      }
      function tapHelp() {
        setState({ pauseReturnRoute: state.route, route: 'help' });
      }
      function closeHelp() {
        setState({ route: state.pauseReturnRoute || 'title', pauseReturnRoute: null });
      }
      function tapPause() {
        setState({ pauseReturnRoute: state.route, route: 'pause' });
      }
      function resumeFromPause() {
        setState({ route: state.pauseReturnRoute || 'title', pauseReturnRoute: null });
      }
      function leaveRestaurant() {
        setState({ pauseReturnRoute: null, route: 'map' });
      }

      const debug = {
        setState: function (patch) { setState(patch); },
        getRawState: function () { return state; },
      };

      return {
        getState: getState,
        on: on,
        canTransition: canTransition,
        tapPlay: tapPlay,
        tapContinue: tapContinue,
        selectRestaurant: selectRestaurant,
        selectCourse: selectCourse,
        prepareMeal: prepareMeal,
        tapHelp: tapHelp,
        closeHelp: closeHelp,
        tapPause: tapPause,
        resumeFromPause: resumeFromPause,
        leaveRestaurant: leaveRestaurant,
        getResumeLabel: getResumeLabel,
        debug: debug,
      };
    })();
  }

  // ------------------------------------------------------------------
  // Boot
  // ------------------------------------------------------------------
  const UI = window.CIQ_UI;
  const SCREENS = window.CIQ_SCREENS;
  const data = window.CIQ_DATA;
  const engine = window.CIQ_ENGINE;

  const frameEl = document.getElementById('frame');
  const screenRoot = document.getElementById('screen-root');
  const overlayRoot = document.getElementById('overlay-root');
  const narrowOverlay = document.getElementById('narrow-overlay');

  // Routes rendered by this build section. Everything else routes to the
  // "coming in the next build section" placeholder, per the task brief.
  const IMPLEMENTED_ROUTES = { title: true, map: true, courseHub: true, hunt: true, levelComplete: true };

  let overlayCleanup = null;
  let lastFocusedBeforeOverlay = null;

  function ctx() {
    return { data: data, engine: engine, root: screenRoot, overlayRoot: overlayRoot };
  }

  // engine.js (real or fallback) models help/pause as full `route` values,
  // not a separate overlay flag, with pauseReturnRoute/helpReturnRoute
  // recording what to show underneath (section 4/9; the real engine keeps
  // these as two independent fields so help opened from pause doesn't
  // clobber pause's own return route — see engine.js's transition()).
  // Visually overlays don't stack, so when help is opened from pause the
  // background is still the screen pause itself opened, not the pause
  // sheet — resolveUnderlyingRoute() below walks that one extra hop.
  function isOverlayRoute(route) {
    return route === 'help' || route === 'pause';
  }

  function resolveUnderlyingRoute(state) {
    if (state.route === 'pause') return state.pauseReturnRoute || 'title';
    if (state.route === 'help') {
      // helpReturnRoute may itself be 'pause' (help opened from the pause
      // sheet) — the real engine exposes this field; the fallback stub in
      // this file does not (it still shares one field), so fall back to
      // pauseReturnRoute there for the same visual result.
      var helpFrom = state.helpReturnRoute !== undefined ? state.helpReturnRoute : state.pauseReturnRoute;
      return helpFrom === 'pause' ? (state.pauseReturnRoute || 'title') : (helpFrom || 'title');
    }
    return state.route;
  }

  function routeAnnouncement(state) {
    if (state.route === 'help') return 'Help opened';
    if (state.route === 'pause') return 'Paused';
    switch (state.route) {
      case 'title': return 'Title screen';
      case 'map': return 'Restaurant Row';
      case 'courseHub': return 'Course hub';
      case 'hunt': return 'Hunt scene';
      case 'levelComplete': return 'Course complete';
      default: return 'Coming in the next build section';
    }
  }

  function renderOverlay(state) {
    if (overlayCleanup) {
      overlayCleanup();
      overlayCleanup = null;
    }
    if (isOverlayRoute(state.route)) {
      if (!lastFocusedBeforeOverlay) lastFocusedBeforeOverlay = document.activeElement;
      UI.clear(overlayRoot);
      overlayRoot.hidden = false;
      overlayCleanup = state.route === 'help' ? SCREENS.helpSheet(ctx()) : SCREENS.pauseSheet(ctx());
    } else {
      UI.clear(overlayRoot);
      overlayRoot.hidden = true;
      if (lastFocusedBeforeOverlay && document.body.contains(lastFocusedBeforeOverlay)) {
        lastFocusedBeforeOverlay.focus();
      }
      lastFocusedBeforeOverlay = null;
    }
  }

  function render() {
    const state = engine.getState();
    const c = ctx();
    const underlyingRoute = resolveUnderlyingRoute(state);

    if (IMPLEMENTED_ROUTES[underlyingRoute]) {
      SCREENS[underlyingRoute](c);
    } else {
      SCREENS.placeholder(c, underlyingRoute);
    }

    renderOverlay(state);
    UI.announce(routeAnnouncement(state));
  }

  engine.on('stateChange', render);

  // ------------------------------------------------------------------
  // Keyboard: Escape pauses or goes back (spec section 8). Whether a given
  // route may pause is a transition-table fact engine.js already owns
  // (section 9: "any gameplay screen"), so this asks the engine instead of
  // duplicating its route list.
  // ------------------------------------------------------------------
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    const state = engine.getState();
    if (state.route === 'help') {
      engine.closeHelp();
    } else if (state.route === 'pause') {
      engine.resumeFromPause();
    } else if (engine.canTransition('tapPause')) {
      engine.tapPause();
    }
  });

  // ------------------------------------------------------------------
  // Resize: scale the fixed-size frame to fit the viewport, pick
  // regular vs compact frame width, and show the "widen the window to
  // play" overlay below the minimum supported size (spec section 2).
  // ------------------------------------------------------------------
  function layout() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const tooNarrow = w < 480 || h < 640;
    narrowOverlay.hidden = !tooNarrow;

    const useCompact = w < 900;
    frameEl.classList.toggle('frame--compact', useCompact);

    const frameW = useCompact ? 700 : 1210;
    const frameH = 834;
    const scale = Math.min(w / frameW, h / frameH) * 0.96;
    const clamped = Math.max(0.28, Math.min(scale, 1.4));
    frameEl.style.setProperty('--scale', String(clamped));
  }

  window.addEventListener('resize', layout);
  layout();

  render();
})();
