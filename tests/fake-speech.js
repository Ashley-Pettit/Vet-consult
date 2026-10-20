// A scriptable stand-in for the browser SpeechRecognition API.
// Works in Node (unit tests) and is injected into the page for end-to-end tests.
export function installFakeSpeech(win, opts = {}) {
  const state = { instances: [], denied: Boolean(opts.denied) };
  class FakeRecognition {
    constructor() {
      this.running = false;
      state.instances.push(this);
      state.current = this;
    }
    start() {
      if (this.running) throw new Error('InvalidStateError');
      this.running = true;
      setTimeout(() => {
        if (state.denied) {
          this.onerror && this.onerror({ error: 'not-allowed' });
          this.running = false;
          this.onend && this.onend();
          return;
        }
        if (!state.neverStart) this.onstart && this.onstart();
      }, 5);
    }
    stop() {
      if (!this.running) return;
      this.running = false;
      setTimeout(() => this.onend && this.onend(), 5);
    }
    abort() {
      this.stop();
    }
  }
  win.SpeechRecognition = FakeRecognition;
  win.webkitSpeechRecognition = FakeRecognition;
  // Speak a phrase: interim first, then final.
  win.__fakeSay = (text, { final = true } = {}) => {
    const r = state.current;
    if (!r || !r.running || !r.onresult) return false;
    const result = [{ transcript: text }];
    result.isFinal = final;
    r.onresult({ resultIndex: 0, results: [result] });
    return true;
  };
  // Simulate the browser ending recognition by itself (silence timeout).
  win.__fakeEnd = () => {
    const r = state.current;
    if (!r) return;
    r.running = false;
    r.onend && r.onend();
  };
  win.__fakeSpeech = state;
  return state;
}
