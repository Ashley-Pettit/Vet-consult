// Thin, resilient wrapper around the browser's Web Speech API.
// Emits: onstate('idle'|'starting'|'listening'), oninterim(text), onfinal(text), onerror(code)

export function speechSupported(win = globalThis) {
  return Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
}

export class Dictation {
  constructor({ lang = 'en-AU', win = globalThis } = {}) {
    this.win = win;
    this.lang = lang;
    this.rec = null;
    this.state = 'idle';
    this.wanted = false; // user wants to keep listening
    this.restarts = 0;
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
    this.restarts = 0;
    this._open();
    return true;
  }

  _open() {
    const SR = this.win.SpeechRecognition || this.win.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = this.lang;
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    this.rec = rec;
    this._set('starting');

    rec.onstart = () => {
      this._set('listening');
    };
    rec.onaudiostart = () => this._set('listening');
    rec.onresult = (e) => {
      this.restarts = 0;
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        const t = r[0] && r[0].transcript ? r[0].transcript : '';
        if (r.isFinal) {
          if (t.trim()) this.onfinal(t.trim());
        } else interim += t;
      }
      this.oninterim(interim.trim());
    };
    rec.onerror = (e) => {
      const code = e && e.error ? e.error : 'unknown';
      if (code === 'no-speech' || code === 'aborted') return; // harmless; onend restarts if wanted
      if (code === 'not-allowed' || code === 'service-not-allowed' || code === 'audio-capture') {
        this.wanted = false;
      }
      this.onerror(code);
    };
    rec.onend = () => {
      this.oninterim('');
      if (this.rec !== rec) return;
      // Browsers end recognition after silence or ~60 s. Restart quietly while the user still wants it.
      if (this.wanted && this.restarts < 20) {
        this.restarts++;
        try {
          rec.start();
          return;
        } catch {
          /* fall through */
        }
      }
      this.wanted = false;
      this.rec = null;
      this._set('idle');
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

  stop() {
    this.wanted = false;
    if (this.rec) {
      try {
        this.rec.stop();
      } catch {
        /* already stopped */
      }
    } else this._set('idle');
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
    case 'start-failed':
      return 'The microphone couldn’t start. Tap the mic to try again.';
    default:
      return 'Dictation stopped unexpectedly. Tap the mic to carry on.';
  }
}
