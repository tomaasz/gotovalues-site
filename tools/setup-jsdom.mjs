import { JSDOM } from 'jsdom';

if (typeof global.window === 'undefined') {
  const jsdom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
    url: 'http://localhost'
  });
  const { window } = jsdom;
  global.window = window;
  global.document = window.document;
  global.navigator = { userAgent: 'node.js' };
  global.HTMLElement = window.HTMLElement;
  global.Element = window.Element;
  global.Node = window.Node;
  global.requestAnimationFrame = function (callback) {
    return setTimeout(callback, 0);
  };
  global.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}
