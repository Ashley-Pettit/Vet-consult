# Consult Scribe

Talk through a vet consult. Get a formal SOAP clinical note ready to paste into the medical system.

Built as a prototype for RSPCA shelter vet teams. **Live app:** https://ashley-pettit.github.io/Vet-consult/

## How a vet uses it

1. Pick the note type: **Consult**, **Intake** or **Inspectorate** (objective, evidential wording).
2. Tap the mic and talk: the animal, history, exam, vitals, what was done and the plan.
3. Tap the mic again to stop. Fix any misheard words in the box.
4. Tap **Create note**.
5. Read the **Check before saving** list first. It flags missing details, assumed values and risky combinations.
6. Tap **Copy note** and paste it into the patient record.

Tips:

- Say "full stop", "comma" or "new line" to punctuate. "Period" and "colon" are left as words because they are clinical terms.
- Press **Ctrl + Enter** to create the note from the keyboard.
- The screen stays awake while the mic is on.
- The app installs to a phone or tablet home screen (Add to Home Screen).

## Connecting to Claude

The app writes notes with Claude. It uses the first connection available:

| Connection | When | Set up |
| --- | --- | --- |
| Claude runtime | Opened as a Claude artifact | Nothing to do |
| Organisation proxy | Production | Deploy `/proxy` and set `proxyUrl` in `src/config.js` |
| Personal API key | Trials and demos | Settings, paste a key from the Claude Console |

A personal key is stored only on that device, and only if "Remember on this device" is ticked. Otherwise it is cleared when the tab closes.

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

- **The vet owns the record.** Every note must be reviewed before saving. The app never writes to the medical system itself.
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
src/note.js          prompt, parsing, plain-text CRM format
src/config.js        deployment settings
proxy/worker.js      server-side key proxy
tests/               unit (node:test) and end-to-end (Playwright)
```
