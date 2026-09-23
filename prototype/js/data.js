// CookInQuest prototype — pure content data.
//
// Transcribed from:
//   - FIGMA-MAKE-SPEC-2026.md (primary source: sections 5, 6, 10.1-10.6)
//   - JOURNEY.md, section 6.0 "The restaurant lineup" ONLY (the 9 map slots table)
//
// No framework, no build step. Load with a plain <script src="js/data.js"></script>.
// Everything hangs off one global: window.CIQ_DATA.

const CIQ_DATA = {

  // ---------------------------------------------------------------------
  // META — from FIGMA-MAKE-SPEC-2026.md sections 2, 4, 5
  // ---------------------------------------------------------------------
  meta: {
    // SPEC GAP: FIGMA-MAKE-SPEC-2026.md spells the restaurant "Taj Mahal"
    // (with a space) throughout sections 4, 9 and 10.1 ("Taj Mahal starts
    // unlocked", "tap Taj Mahal", "tap Replay Taj Mahal", the tea brand
    // tier "Taj Mahal, $20"). JOURNEY.md section 6.0, the only section of
    // that file this module is allowed to draw from, spells the same
    // restaurant "TajMahal" (no space) in its map-slot table. The two
    // source documents genuinely disagree on the shipping spelling. This
    // field keeps the FIGMA-MAKE-SPEC-2026.md spelling because that is the
    // primary source and the document actually governing this build;
    // restaurants[0].name below keeps JOURNEY.md's spelling verbatim since
    // it is transcribed straight from the 6.0 table. Do not silently pick
    // one and discard the other.
    restaurant: 'Taj Mahal',
    town: 'KhannaTown',
    startingBudget: 100,          // section 4: budget int = 100
    hintCost: 20,                 // section 5: Hint available only when budget >= 20, budget -= 20
    missPenalty: 2,               // section 5: Wrong tap: budget = max(0, budget - 2)
    missCooldownMs: 1000,         // section 5: "lock scene input for 1 second"
    findBonusPerUnaidedItem: 1,   // section 5: provisional "+$1 Find Bonus" per unaided find
    maxFindBonusPerCourse: 15,    // section 5: findBonus[course] range is $0 to $15
  },

  // ---------------------------------------------------------------------
  // RESTAURANTS — JOURNEY.md section 6.0 "The restaurant lineup" ONLY.
  // Nine map slots, six playable in sequence, three permanently Coming soon.
  // ---------------------------------------------------------------------
  restaurants: [
    { slot: 1, name: 'TajMahal',               cuisine: 'Mughlai, North Indian, Delhi', status: 'playable',   order: 1 },
    { slot: 2, name: 'Chettinad Kitchen',       cuisine: 'Chettinad, Tamil Nadu',        status: 'playable',   order: 2 },
    { slot: 3, name: 'Bengal Ghat',             cuisine: 'Bengali, Kolkata',             status: 'playable',   order: 3 },
    { slot: 4, name: 'Gujarat Thal',            cuisine: 'Gujarati',                     status: 'playable',   order: 4 },
    { slot: 5, name: 'Goa Beach Shack',         cuisine: 'Goan coastal',                 status: 'playable',   order: 5 },
    { slot: 6, name: 'Kashmir Wazwan House',    cuisine: 'Kashmiri',                     status: 'playable',   order: 6 },
    { slot: 7, name: 'Hyderabad House',         cuisine: 'Hyderabadi',                   status: 'comingSoon', order: 7 },
    { slot: 8, name: 'Malabar Coast',           cuisine: 'Keralan',                      status: 'comingSoon', order: 8 },
    { slot: 9, name: 'Rajasthan Haveli',        cuisine: 'Rajasthani',                   status: 'comingSoon', order: 9 },
  ],

  // ---------------------------------------------------------------------
  // COURSES — section 10.1 (ladders) + section 10.2 (the 60 items)
  // ---------------------------------------------------------------------
  courses: [
    {
      id: 'beverage',
      index: 0,
      name: 'Beverage',
      dish: 'Chai Tea',
      sceneId: 'grocery',
      sceneName: 'Grocery',
      keyIngredient: 'Tea',
      ladder: [
        { tier: 0, brand: 'Lipton', price: 0, label: 'Free' },
        { tier: 1, brand: 'TATA', price: 10 },
        { tier: 2, brand: 'Taj Mahal', price: 20 },
        { tier: 3, brand: 'Red Label Marigold', price: 45 },
      ],
      items: [
        { id: 'bev-milk', name: 'Milk', isFact: true },
        { id: 'bev-sugar', name: 'Sugar', isFact: false },
        { id: 'bev-black-tea-leaves', name: 'Black Tea Leaves', isFact: true },
        { id: 'bev-fresh-ginger', name: 'Fresh Ginger', isFact: true },
        { id: 'bev-green-cardamom-pods', name: 'Green Cardamom Pods', isFact: true },
        { id: 'bev-cinnamon-sticks', name: 'Cinnamon Sticks', isFact: false },
        { id: 'bev-whole-cloves', name: 'Whole Cloves', isFact: false },
        { id: 'bev-black-peppercorns', name: 'Black Peppercorns', isFact: false },
        { id: 'bev-fennel-seeds', name: 'Fennel Seeds', isFact: false },
        { id: 'bev-star-anise', name: 'Star Anise', isFact: false },
        { id: 'bev-nutmeg', name: 'Nutmeg', isFact: false },
        { id: 'bev-tulsi-leaves', name: 'Tulsi Leaves', isFact: true },
        { id: 'bev-saffron-threads', name: 'Saffron Threads', isFact: false },
        { id: 'bev-honey-jar', name: 'Honey Jar', isFact: false },
        { id: 'bev-tea-strainer', name: 'Tea Strainer', isFact: false },
      ],
    },
    {
      id: 'appetizer',
      index: 1,
      name: 'Appetizer',
      dish: 'Pakoda',
      sceneId: 'produce-market',
      sceneName: 'Produce Market',
      keyIngredient: 'Gram flour',
      ladder: [
        { tier: 0, brand: 'Generic', price: 0, label: 'Free' },
        { tier: 1, brand: 'MTR', price: 19 },
        { tier: 2, brand: 'Swad', price: 22 },
        { tier: 3, brand: 'Fresh Ground', price: 35 },
      ],
      items: [
        { id: 'app-cooking-oil', name: 'Cooking Oil', isFact: false },
        { id: 'app-bell-peppers', name: 'Bell Peppers', isFact: true },
        { id: 'app-gram-flour-besan', name: 'Gram Flour (Besan)', isFact: true },
        { id: 'app-potato', name: 'Potato', isFact: false },
        { id: 'app-red-onion', name: 'Red Onion', isFact: false },
        { id: 'app-spinach', name: 'Spinach', isFact: false },
        { id: 'app-eggplant', name: 'Eggplant', isFact: false },
        { id: 'app-cauliflower', name: 'Cauliflower', isFact: false },
        { id: 'app-green-chilies', name: 'Green Chilies', isFact: true },
        { id: 'app-fresh-coriander', name: 'Fresh Coriander', isFact: true },
        { id: 'app-ginger', name: 'Ginger', isFact: false },
        { id: 'app-garlic', name: 'Garlic', isFact: false },
        { id: 'app-turmeric-tin', name: 'Turmeric Tin', isFact: true },
        { id: 'app-cumin-seeds', name: 'Cumin Seeds', isFact: false },
        { id: 'app-salt-shaker', name: 'Salt Shaker', isFact: false },
      ],
    },
    {
      id: 'entree',
      index: 2,
      name: 'Entree',
      dish: 'Thaali',
      sceneId: 'dinner-table',
      sceneName: 'Dinner Table',
      keyIngredient: 'Rice and wheat',
      ladder: [
        { tier: 0, brand: 'Generic', price: 0, label: 'Free' },
        { tier: 1, brand: 'Great Value', price: 25 },
        { tier: 2, brand: 'Tilda', price: 40 },
        { tier: 3, brand: 'Dawat', price: 65 },
      ],
      items: [
        { id: 'ent-spices-spice-box', name: 'Spices (Spice Box)', isFact: true },
        { id: 'ent-vegetables-basket', name: 'Vegetables (Basket)', isFact: true },
        { id: 'ent-basmati-rice', name: 'Basmati Rice', isFact: true },
        { id: 'ent-wheat-flour', name: 'Wheat Flour', isFact: true },
        { id: 'ent-lentils', name: 'Lentils', isFact: true },
        { id: 'ent-chickpeas', name: 'Chickpeas', isFact: false },
        { id: 'ent-potato', name: 'Potato', isFact: false },
        { id: 'ent-tomato', name: 'Tomato', isFact: false },
        { id: 'ent-onion', name: 'Onion', isFact: false },
        { id: 'ent-spinach', name: 'Spinach', isFact: false },
        { id: 'ent-cauliflower', name: 'Cauliflower', isFact: false },
        { id: 'ent-carrot', name: 'Carrot', isFact: false },
        { id: 'ent-green-peas', name: 'Green Peas', isFact: false },
        { id: 'ent-yogurt-bowl', name: 'Yogurt Bowl', isFact: false },
        { id: 'ent-ghee-jar', name: 'Ghee Jar', isFact: false },
      ],
    },
    {
      id: 'dessert',
      index: 3,
      name: 'Dessert',
      dish: 'Gulab Jamun',
      sceneId: 'bakery',
      sceneName: 'Bakery',
      keyIngredient: 'Semolina',
      ladder: [
        { tier: 0, brand: 'Generic', price: 0, label: 'Free' },
        { tier: 1, brand: 'Uncut', price: 6 },
        { tier: 2, brand: 'Semi Roasted', price: 12 },
        { tier: 3, brand: 'Roasted fine', price: 22 },
      ],
      items: [
        { id: 'des-rose-water', name: 'Rose Water', isFact: true },
        { id: 'des-semolina', name: 'Semolina', isFact: true },
        { id: 'des-milk-powder', name: 'Milk Powder', isFact: true },
        { id: 'des-all-purpose-flour', name: 'All-Purpose Flour', isFact: false },
        { id: 'des-baking-powder', name: 'Baking Powder', isFact: false },
        { id: 'des-sugar', name: 'Sugar', isFact: false },
        { id: 'des-ghee', name: 'Ghee', isFact: false },
        { id: 'des-green-cardamom-pods', name: 'Green Cardamom Pods', isFact: false },
        { id: 'des-saffron-threads', name: 'Saffron Threads', isFact: true },
        { id: 'des-pistachios', name: 'Pistachios', isFact: false },
        { id: 'des-almonds', name: 'Almonds', isFact: false },
        { id: 'des-dried-rose-petals', name: 'Dried Rose Petals', isFact: false },
        { id: 'des-sugar-syrup-jug', name: 'Sugar Syrup Jug', isFact: false },
        { id: 'des-khoya-milk-solids', name: 'Khoya (Milk Solids)', isFact: true },
        { id: 'des-lemon', name: 'Lemon', isFact: false },
      ],
    },
  ],

  // ---------------------------------------------------------------------
  // FACTS — section 10.3, verbatim. Only the 20 fact items have entries.
  // ---------------------------------------------------------------------
  facts: {
    'bev-milk': {
      title: 'Milk',
      body: "Simmered with tea, sugar and spices, milk gives this house chai its body and softens the tea's bitterness.",
    },
    'bev-black-tea-leaves': {
      title: 'Black Tea Leaves',
      body: 'Strong black tea holds its flavour after milk and spices are added, which is why it anchors this chai.',
    },
    'bev-fresh-ginger': {
      title: 'Fresh Ginger',
      body: 'Sliced or crushed ginger releases bright aroma and warming heat as it simmers.',
    },
    'bev-green-cardamom-pods': {
      title: 'Green Cardamom Pods',
      body: 'Whole pods are lightly crushed, simmered, then strained out before serving.',
    },
    'bev-tulsi-leaves': {
      title: 'Tulsi Leaves',
      body: "Tulsi, also called holy basil, adds a fresh herbal note to this restaurant's house chai.",
    },
    'app-bell-peppers': {
      title: 'Bell Peppers',
      body: "Their sweetness and colour balance the chilli and spices in this restaurant's mixed-vegetable pakoda.",
    },
    'app-gram-flour-besan': {
      title: 'Gram Flour (Besan)',
      body: "Milled from chickpeas, besan binds the vegetables and fries into the pakoda's crisp coating.",
    },
    'app-green-chilies': {
      title: 'Green Chilies',
      body: 'A small amount adds fresh heat; the quantity can change to suit the cook and the diner.',
    },
    'app-fresh-coriander': {
      title: 'Fresh Coriander',
      body: 'Chopped leaves add a bright herbal finish to the batter and the plated pakoda.',
    },
    'app-turmeric-tin': {
      title: 'Turmeric Tin',
      body: 'A pinch seasons the batter and adds its warm golden colour.',
    },
    'ent-spices-spice-box': {
      title: 'Spices (Spice Box)',
      body: 'A masala dabba keeps frequently used spices together in small inner containers beside the stove.',
    },
    'ent-vegetables-basket': {
      title: 'Vegetables (Basket)',
      body: 'A thaali is a meal format, so its vegetable dishes vary by region, season and household.',
    },
    'ent-basmati-rice': {
      title: 'Basmati Rice',
      body: 'Its long grains and aroma make it a distinct rice choice for the meal, not a generic side.',
    },
    'ent-wheat-flour': {
      title: 'Wheat Flour',
      body: "Whole-wheat atta becomes the dough for the thaali's rotis.",
    },
    'ent-lentils': {
      title: 'Lentils',
      body: 'Cooked lentils become dal, one of the components that makes a thaali feel complete and sustaining.',
    },
    'des-rose-water': {
      title: 'Rose Water',
      body: 'A few drops perfume the sugar syrup, so the floral note is absorbed after frying.',
    },
    'des-semolina': {
      title: 'Semolina',
      body: 'This Taj Mahal house recipe uses semolina in the dough; gulab jamun recipes vary and do not all use it.',
    },
    'des-milk-powder': {
      title: 'Milk Powder',
      body: 'It enriches the milk-solid base and helps the house dough stay soft.',
    },
    'des-saffron-threads': {
      title: 'Saffron Threads',
      body: 'Here the same spice from the chai course perfumes and colours the dessert syrup.',
    },
    'des-khoya-milk-solids': {
      title: 'Khoya (Milk Solids)',
      body: 'Milk is slowly reduced to concentrated solids, forming the traditional base of many gulab jamun doughs.',
    },
  },

  // ---------------------------------------------------------------------
  // COOKING — section 10.4: five station responsibilities, the fryer's
  // three ordered batches, the roti substages, bundles, dependencies
  // and outputs.
  // ---------------------------------------------------------------------
  cooking: {
    // SPEC GAP: section 10.4 describes each bundle's contents as prose
    // ingredient names (sometimes shortened, e.g. "Spices" for the entree
    // item "Spices (Spice Box)", "Ghee" for "Ghee Jar", "Saffron" for
    // "Saffron Threads"). It never states an explicit ingredient-name to
    // item-ID mapping, and several names collide across courses (Sugar
    // appears in both beverage and dessert; Green Cardamom Pods appears in
    // both beverage and dessert). Rather than guess which course-scoped
    // item ID each bundle entry resolves to, the ingredient lists below
    // are transcribed as the literal strings from the spec. A future
    // implementation wiring bundles to found items must resolve this
    // mapping deliberately (likely by course context, since every bundle
    // here only draws from its own course's 15-item list), not invent it
    // silently in data.
    stations: [
      {
        id: 'boiler',
        name: 'Boiler',
        load: 'Milk + Sugar + purchased Tea + Chai Spice Bundle; finish with Tea Strainer',
        output: 'Chai',
      },
      {
        id: 'fryer',
        name: 'Fryer',
        // section 5: "resolve three batches in order, pakoda, thaali vegetables,
        // then gulab jamun balls." section 4: fryerBatchIndex 0 pakoda, 1
        // vegetables, 2 gulab jamun. "The next batch cannot load until the
        // previous one resolves."
        batches: [
          { index: 0, id: 'pakoda', load: 'Pakoda Batter + Pakoda Vegetables + Cooking Oil', output: 'Pakoda' },
          { index: 1, id: 'vegetables', load: 'Thaali Vegetable Base', output: 'Cooked vegetables' },
          { index: 2, id: 'gulabJamun', load: 'Gulab Jamun Dough formed into balls', output: 'Fried gulab jamun balls' },
        ],
        scoring: "The fryer's three batch outcomes are averaged and rounded to the nearest integer for its one 0-to-2 station score.",
      },
      {
        id: 'roti',
        name: 'Roti maker + pan',
        load: 'Purchased Wheat allocation + Ghee; dough to maker to pan',
        // section 4: rotiStage enum = ingredients, dough, rotiMaker, pan, resolved
        // section 5: "Each substage is visible; do not collapse it into one automatic animation."
        stages: ['ingredients', 'dough', 'rotiMaker', 'pan', 'resolved'],
        output: 'Rotis',
      },
      {
        id: 'steamer',
        name: 'Steamer / rice cooker',
        load: 'Purchased Rice allocation + selected spices',
        output: 'Rice',
      },
      {
        id: 'saucepan',
        name: 'Saucepan',
        load: 'Fried balls from fryer + Gulab Jamun Syrup; station slotted spoon transfers them',
        output: 'Gulab jamun',
      },
    ],

    bundles: {
      chaiSpiceBundle: {
        name: 'Chai Spice Bundle',
        items: [
          'Fresh Ginger', 'Green Cardamom Pods', 'Cinnamon Sticks', 'Whole Cloves',
          'Black Peppercorns', 'Fennel Seeds', 'Star Anise', 'Nutmeg',
          'Tulsi Leaves', 'Saffron Threads',
        ],
        note: 'Honey Jar belongs to the Chai liquid group.',
      },
      pakodaBatter: {
        name: 'Pakoda Batter',
        items: ['purchased Gram Flour tier', 'Turmeric', 'Cumin', 'Salt', 'Ginger', 'Garlic'],
      },
      pakodaVegetables: {
        name: 'Pakoda Vegetables',
        items: [
          'Bell Peppers', 'Potato', 'Red Onion', 'Spinach', 'Eggplant',
          'Cauliflower', 'Green Chilies', 'Fresh Coriander',
        ],
      },
      thaaliVegetableBase: {
        name: 'Thaali Vegetable Base',
        items: [
          'Spices', 'Vegetables', 'Lentils', 'Chickpeas', 'Potato', 'Tomato',
          'Onion', 'Spinach', 'Cauliflower', 'Carrot', 'Green Peas', 'Yogurt', 'Ghee',
        ],
      },
      gulabJamunDough: {
        name: 'Gulab Jamun Dough',
        items: [
          'Khoya', 'purchased Semolina', 'saved Gram Flour allocation', 'Milk Powder',
          'All-Purpose Flour', 'Baking Powder', 'Sugar', 'Ghee', 'Green Cardamom',
        ],
        note: 'The player creates the dough balls here; they are never pre-found objects.',
      },
      gulabJamunSyrup: {
        name: 'Gulab Jamun Syrup',
        items: ['Rose Water', 'Sugar Syrup Jug', 'Saffron', 'Dried Rose Petals', 'Lemon'],
        note: 'Pistachios and Almonds are plating garnish.',
      },
    },

    purchasedAllocations: {
      riceAndWheat: 'Purchased Rice and Wheat tier splits into one rice allocation and one wheat allocation; it is paid for once.',
    },
  },

  // ---------------------------------------------------------------------
  // PLATING — section 5: six named plate slots.
  // ---------------------------------------------------------------------
  plating: {
    slots: ['Chai', 'Pakoda', 'Vegetables', 'Rotis', 'Rice', 'Gulab Jamun'],
    note: 'Vegetables, rotis and rice combine as the one thaali entree.',
  },

  // ---------------------------------------------------------------------
  // SCORING — section 5: verdict scoring rubric and star bands.
  // ---------------------------------------------------------------------
  scoring: {
    ingredientMax: 12, // sum of tierBought[0..3], each 0-3, four courses
    cookMax: 10,        // 5 stations x max 2 each
    totalMax: 22,
    starBands: [
      { min: 20, max: 22, stars: 5 },
      { min: 16, max: 19, stars: 4 },
      { min: 11, max: 15, stars: 3 },
      { min: 6, max: 10, stars: 2 },
      { min: 0, max: 5, stars: 1 },
    ],
  },

  // ---------------------------------------------------------------------
  // REVIEWS — section 10.5, verbatim. 5-star is RECOVERED (typos
  // corrected); 4/3/2/1-star are NEW, written in the same voice.
  // ---------------------------------------------------------------------
  reviews: {
    5: "This meal was a masterpiece! It was exactly what you want from a great Indian restaurant. Right from the start, I could tell this meal was prepared with the finest and freshest ingredients available. Everything was cooked to perfection, and the chai tea especially was prepared beautifully. The presentation was polished and professional. What a wonderful culinary experience.\nThis chef has a bright future ahead, both for this contest and beyond! Jump into the next adventure and explore more skills. Good luck!",
    4: "This was a very good meal, and I left happy. The kitchen clearly knows what it is doing. The seasoning was confident, and most of the plate arrived exactly as it should. A few things were held a moment too long on the heat, and one or two ingredients felt like a small economy rather than a choice. Nothing here was wrong. It simply was not yet perfect. Tighten the heat control, spend where it shows, and this becomes a five star kitchen. I would happily book the table again.",
    3: "A solid, honest meal. Nothing on this table embarrassed itself, and nothing on it surprised me either. The cooking was competent but uneven, some of it right on the mark and some of it a little past it, and the shopping showed: several ingredients were the safe, cheap version of themselves. There is a real cook back there, I can taste it. Spend a little more on what goes into the pan, watch the heat more closely, and this kitchen has somewhere to go. I would like to see the next attempt.",
    2: "I wanted to like this more than I did. The idea of the meal was right, but the execution kept getting in its own way. Dishes arrived either underdone or pushed well past their moment, and the ingredients had clearly been chosen for the price tag rather than for the plate. There were flashes, a moment in the entree where you could see exactly what was intended. Those flashes are the reason to come back. Slow down, buy better, cook to the middle of the gauge, and the next visit could be to a different restaurant entirely.",
    1: "I will be blunt, because the chef deserves honesty. This meal was not ready to be served. The ingredients were the cheapest on the shelf and tasted like it, and almost nothing left the heat at the right moment. The kitchen lost control of the gauges, and the plate showed it. I am not writing this to be cruel.\nEvery chef I admire has cooked a meal like this one, once, and learned more from it than from any success. Go back, take your time, and buy the good tea. I will be waiting for the second attempt.",
  },

  // ---------------------------------------------------------------------
  // HELP — section 10.6: six paginated topics, verbatim title/body split.
  // ---------------------------------------------------------------------
  help: [
    { title: 'The Challenge', body: "Restaurant Row's Chef's Challenge, KhannaTown, the goal." },
    { title: 'Finding items', body: 'How taps, misses and hints work.' },
    { title: 'The budget', body: 'One shared $100 pool across all four courses.' },
    { title: 'Choosing ingredients', body: 'The four tier ladder, and why the best of everything is not always affordable.' },
    { title: 'Cooking', body: 'Bundles, station dependencies, labelled doneness ranges, Start and Finish.' },
    { title: 'Accessibility', body: 'Pinch to zoom, scene contrast, VoiceOver spatial search, and full input parity across touch, Apple Pencil, pointer, keyboard, controller, VoiceOver and Switch Control.' },
  ],
};

// Premium tier sum check (section 6, ECONOMY CHECK table): 45 + 35 + 65 + 22 = 167.
// See the verification command in the task brief for a runtime assertion of this.

Object.freeze(CIQ_DATA);

window.CIQ_DATA = CIQ_DATA;
