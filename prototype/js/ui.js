// CookInQuest prototype — small DOM helpers.
//
// Vanilla JS, no build step. Exposes window.CIQ_UI. Zero game logic here —
// element creation, mounting, count-up numerals, focus helpers, roving
// keyboard grids, and a live-region announcer.

(function () {
  'use strict';

  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (key) {
        const value = props[key];
        if (value === undefined || value === null || value === false) return;
        if (key === 'class') {
          node.className = value;
        } else if (key === 'text') {
          node.textContent = value;
        } else if (key === 'style' && typeof value === 'string') {
          node.setAttribute('style', value);
        } else if (key.indexOf('on') === 0 && typeof value === 'function') {
          node.addEventListener(key.slice(2).toLowerCase(), value);
        } else if (value === true) {
          node.setAttribute(key, '');
        } else {
          node.setAttribute(key, String(value));
        }
      });
    }
    const list = Array.isArray(children) ? children : (children == null ? [] : [children]);
    list.forEach(function (child) {
      if (child == null) return;
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function mount(root, node) {
    clear(root);
    root.appendChild(node);
  }

  function tokenMs(varName, fallback) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    if (!raw) return fallback;
    if (raw.slice(-2) === 'ms') return parseFloat(raw);
    if (raw.slice(-1) === 's') return parseFloat(raw) * 1000;
    const n = parseFloat(raw);
    return isNaN(n) ? fallback : n;
  }

  // Count-up numerals for currency/counters. Respects prefers-reduced-motion
  // because tokens.css collapses --dur-count to ~1ms in that media query.
  function countUp(node, from, to, opts) {
    opts = opts || {};
    const duration = tokenMs('--dur-count', 600);
    const prefix = opts.prefix || '';
    const suffix = opts.suffix || '';
    if (from === to || duration <= 4) {
      node.textContent = prefix + to + suffix;
      return;
    }
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(from + (to - from) * eased);
      node.textContent = prefix + value + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function announce(message) {
    const region = document.getElementById('live-region');
    if (!region || !message) return;
    region.textContent = '';
    window.setTimeout(function () {
      region.textContent = message;
    }, 30);
  }

  // Basic focus trap for modal sheets (help, pause). Returns a release fn.
  function trapFocus(container) {
    function focusables() {
      return Array.prototype.slice.call(
        container.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      );
    }
    function onKeydown(e) {
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    container.addEventListener('keydown', onKeydown);
    const items = focusables();
    if (items.length) items[0].focus();
    return function release() {
      container.removeEventListener('keydown', onKeydown);
    };
  }

  // Arrow keys / WASD move focus across a conceptual grid of `columns`
  // columns, within elements matching `selector` inside `container`.
  function rovingGrid(container, selector, columns) {
    container.addEventListener('keydown', function (e) {
      const key = e.key;
      const isNav = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'a', 'A', 'd', 'D', 'w', 'W', 's', 'S'].indexOf(key) !== -1;
      if (!isNav) return;
      const items = Array.prototype.slice.call(container.querySelectorAll(selector));
      const idx = items.indexOf(document.activeElement);
      if (idx === -1) return;
      let next = -1;
      if (key === 'ArrowRight' || key === 'd' || key === 'D') next = idx + 1;
      else if (key === 'ArrowLeft' || key === 'a' || key === 'A') next = idx - 1;
      else if (key === 'ArrowDown' || key === 's' || key === 'S') next = idx + columns;
      else if (key === 'ArrowUp' || key === 'w' || key === 'W') next = idx - columns;
      if (next >= 0 && next < items.length) {
        e.preventDefault();
        items[next].focus();
      }
    });
  }

  window.CIQ_UI = { el: el, clear: clear, mount: mount, countUp: countUp, announce: announce, trapFocus: trapFocus, rovingGrid: rovingGrid, tokenMs: tokenMs };
})();
