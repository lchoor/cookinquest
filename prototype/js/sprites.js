// CookInQuest prototype — findable-object sprite art, pure data.
//
// Authored SVG objects composited into the photographic hunt scenes (see
// DIRECTION.md section 2). Every sprite is warmly lit from the upper left,
// with a soft internal form shadow plus a separate soft contact shadow so it
// reads as sitting ON a shelf/counter rather than floating on the photo.
//
// Item keys match js/data.js courses[0] (id: 'beverage') items[].id EXACTLY.
//
// No framework, no build step. Load with a plain <script src="js/sprites.js"></script>
// AFTER data.js. Everything hangs off one global: window.CIQ_SPRITES.

const CIQ_SPRITES = {

  // =========================================================================
  // bev-milk — Indian grocery milk sachet (plastic pillow-pack), not a
  // Western carton. Pale frosted plastic, heat-sealed top/bottom, printed
  // blue label band.
  // =========================================================================
  'bev-milk': {
    label: 'Milk',
    w: 110, h: 140,
    svg: '<svg viewBox="0 0 110 140" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="g-milk-body" x1="18" y1="8" x2="96" y2="132" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#FBFEFF"/><stop offset="0.42" stop-color="#DCEBF6"/><stop offset="1" stop-color="#9FBCCF"/>' +
      '</linearGradient>' +
      '<linearGradient id="g-milk-seal" x1="18" y1="6" x2="92" y2="24" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#F5FAFC"/><stop offset="1" stop-color="#C7D9E3"/>' +
      '</linearGradient>' +
      '<linearGradient id="g-milk-label" x1="15" y1="52" x2="95" y2="92" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#3A72B0"/><stop offset="1" stop-color="#123A6E"/>' +
      '</linearGradient>' +
      '<radialGradient id="g-milk-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.45"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="55" cy="133" rx="35" ry="7" fill="url(#g-milk-shadow)"/>' +
      '<path d="M21,18 C15,18 14,34 15,68 C14,103 15,124 21,124 L89,124 C95,124 96,103 95,68 C96,34 95,18 89,18 Z" fill="url(#g-milk-body)" stroke="#87A6BA" stroke-width="0.7"/>' +
      '<path d="M19,9 C19,6.5 21,5 25,5 L85,5 C89,5 91,6.5 91,9 L91,19 C91,21.3 89,22.5 85,22.5 L25,22.5 C21,22.5 19,21.3 19,19 Z" fill="url(#g-milk-seal)" stroke="#AFC5D2" stroke-width="0.6"/>' +
      '<path d="M22,10 L24,14 M30,9 L32,14 M38,9 L40,14 M46,9 L48,14 M54,9 L56,14 M62,9 L64,14 M70,9 L72,14 M78,9 L80,14 M86,9 L88,14" stroke="#9FB7C6" stroke-width="0.6" opacity="0.6"/>' +
      '<path d="M20,122 C20,126.5 21.5,130 25,130 L85,130 C88.5,130 90,126.5 90,122 Z" fill="url(#g-milk-seal)" stroke="#AFC5D2" stroke-width="0.6"/>' +
      '<rect x="15" y="52" width="80" height="38" rx="3" fill="url(#g-milk-label)"/>' +
      '<path d="M15,60 L95,60" stroke="#FBF5E9" stroke-width="1" opacity="0.5"/>' +
      '<path d="M15,82 L95,82" stroke="#0B2444" stroke-width="1" opacity="0.4"/>' +
      '<text x="55" y="78" font-family="Georgia, \'Iowan Old Style\', serif" font-style="italic" font-weight="700" font-size="21" fill="#FBF5E9" text-anchor="middle">milk</text>' +
      '<path d="M22,66 C31,64 31,86 22,88" fill="none" stroke="#E5533B" stroke-width="2.2" opacity="0.9" stroke-linecap="round"/>' +
      '<path d="M78,66 C87,64 88,80 84,86" fill="none" stroke="#F5A623" stroke-width="1.6" opacity="0.7" stroke-linecap="round"/>' +
      '<path d="M26,24 C25,50 25,95 28,120" stroke="#FFFFFF" stroke-width="6" opacity="0.32" fill="none" stroke-linecap="round"/>' +
      '<path d="M83,30 C84,55 84,90 82,116" stroke="#0B2A44" stroke-width="3" opacity="0.12" fill="none" stroke-linecap="round"/>' +
      '</svg>'
  },

  // =========================================================================
  // bev-sugar — translucent poly bag of white sugar, twist-tied top, visible
  // crystal sparkle through the plastic.
  // =========================================================================
  'bev-sugar': {
    label: 'Sugar',
    w: 100, h: 122,
    svg: '<svg viewBox="0 0 100 122" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="g-sugar-body" x1="14" y1="28" x2="88" y2="114" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#FFFFFF"/><stop offset="0.5" stop-color="#F1ECDD"/><stop offset="1" stop-color="#CBC0A0"/>' +
      '</linearGradient>' +
      '<linearGradient id="g-sugar-twist" x1="40" y1="6" x2="60" y2="30" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#F3ECD8"/><stop offset="1" stop-color="#C6B98F"/>' +
      '</linearGradient>' +
      '<radialGradient id="g-sugar-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.42"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="50" cy="116" rx="32" ry="6.5" fill="url(#g-sugar-shadow)"/>' +
      '<path d="M42,8 L58,8 L54,26 L46,26 Z" fill="url(#g-sugar-twist)" stroke="#B0A279" stroke-width="0.6"/>' +
      '<path d="M19,30 C16,30 15,42 16,56 L14,100 C14,109 21,113 30,113 L70,113 C79,113 86,109 86,100 L84,56 C85,42 84,30 81,30 Z" fill="url(#g-sugar-body)" stroke="#B3A67F" stroke-width="0.7"/>' +
      '<path d="M24,36 C22,55 22,90 26,108 M76,36 C78,55 78,90 74,108" stroke="#D8CDA9" stroke-width="0.6" opacity="0.5" fill="none"/>' +
      '<g fill="#FFFFFF" opacity="0.95">' +
      '<circle cx="30" cy="50" r="1.3"/><circle cx="40" cy="60" r="1.1"/><circle cx="55" cy="48" r="1.4"/><circle cx="62" cy="66" r="1.2"/>' +
      '<circle cx="34" cy="78" r="1.3"/><circle cx="50" cy="86" r="1.1"/><circle cx="66" cy="90" r="1.3"/><circle cx="44" cy="98" r="1.2"/>' +
      '<circle cx="58" cy="102" r="1.1"/><circle cx="26" cy="94" r="1.1"/>' +
      '</g>' +
      '<g fill="#8C8064" opacity="0.35">' +
      '<circle cx="36" cy="54" r="0.9"/><circle cx="48" cy="70" r="0.8"/><circle cx="60" cy="80" r="0.9"/><circle cx="30" cy="86" r="0.8"/>' +
      '</g>' +
      '<rect x="30" y="66" width="40" height="18" rx="2" fill="#FBF5E9" opacity="0.88" transform="rotate(-3 50 75)"/>' +
      '<text x="50" y="78" font-family="Instrument Sans, sans-serif" font-weight="700" font-size="9" fill="#2A1A12" text-anchor="middle" transform="rotate(-3 50 75)" letter-spacing="1">SUGAR</text>' +
      '<path d="M22,32 C21,55 21,90 24,108" stroke="#FFFFFF" stroke-width="5" opacity="0.28" fill="none" stroke-linecap="round"/>' +
      '</svg>'
  },

  // =========================================================================
  // bev-black-tea-leaves — kraft paper pouch, fold-top, cut clear window
  // showing loose black tea leaves.
  // =========================================================================
  'bev-black-tea-leaves': {
    label: 'Black Tea Leaves',
    w: 95, h: 114,
    svg: '<svg viewBox="0 0 95 114" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="g-tea-body" x1="12" y1="18" x2="84" y2="108" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#C79A5E"/><stop offset="0.5" stop-color="#A87740"/><stop offset="1" stop-color="#7A5327"/>' +
      '</linearGradient>' +
      '<linearGradient id="g-tea-flap" x1="12" y1="4" x2="84" y2="24" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#D3AA6C"/><stop offset="1" stop-color="#9C7038"/>' +
      '</linearGradient>' +
      '<radialGradient id="g-tea-window" cx="0.5" cy="0.4" r="0.6">' +
      '<stop offset="0" stop-color="#EFE6D2"/><stop offset="1" stop-color="#D8CBA9"/>' +
      '</radialGradient>' +
      '<radialGradient id="g-tea-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.45"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="47" cy="108" rx="32" ry="6.5" fill="url(#g-tea-shadow)"/>' +
      '<path d="M16,22 C13,22 12,32 13,50 L12,92 C12,102 20,106 30,106 L64,106 C74,106 82,102 82,92 L81,50 C82,32 81,22 78,22 Z" fill="url(#g-tea-body)" stroke="#5F4020" stroke-width="0.7"/>' +
      '<path d="M14,10 L80,10 L74,24 L20,24 Z" fill="url(#g-tea-flap)" stroke="#6B4B24" stroke-width="0.6"/>' +
      '<path d="M20,24 L74,24" stroke="#5F4020" stroke-width="1" opacity="0.5"/>' +
      '<ellipse cx="47" cy="60" rx="24" ry="26" fill="url(#g-tea-window)" stroke="#8B6E44" stroke-width="1.2"/>' +
      '<g fill="#241812">' +
      '<path d="M36,48 l6,3 -2,4 -5,-3 Z"/><path d="M50,44 l7,2 -1,5 -6,-2 Z"/><path d="M42,58 l7,1 -1,5 -6,-1 Z"/>' +
      '<path d="M32,62 l6,2 -1,5 -6,-2 Z"/><path d="M55,60 l6,3 -2,4 -5,-3 Z"/><path d="M46,70 l6,2 -2,5 -5,-2 Z"/>' +
      '<path d="M38,74 l6,1 -1,5 -6,-1 Z"/><path d="M58,50 l5,3 -2,4 -4,-3 Z"/>' +
      '</g>' +
      '<g fill="#4A3420" opacity="0.7">' +
      '<path d="M40,52 l4,2 -1,3 -3,-2 Z"/><path d="M48,66 l4,2 -1,3 -3,-2 Z"/><path d="M35,68 l4,1 -1,3 -3,-1 Z"/>' +
      '</g>' +
      '<path d="M20,26 C18,48 18,88 22,102" stroke="#EAD2A0" stroke-width="4" opacity="0.25" fill="none" stroke-linecap="round"/>' +
      '</svg>'
  },

  // =========================================================================
  // bev-fresh-ginger — knobby rhizome, tan skin, pinkish buds.
  // =========================================================================
  'bev-fresh-ginger': {
    label: 'Fresh Ginger',
    w: 120, h: 70,
    svg: '<svg viewBox="0 0 120 70" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="g-ginger-body" x1="10" y1="8" x2="106" y2="58" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#E8D2A6"/><stop offset="0.45" stop-color="#CDA872"/><stop offset="1" stop-color="#93672F"/>' +
      '</linearGradient>' +
      '<radialGradient id="g-ginger-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.42"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="60" cy="63" rx="42" ry="7" fill="url(#g-ginger-shadow)"/>' +
      '<path d="M18,40 C12,32 14,20 24,16 C28,8 40,6 46,14 C54,6 66,8 70,18 C80,12 94,16 96,28 C106,26 112,36 106,44 C110,52 100,58 92,54 C86,60 74,58 70,50 C62,58 48,56 44,46 C34,52 22,48 20,38 Z" fill="url(#g-ginger-body)" stroke="#7A5423" stroke-width="0.8"/>' +
      '<ellipse cx="30" cy="24" rx="7" ry="5" fill="#E7B9A6" opacity="0.55"/>' +
      '<ellipse cx="100" cy="32" rx="6" ry="4" fill="#E7B9A6" opacity="0.5"/>' +
      '<path d="M22,34 C30,30 40,32 46,26 M52,20 C60,18 66,24 74,20 M78,26 C86,22 94,26 100,30 M40,42 C48,46 58,42 64,46" stroke="#8A6633" stroke-width="0.9" opacity="0.5" fill="none"/>' +
      '<path d="M24,20 C30,14 40,12 46,16" stroke="#F2E2BE" stroke-width="2.4" opacity="0.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M56,44 C64,50 76,50 84,44" stroke="#5C3F1B" stroke-width="1.4" opacity="0.28" fill="none" stroke-linecap="round"/>' +
      '<g stroke="#B99356" stroke-width="0.6" opacity="0.6">' +
      '<path d="M18,42 C14,46 12,50 14,54"/><path d="M96,46 C100,50 100,54 96,56"/>' +
      '</g>' +
      '</svg>'
  },

  // =========================================================================
  // bev-green-cardamom-pods — cluster of pale green ribbed pods.
  // =========================================================================
  'bev-green-cardamom-pods': {
    label: 'Green Cardamom Pods',
    w: 90, h: 62,
    svg: '<svg viewBox="0 0 90 62" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="g-card-pod" x1="0" y1="0" x2="14" y2="20" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#DDE9B8"/><stop offset="0.5" stop-color="#B9CE7C"/><stop offset="1" stop-color="#7E9A4A"/>' +
      '</linearGradient>' +
      '<radialGradient id="g-card-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.4"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="45" cy="55" rx="34" ry="6" fill="url(#g-card-shadow)"/>' +
      '<g stroke="#5F7538" stroke-width="0.5">' +
      '<g transform="translate(14,30) rotate(-18)"><ellipse cx="0" cy="0" rx="8" ry="13" fill="url(#g-card-pod)"/><path d="M0,-11 L0,11 M-4,-9 L-4,9 M4,-9 L4,9" stroke="#6B8340" stroke-width="0.5" opacity="0.6"/></g>' +
      '<g transform="translate(28,20) rotate(8)"><ellipse cx="0" cy="0" rx="8.5" ry="13.5" fill="url(#g-card-pod)"/><path d="M0,-11 L0,11 M-4,-9 L-4,9 M4,-9 L4,9" stroke="#6B8340" stroke-width="0.5" opacity="0.6"/></g>' +
      '<g transform="translate(45,32) rotate(-6)"><ellipse cx="0" cy="0" rx="9" ry="14" fill="url(#g-card-pod)"/><path d="M0,-12 L0,12 M-4.5,-10 L-4.5,10 M4.5,-10 L4.5,10" stroke="#6B8340" stroke-width="0.5" opacity="0.6"/></g>' +
      '<g transform="translate(60,18) rotate(20)"><ellipse cx="0" cy="0" rx="8" ry="13" fill="url(#g-card-pod)"/><path d="M0,-11 L0,11 M-4,-9 L-4,9 M4,-9 L4,9" stroke="#6B8340" stroke-width="0.5" opacity="0.6"/></g>' +
      '<g transform="translate(72,34) rotate(-14)"><ellipse cx="0" cy="0" rx="7.5" ry="12" fill="url(#g-card-pod)"/><path d="M0,-10 L0,10 M-3.5,-8 L-3.5,8 M3.5,-8 L3.5,8" stroke="#6B8340" stroke-width="0.5" opacity="0.6"/></g>' +
      '</g>' +
      '<ellipse cx="41" cy="26" rx="3" ry="4.5" fill="#F1F7DD" opacity="0.55"/>' +
      '<ellipse cx="24" cy="16" rx="2.4" ry="3.6" fill="#F1F7DD" opacity="0.5"/>' +
      '</svg>'
  },

  // =========================================================================
  // bev-cinnamon-sticks — two rolled quills tied with jute twine.
  // =========================================================================
  'bev-cinnamon-sticks': {
    label: 'Cinnamon Sticks',
    w: 105, h: 46,
    svg: '<svg viewBox="0 0 105 46" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="g-cin-body" x1="0" y1="0" x2="0" y2="18" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#C58A55"/><stop offset="0.5" stop-color="#9C6234"/><stop offset="1" stop-color="#6E4020"/>' +
      '</linearGradient>' +
      '<radialGradient id="g-cin-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.4"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="52" cy="40" rx="40" ry="5.5" fill="url(#g-cin-shadow)"/>' +
      '<g transform="translate(6,10) rotate(-6)">' +
      '<rect x="0" y="0" width="88" height="16" rx="8" fill="url(#g-cin-body)" stroke="#502D14" stroke-width="0.6"/>' +
      '<ellipse cx="4" cy="8" rx="3.4" ry="7.6" fill="#D9AE7C" stroke="#6E4020" stroke-width="0.5"/>' +
      '<ellipse cx="4" cy="8" rx="1.6" ry="4.4" fill="#7A5027"/>' +
      '<ellipse cx="84" cy="8" rx="3.4" ry="7.6" fill="#B8845A" stroke="#502D14" stroke-width="0.5"/>' +
      '<path d="M10,3 C30,6 55,2 82,4 M8,13 C32,10 58,14 80,12" stroke="#6E4020" stroke-width="0.6" opacity="0.5" fill="none"/>' +
      '<path d="M6,2 C30,1 60,1 84,2" stroke="#E7C39A" stroke-width="1.6" opacity="0.5" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      '<g transform="translate(20,22) rotate(4)">' +
      '<rect x="0" y="0" width="76" height="13" rx="6.5" fill="url(#g-cin-body)" stroke="#502D14" stroke-width="0.6"/>' +
      '<ellipse cx="3.5" cy="6.5" rx="2.8" ry="6.2" fill="#D9AE7C" stroke="#6E4020" stroke-width="0.5"/>' +
      '<ellipse cx="72.5" cy="6.5" rx="2.8" ry="6.2" fill="#B8845A" stroke="#502D14" stroke-width="0.5"/>' +
      '<path d="M8,2.5 C26,4.5 48,1.5 70,3" stroke="#6E4020" stroke-width="0.5" opacity="0.5" fill="none"/>' +
      '</g>' +
      '<path d="M46,14 C48,10 50,10 52,14 C54,18 56,28 54,32" stroke="#8A6A2E" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      '<path d="M46,14 C44,18 44,26 48,30" stroke="#6B5220" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.8"/>' +
      '</svg>'
  },

  // =========================================================================
  // bev-whole-cloves — small pile of nail-shaped clove buds.
  // =========================================================================
  'bev-whole-cloves': {
    label: 'Whole Cloves',
    w: 78, h: 62,
    svg: '<svg viewBox="0 0 78 62" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="g-clove-body" x1="0" y1="0" x2="4" y2="14" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#8A5A38"/><stop offset="1" stop-color="#3F2413"/>' +
      '</linearGradient>' +
      '<radialGradient id="g-clove-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.42"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="39" cy="56" rx="30" ry="5.5" fill="url(#g-clove-shadow)"/>' +
      '<g fill="url(#g-clove-body)" stroke="#2B180C" stroke-width="0.4">' +
      '<g transform="translate(14,38) rotate(-30)"><circle cx="0" cy="0" r="3.4"/><rect x="-1.1" y="2" width="2.2" height="10" rx="1"/><path d="M-3,0 L-5,2 M3,0 L5,2 M-2,-2.6 L-3.6,-4.6 M2,-2.6 L3.6,-4.6" stroke="#2B180C" stroke-width="0.6"/></g>' +
      '<g transform="translate(26,26) rotate(15)"><circle cx="0" cy="0" r="3.6"/><rect x="-1.2" y="2.2" width="2.4" height="11" rx="1"/><path d="M-3.2,0 L-5.4,2 M3.2,0 L5.4,2 M-2.2,-2.8 L-3.8,-4.8 M2.2,-2.8 L3.8,-4.8" stroke="#2B180C" stroke-width="0.6"/></g>' +
      '<g transform="translate(40,40) rotate(-10)"><circle cx="0" cy="0" r="3.2"/><rect x="-1.1" y="2" width="2.2" height="9.5" rx="1"/><path d="M-3,0 L-5,1.8 M3,0 L5,1.8" stroke="#2B180C" stroke-width="0.6"/></g>' +
      '<g transform="translate(52,24) rotate(35)"><circle cx="0" cy="0" r="3.6"/><rect x="-1.2" y="2.2" width="2.4" height="11" rx="1"/><path d="M-3.2,0 L-5.4,2 M3.2,0 L5.4,2" stroke="#2B180C" stroke-width="0.6"/></g>' +
      '<g transform="translate(60,42) rotate(-40)"><circle cx="0" cy="0" r="3.2"/><rect x="-1.1" y="2" width="2.2" height="9.5" rx="1"/></g>' +
      '<g transform="translate(20,48) rotate(60)"><circle cx="0" cy="0" r="3"/><rect x="-1" y="1.8" width="2" height="8.5" rx="1"/></g>' +
      '<g transform="translate(46,50) rotate(-70)"><circle cx="0" cy="0" r="3"/><rect x="-1" y="1.8" width="2" height="8.5" rx="1"/></g>' +
      '<g transform="translate(33,16) rotate(0)"><circle cx="0" cy="0" r="3"/><rect x="-1" y="1.8" width="2" height="8.5" rx="1"/></g>' +
      '</g>' +
      '<circle cx="25" cy="24" r="0.9" fill="#D8B48C" opacity="0.7"/>' +
      '<circle cx="51" cy="22" r="0.9" fill="#D8B48C" opacity="0.7"/>' +
      '</svg>'
  },

  // =========================================================================
  // bev-black-peppercorns — small mound of round dark peppercorns.
  // =========================================================================
  'bev-black-peppercorns': {
    label: 'Black Peppercorns',
    w: 74, h: 58,
    svg: '<svg viewBox="0 0 74 58" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<radialGradient id="g-pepper-corn" cx="0.35" cy="0.3" r="0.75">' +
      '<stop offset="0" stop-color="#5A4A3E"/><stop offset="0.5" stop-color="#26201B"/><stop offset="1" stop-color="#100D0A"/>' +
      '</radialGradient>' +
      '<radialGradient id="g-pepper-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.42"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="37" cy="52" rx="28" ry="5.5" fill="url(#g-pepper-shadow)"/>' +
      '<g fill="url(#g-pepper-corn)">' +
      '<circle cx="16" cy="38" r="4.4"/><circle cx="24" cy="30" r="4.8"/><circle cx="33" cy="40" r="4.2"/><circle cx="40" cy="28" r="5"/>' +
      '<circle cx="48" cy="38" r="4.4"/><circle cx="56" cy="30" r="4.6"/><circle cx="20" cy="46" r="4"/><circle cx="30" cy="48" r="4.2"/>' +
      '<circle cx="42" cy="47" r="4"/><circle cx="52" cy="45" r="3.8"/><circle cx="36" cy="20" r="3.6"/><circle cx="46" cy="20" r="3.4"/><circle cx="12" cy="30" r="3.4"/>' +
      '</g>' +
      '<g fill="#FFFFFF" opacity="0.5">' +
      '<circle cx="22" cy="28" r="0.9"/><circle cx="38" cy="26" r="1"/><circle cx="54" cy="28" r="0.8"/><circle cx="18" cy="44" r="0.7"/><circle cx="44" cy="44" r="0.8"/>' +
      '</g>' +
      '</svg>'
  },

  // =========================================================================
  // bev-fennel-seeds — pile of pale green-yellow ridged oblong seeds.
  // =========================================================================
  'bev-fennel-seeds': {
    label: 'Fennel Seeds',
    w: 76, h: 56,
    svg: '<svg viewBox="0 0 76 56" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="g-fennel-seed" x1="0" y1="0" x2="0" y2="8" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#DFE0A6"/><stop offset="1" stop-color="#9B9A4E"/>' +
      '</linearGradient>' +
      '<radialGradient id="g-fennel-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.4"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="38" cy="50" rx="30" ry="5.5" fill="url(#g-fennel-shadow)"/>' +
      '<g fill="url(#g-fennel-seed)" stroke="#7C7A3C" stroke-width="0.35">' +
      '<g transform="translate(14,34) rotate(-20)"><ellipse cx="0" cy="0" rx="2.6" ry="7.2"/><path d="M0,-6 L0,6" stroke="#7C7A3C" stroke-width="0.4"/></g>' +
      '<g transform="translate(22,24) rotate(35)"><ellipse cx="0" cy="0" rx="2.6" ry="7.2"/><path d="M0,-6 L0,6" stroke="#7C7A3C" stroke-width="0.4"/></g>' +
      '<g transform="translate(32,36) rotate(-5)"><ellipse cx="0" cy="0" rx="2.8" ry="7.6"/><path d="M0,-6.4 L0,6.4" stroke="#7C7A3C" stroke-width="0.4"/></g>' +
      '<g transform="translate(42,22) rotate(20)"><ellipse cx="0" cy="0" rx="2.6" ry="7.2"/><path d="M0,-6 L0,6" stroke="#7C7A3C" stroke-width="0.4"/></g>' +
      '<g transform="translate(50,34) rotate(-30)"><ellipse cx="0" cy="0" rx="2.6" ry="7.2"/><path d="M0,-6 L0,6" stroke="#7C7A3C" stroke-width="0.4"/></g>' +
      '<g transform="translate(60,26) rotate(10)"><ellipse cx="0" cy="0" rx="2.4" ry="6.6"/><path d="M0,-5.6 L0,5.6" stroke="#7C7A3C" stroke-width="0.4"/></g>' +
      '<g transform="translate(20,44) rotate(60)"><ellipse cx="0" cy="0" rx="2.2" ry="6"/></g>' +
      '<g transform="translate(46,44) rotate(-55)"><ellipse cx="0" cy="0" rx="2.2" ry="6"/></g>' +
      '<g transform="translate(36,14) rotate(0)"><ellipse cx="0" cy="0" rx="2.2" ry="6"/></g>' +
      '</g>' +
      '</svg>'
  },

  // =========================================================================
  // bev-star-anise — two overlapping star-shaped pods.
  // =========================================================================
  'bev-star-anise': {
    label: 'Star Anise',
    w: 70, h: 62,
    svg: '<svg viewBox="0 0 70 62" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<radialGradient id="g-anise-body" cx="0.4" cy="0.35" r="0.75">' +
      '<stop offset="0" stop-color="#B87A4A"/><stop offset="0.55" stop-color="#7C4A25"/><stop offset="1" stop-color="#4A2A14"/>' +
      '</radialGradient>' +
      '<radialGradient id="g-anise-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.42"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="35" cy="56" rx="26" ry="5.5" fill="url(#g-anise-shadow)"/>' +
      '<g transform="translate(24,32) rotate(-10)">' +
      '<path d="M0,-18 L4,-5 L17,-8 L7,1 L13,14 L0,6 L-13,14 L-7,1 L-17,-8 L-4,-5 Z" fill="url(#g-anise-body)" stroke="#331A0C" stroke-width="0.6"/>' +
      '<circle cx="0" cy="0" r="4" fill="#5C3419" stroke="#331A0C" stroke-width="0.4"/>' +
      '<circle cx="3" cy="-7" r="1.4" fill="#D9B27C" opacity="0.85"/><circle cx="-6" cy="-2" r="1.3" fill="#D9B27C" opacity="0.8"/>' +
      '<circle cx="5" cy="5" r="1.3" fill="#D9B27C" opacity="0.75"/><circle cx="-5" cy="6" r="1.2" fill="#D9B27C" opacity="0.7"/>' +
      '</g>' +
      '<g transform="translate(46,38) rotate(24)" opacity="0.96">' +
      '<path d="M0,-15 L3.4,-4 L14,-6.5 L5.8,0.8 L11,11.5 L0,5 L-11,11.5 L-5.8,0.8 L-14,-6.5 L-3.4,-4 Z" fill="url(#g-anise-body)" stroke="#331A0C" stroke-width="0.6"/>' +
      '<circle cx="0" cy="0" r="3.3" fill="#5C3419" stroke="#331A0C" stroke-width="0.4"/>' +
      '<circle cx="2.4" cy="-6" r="1.1" fill="#D9B27C" opacity="0.8"/><circle cx="-5" cy="-1.5" r="1" fill="#D9B27C" opacity="0.7"/>' +
      '</g>' +
      '</svg>'
  },

  // =========================================================================
  // bev-nutmeg — pair of round-oval seeds with soft wood-grain shading.
  // =========================================================================
  'bev-nutmeg': {
    label: 'Nutmeg',
    w: 70, h: 54,
    svg: '<svg viewBox="0 0 70 54" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<radialGradient id="g-nutmeg-body" cx="0.35" cy="0.3" r="0.8">' +
      '<stop offset="0" stop-color="#C79B62"/><stop offset="0.55" stop-color="#8E6136"/><stop offset="1" stop-color="#5C3B1E"/>' +
      '</radialGradient>' +
      '<radialGradient id="g-nutmeg-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.4"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="35" cy="48" rx="26" ry="5.5" fill="url(#g-nutmeg-shadow)"/>' +
      '<g transform="translate(24,26) rotate(-8)">' +
      '<ellipse cx="0" cy="0" rx="15" ry="12.5" fill="url(#g-nutmeg-body)" stroke="#3D260F" stroke-width="0.6"/>' +
      '<path d="M-10,-4 C-4,-8 6,-8 11,-2 M-11,2 C-4,4 6,5 12,1 M-8,7 C-2,9 5,8 10,5" stroke="#4A2E14" stroke-width="0.5" opacity="0.55" fill="none"/>' +
      '<ellipse cx="-5" cy="-4" rx="4" ry="2.6" fill="#E4C494" opacity="0.4"/>' +
      '</g>' +
      '<g transform="translate(48,32) rotate(14)">' +
      '<ellipse cx="0" cy="0" rx="13" ry="10.8" fill="url(#g-nutmeg-body)" stroke="#3D260F" stroke-width="0.6"/>' +
      '<path d="M-9,-3 C-3,-7 5,-6 9,-1 M-9,3 C-3,5 5,4 10,0" stroke="#4A2E14" stroke-width="0.5" opacity="0.5" fill="none"/>' +
      '<ellipse cx="-4" cy="-3" rx="3.4" ry="2.2" fill="#E4C494" opacity="0.35"/>' +
      '</g>' +
      '</svg>'
  },

  // =========================================================================
  // bev-tulsi-leaves — small sprig of holy basil, green with purple tinge.
  // =========================================================================
  'bev-tulsi-leaves': {
    label: 'Tulsi Leaves',
    w: 82, h: 96,
    svg: '<svg viewBox="0 0 82 96" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="g-tulsi-leaf" x1="0" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#8FBF6A"/><stop offset="0.6" stop-color="#4E8A3E"/><stop offset="1" stop-color="#325F2A"/>' +
      '</linearGradient>' +
      '<linearGradient id="g-tulsi-stem" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#6E8A3E"/><stop offset="1" stop-color="#5C4A2E"/>' +
      '</linearGradient>' +
      '<radialGradient id="g-tulsi-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.4"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="41" cy="90" rx="26" ry="5.5" fill="url(#g-tulsi-shadow)"/>' +
      '<path d="M41,88 C40,64 42,42 39,20" stroke="url(#g-tulsi-stem)" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<g transform="translate(39,68) rotate(-58)"><path d="M0,4 C-3,9 -3,17 0,22 C4,26 9,26 12,22 C15,17 15,9 12,4 C9,0 3,0 0,4 Z" fill="url(#g-tulsi-leaf)" stroke="#2C4B22" stroke-width="0.6"/><path d="M2,4 C4,10 4,17 2,22" stroke="#2C4B22" stroke-width="0.5" opacity="0.55" fill="none"/><path d="M3,8 C6,9 8,11 9,13 M3,14 C6,15 8,17 9,19" stroke="#2C4B22" stroke-width="0.35" opacity="0.4" fill="none"/></g>' +
      '<g transform="translate(39,68) rotate(58) scale(-1,1)"><path d="M0,4 C-3,9 -3,17 0,22 C4,26 9,26 12,22 C15,17 15,9 12,4 C9,0 3,0 0,4 Z" fill="url(#g-tulsi-leaf)" stroke="#2C4B22" stroke-width="0.6"/><path d="M2,4 C4,10 4,17 2,22" stroke="#2C4B22" stroke-width="0.5" opacity="0.55" fill="none"/><path d="M3,8 C6,9 8,11 9,13 M3,14 C6,15 8,17 9,19" stroke="#2C4B22" stroke-width="0.35" opacity="0.4" fill="none"/></g>' +
      '<g transform="translate(40,42) rotate(-50)"><path d="M0,3 C-2.6,7.5 -2.6,14 0,18 C3.2,21.5 7.4,21.5 10,18 C12.6,14 12.6,7.5 10,3 C7.4,-0.5 2.6,-0.5 0,3 Z" fill="url(#g-tulsi-leaf)" stroke="#2C4B22" stroke-width="0.55"/><path d="M1.6,3.5 C3.4,8.4 3.4,14 1.6,18" stroke="#2C4B22" stroke-width="0.45" opacity="0.55" fill="none"/></g>' +
      '<g transform="translate(40,42) rotate(50) scale(-1,1)"><path d="M0,3 C-2.6,7.5 -2.6,14 0,18 C3.2,21.5 7.4,21.5 10,18 C12.6,14 12.6,7.5 10,3 C7.4,-0.5 2.6,-0.5 0,3 Z" fill="url(#g-tulsi-leaf)" stroke="#2C4B22" stroke-width="0.55"/><path d="M1.6,3.5 C3.4,8.4 3.4,14 1.6,18" stroke="#2C4B22" stroke-width="0.45" opacity="0.55" fill="none"/></g>' +
      '<g transform="translate(39,18)"><path d="M0,4 C-2.2,8.4 -2.2,14.6 0,18.6 C2.6,22 6,22 8.4,18.6 C10.8,14.6 10.8,8.4 8.4,4 C6,0.2 2.2,0.2 0,4 Z" fill="url(#g-tulsi-leaf)" stroke="#2C4B22" stroke-width="0.5"/><path d="M1.4,4.4 C3,9 3,15 1.4,18.6" stroke="#2C4B22" stroke-width="0.4" opacity="0.5" fill="none"/></g>' +
      '<g fill="#7E5FA0" opacity="0.45">' +
      '<ellipse cx="30" cy="80" rx="3.6" ry="7" transform="rotate(-58 30 80)"/><ellipse cx="50" cy="80" rx="3.6" ry="7" transform="rotate(58 50 80)"/>' +
      '<ellipse cx="32" cy="52" rx="2.8" ry="5.6" transform="rotate(-50 32 52)"/><ellipse cx="48" cy="52" rx="2.8" ry="5.6" transform="rotate(50 48 52)"/>' +
      '</g>' +
      '</svg>'
  },

  // =========================================================================
  // bev-saffron-threads — fine red-orange filaments in a tiny corked glass vial.
  // =========================================================================
  'bev-saffron-threads': {
    label: 'Saffron Threads',
    w: 66, h: 112,
    svg: '<svg viewBox="0 0 66 112" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="g-saffron-glass" x1="18" y1="30" x2="48" y2="100" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#F3FAFC" stop-opacity="0.85"/><stop offset="0.5" stop-color="#CFE4EA" stop-opacity="0.55"/><stop offset="1" stop-color="#9FBAC2" stop-opacity="0.6"/>' +
      '</linearGradient>' +
      '<linearGradient id="g-saffron-cork" x1="20" y1="10" x2="46" y2="34" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#CFA36A"/><stop offset="1" stop-color="#8C5F30"/>' +
      '</linearGradient>' +
      '<radialGradient id="g-saffron-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.42"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="33" cy="106" rx="19" ry="5" fill="url(#g-saffron-shadow)"/>' +
      '<path d="M20,32 C18,32 17,40 17,55 L17,92 C17,100 24,104 33,104 C42,104 49,100 49,92 L49,55 C49,40 48,32 46,32 Z" fill="url(#g-saffron-glass)" stroke="#7C9AA6" stroke-width="1"/>' +
      '<path d="M23,34 L43,34 L43,42 L23,42 Z" fill="#E3EFF3" opacity="0.5"/>' +
      '<g stroke-linecap="round" fill="none">' +
      '<path d="M23,48 C26,58 21,68 25,78 C28,86 24,92 27,98" stroke="#C4331C" stroke-width="1.3" opacity="0.9"/>' +
      '<path d="M30,44 C34,55 29,64 33,74 C36,84 31,90 34,98" stroke="#E5432F" stroke-width="1.4" opacity="0.92"/>' +
      '<path d="M37,50 C41,60 36,70 40,80 C42,88 38,92 41,98" stroke="#B82D18" stroke-width="1.2" opacity="0.88"/>' +
      '<path d="M27,60 C24,68 30,72 26,82" stroke="#F0602E" stroke-width="1" opacity="0.8"/>' +
      '<path d="M39,64 C43,70 37,76 41,86" stroke="#C4331C" stroke-width="1" opacity="0.8"/>' +
      '</g>' +
      '<rect x="21" y="10" width="24" height="24" rx="5" fill="url(#g-saffron-cork)" stroke="#5C3D1D" stroke-width="0.8"/>' +
      '<path d="M23,14 C30,12 38,12 43,14" stroke="#E4C593" stroke-width="1.6" opacity="0.6" fill="none" stroke-linecap="round"/>' +
      '<rect x="19" y="30" width="28" height="5" rx="2" fill="#7C9AA6" opacity="0.6"/>' +
      '<path d="M24,38 C22,58 22,84 26,100" stroke="#FFFFFF" stroke-width="3.5" opacity="0.28" fill="none" stroke-linecap="round"/>' +
      '<path d="M8,60 C11,58 13,60 13,64 C13,68 10,70 8,68" stroke="#8C5F30" stroke-width="1.2" fill="none" opacity="0.7"/>' +
      '</svg>'
  },

  // =========================================================================
  // bev-honey-jar — small glass jar, amber honey, brass screw lid.
  // =========================================================================
  'bev-honey-jar': {
    label: 'Honey Jar',
    w: 92, h: 118,
    svg: '<svg viewBox="0 0 92 118" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="g-honey-fill" x1="18" y1="40" x2="74" y2="108" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#FFC85C"/><stop offset="0.5" stop-color="#F0A020"/><stop offset="1" stop-color="#B5690A"/>' +
      '</linearGradient>' +
      '<linearGradient id="g-honey-glass" x1="16" y1="30" x2="76" y2="112" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#FFFFFF" stop-opacity="0.5"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0.08"/>' +
      '</linearGradient>' +
      '<linearGradient id="g-honey-lid" x1="20" y1="8" x2="72" y2="30" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#F5C463"/><stop offset="0.5" stop-color="#C9902E"/><stop offset="1" stop-color="#8C5C15"/>' +
      '</linearGradient>' +
      '<radialGradient id="g-honey-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.45"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="46" cy="112" rx="30" ry="6.5" fill="url(#g-honey-shadow)"/>' +
      '<path d="M16,38 C15,38 14,42 15,50 L16,100 C16,108 25,112 46,112 C67,112 76,108 76,100 L77,50 C78,42 77,38 76,38 Z" fill="url(#g-honey-fill)" stroke="#8C5108" stroke-width="0.8"/>' +
      '<path d="M16,38 C15,38 14,42 15,50 L16,100 C16,108 25,112 46,112 C67,112 76,108 76,100 L77,50 C78,42 77,38 76,38 Z" fill="url(#g-honey-glass)"/>' +
      '<rect x="20" y="18" width="52" height="20" rx="3" fill="url(#g-honey-lid)" stroke="#6B4310" stroke-width="0.7"/>' +
      '<path d="M20,24 L72,24 M20,30 L72,30" stroke="#6B4310" stroke-width="0.6" opacity="0.5"/>' +
      '<rect x="24" y="8" width="44" height="12" rx="3" fill="url(#g-honey-lid)" stroke="#6B4310" stroke-width="0.7"/>' +
      '<rect x="24" y="66" width="44" height="26" rx="2" fill="#FBF5E9" opacity="0.92" transform="rotate(-2 46 79)"/>' +
      '<text x="46" y="82" font-family="Georgia, serif" font-style="italic" font-weight="700" font-size="13" fill="#7A4A12" text-anchor="middle" transform="rotate(-2 46 79)">honey</text>' +
      '<path d="M24,44 C22,64 22,92 26,106" stroke="#FFF3D8" stroke-width="5" opacity="0.4" fill="none" stroke-linecap="round"/>' +
      '<path d="M68,50 C69,68 69,90 66,104" stroke="#6B3B06" stroke-width="3" opacity="0.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M46,38 C44,42 44,48 48,50" stroke="#D98A10" stroke-width="2" opacity="0.7" fill="none" stroke-linecap="round"/>' +
      '</svg>'
  },

  // =========================================================================
  // bev-tea-strainer — small stainless mesh strainer with handle.
  // =========================================================================
  'bev-tea-strainer': {
    label: 'Tea Strainer',
    w: 104, h: 78,
    svg: '<svg viewBox="0 0 104 78" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="g-strainer-metal" x1="10" y1="20" x2="60" y2="60" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#F2F3F5"/><stop offset="0.45" stop-color="#B9C0C6"/><stop offset="1" stop-color="#767E84"/>' +
      '</linearGradient>' +
      '<linearGradient id="g-strainer-handle" x1="50" y1="10" x2="100" y2="24" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#E7E9EB"/><stop offset="1" stop-color="#8B9298"/>' +
      '</linearGradient>' +
      '<radialGradient id="g-strainer-shadow" cx="0.5" cy="0.5" r="0.5">' +
      '<stop offset="0" stop-color="#140B07" stop-opacity="0.42"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="48" cy="72" rx="34" ry="6" fill="url(#g-strainer-shadow)"/>' +
      '<path d="M14,30 C13,44 20,56 36,58 C52,56 59,44 58,30 Z" fill="url(#g-strainer-metal)" stroke="#5C6368" stroke-width="0.8"/>' +
      '<ellipse cx="36" cy="30" rx="22" ry="7" fill="#DDE2E5" stroke="#7A8288" stroke-width="0.8"/>' +
      '<ellipse cx="36" cy="30" rx="22" ry="7" fill="none" stroke="#9BA3A9" stroke-width="0.5"/>' +
      '<g stroke="#8A9298" stroke-width="0.4" opacity="0.7">' +
      '<path d="M18,34 L54,34 M17,38 L55,40 M20,44 L52,46 M24,50 L48,52"/>' +
      '<path d="M20,28 L20,52 M28,26 L26,56 M36,25 L36,58 M44,26 L46,56 M52,28 L52,52"/>' +
      '</g>' +
      '<path d="M58,30 L92,20 C97,18.5 101,21 100,25 C99,28 96,29 92,28 L60,35" fill="url(#g-strainer-handle)" stroke="#5C6368" stroke-width="0.8"/>' +
      '<circle cx="58" cy="31" r="2.6" fill="#C7CDD1" stroke="#5C6368" stroke-width="0.6"/>' +
      '<circle cx="94" cy="22" r="2.6" fill="none" stroke="#5C6368" stroke-width="1.4"/>' +
      '<path d="M20,26 C26,22 44,22 52,26" stroke="#FFFFFF" stroke-width="1.6" opacity="0.6" fill="none" stroke-linecap="round"/>' +
      '<path d="M60,22 C72,19 84,18 92,21" stroke="#FFFFFF" stroke-width="1.2" opacity="0.55" fill="none" stroke-linecap="round"/>' +
      '</svg>'
  },

  // =========================================================================
  // priceCards — authored Hindi/Devanagari signage overlaid onto the market
  // scene's six Spanish chalkboard defects (see art/PLATES.md). Words are
  // real, common vegetable-market Devanagari (matching the task brief's
  // verified examples): potato, onion, tomato, chilli, coriander, ginger.
  // Several distinct shapes/materials so the set doesn't read as one stamp.
  // `coverage` gives the intended target region as scene-width/height
  // percentages (with a small margin) for the scene-placement layer.
  // =========================================================================
  priceCards: {

    // Covers the "Tomate raf 1,29" chalkboard — PLATES.md 11-21% x, 37-50% y.
    'price-tomato': {
      label: 'टमाटर — Tomato, ₹40/किलो',
      w: 236, h: 300,
      coverage: { leftPct: 8, rightPct: 24, topPct: 34, bottomPct: 53,
        note: 'Replaces the "Tomate raf 1,29" chalkboard sign (PLATES.md market table, row 1).' },
      svg: '<svg viewBox="0 0 236 300" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
        '<linearGradient id="g-card-tomato-board" x1="20" y1="20" x2="210" y2="280" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="#2E2622"/><stop offset="1" stop-color="#100D0B"/>' +
        '</linearGradient>' +
        '<linearGradient id="g-card-tomato-frame" x1="0" y1="0" x2="236" y2="300" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="#B8905A"/><stop offset="1" stop-color="#6E4A26"/>' +
        '</linearGradient>' +
        '<radialGradient id="g-card-tomato-shadow" cx="0.5" cy="0.5" r="0.5">' +
        '<stop offset="0" stop-color="#140B07" stop-opacity="0.4"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
        '</radialGradient>' +
        '</defs>' +
        '<g transform="rotate(-3 118 150)">' +
        '<ellipse cx="118" cy="286" rx="90" ry="12" fill="url(#g-card-tomato-shadow)"/>' +
        '<rect x="6" y="8" width="224" height="272" rx="10" fill="url(#g-card-tomato-frame)"/>' +
        '<rect x="16" y="18" width="204" height="252" rx="6" fill="url(#g-card-tomato-board)" stroke="#000000" stroke-opacity="0.4" stroke-width="1"/>' +
        '<path d="M22,26 L214,24" stroke="#FFFFFF" stroke-width="1" opacity="0.06"/>' +
        '<text x="118" y="108" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="58" fill="#F6F1E4" text-anchor="middle" opacity="0.95">टमाटर</text>' +
        '<path d="M60,124 L176,120" stroke="#F0602E" stroke-width="3" opacity="0.85" stroke-linecap="round"/>' +
        '<text x="118" y="210" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="52" fill="#FFD873" text-anchor="middle">₹40</text>' +
        '<text x="118" y="248" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-size="24" fill="#E7DFCC" text-anchor="middle" opacity="0.85">/किलो</text>' +
        '<circle cx="40" cy="250" r="10" fill="#C4331C"/><circle cx="40" cy="250" r="10" fill="none" stroke="#7A1B0D" stroke-width="1"/>' +
        '<path d="M36,242 C38,238 42,238 44,241" stroke="#4E8A3E" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        '<circle cx="198" cy="60" r="7" fill="#C4331C" opacity="0.9"/>' +
        '<path d="M195,55 C196,52 199,52 200,54" stroke="#4E8A3E" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
        '<path d="M20,20 L216,20 L216,270 L20,270 Z" fill="none" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="10"/>' +
        '</g>' +
        '</svg>'
    },

    // Covers the "Judías verdes 0,99" chalkboard — PLATES.md 26-40% x, 37-59% y.
    'price-dhania': {
      label: 'धनिया — Coriander, ₹20/किलो',
      w: 340, h: 500,
      coverage: { leftPct: 23, rightPct: 43, topPct: 34, bottomPct: 62,
        note: 'Replaces the "Judías verdes 0,99" chalkboard sign (PLATES.md market table, row 2).' },
      svg: '<svg viewBox="0 0 340 500" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
        '<linearGradient id="g-card-dhania-board" x1="30" y1="30" x2="310" y2="470" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="#33291F"/><stop offset="1" stop-color="#140F0A"/>' +
        '</linearGradient>' +
        '<linearGradient id="g-card-dhania-frame" x1="0" y1="0" x2="340" y2="500" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="#C79E63"/><stop offset="1" stop-color="#7A5027"/>' +
        '</linearGradient>' +
        '<radialGradient id="g-card-dhania-shadow" cx="0.5" cy="0.5" r="0.5">' +
        '<stop offset="0" stop-color="#140B07" stop-opacity="0.42"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
        '</radialGradient>' +
        '</defs>' +
        '<g transform="rotate(2 170 250)">' +
        '<ellipse cx="170" cy="478" rx="130" ry="16" fill="url(#g-card-dhania-shadow)"/>' +
        '<rect x="10" y="14" width="320" height="452" rx="16" fill="url(#g-card-dhania-frame)"/>' +
        '<rect x="24" y="28" width="292" height="424" rx="10" fill="url(#g-card-dhania-board)" stroke="#000000" stroke-opacity="0.4" stroke-width="1.5"/>' +
        '<text x="170" y="180" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="86" fill="#F6F1E4" text-anchor="middle">धनिया</text>' +
        '<path d="M80,210 L260,204" stroke="#8FBF6A" stroke-width="4" opacity="0.85" stroke-linecap="round"/>' +
        '<text x="170" y="336" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="78" fill="#FFD873" text-anchor="middle">₹20</text>' +
        '<text x="170" y="392" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-size="34" fill="#E7DFCC" text-anchor="middle" opacity="0.85">/किलो</text>' +
        '<g transform="translate(60,410)" stroke="#4E8A3E" stroke-width="3" fill="#6FA84C">' +
        '<path d="M0,20 C-4,10 2,0 0,-14" fill="none"/><ellipse cx="0" cy="-16" rx="7" ry="4"/>' +
        '</g>' +
        '<g transform="translate(280,90)" stroke="#4E8A3E" stroke-width="2.4" fill="#6FA84C" opacity="0.9">' +
        '<path d="M0,16 C-3,8 2,0 0,-11" fill="none"/><ellipse cx="0" cy="-13" rx="5.6" ry="3.2"/>' +
        '</g>' +
        '</g>' +
        '</svg>'
    },

    // Covers the small unlabeled "1.19" sign — PLATES.md 46-54% x, 46-54% y.
    'price-mirch': {
      label: 'मिर्च — Chilli, ₹80/किलो',
      w: 196, h: 186,
      coverage: { leftPct: 43, rightPct: 57, topPct: 43, bottomPct: 57,
        note: 'Replaces the small unlabeled "1.19" sign (PLATES.md market table, row 3).' },
      svg: '<svg viewBox="0 0 196 186" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
        '<linearGradient id="g-card-mirch-wood" x1="10" y1="10" x2="186" y2="176" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="#C99B5D"/><stop offset="0.5" stop-color="#A97538"/><stop offset="1" stop-color="#7A4E22"/>' +
        '</linearGradient>' +
        '<radialGradient id="g-card-mirch-shadow" cx="0.5" cy="0.5" r="0.5">' +
        '<stop offset="0" stop-color="#140B07" stop-opacity="0.4"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
        '</radialGradient>' +
        '</defs>' +
        '<g transform="rotate(8 98 93)">' +
        '<ellipse cx="98" cy="176" rx="70" ry="9" fill="url(#g-card-mirch-shadow)"/>' +
        '<rect x="8" y="8" width="180" height="170" rx="6" fill="url(#g-card-mirch-wood)" stroke="#5C3B1B" stroke-width="1.4"/>' +
        '<path d="M14,14 L182,14 M14,172 L182,172" stroke="#5C3B1B" stroke-width="1" opacity="0.4"/>' +
        '<rect x="20" y="20" width="156" height="146" rx="3" fill="#F4EBD8" opacity="0.94"/>' +
        '<text x="98" y="82" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="44" fill="#2A1A12" text-anchor="middle">मिर्च</text>' +
        '<text x="98" y="140" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="38" fill="#C4331C" text-anchor="middle">₹80</text>' +
        '<text x="98" y="162" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-size="16" fill="#5A4530" text-anchor="middle" opacity="0.8">/किलो</text>' +
        '<g transform="translate(150,42) rotate(20)">' +
        '<path d="M0,0 C6,4 8,14 4,22 C1,27 -3,26 -4,20 C-6,12 -4,3 0,0 Z" fill="#C4331C" stroke="#7A1B0D" stroke-width="0.8"/>' +
        '<path d="M-1,-1 C0,-4 3,-5 4,-3" stroke="#4E8A3E" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
        '</g>' +
        '</g>' +
        '</svg>'
    },

    // Covers the "Nectarina Ledina 1,19" chalkboard — PLATES.md 59-78% x, 44-60% y.
    'price-onion': {
      label: 'प्याज़ — Onion, ₹25/किलो',
      w: 460, h: 380,
      coverage: { leftPct: 56, rightPct: 81, topPct: 41, bottomPct: 63,
        note: 'Replaces the "Nectarina Ledina 1,19" chalkboard sign (PLATES.md market table, row 4).' },
      svg: '<svg viewBox="0 0 460 380" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
        '<linearGradient id="g-card-onion-board" x1="30" y1="30" x2="430" y2="350" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="#2C2420" stop-opacity="1"/><stop offset="1" stop-color="#0F0C0A"/>' +
        '</linearGradient>' +
        '<linearGradient id="g-card-onion-frame" x1="0" y1="0" x2="460" y2="380" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="#B8905A"/><stop offset="1" stop-color="#6E4A26"/>' +
        '</linearGradient>' +
        '<radialGradient id="g-card-onion-shadow" cx="0.5" cy="0.5" r="0.5">' +
        '<stop offset="0" stop-color="#140B07" stop-opacity="0.4"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
        '</radialGradient>' +
        '</defs>' +
        '<g transform="rotate(-4 230 190)">' +
        '<ellipse cx="230" cy="360" rx="170" ry="16" fill="url(#g-card-onion-shadow)"/>' +
        '<rect x="14" y="14" width="432" height="346" rx="14" fill="url(#g-card-onion-frame)"/>' +
        '<rect x="30" y="30" width="400" height="314" rx="8" fill="url(#g-card-onion-board)" stroke="#000000" stroke-opacity="0.4" stroke-width="1.5"/>' +
        '<text x="230" y="150" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="88" fill="#F6F1E4" text-anchor="middle">प्याज़</text>' +
        '<path d="M110,182 L350,176" stroke="#D98A10" stroke-width="4" opacity="0.85" stroke-linecap="round"/>' +
        '<text x="230" y="284" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="76" fill="#FFD873" text-anchor="middle">₹25</text>' +
        '<text x="230" y="326" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-size="30" fill="#E7DFCC" text-anchor="middle" opacity="0.85">/किलो</text>' +
        '<g transform="translate(70,90)">' +
        '<ellipse cx="0" cy="0" rx="16" ry="18" fill="#C98C6B" stroke="#7A4A2A" stroke-width="1"/>' +
        '<path d="M-10,-14 C-4,-20 4,-20 10,-14" stroke="#E7C39A" stroke-width="1.4" fill="none" opacity="0.7"/>' +
        '<path d="M0,-18 L0,-30" stroke="#8A9A5A" stroke-width="2"/>' +
        '</g>' +
        '</g>' +
        '</svg>'
    },

    // Covers the star-shaped "ZUMOS NATURALES 1€" sign — PLATES.md 80-95% x, 82-99% y.
    'price-ginger': {
      label: 'अदरक — Ginger, ₹60/किलो',
      w: 430, h: 440,
      coverage: { leftPct: 68, rightPct: 100, topPct: 72, bottomPct: 100,
        note: 'Replaces the star-shaped "ZUMOS NATURALES 1€" sign AND the dark board it is mounted on, which extends past PLATES.md\'s documented text box (PLATES.md market table, row 5). A solid backing plate sits behind the star so the underlying board never shows through the star\'s concave points.' },
      svg: '<svg viewBox="0 0 430 440" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
        '<linearGradient id="g-card-ginger-backing" x1="10" y1="10" x2="420" y2="430" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="#3A2C1E"/><stop offset="1" stop-color="#1C130C"/>' +
        '</linearGradient>' +
        '<linearGradient id="g-card-ginger-board" x1="40" y1="20" x2="350" y2="380" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="#F4EAD3"/><stop offset="1" stop-color="#DFCBA1"/>' +
        '</linearGradient>' +
        '<radialGradient id="g-card-ginger-shadow" cx="0.5" cy="0.5" r="0.5">' +
        '<stop offset="0" stop-color="#140B07" stop-opacity="0.42"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
        '</radialGradient>' +
        '</defs>' +
        '<ellipse cx="215" cy="412" rx="150" ry="16" fill="url(#g-card-ginger-shadow)"/>' +
        '<rect x="6" y="6" width="418" height="428" rx="18" fill="url(#g-card-ginger-backing)"/>' +
        '<g transform="translate(20,20) rotate(-6 195 200)">' +
        '<path d="M195,10 L226,120 L338,86 L262,172 L360,238 L242,224 L262,340 L195,254 L128,340 L148,224 L30,238 L128,172 L52,86 L164,120 Z" fill="url(#g-card-ginger-board)" stroke="#7A5A2A" stroke-width="3"/>' +
        '<path d="M195,10 L226,120 L338,86 L262,172 L360,238 L242,224 L262,340 L195,254 L128,340 L148,224 L30,238 L128,172 L52,86 L164,120 Z" fill="none" stroke="#2A1A12" stroke-width="2" opacity="0.85"/>' +
        '<text x="195" y="176" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="66" fill="#2A1A12" text-anchor="middle">अदरक</text>' +
        '<text x="195" y="252" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="58" fill="#C4331C" text-anchor="middle">₹60</text>' +
        '<text x="195" y="288" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-size="24" fill="#5A4530" text-anchor="middle" opacity="0.85">/किलो</text>' +
        '<g transform="translate(195,306) rotate(6)" stroke="#7A5423" stroke-width="1.4" fill="#CDA872">' +
        '<path d="M-22,10 C-28,4 -26,-6 -18,-8 C-14,-14 -4,-14 0,-8 C6,-14 16,-12 18,-4 C26,-4 30,4 24,10 C28,16 22,22 14,20 C10,26 -2,26 -6,20 C-14,24 -22,20 -22,12 Z"/>' +
        '</g>' +
        '</g>' +
        '</svg>'
    },

    // Covers the partial black sign clipped at the right edge — PLATES.md 95-100% x, 37-44% y.
    'price-aloo': {
      label: 'आलू — Potato, ₹20/किलो',
      w: 150, h: 200,
      coverage: { leftPct: 92, rightPct: 100, topPct: 34, bottomPct: 48,
        note: 'Replaces the partial black sign cut off at the right frame edge (PLATES.md market table, row 6).' },
      svg: '<svg viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
        '<linearGradient id="g-card-aloo-board" x1="10" y1="10" x2="140" y2="190" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="#2E2622"/><stop offset="1" stop-color="#100D0B"/>' +
        '</linearGradient>' +
        '<linearGradient id="g-card-aloo-frame" x1="0" y1="0" x2="150" y2="200" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="#B8905A"/><stop offset="1" stop-color="#6E4A26"/>' +
        '</linearGradient>' +
        '<radialGradient id="g-card-aloo-shadow" cx="0.5" cy="0.5" r="0.5">' +
        '<stop offset="0" stop-color="#140B07" stop-opacity="0.4"/><stop offset="1" stop-color="#140B07" stop-opacity="0"/>' +
        '</radialGradient>' +
        '</defs>' +
        '<g transform="rotate(6 75 100)">' +
        '<ellipse cx="75" cy="188" rx="58" ry="9" fill="url(#g-card-aloo-shadow)"/>' +
        '<rect x="6" y="6" width="138" height="188" rx="8" fill="url(#g-card-aloo-frame)"/>' +
        '<rect x="16" y="16" width="118" height="168" rx="5" fill="url(#g-card-aloo-board)" stroke="#000000" stroke-opacity="0.4" stroke-width="1"/>' +
        '<text x="75" y="76" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="36" fill="#F6F1E4" text-anchor="middle">आलू</text>' +
        '<path d="M34,92 L116,88" stroke="#D98A10" stroke-width="2.4" opacity="0.85" stroke-linecap="round"/>' +
        '<text x="75" y="140" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="34" fill="#FFD873" text-anchor="middle">₹20</text>' +
        '<text x="75" y="164" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-size="15" fill="#E7DFCC" text-anchor="middle" opacity="0.85">/किलो</text>' +
        '</g>' +
        '</svg>'
    },
  },

};

window.CIQ_SPRITES = CIQ_SPRITES;
