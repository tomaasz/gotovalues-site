const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const gtagCode = fs.readFileSync(path.join(__dirname, 'gtag.js'), 'utf8');

describe('Google Analytics initialization', () => {
  test('should initialize dataLayer and push config', () => {
    const context = {
      window: {},
    };
    context.window = context;
    vm.createContext(context);
    vm.runInContext(gtagCode, context);

    assert.ok(Array.isArray(context.dataLayer), 'dataLayer should be an array');
    assert.strictEqual(context.dataLayer.length, 2, 'dataLayer should have 2 initial entries');
    assert.strictEqual(context.dataLayer[0][0], 'js');
    assert.strictEqual(context.dataLayer[1][0], 'config');
    assert.strictEqual(context.dataLayer[1][1], 'G-LQ4BYJ5DYJ');
  });

  test('gtag function should push to dataLayer', () => {
    const context = {
      window: {},
    };
    context.window = context;
    vm.createContext(context);
    vm.runInContext(gtagCode, context);

    const initialLength = context.dataLayer.length;
    context.gtag('event', 'test_event', { foo: 'bar' });

    assert.strictEqual(context.dataLayer.length, initialLength + 1);
    const lastEvent = context.dataLayer[context.dataLayer.length - 1];
    assert.strictEqual(lastEvent[0], 'event');
    assert.strictEqual(lastEvent[1], 'test_event');
    assert.deepStrictEqual(lastEvent[2], { foo: 'bar' });
  });

  test('should reuse existing dataLayer', () => {
    const existingDataLayer = [['pre-existing', 'data']];
    const context = {
      window: { dataLayer: existingDataLayer },
      dataLayer: existingDataLayer
    };
    vm.createContext(context);
    vm.runInContext(gtagCode, context);

    assert.strictEqual(context.dataLayer, existingDataLayer, 'should reuse existing dataLayer');
    assert.strictEqual(context.dataLayer.length, 3);
    assert.strictEqual(context.dataLayer[0][0], 'pre-existing');
  });
});
