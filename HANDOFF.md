# Handoff: Animal Welfare Companion (Bunurong Wildlife Care)

Last updated 25 October 2026. For the next Claude Code session.

## What it is

- **Purpose:** a phone web app for wildlife carers and vets at Bunurong Wildlife Care (Inverloch, Victoria). It also covers Queensland.
- **What users do:** a vet or carer types or talks, sometimes leaving details out. The app writes a best-practice guide that other carers can follow, filling the gaps from checked sources. The user reviews it, then shares it.
- **Owner:** Ash (Ashley Pettit). His mum is a Bunurong carer.
- **Live site:** https://ashley-pettit.github.io/Vet-consult/care/
- **Claude artifact (single-file build):** https://claude.ai/artifact/Uusjv2zy1ZUN5KQGs3WyW2
- **Repo:** `Ashley-Pettit/Vet-consult`.
  - `main` is the older RSPCA "Consult Scribe" app, served at the site root.
  - `bunurong-wildlife` is this app, served at `/care/`.

## Branches right now

| Branch | State |
|---|---|
| `bunurong-wildlife` | **Live.** Includes the simpler mic and QA loops 1 to 10 (prompt fixes, ranges filtering, video tweaks), with examples baked. |

## How to ship (standing workflow after every change)

1. `npm run build`
2. If any prompt text in `src/note.js` (or anything else that feeds a prompt) changed, re-bake the examples. Skipping this doesn't break anything, but example runs go live (slow and costly) instead of instant.
   - `FRESH=1 PAR=8 BAKE_LOG=/tmp/bake-log.json npm run bake` (about 15 to 20 minutes; real AI calls through the proxy)
   - `npm run build && node scripts/qa/replay.mjs`: expect every line to start with `OK`. There are 82 lines, covering Vic and Qld.
   - If replay already shows 82 `OK` lines with `calls=0`, the bake matches the prompts and doesn't need re-running.
3. Commit with the attribution lines. Push `bunurong-wildlife`.
4. Deploy. Pushing the branch doesn't deploy: the workflow on `main` builds the branch into `/care/`.
   - `gh workflow run "Test and deploy" -R Ashley-Pettit/Vet-consult --ref main`
   - Then `gh run watch <id> -R Ashley-Pettit/Vet-consult --exit-status`
5. Publish the artifact. Use the Artifact tool with `url` = the artifact link above and `file_path` = `dist-artifact/care-scribe.html`.
6. **End the update message with the website link.**

### In a Claude Code cloud container

- The network policy blocks the proxy (`care-scribe-proxy.ashley-98e.workers.dev`), so baking and `scripts/qa/run.mjs` only work after Ash adds it under Allowed domains.
- The project's Playwright 1.48.2 looks for `chromium-1140`. Point it at the preinstalled browser before replay or e2e:
  `mkdir -p /opt/pw-browsers/chromium-1140/chrome-linux && ln -sf /opt/pw-browsers/chromium /opt/pw-browsers/chromium-1140/chrome-linux/chrome`

## Ash's standing preferences

- **Writing style:** Australian English, no em dashes, short ADHD-friendly bullets, plain and not AI-sounding. Fix first, explain briefly.
- **Updates:** give updates as you go (SendUserMessage) on long jobs.
- **Tests:** don't run the test suites unless he asks; the deploy workflow runs them anyway. When he asks for e2e, run them.
- **Accuracy beats speed.** Anything that speeds up the AI but lowers accuracy is a fail. Never change the models or model settings to get speed.
- **Generate on demand:** Word and PDF are built only when the user taps them, with a loader, never in advance.
- **No streaming UI.** He said no to it.
- **Videos:** each plan shows one "how to care for this animal" video. MOP plans show the same care video too.
  - Australian sources are preferred but not required.
  - Overseas videos carry a **bold** "From X: follow local advice from your vet or wildlife expert."
- **RSPCA material:** internal. It must not be learned from, quoted or shared. The "rspca" access code is not a security measure.
- **Secrets:** the Cloudflare token stays out of the repo. Ask Ash if you need it for `proxy/`.
- **Quiet nights:** if he says he's going to sleep, keep working quietly, with no notifications that beep his phone.

## Architecture in brief

- **Build:** `scripts/build.mjs` (esbuild).
  - `dist/` is the ESM website with code-split chunks.
  - `dist-artifact/care-scribe.html` is one inline IIFE file for Claude.
  - `__NO_PDF__` is true for the artifact, so pdfmake is left out there and Claude falls back to Word.
- **AI:** `src/ai.js` calls the Cloudflare Worker proxy `care-scribe-proxy.ashley-98e.workers.dev`; the code is in `proxy/`.
  - Models: Sonnet 5.5 by default, Haiku for polish, Opus for media.
  - Prompt caching splits at `CACHE_SPLIT`.
  - `sendTail()` adds today's date and a speed line at send time, outside the bake key. It about halved thinking time with no quality loss.
- **Prompts:** all in `src/note.js`.
  - `buildCarePrompt` and the shared carer rules (around line 230 to 270).
  - Per-tab rules in the docs map: `intake`, `log`, `tovet`, `mop`, `funding`, `media`, `witness`.
  - `buildAmendPrompt` is the "Change plan" step.
