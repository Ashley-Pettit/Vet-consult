# Consult Scribe

Talk through a vet consult. Get a formal SOAP clinical note ready to paste into the clinical notes in your practice management system (PMS), such as ezyVet or RxWorks.

Built as a prototype for RSPCA shelter vet teams. **Live app:** https://ashley-pettit.github.io/Vet-consult/

## How a vet uses it

1. Pick the output: **Clinical notes**, **Carer plan**, **Inspector report** or **Adoption summary**.
2. Tap the mic and talk. Say what it is (a consult, intake, surgery, euthanasia, a litter); Claude works out the record type and how many animals.
3. Tap **Create**. It works while the mic is still on.
4. Open **Review before saving** to answer anything missing, by voice or typing.
5. Copy it into the PMS, an email, an SMS or the inspector's file.

### Outputs

- **Clinical notes:** SOAP notes per animal, with separate copy for clinical notes, prescriptions and reminders (due dates worked out). Dose totals and species vital ranges are checked on the device.
- **Carer plan:** everything a foster carer, adopter or wildlife carer needs on their own: medications, day-by-day plan, housing, feeding, activity, a daily tick sheet and, for wildlife, release. Grounded in a checked library of Queensland sources (Australian where Queensland has none) and cited. The vet appears only for escalations.
- **Inspector report:** a formal, objective veterinary report for a Queensland animal welfare inspector, with facts kept separate from opinion and a signed declaration. No legal conclusions.
- **Adoption summary:** a friendly health history for the new owner with what's due next.
- **Photos:** attach up to 5; they are described objectively.
- **How it works:** the ? button in the header (or `#how-it-works`).

Tips:

- Say "full stop", "comma" or "new line" to punctuate. "Period" and "colon" stay as words because they are clinical terms.
- Press **Ctrl + Enter** to create the note from the keyboard.

## Connecting to Claude

| Version | Where | Claude | Mic |
| --- | --- | --- | --- |
| **Claude app version** (main) | Opened as an artifact in the Claude app | Your Claude account, no API key | Keyboard voice typing |
| **Public demo** | GitHub Pages | None: the examples work, nothing asks for a key | Live one-tap mic |
| Organisation deployment | Your own hosting | Proxy in `/proxy` holds the key | Live one-tap mic |

An optional personal API key can still be added under **Settings → Advanced**, but the app never asks for one.

## Deploying for an organisation

1. Deploy the proxy (Cloudflare Workers):
   ```bash
   cd proxy
   npx wrangler deploy
   npx wrangler secret put ANTHROPIC_API_KEY
   ```
2. Set `ALLOWED_ORIGINS` in `proxy/wrangler.toml` to the app's address.
3. Put Cloudflare Access (or the organisation's SSO) in front of the proxy so only staff can reach it. This is required: the origin check is not sign-in. In Access, turn on "Bypass options requests to origin" so browser preflight checks get through.
4. Set `proxyUrl` in `src/config.js` to the proxy address, then push. CI tests and redeploys.

With a proxy configured, staff never see or handle an API key.

## Privacy and clinical safety

- **The vet owns the record.** Every note must be reviewed before saving. The app never writes to the PMS itself.
- **Speech** is converted by the browser's speech service (Google for Chrome, Microsoft for Edge, Apple for Safari). Check this meets the organisation's privacy requirements before using it with real cases.
- **Notes** are written by Claude through the chosen connection. Avoid dictating owner names, addresses or phone numbers unless the organisation has approved it.
- **Nothing is kept on a server by this app.** The dictation draft is kept in the browser tab only and is cleared with Start over.
- Claude is told never to invent values. Anything it assumes is marked "(assumed)" and added to the check list.

## Browser support

| Browser | Live mic |
| --- | --- |
| Chrome, Edge (desktop and Android) | Yes |
| Safari (Mac, iPhone, iPad) | Yes |
| Firefox | No. Use the keyboard's own dictation key instead |

If dictation stops on its own (lost connection, browser limit), the app beeps twice and vibrates so a vet who isn't looking knows. On Android, the system may play a short tone each time listening resumes after a pause.

On any device the keyboard's dictation key also works (Windows + H on a PC).

## Development

```bash
npm install
npm run build        # dist/ (web app) and dist-artifact/ (single-file Claude artifact)
npm run serve        # http://localhost:4173
npm test             # unit tests, build, end-to-end tests
```

End-to-end tests run in Chromium at desktop and phone sizes, in light and dark themes. They use a scripted microphone and a mocked Claude API, and include axe accessibility checks.

### Layout

```
index.html           page shell
src/app.js           UI and flow
src/speech.js        microphone (Web Speech API) with auto-restart
src/ai.js            Claude connections and friendly errors
src/note.js          prompt, parsing, plain-text format for the PMS clinical notes
src/config.js        deployment settings
proxy/worker.js      server-side key proxy
tests/               unit (node:test) and end-to-end (Playwright)
```
