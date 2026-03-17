const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert');

// Simple DOM Mock implementation
class DOMTokenList {
  constructor() {
    this.classes = new Set();
  }
  add(cls) {
    this.classes.add(cls);
  }
  remove(cls) {
    this.classes.delete(cls);
  }
  contains(cls) {
    return this.classes.has(cls);
  }
  get value() {
    return Array.from(this.classes).join(' ');
  }
}

class MockElement {
  constructor(tag = 'div', id = '', classes = []) {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this.classList = new DOMTokenList();
    classes.forEach((c) => this.classList.add(c));
    this.dataset = {};
    this.attributes = {};
    this.children = [];
    this.eventListeners = {};
    this.offsetWidth = 100; // Mock offsetWidth for reflow
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }
  getAttribute(name) {
    return this.attributes[name] || null;
  }

  addEventListener(event, callback) {
    if (!this.eventListeners[event]) this.eventListeners[event] = [];
    this.eventListeners[event].push(callback);
  }

  dispatchEvent(event) {
    const type = typeof event === 'string' ? event : event.type;
    if (this.eventListeners[type]) {
      this.eventListeners[type].forEach((cb) => cb(event));
    }
  }

  replaceChildren(...children) {
    this.children = children;
  }

  cloneNode(deep) {
    const clone = new MockElement(this.tagName, this.id);
    clone.dataset = { ...this.dataset };
    clone.attributes = { ...this.attributes };
    if (this.content) clone.content = this.content.cloneNode(true);
    return clone;
  }
}

class MockDocument {
  constructor() {
    this.elements = [];
    this.eventListeners = {};
  }

  createElement(tag) {
    const el = new MockElement(tag);
    this.elements.push(el);
    return el;
  }

  getElementById(id) {
    return this.elements.find((el) => el.id === id) || null;
  }

  querySelectorAll(selector) {
    // Simple support for multiple classes like ".header-logo, .footer-logo"
    if (selector.includes(',')) {
      const selectors = selector.split(',').map((s) => s.trim().slice(1));
      return this.elements.filter((el) => selectors.some((s) => el.classList.contains(s)));
    }
    if (selector.startsWith('.')) {
      const className = selector.slice(1);
      return this.elements.filter((el) => el.classList.contains(className));
    }
    return [];
  }

  addEventListener(event, callback) {
    if (!this.eventListeners[event]) this.eventListeners[event] = [];
    this.eventListeners[event].push(callback);
  }

  dispatchEvent(event) {
    const type = typeof event === 'string' ? event : event.type;
    if (this.eventListeners[type]) {
      this.eventListeners[type].forEach((cb) => cb(event));
    }
  }
}

// Global mocks
global.document = new MockDocument();
global.setTimeout = (cb) => cb(); // Instant timeout for tests

const { initMobileMenu } = require('./app.js');

describe('Client-side App Logic', () => {
  beforeEach(() => {
    global.document = new MockDocument();
  });

  describe('initMobileMenu()', () => {
    test('should open menu when clicking open button', () => {
      const openBtn = document.createElement('button');
      openBtn.id = 'mobile-menu-btn';

      const overlay = document.createElement('div');
      overlay.id = 'mobile-menu-overlay';
      overlay.classList.add('hidden');
      overlay.classList.add('opacity-0');

      const panel = document.createElement('div');
      panel.id = 'mobile-menu-panel';
      panel.classList.add('translate-x-full');

      initMobileMenu();

      openBtn.dispatchEvent('click');

      assert.strictEqual(overlay.classList.contains('hidden'), false);
      assert.strictEqual(overlay.classList.contains('opacity-0'), false);
      assert.strictEqual(panel.classList.contains('translate-x-full'), false);
      assert.strictEqual(openBtn.getAttribute('aria-expanded'), 'true');
    });

    test('should close menu when clicking close button', () => {
      const openBtn = document.createElement('button');
      openBtn.id = 'mobile-menu-btn';

      const closeBtn = document.createElement('button');
      closeBtn.id = 'mobile-menu-close';

      const overlay = document.createElement('div');
      overlay.id = 'mobile-menu-overlay';
      overlay.classList.add('hidden');
      overlay.classList.add('opacity-0');

      const panel = document.createElement('div');
      panel.id = 'mobile-menu-panel';
      panel.classList.add('translate-x-full');

      initMobileMenu();

      // Open first
      openBtn.dispatchEvent('click');

      // Then close
      closeBtn.dispatchEvent('click');

      assert.strictEqual(overlay.classList.contains('opacity-0'), true);
      assert.strictEqual(panel.classList.contains('translate-x-full'), true);
      assert.strictEqual(openBtn.getAttribute('aria-expanded'), 'false');
      // Timeout is mocked as instant, so hidden should be added
      assert.strictEqual(overlay.classList.contains('hidden'), true);
    });

    test('should close menu when clicking overlay', () => {
      const openBtn = document.createElement('button');
      openBtn.id = 'mobile-menu-btn';

      const overlay = document.createElement('div');
      overlay.id = 'mobile-menu-overlay';
      overlay.classList.add('hidden');

      const panel = document.createElement('div');
      panel.id = 'mobile-menu-panel';
      panel.classList.add('translate-x-full');

      initMobileMenu();

      openBtn.dispatchEvent('click');
      overlay.dispatchEvent('click');
      assert.strictEqual(panel.classList.contains('translate-x-full'), true);
    });

    test('should close menu when clicking a link', () => {
      const openBtn = document.createElement('button');
      openBtn.id = 'mobile-menu-btn';

      const overlay = document.createElement('div');
      overlay.id = 'mobile-menu-overlay';
      overlay.classList.add('hidden');

      const panel = document.createElement('div');
      panel.id = 'mobile-menu-panel';
      panel.classList.add('translate-x-full');

      const link = document.createElement('a');
      link.classList.add('mobile-link');

      initMobileMenu();

      openBtn.dispatchEvent('click');
      link.dispatchEvent('click');
      assert.strictEqual(panel.classList.contains('translate-x-full'), true);
    });

    test('should close menu when pressing Escape', () => {
      const openBtn = document.createElement('button');
      openBtn.id = 'mobile-menu-btn';

      const overlay = document.createElement('div');
      overlay.id = 'mobile-menu-overlay';
      overlay.classList.add('hidden');

      const panel = document.createElement('div');
      panel.id = 'mobile-menu-panel';
      panel.classList.add('translate-x-full');

      initMobileMenu();

      openBtn.dispatchEvent('click');

      // Mock Escape key event
      const escapeEvent = { key: 'Escape', type: 'keydown' };
      document.dispatchEvent(escapeEvent);

      assert.strictEqual(panel.classList.contains('translate-x-full'), true);
    });

    test('should not throw if elements are missing', () => {
      // Missing openBtn, overlay, panel
      assert.doesNotThrow(() => {
        initMobileMenu();
      });
    });

    test('should not throw if only closeBtn is missing', () => {
      // Create required elements but not closeBtn
      const openBtn = document.createElement('button');
      openBtn.id = 'mobile-menu-btn';
      const overlay = document.createElement('div');
      overlay.id = 'mobile-menu-overlay';
      const panel = document.createElement('div');
      panel.id = 'mobile-menu-panel';

      assert.doesNotThrow(() => {
        initMobileMenu();
      });
    });
  });
});
