# Consult Scribe

Talk through a vet consult. Get a formal SOAP clinical note ready to paste into the clinical notes in your practice management system (PMS), such as ezyVet or RxWorks.

Built as a prototype for RSPCA shelter vet teams. **Live app:** https://ashley-pettit.github.io/Vet-consult/

## How a vet uses it

1. Pick the note type: **Consult**, **Intake**, **Inspectorate**, **Surgery**, **Vaccination**, **Post-op** or **Euthanasia**.
2. Tap the mic and talk through the consult. In the Claude app the mic hands over to the phone keyboard's own voice typing.
3. Tap **Create note**. It works while the mic is still on.
4. Read **Check before saving**. Tap **Answer** on any item to fill the gap by voice or typing, and the note updates.
5. Copy each part into its own PMS field: **Clinical notes**, **Prescriptions** and **Reminders** (with due dates).
6. Optional: tap **Care sheet** for plain-English instructions for the foster carer or adopter.

### Features

- **Several animals:** switch it on for a litter or a seizure and get one note per animal.
- **Photos:** attach up to 5. They are shrunk on the device and described objectively under "From photos".
- **Dose totals:** mg/kg doses show the total for the patient's weight, marked "Calculated". Never written into the note.
- **Species ranges:** temp, HR and RR outside the usual range for dogs, cats, rabbits, guinea pigs and ferrets are flagged.
- **How it works:** the ? button in the header (or `#how-it-works`) opens a short tour for new users.

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
- **Nothing is kept on a server by this app.** The dictation draft is kept in the browser tab only and is cleared with Start over or New consult.
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
