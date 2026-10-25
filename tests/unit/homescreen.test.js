import { test } from 'node:test';
import assert from 'node:assert/strict';
import { homeDevice, HOME_STEPS } from '../../src/homescreen.js';

test('the Home Screen steps match the device and browser', () => {
  const cases = {
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1': 'ios-safari',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/130.0 Mobile/15E148 Safari/604.1': 'ios-chrome',
    'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36': 'android-chrome',
    'Mozilla/5.0 (Linux; Android 14; SM-S921B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/26.0 Chrome/122.0 Mobile Safari/537.36': 'android-samsung',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36 Edg/130.0': 'desktop-edge',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36': 'desktop-chrome',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15': 'mac-safari',
  };
  for (const [ua, want] of Object.entries(cases)) assert.equal(homeDevice(ua, 0), want, ua);
  // iPads say they're Macs: the touch screen gives them away.
  assert.equal(homeDevice('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15', 5), 'ios-safari');
  for (const k of Object.keys(HOME_STEPS)) assert.ok(HOME_STEPS[k][1].length >= 1);
});
