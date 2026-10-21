// "How it works": a short tour of Care Scribe for wildlife carers at Bunurong Wildlife Care, and the vets they work with.
// Static, trusted markup only.
const icon = (d) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

const I = {
  mic: icon('<rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 10.5a7 7 0 0 0 14 0M12 17.5v4"/>'),
  clip: icon('<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>'),
  pill: icon('<rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-35 12 12)"/><path d="M9.5 8.5l5 7"/>'),
  ask: icon('<path d="M4 5h16v11H9l-5 4z"/><path d="M9 10h6"/>'),
  heart: icon('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
  paws: icon('<circle cx="7" cy="9" r="1.8"/><circle cx="12" cy="6.5" r="1.8"/><circle cx="17" cy="9" r="1.8"/><path d="M8 17c0-2.8 1.8-5 4-5s4 2.2 4 5c0 1.7-1.6 2-4 2s-4-.3-4-2z"/>'),
  cam: icon('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
  pulse: icon('<path d="M3 12h4l2-5 4 10 2-5h6"/>'),
  list: icon('<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>'),
  pin: icon('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
  cal: icon('<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>'),
  steth: icon('<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v3a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="12" r="2"/>'),
  shield: icon('<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>'),
};

const feature = (ic, title, body) => `
  <article class="feat">
    <div class="feat-icon">${ic}</div>
    <h3>${title}</h3>
    <p>${body}</p>
  </article>`;

export const ABOUT_HTML = `
<div class="hero">
  <p class="eyebrow">How it works</p>
  <h1 tabindex="-1">More time with the animals, less time writing it up</h1>
  <p class="lede">Talk through the rescue, the day’s care or what you want to ask the vet, the way you would to another carer. Care Scribe writes it up properly, ready to copy into your records, a text or an email.</p>
  <div class="hero-ctas">
    <button type="button" class="btn primary" data-action="start">Start talking</button>
    <button type="button" class="btn ghost" data-action="example">Try the example</button>
  </div>
  <div class="mock" aria-hidden="true">
    <div class="mock-said">
      <span class="mock-label">You say</span>
      <p>“Wombat, car strike on the Bass Highway near Kilcunda, picked her up at 9.40. About 24 kilos, bad mange on her flanks, graze on the left shoulder…”</p>
    </div>
    <div class="mock-arrow">${I.mic}</div>
    <div class="mock-note">
      <span class="mock-label">You get</span>
      <p><b>Where found</b> Gravel pull-over, south side of the Bass Highway, east of the Kilcunda bridge</p>
      <p><b>Animal</b> Bare-nosed wombat, adult female, 24 kg</p>
      <p><b>Condition</b> Severe mange, flanks and back; graze, left shoulder</p>
      <p><b>Check</b> Wildlife Victoria case number?</p>
    </div>
  </div>
</div>

<section class="about-sec">
  <h2>Four tools for carers</h2>
  <div class="feats">
    ${feature(I.pin, 'Intake record', 'Just picked one up? Talk through where, when and what you saw. The exact rescue spot is kept word for word, so release goes back to the right place, and anything missing for your register is flagged. A care plan for right now starts at the same time: tap <b>Need advice right now?</b> to open it.')}
    ${feature(I.cal, 'Daily care log', 'Weight, feeds, meds, toileting and behaviour in one tidy entry. If something sounds worrying, like weight loss or going off food, it suggests a vet check.')}
    ${feature(I.heart, 'Care plan', 'Handing an animal to another carer? Get a complete plan: medications, a day-by-day routine, housing, feeding and release, based on Victorian wildlife guidance, with the species-specific points right where you need them.')}
    ${feature(I.steth, 'For the vet', 'Before a vet visit, talk through what’s been happening. You get a one-minute summary with your questions written out, so nothing gets forgotten in the room.')}
  </div>
</section>

<section class="about-sec">
  <h2>Three steps</h2>
  <ol class="steps">
    <li><span class="step-n">1</span><div><h3>Pick and talk</h3><p>Choose what you’re making, tap the big mic and talk. Pause, ramble, correct yourself. It copes.</p></div></li>
    <li><span class="step-n">2</span><div><h3>Check</h3><p>A short <b>check</b> list shows anything missing or unclear, like a case number or an exact location.</p></div></li>
    <li><span class="step-n">3</span><div><h3>Copy</h3><p>Copy it into your records, a spreadsheet, a text or an email. Tap <b>Add more info</b> if you forgot something.</p></div></li>
  </ol>
</section>

<section class="about-sec">
  <h2>Working with a vet?</h2>
  <p>Hand them the app. Under the picker, tap <b>Are you the vet? Switch to vet tools</b>. Shorthand is fine. They get a <b>care plan</b> written for you, and <b>clinical notes</b> to copy straight into their own system, both from the same few words. Tap the same link to switch back.</p>
</section>

<section class="about-sec">
  <h2>Made for carers on the go</h2>
  <ul class="ticks">
    <li><b>Phone-first.</b> Big buttons, a mic you can hit with a gloved thumb, and the screen stays awake while you talk.</li>
    <li><b>Never invents.</b> If you didn’t say it, it isn’t in the record. Doses are only ever written as you said them.</li>
    <li><b>Photos help.</b> Add a photo of a wound or the animal’s coat and it describes only what’s clearly visible.</li>
    <li><b>Tells you if it stops listening.</b> A double beep and a buzz, so you’re not talking to a sleeping phone.</li>
  </ul>
</section>

<section class="about-sec safe">
  <div class="safe-icon">${I.shield}</div>
  <div>
    <h2>You stay in charge</h2>
    <p>Care Scribe drafts. You decide. Nothing is saved to a server by the app. Check every record, and always follow your vet’s instructions for medications.</p>
  </div>
</section>

<section class="about-sec">
  <h2>Questions</h2>
  <details class="faq"><summary>Do I need to talk a special way?</summary><p>No. Talk the way you would to another carer. Say “full stop” or “new line” if you like, but you don’t have to.</p></details>
  <details class="faq"><summary>What if it mishears a species or place?</summary><p>It fixes obvious mishearings and lists them in the check list so you can confirm.</p></details>
  <details class="faq"><summary>Which devices does it work on?</summary><p>Phones, tablets and computers. On a phone it uses your keyboard’s own voice typing, which works well on iPhone and Android.</p></details>
  <details class="faq"><summary>Where do my words go?</summary><p>Your phone or browser’s voice typing turns speech into text, and Claude writes the record. Nothing is stored by Care Scribe.</p></details>
  <details class="faq"><summary>Emergency?</summary><p>Call Wildlife Victoria 24/7 on <a href="tel:+61384007300">03 8400 7300</a>.</p></details>
</section>

<div class="about-cta">
  <h2>Ready when you are</h2>
  <button type="button" class="btn primary" data-action="start">Start talking</button>
</div>
`;
