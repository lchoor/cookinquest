// CookInQuest prototype — screen renderers.
//
// title, map, courseHub, helpSheet, pauseSheet, and the later-build
// placeholder. Reads window.CIQ_DATA and calls window.CIQ_ENGINE actions;
// never mutates state directly. Exposes window.CIQ_SCREENS.

(function () {
  'use strict';

  const UI = window.CIQ_UI;

  function splitName(name) {
    // "TajMahal" -> "Taj Mahal". Data-driven spacing for restaurants 2-9;
    // restaurant 1 is display-named from data.meta.restaurant instead (see
    // displayRestaurantName), which is the spec's governing spelling.
    return name.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  function displayRestaurantName(data, restaurant) {
    if (restaurant.slot === 1) return data.meta.restaurant;
    return splitName(restaurant.name);
  }

  // Course hub hero imagery — the four hunt-scene plates in art/, one per
  // course (sceneId in data.js maps 1:1 to these). The cards are tall and
  // narrow (~0.52:1) against near-square 2126x2048 source plates, so a plain
  // `background-size: cover` ends up HEIGHT-constrained and shows the full
  // photograph top-to-bottom — including the non-Indian signage/labels
  // art/PLATES.md flags for each scene. `size` below is an explicit
  // `auto <N>%` zoom (bigger N = tighter crop) paired with `pos` so each
  // card instead shows a deliberately chosen, appetising band of the plate
  // that dodges those defects. See art/PLATES.md for the defect coordinates
  // this was tuned against.
  var COURSE_SCENE_ART = {
    // Grocery: crop to the shelf band at ~40-70% down (packed, colourful
    // bottles/bags) — 0-24% is bare ceiling/light fixture, and the
    // "www.shopaisaligram.com" delivery banner sits at ~34-40%.
    grocery: { file: 'art/scene-grocery.jpg', size: 'auto 333%', pos: '50% 57%' },
    // Produce market: crop to the top ~34% (hanging bananas, orange nets,
    // and — new — the crate shelving band that starts around 20% down) —
    // all six euro chalkboard signs sit at y >= 37% (see art/PLATES.md), so
    // this stays a safe margin above them. Slightly looser than the
    // original 330%/top-0% crop, which was tight enough on bananas alone
    // to read as an abstract green mass rather than a market stall; adding
    // the crate shelving underneath gives it market-stall structure.
    'produce-market': { file: 'art/scene-market.jpg', size: 'auto 300%', pos: '50% 3%' },
    // Dinner table: crop to the bottom-left ~45% (the dense spice-bowl
    // cluster) — the pizza-topped flatbread continuity oddity sits
    // upper-centre-right and is dodged, not hidden (kept elsewhere/case study).
    'dinner-table': { file: 'art/scene-table.jpg', size: 'auto 220%', pos: '18% 100%' },
    // Bakery: crop to the cake-shelf band at ~15-30% down — 0-15% is the
    // empty glass/lighting reflection above it, and the lower shelves are
    // dim and carry the clipped "Turtle Tart" label. DIRECTION.md flags the
    // full plate as noticeably darker than the other three, but the cake
    // shelf itself (this crop band) is already reasonably lit — the
    // original brightness(1.55) lift was tuned against the whole dim photo,
    // not this band, and blew out the highlights into a flat yellow blob.
    // A much smaller lift (in the same family as DEFAULT_HUB_PHOTO_FILTER
    // above) keeps the cakes' icing detail and colour instead of clipping it.
    bakery: {
      file: 'art/scene-bakery.jpg', size: 'auto 460%', pos: '50% 24%',
      filter: 'saturate(1.1) sepia(0.05) contrast(1.08) brightness(1.15)',
    },
  };
  var DEFAULT_HUB_PHOTO_FILTER = 'saturate(1.08) sepia(0.06) contrast(1.05) brightness(1.02)';

  // js/engine.js only has content for restaurant slot 1 (Taj Mahal) in this
  // build (selectRestaurant() refuses any other slot), and its state model
  // has no activeRestaurantSlot field — course-hub is reachable only after
  // selectRestaurant(1) succeeds, so slot 1 is always the answer here.
  function activeRestaurant(data, state) {
    return data.restaurants.find(function (r) { return r.slot === 1; }) || data.restaurants[0];
  }

  // --------------------------------------------------------------------
  // Title
  // --------------------------------------------------------------------
  function renderTitle(ctx) {
    const data = ctx.data;
    const engine = ctx.engine;
    const state = engine.getState();
    const hasSave = !!state.hasSave;

    const hero = UI.el('div', { class: 'title-hero photo-treated', 'aria-hidden': 'true' }, [
      UI.el('div', { class: 'title-hero__art' }),
      UI.el('div', { class: 'title-hero__vignette' }),
      UI.el('div', { class: 'title-hero__grain' }),
    ]);

    const primaryLabel = hasSave ? 'Continue' : 'Play';
    const primaryBtn = UI.el('button', {
      type: 'button',
      class: 'btn btn--primary btn--large',
      onClick: function () { hasSave ? engine.tapContinue() : engine.tapPlay(); },
    }, primaryLabel);

    const actionsChildren = [primaryBtn];
    if (hasSave) {
      actionsChildren.push(UI.el('p', { class: 'title-actions__resume' }, engine.getResumeLabel()));
    }
    actionsChildren.push(UI.el('button', {
      type: 'button',
      class: 'btn btn--ghost',
      onClick: function () { engine.tapHelp(); },
    }, 'Help'));

    const content = UI.el('div', { class: 'title-content' }, [
      UI.el('div', {}, [
        UI.el('p', { class: 'title-wordmark__eyebrow' }, "Restaurant Row · " + data.meta.town),
        UI.el('h1', { class: 'title-wordmark__logo' }, 'CookInQuest'),
        UI.el('p', { class: 'title-wordmark__tag' }, 'Shop smart, cook with care, and earn the critic’s stars.'),
      ]),
      UI.el('div', { class: 'title-actions' }, actionsChildren),
    ]);

    const screen = UI.el('div', { class: 'screen screen--title' }, [hero, content]);
    UI.mount(ctx.root, screen);
    primaryBtn.focus();
  }

  // --------------------------------------------------------------------
  // Map — Restaurant Row
  // --------------------------------------------------------------------
  // No unique art exists yet for restaurants 2-9 (only slot 1, Taj Mahal, has
  // a real badge in art/app-icon.jpg), so each gets an authored CSS medallion
  // instead of a gap: a two-letter cuisine monogram on a token-coloured
  // gradient, cycling through the accent palette. Purely decorative — every
  // node's unlock state is still carried by text (name/state label), never
  // by which colour it happens to draw.
  const CUISINE_ACCENTS = [
    ['var(--marigold-hi)', 'var(--marigold-lo)'],
    ['var(--lotus)', 'var(--chilli-soft)'],
    ['var(--indigo)', 'var(--ink-600)'],
    ['var(--mint)', 'var(--mint-soft)'],
    ['var(--saffron)', 'var(--marigold-lo)'],
  ];

  function monogram(name) {
    const words = name.split(' ').filter(Boolean);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }

  function cuisineLabel(cuisine) {
    return cuisine.split(',')[0];
  }

  function renderMap(ctx) {
    const data = ctx.data;
    const engine = ctx.engine;
    const state = engine.getState();

    const ribbon = UI.el('div', { class: 'ribbon glass glass--light' }, [
      UI.el('img', { src: 'art/logo-lockup.jpg', alt: '', class: 'ribbon__mascot', 'aria-hidden': 'true' }),
      UI.el('p', { class: 'ribbon__text' },
        'Chef’s Challenge: six KhannaTown restaurants each need a hand in the kitchen. ' +
        data.meta.restaurant + ' is open first — the rest unlock as you clear each one.'),
    ]);

    const header = UI.el('div', { class: 'map-header' }, [
      UI.el('div', {}, [
        UI.el('p', { class: 'map-header__eyebrow' }, data.meta.town),
        UI.el('h1', { class: 'map-header__title' }, 'Restaurant Row'),
      ]),
      UI.el('button', { type: 'button', class: 'btn btn--chip', onClick: function () { engine.tapHelp(); } }, 'Help'),
    ]);

    const trail = UI.el('div', { class: 'map-trail', role: 'group', 'aria-label': 'Restaurants' });

    data.restaurants.forEach(function (r, i) {
      const isComingSoon = r.status === 'comingSoon';
      const isUnlocked = r.status === 'playable' && r.order <= state.restaurantsUnlocked;
      const isLocked = r.status === 'playable' && !isUnlocked;
      const name = displayRestaurantName(data, r);

      let stateLabel = 'Locked';
      let a11yExtra = ', complete the restaurant before it to unlock';
      if (isComingSoon) { stateLabel = 'Coming soon'; a11yExtra = ', not open yet'; }
      else if (isUnlocked) { stateLabel = 'Unlocked'; a11yExtra = ', select to start'; }

      const nodeClass = 'map-node ' + (isUnlocked ? 'map-node--unlocked' : isComingSoon ? 'map-node--soon' : 'map-node--locked');

      let badgeChildren;
      if (r.slot === 1) {
        badgeChildren = [UI.el('img', { src: 'art/app-icon.jpg', alt: '', class: 'map-node__badge-img' })];
      } else {
        const accent = CUISINE_ACCENTS[i % CUISINE_ACCENTS.length];
        badgeChildren = [UI.el('span', {
          class: 'map-node__monogram',
          style: 'background: linear-gradient(135deg, ' + accent[0] + ', ' + accent[1] + ');',
        }, monogram(name))];
      }
      if (isComingSoon) badgeChildren.push(UI.el('span', { class: 'map-node__flag map-node__flag--soon', 'aria-hidden': 'true' }, '★'));
      else if (isLocked) badgeChildren.push(UI.el('span', { class: 'map-node__flag map-node__flag--locked', 'aria-hidden': 'true' }, '🔒'));

      const node = UI.el('button', {
        type: 'button',
        class: nodeClass,
        'aria-disabled': isUnlocked ? 'false' : 'true',
        'aria-label': name + ' — ' + r.cuisine + '. ' + stateLabel + a11yExtra,
        onClick: function () { if (isUnlocked) engine.selectRestaurant(r.slot); },
      }, [
        UI.el('span', { class: 'map-node__badge', 'aria-hidden': 'true' }, badgeChildren),
        UI.el('span', { class: 'map-node__name' }, name),
        UI.el('span', { class: 'map-node__cuisine' }, cuisineLabel(r.cuisine)),
        UI.el('span', { class: 'map-node__state' }, stateLabel),
      ]);
      trail.appendChild(node);
    });

    UI.rovingGrid(trail, '.map-node', 3);

    const screen = UI.el('div', { class: 'screen screen--map' }, [header, ribbon, trail]);
    UI.mount(ctx.root, screen);
  }

  // --------------------------------------------------------------------
  // Course hub
  // --------------------------------------------------------------------
  function renderCourseHub(ctx) {
    const data = ctx.data;
    const engine = ctx.engine;
    const state = engine.getState();
    const restaurant = activeRestaurant(data, state);
    const name = displayRestaurantName(data, restaurant);

    const ribbon = UI.el('div', { class: 'ribbon glass glass--light' }, [
      UI.el('p', { class: 'ribbon__text' },
        'Welcome to ' + name + ', the premiere restaurant in ' + data.meta.town + '. Gather what each course needs, ' +
        'shop within your $' + data.meta.startingBudget + ' budget, then cook to earn the critic’s verdict.'),
    ]);

    const header = UI.el('div', { class: 'hub-header' }, [
      UI.el('div', {}, [
        UI.el('p', { class: 'hub-header__eyebrow' }, name),
        UI.el('h1', { class: 'hub-header__title' }, 'Choose a course'),
      ]),
      UI.el('div', { class: 'hub-header__actions' }, [
        UI.el('div', { class: 'chip' }, [
          UI.el('span', { class: 'chip__label' }, 'Restaurant budget'),
          UI.el('span', { class: 'chip__value', style: 'font-variant-numeric: tabular-nums;' }, '$' + state.budget),
        ]),
        UI.el('button', { type: 'button', class: 'btn btn--chip', onClick: function () { engine.tapHelp(); } }, 'Help'),
        UI.el('button', { type: 'button', class: 'btn btn--chip', onClick: function () { engine.tapPause(); } }, 'Pause'),
      ]),
    ]);

    const cardsGrid = UI.el('div', { class: 'hub-cards', role: 'group', 'aria-label': 'Courses' });
    let completeCount = 0;

    data.courses.forEach(function (course) {
      const found = (state.foundItemIds[course.index] || []).length;
      const complete = found >= 15 && state.tierBought[course.index] !== -1;
      if (complete) completeCount += 1;

      const art = COURSE_SCENE_ART[course.sceneId];
      const photo = UI.el('div', {
        class: 'hub-card__photo',
        style: art
          ? "background-image: url('" + art.file + "'); background-size: " + art.size + "; background-position: " + art.pos +
            "; filter: " + (art.filter || DEFAULT_HUB_PHOTO_FILTER) + ";"
          : '',
      });
      const scrim = UI.el('div', { class: 'hub-card__scrim' });

      const bodyChildren = [
        UI.el('p', { class: 'hub-card__course' }, course.name),
        UI.el('p', { class: 'hub-card__dish' }, course.dish),
        UI.el('p', { class: 'hub-card__count', style: 'font-variant-numeric: tabular-nums;' }, found + '/15'),
        UI.el('p', { class: 'hub-card__status' }, complete ? 'Complete · tap to review' : 'Tap to start'),
      ];
      if (complete) {
        bodyChildren.unshift(UI.el('span', { class: 'hub-card__badge' }, '✓ Complete'));
      }
      const body = UI.el('div', { class: 'hub-card__body' }, bodyChildren);

      const card = UI.el('button', {
        type: 'button',
        class: 'hub-card' + (complete ? ' hub-card--complete' : ''),
        'aria-label': course.name + ', ' + course.dish + ', ' + found + ' of 15 found, ' + (complete ? 'complete, tap to review' : 'tap to start'),
        onClick: function () { engine.selectCourse(course.index); },
      }, [photo, scrim, body]);
      cardsGrid.appendChild(card);
    });

    UI.rovingGrid(cardsGrid, '.hub-card', 2);

    const allTiersBought = state.tierBought.every(function (t) { return t !== -1; });
    const allComplete = completeCount === 4 && allTiersBought;

    const prepReasonText = allComplete
      ? 'All four courses are ready to cook.'
      : 'Finish 4 courses to cook the meal — ' + completeCount + '/4 courses complete, ' +
        state.tierBought.filter(function (t) { return t !== -1; }).length + '/4 ingredient tiers bought.';

    const prepBtn = UI.el('button', {
      type: 'button',
      class: 'btn btn--primary btn--large' + (allComplete ? '' : ' btn--disabled'),
      'aria-disabled': String(!allComplete),
      onClick: function () { if (allComplete) engine.prepareMeal(); },
    }, 'Prepare Meal');

    const footer = UI.el('div', { class: 'hub-footer' }, [
      UI.el('p', { class: 'hub-footer__reason' }, prepReasonText),
      prepBtn,
    ]);

    const screen = UI.el('div', { class: 'screen screen--hub' }, [header, ribbon, cardsGrid, footer]);
    UI.mount(ctx.root, screen);
  }

  // --------------------------------------------------------------------
  // Help sheet — overlay, six paginated topics with dot navigation
  // --------------------------------------------------------------------
  function renderHelpSheet(ctx) {
    const data = ctx.data;
    const engine = ctx.engine;
    const topics = data.help;
    let pageIndex = 0;
    let releaseFocus = null;

    function build() {
      const topic = topics[pageIndex];

      const dots = UI.el('div', { class: 'sheet-dots', role: 'tablist', 'aria-label': 'Help topics' });
      topics.forEach(function (t, i) {
        dots.appendChild(UI.el('button', {
          type: 'button',
          class: 'sheet-dot' + (i === pageIndex ? ' sheet-dot--active' : ''),
          role: 'tab',
          'aria-selected': String(i === pageIndex),
          'aria-label': 'Topic ' + (i + 1) + ' of ' + topics.length + ': ' + t.title,
          onClick: function () { pageIndex = i; refresh(); },
        }, String(i + 1)));
      });

      const body = UI.el('div', { class: 'sheet-body' }, [
        UI.el('h2', { class: 'sheet-title' }, topic.title),
        UI.el('p', { class: 'sheet-text' }, topic.body),
      ]);

      const nav = UI.el('div', { class: 'sheet-nav' }, [
        UI.el('button', {
          type: 'button',
          class: 'btn btn--ghost',
          'aria-disabled': String(pageIndex === 0),
          onClick: function () { if (pageIndex > 0) { pageIndex -= 1; refresh(); } },
        }, 'Back'),
        dots,
        UI.el('button', {
          type: 'button',
          class: 'btn btn--ghost',
          'aria-disabled': String(pageIndex === topics.length - 1),
          onClick: function () { if (pageIndex < topics.length - 1) { pageIndex += 1; refresh(); } },
        }, 'Next'),
      ]);

      const closeBtn = UI.el('button', {
        type: 'button',
        class: 'btn btn--chip sheet-close',
        'aria-label': 'Close help',
        onClick: function () { engine.closeHelp(); },
      }, 'Close');

      return UI.el('div', { class: 'sheet glass', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Help' }, [closeBtn, body, nav]);
    }

    function refresh() {
      if (releaseFocus) releaseFocus();
      UI.clear(ctx.overlayRoot);
      const backdrop = UI.el('button', { type: 'button', class: 'overlay-backdrop', 'aria-label': 'Close help', onClick: function () { engine.closeHelp(); } });
      const sheet = build();
      ctx.overlayRoot.appendChild(backdrop);
      ctx.overlayRoot.appendChild(sheet);
      releaseFocus = UI.trapFocus(sheet);
    }

    refresh();

    return function cleanup() {
      if (releaseFocus) releaseFocus();
    };
  }

  // --------------------------------------------------------------------
  // Pause sheet — overlay, Resume / Help / Leave restaurant
  // --------------------------------------------------------------------
  function renderPauseSheet(ctx) {
    const engine = ctx.engine;

    const backdrop = UI.el('button', { type: 'button', class: 'overlay-backdrop', 'aria-label': 'Resume', onClick: function () { engine.resumeFromPause(); } });

    const sheet = UI.el('div', { class: 'pause-sheet glass', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Pause' }, [
      UI.el('h2', { class: 'pause-sheet__title' }, 'Paused'),
      UI.el('button', { type: 'button', class: 'btn btn--primary', onClick: function () { engine.resumeFromPause(); } }, 'Resume'),
      UI.el('button', { type: 'button', class: 'btn btn--ghost', onClick: function () { engine.tapHelp(); } }, 'Help'),
      UI.el('button', { type: 'button', class: 'btn btn--ghost', onClick: function () { engine.leaveRestaurant(); } }, 'Leave restaurant'),
    ]);

    ctx.overlayRoot.appendChild(backdrop);
    ctx.overlayRoot.appendChild(sheet);
    const release = UI.trapFocus(sheet);

    return function cleanup() {
      release();
    };
  }

  // --------------------------------------------------------------------
  // Placeholder — routes not built in this section
  // --------------------------------------------------------------------
  function renderPlaceholder(ctx, routeName) {
    const engine = ctx.engine;
    // js/engine.js's state model has no activeRestaurantSlot and no generic
    // goto() — every route change is a named, validated transition (section
    // 9). hasSave true means a course hub is already in progress (the only
    // way to reach any unbuilt route in this build), so that is always the
    // sensible landing spot. There is no legal transition-table edge from an
    // unbuilt route straight back to course-hub, so this uses the engine's
    // exposed debug.setState escape hatch rather than inventing a new edge
    // or editing engine.js — this button exists only because later-section
    // routes are stubbed here, not as real gameplay.
    const backTarget = engine.getState().hasSave ? 'courseHub' : 'map';

    const screen = UI.el('div', { class: 'screen screen--placeholder' }, [
      UI.el('p', { class: 'placeholder__eyebrow' }, 'Route: ' + routeName),
      UI.el('h1', { class: 'placeholder__title' }, 'Coming in the next build section'),
      UI.el('p', { class: 'placeholder__body' }, 'This screen (hunt, shop, cooking, plating and verdict) ships in a later build section of CookInQuest. For now, head back to the course hub.'),
      UI.el('button', {
        type: 'button',
        class: 'btn btn--primary btn--large',
        onClick: function () {
          if (engine.debug && typeof engine.debug.setState === 'function') {
            engine.debug.setState({ route: backTarget });
          }
        },
      }, backTarget === 'courseHub' ? 'Back to Course Hub' : 'Back to Restaurant Row'),
    ]);
    UI.mount(ctx.root, screen);
  }

  window.CIQ_SCREENS = {
    title: renderTitle,
    map: renderMap,
    courseHub: renderCourseHub,
    helpSheet: renderHelpSheet,
    pauseSheet: renderPauseSheet,
    placeholder: renderPlaceholder,
  };
})();
