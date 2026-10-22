# Animal Welfare Companion: backlog

Last updated 23 October 2026. Highest value first within each group.

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