- **Baked examples:** `src/baked-examples.js`, keyed by `bakeKey(prompt)` (`src/baked.js`).
  - Made by `scripts/bake-examples.mjs`.
  - Never hand-edit it, and never regenerate `src/template-examples.js` (the templates).
- **Checked knowledge:**
  - `src/species-*.js`: species points with sources.
  - `src/feeding-data.js`, `src/feeding.js`: the feed calculator, from Wombaroo charts.
  - `src/species-ranges.js`: normal ranges. `rangesForAnimal(id, state, context)` drops young rows for adults, early-fur rows for furred joeys, and joey-only vitals for adults, and keeps only the named species' row.
  - `src/sources-*.js`: the cited sources.
- **Videos:** `src/videos.js`. `CARE_VIDEOS` (by species group) and `CARE_CONDITIONS` (condition words, then video). Pick with `careVideoFor(group, context, tags)`.
- **Screens:** `src/app.js`.
  - The care plan renders in `renderCare`.
  - `leaveIt(c)` hides ranges and the tick sheet for "leave it in the wild" plans.
  - Fridge print: `printSheet` prints on desktop and gives a PDF on phones.
  - Share sheet: PDF first, then Word.
- **Printouts:** `src/word.js` builds one model, used by `src/word-docx.js` (Word) and `src/pdf.js` (PDF).
  - Word uses zero side margins with content indented, so the brand band runs edge to edge.

## Live QA harness (`scripts/qa/`)

- **`run.mjs`** runs realistic inputs through the built app against the real proxy, then saves on-screen text, screenshots, prompts, outputs and timings to `qa-out/<TAG>/` (gitignored).
  - `npm run build && SCEN=scenarios.example.json TAG=L1 PAR=3 node scripts/qa/run.mjs`
  - Scenario fields: `{id, role: "carer"|"vet", mode, region?: "vic"|"qld", text, change?}`.
    - Modes: `carer`, `intake`, `log`, `tovet`, `mop`, `funding`, `vet`, `polish`, `media`, `witness`.
    - `change` also tests the Change plan step.
  - `ONLY=id1,id2` runs a subset.
- **`replay.mjs`** checks that the baked examples answer without an AI call.
- **`sim.mjs`** is for when the proxy is blocked (cloud containers): it runs the scenarios through the built app and saves each prompt it sends to `qa-out/sim/prompts/`.
  - Answer each prompt with Claude on the model the app asked for (one subagent per prompt, reply saved to `qa-out/sim/replies/<key>.txt`), then run it again. Repeat until nothing is pending (a plan made from a note, or a Change, sends follow-up prompts).
  - `npm run build && SCEN=scenarios.vet.json node scripts/qa/sim.mjs`; results land in `qa-out/sim/out/`.
  - The replies come from Claude but not through the app's own settings, so treat them as close to live, not identical.
- **What to review in each output:**
  - accuracy against best practice;
  - nothing repeated across sections;
  - nothing invented;
  - the right video and ranges for the age;
  - easy to read on a phone.

## Open items

- **Small things seen in loop 10, not fixed:**
  - In the witness statement, the plain-words gloss of "pressure sores" still mentions a hard surface (a generic definition, so it was left).
- **Vet QA, 25 October (fixed in code, no re-bake needed):**
  - Brands the vet never said come out of notes and polish (`dropUnsaidBrands` in `src/drugs.js`). Prompts still carry the name as Claude wrote it (`asWritten` in `src/note.js`), so baked replies keep matching.
  - Adult wildlife vitals are flagged against `species-ranges.js` (`wildlifeRanges` in `src/clinical.js`).
  - "1 mL per 10 kg" doses get a total; the sum shows the rate only; wordy dose parts are split with semicolons in copied text.
  - "Early fur just coming through" keeps the lightly furred pouch rows.
  - The feed calculator says when the chart's milk stage differs from the vet's.
  - Findings that only repeat a vital are dropped; vets on phones don't get the photo banner.
- **Vet QA, 25 October (prompt changes, queued in `BACKLOG.md`):** they change bake keys, so do them where the proxy is reachable and re-bake.
- **AI cost and speed, 25 October:**
  - Background drafts (the care plan an intake starts, a vet's clinical notes after a plan) are full AI calls. They now stop on a device after three unused in a row and come back once one is opened (`maybeExtra` in `src/app.js`, `wantsExtra` in `src/storage.js`). Built-in examples always get them; plans reopened from Recent never start them.
  - The website preconnects to the proxy while it loads.
  - **To check:** commit e59d1e3 said the proxy that accepts cached prompt blocks was "not yet deployed". If the live worker is older, the first call in every session is refused, retried without caching, and nothing is cached. Deploy `proxy/` with `npx wrangler deploy` (needs Ash's Cloudflare login) to be sure.
  - Looked at and left alone, for accuracy: the feeding rows and source key points (most of a care plan's prompt) are per animal and needed; trimming them by stage risks losing the row that applies.
- **Known and accepted:**
  - Koala MOP shows a koala feeding video (his choice).
  - Roof-possum MOP has no legal removal advice (no checked source).
  - Funding drafts repeat figures (normal for grants).
- **Backlog:** see `BACKLOG.md` (weight tracker, vet dose calculator, database and sign-in, reminders branch, Qld after-hours numbers, more Australian videos, bird feed charts).
