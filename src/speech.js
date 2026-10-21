import { isNative, NativeDictation } from './native.js';
// Thin, resilient wrapper around the browser's Web Speech API.
// Emits: onstate('idle'|'starting'|'listening'), oninterim(text), onfinal(text), onerror(code)

export function speechSupported(win = globalThis) {
  return Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
}

// 'network' is retried (Wi-Fi blips) and only reported if retries keep failing.
const FATAL = new Set(['not-allowed', 'service-not-allowed', 'audio-capture', 'language-not-supported']);
const QUICK_END_MS = 2000; // a session shorter than this counts as a failed restart
const MAX_QUICK_FAILS = 5;

class WebDictation {
  constructor({ lang = 'en-AU', win = globalThis, now = () => Date.now() } = {}) {
    this.win = win;
    this.lang = lang;
    this.now = now;
    this.rec = null;
    this.state = 'idle';
    this.wanted = false; // the user wants to keep listening
    this.quickFails = 0;
    this.hadSession = false; // at least one session started in this run
    const ua = (win.navigator && win.navigator.userAgent) || '';
    // Android Chrome repeats cumulative finals in continuous mode, so use short sessions there.
    this.continuous = !/Android/i.test(ua);
    this.onstate = () => {};
    this.oninterim = () => {};
    this.onfinal = () => {};
    this.onerror = () => {};
  }

  get supported() {
    return speechSupported(this.win);
  }

  _set(state) {
    if (this.state === state) return;
    this.state = state;
    this.onstate(state);
  }

  start() {
    if (!this.supported) {
      this.onerror('unsupported');
      return false;
    }
    if (this.wanted) return true;
    this.wanted = true;
    this.quickFails = 0;
    this.hadSession = false;
    this._open();
    return true;
  }

  _open() {
    const SR = this.win.SpeechRecognition || this.win.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = this.lang;
    rec.continuous = this.continuous;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    this.rec = rec;
    const openedAt = this.now();
    let failed = null;
    let started = false;
    let hardError = null;
    if (this.state === 'idle') this._set('starting');

    const mine = () => this.rec === rec;
    rec.onstart = () => {
      if (!mine()) return;
      started = true;
      this.hadSession = true;
      this._set('listening');
    };
    rec.onresult = (e) => {
      if (!mine()) return;
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        const t = r[0] && r[0].transcript ? r[0].transcript : '';
        if (r.isFinal) {
          if (t.trim()) {
            this.quickFails = 0;
            this.onfinal(t.trim());
          }
        } else interim += t;
      }
      this.oninterim(interim.trim());
    };
    rec.onerror = (e) => {
      if (!mine()) return;
      const code = e && e.error ? e.error : 'unknown';
      if (code === 'no-speech' || code === 'aborted') return; // harmless; onend restarts if wanted
      hardError = code;
      if (FATAL.has(code)) {
        this.wanted = false;
        // Some browsers refuse to restart without a fresh tap. After a session that worked, that is a pause, not a block.
        failed = (code === 'not-allowed' || code === 'service-not-allowed') && this.hadSession ? 'interrupted' : code;
      }
    };
    rec.onend = () => {
      if (!mine()) return;
      this.oninterim('');
      if (this.wanted) {
        // A session only counts as failed if it never started or hit a real error quickly.
        // Short silent sessions (some browsers end them fast) are normal during a quiet exam.
        const quick = this.now() - openedAt < QUICK_END_MS;
        this.quickFails = !started || (hardError && quick) ? this.quickFails + 1 : 0;
        if (this.quickFails < MAX_QUICK_FAILS) {
          // Browsers end recognition after silence or a time limit. Carry on with a fresh instance.
          this.rec = null;
          this.restartTimer = setTimeout(() => {
            this.restartTimer = null;
            if (this.wanted) this._open();
          }, this.continuous ? 50 : 250);
          return;
        }
        failed = hardError === 'network' ? 'network' : 'interrupted';
      }
      this.wanted = false;
      this.rec = null;
      this._set('idle');
      if (failed) this.onerror(failed);
    };
    try {
      rec.start();
    } catch {
      this.wanted = false;
      this.rec = null;
      this._set('idle');
      this.onerror('start-failed');
    }
  }

  _clearRestart() {
    if (this.restartTimer) clearTimeout(this.restartTimer);
    this.restartTimer = null;
  }

  /** Stop listening but keep any words still being processed. */
  stop() {
    this.wanted = false;
    this._clearRestart();
    const rec = this.rec;
    if (!rec) {
      this._set('idle');
      return;
    }
    try {
      rec.stop();
    } catch {
      this.rec = null;
      this._set('idle');
      return;
    }
    // Watchdog: some browsers never fire onend (for example a stop while starting). Don't leave the UI listening.
    setTimeout(() => {
      if (this.rec === rec && !this.wanted) {
        this.rec = null;
        try {
          rec.abort();
        } catch {
          /* ignore */
        }
        this.oninterim('');
        this._set('idle');
      }
    }, 1500);
  }

  /** Stop immediately and discard anything still pending. */
  cancel() {
    this.wanted = false;
    this._clearRestart();
    const rec = this.rec;
    this.rec = null;
    if (rec) {
      try {
        rec.abort();
      } catch {
        /* already stopped */
      }
    }
    this.oninterim('');
    this._set('idle');
  }
}

export function speechErrorMessage(code) {
  switch (code) {
    case 'unsupported':
      return 'This browser can’t take dictation. Use Chrome, Edge or Safari, or tap the box below and use your keyboard’s mic key.';
    case 'not-allowed':
    case 'service-not-allowed':
      return 'Microphone access is blocked. Allow the microphone for this site in your browser settings, then tap the mic again.';
    case 'audio-capture':
      return 'No microphone was found. Check one is connected, then tap the mic again.';
    case 'network':
      return 'Dictation needs an internet connection. Check the connection, then tap the mic again.';
    case 'interrupted':
      return 'Dictation paused. Tap the mic to carry on.';
    case 'language-not-supported':
      return 'This browser can’t dictate in Australian English. Try Chrome, Edge or Safari.';
    case 'start-failed':
      return 'The microphone couldn’t start. Tap the mic to try again.';
    default:
      return 'Dictation stopped unexpectedly. Tap the mic to carry on.';
  }
}

/** The Android app uses the phone's own recogniser; browsers use the Web Speech API. */
export const Dictation = isNative ? NativeDictation : WebDictation;
