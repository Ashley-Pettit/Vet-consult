# Wildlife Welfare Companion: backlog

Last updated 25 October 2026. Highest value first within each group.

## Next up

| Item | What it means | Notes |
|---|---|---|
| Sharing link (done: the plan is packed into the link itself, no database) | Send a plan as a link that opens the plan in the app | Works without a database: the plan is packed (compressed) into the link itself, after the `#`, so it never reaches a server. Links are long, so best for WhatsApp, email and Messages rather than SMS. "Send a link to the app" in Share is already marked Coming soon. |
| Weight tracker | Log weights over time and chart growth | Per animal, on the device at first. Later against Wombaroo growth curves for the species. Feeds the feed calculator automatically. |
| Dose calculator for vets | mg/kg to mL from the drug's concentration | Uses the vet's own drug list in Settings for concentrations; species cautions from the checked species points shown alongside. Never suggests a dose, only does the sum. |

## Needs a database or accounts

| Item | What it means | Notes |
|---|---|---|
| Database hookup | Store records, plans and animals in care | Needed for team views, case history and short sharing links. Privacy review first: records can include addresses of finders. |
| User sign-in, remember me | Accounts so records follow the person across devices | Pairs with the database. Simple email link sign-in would suit volunteers. |
| Send to RSPCA system | Log a record into the RSPCA system through its API | Needs RSPCA's API details and permission. Keep RSPCA material server-side only. |
| Fetch case details by number | Type a Wildlife Victoria or RSPCA case number and pull in the case details | Needs an API from the organisation that holds the case. |

## Separate branch

| Item | What it means | Notes |
|---|---|---|
| Reminders | Medication and feed reminders on the phone, from the care plan | Build on its own branch (`reminders`). Calendar invites (.ics) work everywhere; push notifications need a service worker and permission. |

## Done recently

- Feed calculator (species and weight specific), release checklist with target weight, AI guidance note
- Discharge pack for vets, with clinical notes prepared in the background
- Photo analysis, photo on/off setting, Word handout styles (Bunurong, plain, RSPCA with access code)
- Feedback with an Opus retry, AI polish for edited notes, quick updates on Haiku
- Species research: mammals, birds, reptiles, frogs, QLD birds; Australian wildlife shorthand; drug names

## From the October 2026 wildlife advice review
- Queensland after-hours route: 1300 ANIMAL runs 7am to 7pm. Find and verify after-hours options (emergency vets, 24-hour rescue groups, bat rescue, snake catchers) before adding them.
- Videos: several are still overseas or a near-miss (greater glider for sugar glider, entangled cockatoo for a sick galah). Swap in Australian how-to videos as they turn up.
- Full source reads: the Wombaroo bird booklet (pages 42 to 77: waterbirds, seabirds, raptors, owls) and the DEECA Part B bird chapters couldn't be read online. Local PDF copies would let us add checked bird feeding amounts and frequencies.
- Bird and small-mammal feed charts: the calculator uses Wombaroo growth charts for kangaroos, wallabies, wombats, koalas, possums, gliders, flying-foxes and echidnas. Dasyurids, bandicoots, microbats and all birds still have no checked chart, so their figures show as unsure.
- Re-run the 32-case review (scratchpad eval harness) after big prompt changes.

## Plan library
- Share an admin's library edits with everyone: needs the database, or a small key-value store behind the proxy (Cloudflare KV) with admin sign-in. Today edits stay on the admin's device.
- Queensland versions of the ready-made plans (generate with region qld; contacts and rules differ).
- An experienced carer to read the 30 plans, especially the week numbers in each day-by-day plan.
- More animals: sugar glider, swamp wallaby, rainbow lorikeet, crimson rosella, kookaburra, microbats, frogs.

## Next re-bake

- Move `CARER_TONE` and `CARE_DOSES` (in `src/templates.js`, added to live calls only) into the prompts in `src/note.js`, then re-bake. `withLiveRules` also swaps the first-person "I'm not certain" example in `careRules`: fix it there too.

## Expert opinion (Advanced, vets)

- Web search only works once the proxy is redeployed (`cd proxy && npx wrangler deploy`). Until then the old proxy drops the search tool and opinions are written from the app's checked sources and attachments only.
- The "Possums moved in winter" example isn't baked yet, so tapping it makes a live AI call. Bake it at the next re-bake, and add a house-style example for `opinion` to `template-examples.js`.

## From the 25 October 2026 vet QA (prompt changes: re-bake after)
- Carer plans invent detail about the find site ("recorded with GPS coordinates"). Release wording should only say the location was recorded if it was said.
- Witness statements: when an opinion has no stated basis ("obvious to anyone", "needed a vet a week earlier"), add a check asking the vet for the reason.
- Media statements: "report mange" doesn't say to whom. Name a checked reporting route, or leave the instruction out.
- Carer plans from vet notes: the day-by-day plan can be one line. List each due dose date (weekly treatments) there.
- Clinical notes: exam findings for one problem can be split across bullets in an odd order (mange over three lines, then repeated in A).

## From the 25 October 2026 AI review (not done yet)
- Care plans have no "check" list, so questions Claude is told to ask (unclear doses, photo conflicts, unsafe changes) are dropped. Add `check` to `CARE_SHAPE`, show it in the review strip, keep it out of printouts. Needs a re-bake.
- Opus runs at its default (medium) effort. Send `output_config.effort: 'high'` for the most thorough model; the proxy must allow it. Ash's call. Consider Opus for witness statements too.
- Opinion references: collect the URLs from the web search results and flag any reference link not among them.
- Structured outputs (`output_config.format` json_schema) for the JSON replies, so a format slip never costs a second call. Proxy change.
- Caching: report cache reads and writes separately; only switch caching off on a content-shape 400; move the drug list and general sources into a second cached block at the next re-bake.
- Use an idle timeout for streams (reset on each chunk) instead of one 120 s limit on the whole call.
- Proxy redeploy needed for the 16,000 output-token room (`MAX_TOKENS` in `proxy/worker.js`).

## From the 25 October 2026 UI sweep (not done yet)
- One-tap "Correct" on each review question in the update sheet (adds "N: correct.").
- Search box on the Plans list (about 2,900 px long on a phone).
- Intake: the "Need advice right now?" box sits at the bottom and repeats the Care plan button; move it up under the record.
- Clinical note: the "Make carer plan" card repeats the bottom Carer plan button.
- Decorative icons in the mode tabs make them twice as tall (hide them for a slimmer row).
- About 150 px of empty space under the Word printout button on result screens.
