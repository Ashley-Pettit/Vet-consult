// Add to Home Screen: which phone or computer and browser this is, and the steps for it (shown in Settings).
/** Which phone or computer and browser this is, for the right steps. */
export function homeDevice(ua = globalThis.navigator?.userAgent || '', touch = globalThis.navigator?.maxTouchPoints || 0) {
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && touch > 1); // iPads say they're Macs
  if (ios) return /CriOS/.test(ua) ? 'ios-chrome' : /FxiOS|EdgiOS/.test(ua) ? 'ios-other' : 'ios-safari';
  if (/Android/.test(ua)) return /SamsungBrowser/.test(ua) ? 'android-samsung' : /Firefox/.test(ua) ? 'android-firefox' : 'android-chrome';
  if (/Edg\//.test(ua)) return 'desktop-edge';
  if (/Firefox\//.test(ua)) return 'desktop-firefox';
  if (/Chrome\//.test(ua)) return 'desktop-chrome';
  if (/Safari\//.test(ua) && /Macintosh/.test(ua)) return 'mac-safari';
  return 'other';
}
export const HOME_STEPS = {
  'ios-safari': ['iPhone or iPad', ['Tap the Share button (the square with an arrow) at the bottom of the screen.', 'Scroll down and tap <b>Add to Home Screen</b>.', 'Tap <b>Add</b>.']],
  'ios-chrome': ['iPhone or iPad, Chrome', ['Tap the Share button (the square with an arrow) at the top right, next to the address.', 'Tap <b>Add to Home Screen</b>.', 'Tap <b>Add</b>.']],
  'ios-other': ['iPhone or iPad', ['Tap the Share button (the square with an arrow).', 'Tap <b>Add to Home Screen</b>.', 'Tap <b>Add</b>.']],
  'android-chrome': ['Android', ['Tap the menu (three dots) at the top right.', 'Tap <b>Add to Home screen</b> (or <b>Install app</b>).', 'Tap <b>Install</b> or <b>Add</b>.']],
  'android-samsung': ['Samsung', ['Tap the menu (three lines) at the bottom right.', 'Tap <b>Add page to</b>, then <b>Home screen</b>.', 'Tap <b>Add</b>.']],
  'android-firefox': ['Android, Firefox', ['Tap the menu (three dots).', 'Tap <b>Add to Home screen</b> (or <b>Install</b>).', 'Tap <b>Add</b>.']],
  'desktop-chrome': ['Computer, Chrome', ['Click the install icon at the right of the address bar (a screen with a down arrow).', 'Click <b>Install</b>.']],
  'desktop-edge': ['Computer, Edge', ['Click the menu (three dots) at the top right.', 'Choose <b>Apps</b>, then <b>Install this site as an app</b>.']],
  'mac-safari': ['Mac, Safari', ['Open the <b>File</b> menu.', 'Choose <b>Add to Dock</b>, then click <b>Add</b>.']],
  'desktop-firefox': ['Computer, Firefox', ['Firefox can\'t add apps to a computer. Open this page in Chrome or Edge to install it, or bookmark it.']],
  other: ['This device', ['Open your browser\'s menu and look for <b>Add to Home Screen</b> or <b>Install app</b>.']],
};
