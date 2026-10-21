// "How it works": a short, user-first tour of what Consult Scribe does for a shelter vet.
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
  <h1 tabindex="-1">Spend your time on the animals, not the keyboard</h1>
  <p class="lede">Talk through the consult the way you would to a colleague. Consult Scribe turns it into tidy SOAP notes, ready to paste into your PMS before the next patient is on the table.</p>
  <div class="hero-ctas">
    <button type="button" class="btn primary" data-action="start">Start a consult</button>
    <button type="button" class="btn ghost" data-action="example">Try the example</button>
  </div>
  <div class="mock" aria-hidden="true">
    <div class="mock-said">
      <span class="mock-label">You say</span>
      <p>“Rusty, kelpie cross, stray. Temp 39.4, heart rate 120. Four centimetre lac on the left fore, sutured. Cephalexin 22 mg per kg twice a day for a week…”</p>
    </div>
    <div class="mock-arrow">${I.mic}</div>
    <div class="mock-note">
      <span class="mock-label">You get</span>
      <p><b>S</b> Stray presented by inspector, left forelimb lameness.</p>
      <p><b>O</b> T 39.4 °C <span class="mock-pill">High</span> · HR 120 bpm · 4 cm laceration, lateral L forelimb.</p>
      <p><b>A</b> 1. Laceration, left forelimb</p>
      <p><b>P</b> Cephalexin 22 mg/kg PO BID x 7 days <span class="mock-calc">= 312.4 mg</span></p>
    </div>
  </div>
</div>

<section class="about-sec">
  <h2>Three steps, every consult</h2>
  <ol class="steps">
    <li><span class="step-n">1</span><div><h3>Talk</h3><p>Tap the big mic and talk through history, exam, assessment and plan. Pause, ramble, correct yourself. It copes.</p></div></li>
    <li><span class="step-n">2</span><div><h3>Check</h3><p>The note arrives with a short <b>Check before saving</b> list at the top: a missing dose, an odd vital, a word it might have misheard.</p></div></li>
    <li><span class="step-n">3</span><div><h3>Paste</h3><p>Copy the clinical notes, prescriptions and reminders straight into the right fields in your PMS. Done.</p></div></li>
  </ol>
</section>

<section class="about-sec">
  <h2>Built for how shelter vets actually work</h2>
  <div class="feats">
    ${feature(I.clip, 'Paste straight into the right PMS field', 'Clinical notes, prescriptions and reminders each get their own copy button, with reminder due dates worked out for you. No more retyping the same plan three times.')}
    ${feature(I.pill, 'Doses worked out, for you to confirm', 'Say “22 mg per kg” and you’ll see the total for this patient’s weight beside it. It’s a prompt, never written into the record without you.')}
    ${feature(I.ask, 'Fill the gaps without typing', 'Forgot to say who consented, or the sedation dose? Tap Answer on the check item, say it, and the note updates in the right place.')}
    ${feature(I.heart, 'Carer plans grounded in Queensland guidance', 'Medications, a day-by-day plan, housing, feeding and, for wildlife, release. Based on the Queensland code of practice and other checked Australian sources, with the vet only for escalations.')}
    ${feature(I.paws, 'A litter or a seizure? Dictate the lot', 'Just talk through each animal. Consult Scribe spots that there are several and writes a separate note for every one, with the shared case details in each.')}
    ${feature(I.cam, 'Photos that become findings', 'Add photos of wounds or body condition. Claude describes only what is clearly visible, objectively, so inspectorate notes stay evidence-ready.')}
    ${feature(I.pulse, 'Odd vitals get flagged', 'Temperatures, heart rates and resp rates outside the usual range for dogs, cats, rabbits, guinea pigs and ferrets are highlighted so you can double-check.')}
    ${feature(I.list, 'Four outputs from one recording', 'Clinical notes for the PMS, a carer plan, a formal inspector report or a friendly adoption summary. Just say what it is: a consult, intake, surgery or euthanasia is written the way that record should be.')}
  </div>
</section>

<section class="about-sec">
  <h2>Made for a busy clinic floor</h2>
  <ul class="ticks">
    <li><b>One-handed and phone-first.</b> Big buttons, a mic you can hit with a gloved thumb, and the screen stays awake while you talk.</li>
    <li><b>Speaks vet.</b> Australian English, metric units and the abbreviations you already use: PO, SC, BID, BCS 3/9, CRT.</li>
    <li><b>Never invents.</b> If you didn’t say it, it isn’t in the note. Anything it had to assume is marked and added to the check list.</li>
    <li><b>Tells you if it stops listening.</b> A double beep and a buzz, so you’re not talking to a sleeping phone.</li>
  </ul>
</section>

<section class="about-sec safe">
  <div class="safe-icon">${I.shield}</div>
  <div>
    <h2>You stay in charge of the record</h2>
    <p>Consult Scribe drafts. The vet decides. Nothing is saved to a server by the app and it never writes to your PMS on its own. Every note, dose and care sheet is reviewed and pasted by a person.</p>
  </div>
</section>

<section class="about-sec">
  <h2>Questions vets ask</h2>
  <details class="faq"><summary>Do I need to change how I talk?</summary><p>No. Talk the way you would to a nurse or colleague. Say “full stop” or “new line” if you like, but you don’t have to.</p></details>
  <details class="faq"><summary>Does it connect to our PMS?</summary><p>It works with any PMS by copy and paste, so there’s nothing to install or integrate. Each part goes into its own field.</p></details>
  <details class="faq"><summary>What if it mishears a drug name?</summary><p>It corrects obvious veterinary mishearings and tells you it did, in the check list, so you can confirm before saving.</p></details>
  <details class="faq"><summary>Which devices does it work on?</summary><p>Phones, tablets and computers. On a phone it uses your keyboard’s own voice typing, which is fast and accurate on both iPhone and Android.</p></details>
  <details class="faq"><summary>Where does my dictation go?</summary><p>Your words are turned into text by your phone or browser’s voice typing (Apple, Google or Microsoft, depending on the device), and the note is written by Claude. Nothing is stored by Consult Scribe. Avoid dictating owner contact details unless your organisation has approved it.</p></details>
</section>

<div class="about-cta">
  <h2>Ready for your next consult?</h2>
  <button type="button" class="btn primary" data-action="start">Start a consult</button>
</div>
`;
