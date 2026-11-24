// Ready-made care plans, made by scripts/library-build.mjs from Claude's replies to the app's own care plan prompts
// (Victorian guidance; see scripts/qa/scenarios.library.json). Don't edit by hand: change the scenario and rebuild.
export default {
 "animals": [
  {
   "id": "wombat",
   "name": "Common wombat",
   "plans": [
    {
     "id": "lib-wombat-unfurred",
     "stage": "Unfurred joey",
     "weight": "about 600 g",
     "text": "Ready-made plan: an orphaned common (bare-nosed) wombat joey, about 600 g, unfurred with pink skin and eyes closed. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned common wombat joey",
      "species": "Common (bare-nosed) wombat (Vombatus ursinus)",
      "kind": "wildlife",
      "summary": "This orphaned common wombat joey, about 600 g, is unfurred with pink skin and closed eyes, and is healthy. The goal is to raise it through the pouch stages and weaning, then release it wild and wary where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Around week 3 (fine fur appearing)",
        "tasks": [
         "Start cutting back from 8 feeds a day, reaching about 4 once it is fully furred."
        ]
       },
       {
        "when": "Around weeks 5 to 6 (short fur, about 165 to 175 days old)",
        "tasks": [
         "Change to Wombaroo Wombat Milk Replacer >0.6 over 10 to 20 days, mixing the two milks in changing proportions while keeping the total amount the same; if diarrhoea starts, go back a step and go slower."
        ]
       },
       {
        "when": "Once it comes out of the pouch",
        "tasks": [
         "Buddy it up with another wombat joey through an experienced carer, and move them to an outdoor enclosure with soil to dig and grass to graze."
        ]
       },
       {
        "when": "From about 12 to 15 months old",
        "tasks": [
         "Wean it off milk onto grass and hay.",
         "Then move it to a pre-release enclosure at least 10 by 5 by 2 metres with a concrete or buried-wire floor so it cannot dig out."
        ]
       }
      ],
      "housing": [
       "Keep it in a soft cloth pouch liner inside a pouch, in a ventilated box in a dark, quiet room away from pets and other species.",
       "Keep the pouch at the temperature the app shows for an unfurred joey, checking with a thermometer several times a day, as wombat joeys overheat more easily than other marsupials.",
       "Keep any heat pad or hot water bottle outside the pouch and never against its skin, as unfurred joeys burn easily.",
       "Wear gloves, wash your hands, use separate equipment and hot-wash and hot-dry pouch liners, as wombats can carry salmonella, ringworm and mange without showing signs."
      ],
      "feeding": [
       "Feed Wombaroo Wombat Milk Replacer 0.4, the stage for a joey of this weight; never give cow's milk, as its lactose causes diarrhoea.",
       "Give the amount in the feed calculator each day, split evenly between feeds, and check it against the Wombaroo common wombat chart on the pack.",
       "Give 8 feeds a day, about every 3 hours around the clock: about 6 am, 9 am, 12 pm, 3 pm, 6 pm, 9 pm, midnight and 3 am.",
       "Use a teat with a hole of about 1 mm so milk drips slowly, held steady and in line with its mouth so it sucks at its own pace, as poor technique can cause choking on milk and a crooked jaw; stop if milk comes out of its nose.",
       "Mix 19 g of powder (2½ scoops) with 90 mL of pre-boiled water at about 50°C to make 100 mL, never stronger or weaker, warm it to about 30°C to feed, keep made-up milk in the fridge for no more than a day and throw out leftovers.",
       "After every feed, gently wipe its bottom with a damp cloth to help it wee and poo.",
       "Once it starts coming out of the pouch, offer a shallow dish of fresh water, changed daily, and grasses pulled with roots and soil, then grass hay, with grass-based pellets such as Wombaroo Kangaroo Pellets kept under 10% of the diet.",
       "Never offer medicated cattle or chicken pellets (their coccidiostats can kill wombats), bread, cereal or muesli mixes (gum infections and bloat), carrots (used as rabbit bait, so it learns a deadly food is safe), or fresh clover and cabbage leaves (bloat)."
      ],
      "activity": [
       "Handle it only for feeds, toileting and weighing, gently and by regular carers only, keeping it away from pets so it grows up wary of people."
      ],
      "care": [
       "Raising an unfurred wombat joey is work for an experienced carer, and it can take up to two years to reach release.",
       "Its milk stage is set by age, best judged by head length measured with vernier calipers: a head about 66 to 86 mm long matches the 0.4 stage, and if it measures shorter, check the stage with your vet.",
       "Keep records of its weight, condition, any vet advice, and its release date and place, and keep them for 3 years."
      ],
      "daily_checks": [
       "Weigh before first feed",
       "All feeds taken",
       "Toileted after feeds",
       "Pouch temperature right",
       "Droppings normal"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Wombat Milk Replacer 0.4",
       "weight_g": 600,
       "stage": "Age Factor 0.4 (about 120 to 140 days, unfurred)",
       "percent_body_weight_per_day": 11.5,
       "feeds_per_day": 8,
       "basis": "Estimated from the Wombaroo common wombat chart: about 69 mL a day at 600 g, between 50 mL a day at 380 g and 100 mL a day at 960 g.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "About 18 to 24 months old and about 18 kg",
        "Fully weaned and grazing well",
        "Digging and finding shelter on its own",
        "Healthy and wary of people"
       ],
       "target_weight": "About 18 kg for a common wombat",
       "how": [
        "Release it within 24 hours of it being ready, avoiding extreme heat, rain or storms.",
        "Move it on its own in a lined, well-ventilated crate, with the air conditioning on, as wombats overheat in transport above 24°C.",
        "Release it about an hour after dusk, ideally at an unoccupied burrow within about 150 m of where it was found.",
        "Open the crate and let it leave in its own time."
       ],
       "where": "Release it where it was found, or at the closest suitable spot within its home range without crossing a barrier it would not normally cross, so keep the find site recorded with GPS coordinates; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Diarrhoea or constipation that does not settle within 24 hours.",
        "Refusing feeds or losing weight.",
        "Red, dry or broken skin, or hair loss and crusty scabs once furred.",
        "If it was pulled from its mother's pouch or off the teat, a vet check within 24 hours for mouth injuries."
       ],
       "urgent": [
        "Milk from the nose, coughing or noisy breathing after a feed, which can mean milk has gone into the lungs.",
        "Cold to touch, floppy or unable to hold its head up: warm it gently and give nothing by mouth.",
        "Overheating signs (red feet, or drooling onto its forelegs and chest): move it somewhere cooler straight away.",
        "A swollen, tight belly (bloat)."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "wombat",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-wombats",
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide"
      ]
     }
    },
    {
     "id": "lib-wombat-furred",
     "stage": "Furred joey",
     "weight": "about 2.5 kg",
     "text": "Ready-made plan: an orphaned common (bare-nosed) wombat joey, about 2.5 kg, fully furred with eyes open, still drinking milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned common wombat joey",
      "species": "Common (bare-nosed) wombat (Vombatus ursinus)",
      "kind": "wildlife",
      "summary": "This orphaned common wombat joey, about 2.5 kg, is fully furred with its eyes open, healthy and still drinking milk. The goal is to raise it with another wombat joey, wean it onto grass and release it wild and wary where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Week 1",
        "tasks": [
         "Buddy it up with another wombat joey through an experienced carer as soon as it has settled."
        ]
       },
       {
        "when": "Once feeding well and gaining weight",
        "tasks": [
         "Cut back from 4 feeds a day towards 2 feeds a day."
        ]
       },
       {
        "when": "Once it spends most of its time out of the pouch",
        "tasks": [
         "Move it, with its buddy, to an outdoor enclosure with a den, soil to dig and grass to graze."
        ]
       },
       {
        "when": "From about 12 to 15 months old",
        "tasks": [
         "Wean it off milk onto grass and hay.",
         "Then move it to a pre-release enclosure at least 10 by 5 by 2 metres with a concrete or buried-wire floor so it cannot dig out."
        ]
       }
      ],
      "housing": [
       "Keep it in a cloth pouch inside a well-ventilated box or carrier in a dark, quiet room, away from pets and other species.",
       "Keep the pouch at the temperature the app shows for this stage, checking with a thermometer, as wombat joeys overheat more easily than other marsupials and become dehydrated if kept too warm.",
       "If extra heat is needed, keep the heat pad or hot water bottle outside the pouch and never against its skin, as it causes burns.",
       "Wear gloves, wash your hands, use separate equipment, remove droppings daily and hot-wash and hot-dry pouches and bedding, as wombats can carry salmonella, ringworm and mange without showing signs."
      ],
      "feeding": [
       "Feed Wombaroo Wombat Milk Replacer >0.6, the stage for a fully furred joey that looks like a miniature adult; never give cow's milk, as its lactose causes diarrhoea.",
       "Give the amount in the feed calculator each day, split evenly between feeds, and check it against the Wombaroo common wombat chart on the pack.",
       "Start with 4 feeds a day, about 6 am, 12 pm, 6 pm and 11 pm.",
       "Use a bottle with a teat hole of about 1 mm so milk drips slowly, held steady and in line with its mouth so it sucks at its own pace, as poor technique can cause choking on milk and a crooked jaw; stop if milk comes out of its nose.",
       "Mix 25 g of powder (3½ scoops) with 80 mL of pre-boiled water at about 50°C to make 100 mL, never stronger or weaker, warm it to about 30°C to feed, keep made-up milk in the fridge for no more than a day and throw out what is left in the bottle.",
       "After each feed, gently wipe its bottom with a damp cloth to help it wee and poo.",
       "Once it is coming out of the pouch, keep a shallow dish of fresh water available, changed daily, and offer grasses pulled with roots and soil, then grass hay, with grass-based pellets such as Wombaroo Kangaroo Pellets kept under 10% of the diet.",
       "Never offer medicated cattle or chicken pellets (their coccidiostats can kill wombats), bread, cereal or muesli mixes (gum infections and bloat), carrots (used as rabbit bait, so it learns a deadly food is safe), or fresh clover and cabbage leaves (bloat)."
      ],
      "activity": [
       "Handle it only for feeds, weighing and toileting, by regular carers only, and keep it away from pets so it stays wary of people.",
       "Once it is out of the pouch, give it soil to dig and grass to graze so it practises natural wombat behaviour."
      ],
      "care": [
       "Keep records of its weight, condition, any vet advice, and its release date and place, and keep them for 3 years."
      ],
      "daily_checks": [
       "Weigh before first feed",
       "All feeds taken",
       "Droppings firm",
       "Pouch temperature right"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Wombat Milk Replacer >0.6",
       "weight_g": 2500,
       "stage": "Age Factor >0.6 (fully furred, eyes open)",
       "percent_body_weight_per_day": 5.7,
       "feeds_per_day": 4,
       "basis": "Estimated from the Wombaroo common wombat chart: about 143 mL a day at 2500 g, between 100 mL a day at 1340 g and 250 mL a day at 5400 g.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "About 18 to 24 months old and about 18 kg",
        "Fully weaned and grazing well",
        "Digging and finding shelter on its own",
        "Healthy and wary of people"
       ],
       "target_weight": "About 18 kg for a common wombat",
       "how": [
        "Release it within 24 hours of it being ready, avoiding extreme heat, rain or storms.",
        "Move it on its own in a lined, well-ventilated crate, with the air conditioning on, as wombats overheat in transport above 24°C.",
        "Release it about an hour after dusk, ideally at an unoccupied burrow within about 150 m of where it was found.",
        "Open the crate and let it leave in its own time."
       ],
       "where": "Release it where it was found, or at the closest suitable spot within its home range without crossing a barrier it would not normally cross, so keep the find site recorded with GPS coordinates; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Diarrhoea or constipation that does not settle within 24 hours.",
        "Refusing feeds or losing weight.",
        "Hair loss or crusty scabs, which may be mange.",
        "If it was pulled from its mother's pouch or off the teat, a vet check within 24 hours for mouth injuries."
       ],
       "urgent": [
        "Milk from the nose, coughing or noisy breathing after a feed, which can mean milk has gone into the lungs.",
        "Heat stress signs (red feet, drooling onto the forelegs and chest, or lying on its back with armpits and groin exposed): move it somewhere cooler straight away.",
        "Cold, floppy or unable to hold its head up: warm it gently and give nothing by mouth.",
        "A swollen, tight belly (bloat)."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "wombat",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-wombats",
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide"
      ]
     }
    },
    {
     "id": "lib-wombat-weaning",
     "stage": "Weaning young",
     "weight": "about 8 kg",
     "text": "Ready-made plan: a young common (bare-nosed) wombat, about 8 kg, furred, starting to graze and being weaned off milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a wombat like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Young common wombat",
      "species": "Common (bare-nosed) wombat (Vombatus ursinus)",
      "kind": "wildlife",
      "summary": "This young common wombat, about 8 kg, is furred, healthy and being weaned from milk onto grass. The goal is to finish weaning, grow it to release size and return it wild and wary to where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 2",
        "tasks": [
         "Buddy it up with another young wombat through an experienced carer, if it is not already with one."
        ]
       },
       {
        "when": "From week 2, while weaning",
        "tasks": [
         "As it eats more grass and hay, cut milk from 2 feeds a day to 1, then stop; if diarrhoea starts, go back a step and go slower."
        ]
       },
       {
        "when": "Once fully weaned",
        "tasks": [
         "Move it to a pre-release enclosure at least 10 by 5 by 2 metres with a concrete or buried-wire floor so it cannot dig out."
        ]
       }
      ],
      "housing": [
       "Keep it in a secure outdoor enclosure with a dry, dark den, deep clean straw and shade, away from pets and other species.",
       "Keep it out of the heat, as wombats overheat easily and become dehydrated if kept too warm.",
       "Remove droppings every day to stop coccidia building up (boiling water on concrete kills them), and keep the straw free of cat droppings to prevent toxoplasmosis.",
       "Wear gloves, wash your hands and use separate equipment, as wombats can carry salmonella, ringworm and mange without showing signs."
      ],
      "feeding": [
       "Feed fresh grass as the main food, pulled with roots and soil, plus grass hay, with Wombaroo Wombat Milk Replacer >0.6 until weaning is finished.",
       "Give no more milk each day than the amount in the feed calculator, split between feeds, and less as it grazes more.",
       "Give 2 milk feeds a day, about 7 am and 7 pm, with grass and hay available at all times.",
       "Offer milk from a bottle with a teat hole of about 1 mm, held steady and in line with its mouth so it sucks at its own pace, as poor technique can cause choking on milk; stop if milk comes out of its nose.",
       "Mix 25 g of powder (3½ scoops) with 80 mL of pre-boiled water at about 50°C to make 100 mL, never stronger or weaker, warm it to about 30°C to feed, keep made-up milk in the fridge for no more than a day and throw out leftovers.",
       "Grass-based pellets such as Wombaroo Kangaroo Pellets can be added but kept under 10% of the daily diet; never give medicated cattle or chicken pellets, as their coccidiostats can kill wombats.",
       "Keep a shallow dish of fresh water available, changed every day.",
       "Never offer bread, cereal or muesli mixes (gum infections and bloat), carrots (used as rabbit bait, so it learns a deadly food is safe), chaff, phalaris grass, fresh clover or cabbage leaves (bloat), or dog and cat food."
      ],
      "activity": [
       "Handle it only for weighing and feeds, by regular carers only, and keep it away from pets and visitors so it stays wary of people.",
       "Give it soil to dig in and grass to forage, so it practises natural wild behaviour."
      ],
      "care": [
       "Keep records of its weight, condition, any vet advice, and its release date and place, and keep them for 3 years."
      ],
      "daily_checks": [
       "Weigh before morning feed",
       "Grazing well",
       "Droppings firm",
       "Fresh water",
       "No heat-stress signs"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Wombat Milk Replacer >0.6",
       "weight_g": 8000,
       "stage": "Weaning, past the Wombaroo chart (over 5400 g)",
       "percent_body_weight_per_day": 3.1,
       "feeds_per_day": 2,
       "basis": "The Wombaroo common wombat chart tops out at 250 mL a day at 5400 g; this keeps that top volume as the most to give while weaning.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "About 18 to 24 months old and about 18 kg",
        "Fully weaned and grazing well",
        "Digging and finding shelter on its own",
        "Healthy and wary of people"
       ],
       "target_weight": "About 18 kg for a common wombat",
       "how": [
        "Release it within 24 hours of it being ready, avoiding extreme heat, rain or storms.",
        "Move it on its own in a lined, well-ventilated crate, with the air conditioning on, as wombats overheat in transport above 24°C.",
        "Release it about an hour after dusk, ideally at an unoccupied burrow within about 150 m of where it was found.",
        "Open the crate and let it leave in its own time."
       ],
       "where": "Release it where it was found, or at the closest suitable spot within its home range without crossing a barrier it would not normally cross, so keep the find site recorded with GPS coordinates; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Diarrhoea or constipation that does not settle within 24 hours.",
        "Losing weight or not grazing.",
        "Hair loss or crusty scabs, which may be mange.",
        "Limping, a wound or swelling."
       ],
       "urgent": [
        "Heat stress signs (red feet, drooling onto the forelegs and chest, or lying on its back with armpits and groin exposed): move it somewhere cool and air-conditioned straight away.",
        "A swollen, tight belly (bloat).",
        "Collapsed, wobbly or unable to stand.",
        "Coughing or noisy breathing, especially after a milk feed."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "wombat",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-wombats",
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide"
      ]
     }
    },
    {
     "id": "lib-wombat-adult",
     "stage": "Adult",
     "weight": "about 25 kg",
     "text": "Ready-made plan: an adult common (bare-nosed) wombat, about 25 kg, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a wombat like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult common wombat",
      "species": "Common (bare-nosed) wombat (Vombatus ursinus)",
      "kind": "wildlife",
      "summary": "This adult common wombat, about 25 kg, is in care and recovering well, with no injuries needing treatment and no medicines. The goal is to keep it calm, eating well and wild, and release it where it was found as soon as it is ready.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a small, quiet pen while it settles in."
        ]
       },
       {
        "when": "Day 4 onwards",
        "tasks": [
         "Once it is eating well and moving normally, move it to a pre-release enclosure at least 10 by 5 by 2 metres with a concrete or buried-wire floor so it cannot dig out."
        ]
       }
      ],
      "housing": [
       "Keep it somewhere quiet and shaded, away from pets, people and other species, with a dark sheltered spot to rest in and deep clean straw.",
       "Keep it cool, as wombats do not sweat and overheat easily; an adult does not need temperatures above 25°C.",
       "Remove droppings every day to stop coccidia building up (boiling water on a concrete floor kills them), and keep the straw free of cat droppings to prevent toxoplasmosis.",
       "Wear gloves, wash your hands and keep separate equipment for this wombat, as wombats can carry salmonella, ringworm and mange without showing signs."
      ],
      "feeding": [
       "Feed fresh grass as the main food, ideally pulled with its roots and soil, plus grass hay.",
       "Grass-based pellets such as Wombaroo Kangaroo Pellets can be added, but keep them to no more than 10% of the daily diet.",
       "Never feed medicated pellets such as cattle or chicken pellets, as some contain coccidiostats that can kill wombats.",
       "Leave out bread, cereal biscuits and muesli mixes, which cause gum infections and bloat, and fresh clover and cabbage leaves, which cause bloat.",
       "Keep fresh water in a heavy, shallow dish, changed every day."
      ],
      "activity": [
       "Handle it as little as possible and never tame it; an adult wombat can bite and scratch and can crush a hand with its hard rump, so never reach into a burrow or den to pull it out.",
       "Give it soil or a dig pit and grass to forage, so it keeps up its natural digging and grazing."
      ],
      "care": [
       "If it has a pouch, check it (wombat pouches face backwards) for a joey or a long teat, as a long teat can mean a joey is out on its own nearby.",
       "Keep records of its condition, weight, any vet advice, and its release date and place, and keep them for 3 years."
      ],
      "daily_checks": [
       "Eating grass and hay",
       "Normal droppings",
       "Fresh water",
       "Moving normally",
       "No heat-stress signs"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": null,
       "stage": "",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully recovered and needs no more medical care",
        "Eating well and holding its weight",
        "Walking, digging and seeing normally",
        "Wary of people and behaving like a wild wombat"
       ],
       "target_weight": "About 25 kg, holding steady (adult common wombats weigh about 20 to 40 kg)",
       "how": [
        "Release it within 24 hours of it being ready, avoiding extreme heat, rain or storms.",
        "Move it on its own in a lined, well-ventilated crate, with the air conditioning on, as wombats overheat in transport above 24°C.",
        "Release it about an hour after dusk, ideally at an unoccupied burrow within about 150 m of where it was found.",
        "Open the crate and let it leave in its own time."
       ],
       "where": "Release it exactly where it was found, or at the closest suitable spot within its home range without crossing a barrier it would not normally cross, so keep the find site recorded with GPS coordinates; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight, for more than a day.",
        "Diarrhoea lasting more than 24 hours.",
        "New hair loss or crusty scabs, which may be mange and needs a vet to confirm.",
        "Limping, a new wound or swelling."
       ],
       "urgent": [
        "Heat stress signs (red feet, drooling onto the forelegs and chest, or lying on its back with armpits and groin exposed): cool the room with air conditioning without handling it, and get a vet straight away.",
        "Collapsed, wobbly or unable to stand.",
        "Laboured or noisy breathing.",
        "A swollen, tight belly or heavy bleeding."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "wombat",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-wombats",
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-authorisation-guide-first-aid",
       "vic-rehab-guidelines-part-a"
      ]
     }
    }
   ]
  },
  {
   "id": "koala",
   "name": "Koala",
   "plans": [
    {
     "id": "lib-koala-pouch",
     "stage": "Furred pouch joey",
     "weight": "about 400 g",
     "text": "Ready-made plan: an orphaned koala joey, about 400 g, furred with eyes open, still drinking milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Koala joey",
      "species": "Koala (Phascolarctos cinereus)",
      "kind": "wildlife",
      "summary": "This orphaned koala joey, about 400 g, furred and with its eyes open, is healthy and fully milk-fed. The goal is to raise it alongside other koalas through weaning onto eucalyptus leaf and grow it to a healthy weight so it can go home where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 14",
        "tasks": [
         "If it is not yet on Late Lactation milk, change over gradually across 10 to 20 days, keeping the total amount the same and only changing the mix."
        ]
       },
       {
        "when": "About weeks 4 to 6 (around 200 to 210 days old)",
        "tasks": [
         "Start offering eucalyptus leaf tips, mature leaf and bark.",
         "Lower the pouch warmth to the next stage the app shows."
        ]
       },
       {
        "when": "About weeks 8 to 12 (around 230 to 260 days old)",
        "tasks": [
         "Drop to 4 milk feeds a day and give warmth only at night."
        ]
       },
       {
        "when": "About week 14 onwards (from around 270 days old)",
        "tasks": [
         "Drop to 3, then 2 feeds a day as leaf eating grows, stop heating, and move it to a larger enclosure with climbing branches.",
         "Wean it off milk gradually by about 1 year old; ages are estimates, so go by its leaf eating and weight gain."
        ]
       }
      ],
      "housing": [
       "Keep it in a soft cloth pouch inside a humidicrib or heated enclosure, at the pouch temperature the app shows for this stage, with a thermometer beside it.",
       "Raise it with another koala joey or adult koalas through an experienced koala carer, never on its own.",
       "Keep it somewhere quiet, away from pets and household noise.",
       "Change pouch liners daily, wash your hands before and after handling, and wear disposable gloves for droppings."
      ],
      "feeding": [
       "Feed Wombaroo Koala Milk Replacer (or Biolac M150 or M200); never give cow's milk, as it lacks key nutrients and causes diarrhoea.",
       "At about 400 g it is near the change from Early to Late Lactation milk: a head length of about 59 mm or more, or coming out of the pouch, points to Late Lactation, so check the stage with an experienced koala carer if unsure.",
       "Make sure it gets pap from a healthy, chlamydia-free adult koala as it first comes out of the pouch, arranged through an experienced koala carer, as without pap it cannot digest leaf.",
       "Give the daily milk amount in the feed calculator, split evenly across the feeds.",
       "Give 6 feeds a day, about every 4 hours: around 6 am, 10 am, 2 pm, 6 pm, 10 pm and 2 am.",
       "Bottle-feed with the joey upright in its pouch, using a teat with a hole of about 1 mm so milk drips slowly; let it suck at its own pace, never hold its head fixed (this stops it swallowing and risks it inhaling milk), and stop if milk comes out of its nose.",
       "Mix Early Lactation as 22 g (3 scoops) with 85 mL of warm water, or Late Lactation as 32 g (4 scoops) with 75 mL, each making 100 mL; use pre-boiled water, warm it to about 30°C, keep made-up milk in the fridge for no more than a day, and throw out leftovers.",
       "Once it is fully furred, coming out of the pouch and nibbling, offer fresh leaf tips, mature leaf and bark from at least three local eucalypt species, including those where it was found."
      ],
      "activity": [
       "Handle it gently and only for feeds, weighing and pouch changes, as koala joeys imprint on people very readily.",
       "Lift it by gently unhooking its claws (push forward, then lift), never by holding it around the chest.",
       "Once it starts coming out of the pouch, give it branches near the pouch to cling to and climb."
      ],
      "care": [
       "Weigh it every day at the same time, before the first feed, so the feed calculator stays right.",
       "Keep its care record up to date with weights, feeds and droppings, as authorised carers must keep records for 3 years."
      ],
      "daily_checks": [
       "Weighed before first feed",
       "All feeds taken",
       "Droppings normal",
       "Pouch warm and clean",
       "Bright and alert"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Koala Milk, Early to Late Lactation",
       "weight_g": 400,
       "stage": "Furred, eyes open, about 165 to 180 days",
       "percent_body_weight_per_day": 7,
       "feeds_per_day": 6,
       "basis": "About 26 to 28 mL a day near 400 g from Victorian Table 5.9 and Wombaroo charts (given in mL, not %)",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned and eating leaf only.",
        "Weighs over 4 kg.",
        "Climbs strongly and readily eats leaf from the eucalypt species where it was found.",
        "Healthy, needs no medical care and shows wild behaviour, including fear of people."
       ],
       "target_weight": "About 4 kg or more for a hand-raised koala",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Release in the late afternoon or early evening, never on a day over 38°C or in severe storms.",
        "Transport it in a secure, ventilated carrier with the car below 25°C, and never in the boot.",
        "Monitor it after release for at least six weeks where possible."
       ],
       "where": "Release it where it was found, ideally the same tree, using the GPS or Melways location recorded at rescue; if that spot is unsuitable, use the closest suitable place within its home range."
      },
      "escalate": {
       "vet": [
        "Diarrhoea or soft droppings.",
        "Weight loss, no weight gain, or a change of more than 10% in a week.",
        "Refuses feeds or takes much less than usual.",
        "Eye discharge, a wet or stained bottom, or pain when urinating."
       ],
       "urgent": [
        "Milk from the nose, coughing, or noisy or fast breathing after a feed.",
        "Cold, floppy, collapsed or unable to hold its head up: give nothing by mouth.",
        "Panting or very flat when overheated.",
        "Any fall, injury or bleeding."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "koala",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-koalas",
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide"
      ]
     }
    },
    {
     "id": "lib-koala-back",
     "stage": "Back joey",
     "weight": "about 1.5 kg",
     "text": "Ready-made plan: an orphaned koala back joey, about 1.5 kg, furred, starting to eat eucalyptus leaf and still drinking milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Koala back joey",
      "species": "Koala (Phascolarctos cinereus)",
      "kind": "wildlife",
      "summary": "This orphaned koala back joey, about 1.5 kg and furred, is healthy and moving from milk onto eucalyptus leaf. The goal is to wean it fully onto leaf, raised alongside other koalas, and grow it to a healthy weight so it can go home where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "About weeks 2 to 4 (around 270 days old)",
        "tasks": [
         "Drop to 3 milk feeds a day as it eats more leaf.",
         "Stop night-time heating, following the temperatures the app shows."
        ]
       },
       {
        "when": "About weeks 6 to 8 (around 310 days old)",
        "tasks": [
         "Drop to 2 milk feeds a day.",
         "Move it to a larger enclosure with a climbing tree or poles."
        ]
       },
       {
        "when": "About weeks 10 to 16 (around 330 to 370 days old)",
        "tasks": [
         "Reduce the milk gradually to nothing, so it is fully weaned onto leaf at about 1 year old.",
         "Ages are estimates from its weight, so go by its leaf eating and weight gain rather than the week number."
        ]
       }
      ],
      "housing": [
       "Raise it with another koala joey or adult koalas through an experienced koala carer, never on its own.",
       "Keep it in a secure, quiet enclosure away from pets, with branches and forks at different heights to climb and a soft toy or rolled towel to cling to.",
       "Give warmth only at night, at the temperature the app shows for this stage, with a thermometer near the joey.",
       "Clean the bedding daily, wash your hands before and after handling, and wear disposable gloves for droppings."
      ],
      "feeding": [
       "Feed Wombaroo Koala Milk Replacer Late Lactation (or Biolac M150 or M200) plus fresh eucalyptus leaf tips, mature leaf and bark from at least three local species, including those where it was found; never give cow's milk, as it lacks key nutrients and causes diarrhoea.",
       "Make sure it has had pap from a healthy, chlamydia-free adult koala, arranged through an experienced koala carer, as without pap it cannot digest leaf.",
       "Give the daily milk amount in the feed calculator, split evenly across the feeds; from about 270 days, adjust the milk to how much leaf it eats.",
       "Give 4 milk feeds a day, about 6 am, 11 am, 4 pm and 9 pm.",
       "Bottle-feed with the joey sitting upright, using a teat with a hole of about 1 mm so milk drips slowly; let it suck at its own pace, never hold its head fixed (this stops it swallowing and risks it inhaling milk), and stop if milk comes out of its nose.",
       "Mix 32 g of powder (4 scoops) with 75 mL of warm, pre-boiled water to make 100 mL; warm it to about 30°C, keep made-up milk in the fridge for no more than a day, and throw out leftovers.",
       "Put in fresh leaf daily with the branches standing in heavy containers of water, and offer a shallow bowl of fresh water changed daily.",
       "Expect leaf eating to rise to about 100 g a day at around 270 days and 200 g at around 310 days; once leaf intake and weight gain are good, usually from about 10 months, it is ready to start cutting back milk."
      ],
      "activity": [
       "Handle it gently and only for feeds, weighing and cleaning, as koala joeys imprint on people very readily.",
       "Lift it by unhooking its claws (push forward, then lift), never by holding it around the chest, which can fracture ribs.",
       "Let it climb and explore its branches every day to build strength."
      ],
      "care": [
       "Weigh it every day at the same time, before the first feed, so the feed calculator stays right.",
       "Keep its care record up to date with weights, feeds and leaf eaten, as authorised carers must keep records for 3 years.",
       "Wash any bite that breaks the skin thoroughly straight away, as koala bites can cause serious infection."
      ],
      "daily_checks": [
       "Weighed before feeding",
       "Milk feeds taken",
       "Leaf eaten",
       "Droppings firm",
       "Climbing and alert"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Koala Milk Late Lactation",
       "weight_g": 1500,
       "stage": "Late lactation back joey, about 250 to 270 days",
       "percent_body_weight_per_day": 4.5,
       "feeds_per_day": 4,
       "basis": "About 67 to 70 mL a day at 1.5 kg from Victorian Table 5.9 and Wombaroo charts (given in mL, not %)",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned and eating leaf only.",
        "Weighs over 4 kg.",
        "Climbs strongly and readily eats leaf from the eucalypt species where it was found.",
        "Healthy, needs no medical care and shows wild behaviour, including fear of people."
       ],
       "target_weight": "About 4 kg or more for a hand-raised koala",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Release in the late afternoon or early evening, never on a day over 38°C or in severe storms.",
        "Transport it in a secure, ventilated carrier with the car below 25°C, and never in the boot.",
        "Monitor it after release for at least six weeks where possible."
       ],
       "where": "Release it where it was found, ideally the same tree, using the GPS or Melways location recorded at rescue; if that spot is unsuitable, use the closest suitable place within its home range."
      },
      "escalate": {
       "vet": [
        "Diarrhoea or soft droppings.",
        "Weight loss, no weight gain, or a change of more than 10% in a week.",
        "Refuses milk or stops eating leaf.",
        "Eye discharge, a wet or stained bottom, or pain when urinating."
       ],
       "urgent": [
        "Milk from the nose, coughing, or noisy or fast breathing after a feed.",
        "Cold, floppy, collapsed or unable to hold its head up: give nothing by mouth.",
        "Panting, drooling or lying flat on a hot day.",
        "Any fall, injury or bleeding."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "koala",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-koalas",
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide"
      ]
     }
    },
    {
     "id": "lib-koala-adult",
     "stage": "Adult",
     "weight": "about 7 kg",
     "text": "Ready-made plan: an adult koala, about 7 kg, eating eucalyptus leaf, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a koala like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult koala",
      "species": "Koala (Phascolarctos cinereus)",
      "kind": "wildlife",
      "summary": "This adult koala, about 7 kg, is recovering well in care, eating eucalyptus leaf and needs no treatment or medicines. The goal is to keep it eating well, holding its weight and climbing strongly so it can go home as soon as it is ready.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 7",
        "tasks": [
         "Keep it in its quiet enclosure while it settles into the leaf routine and its weight holds steady."
        ]
       },
       {
        "when": "Week 2 onwards",
        "tasks": [
         "Once it is eating well and its weight is steady, move it to a larger enclosure with a sturdy tree or climbing poles.",
         "Watch that it climbs strongly and readily before planning release."
        ]
       }
      ],
      "housing": [
       "Keep it on its own in a quiet, secure enclosure away from people, pets and other wildlife, with sturdy branches and forks at different heights to sit and climb in.",
       "Keep the enclosure within the temperatures the app shows for koalas, with shade and shelter from wind and rain.",
       "Line the floor with newspaper or white towels and clean it every day, so you can see the colour of its urine and it never sits in urine or droppings.",
       "Wash your hands before and after each visit and wear disposable gloves to handle droppings or soiled bedding."
      ],
      "feeding": [
       "Feed fresh eucalyptus leaf only: branches from at least three (ideally three to five) local eucalypt species each day, with young tips and mature leaves, unsprayed and not shared with other animals.",
       "Include the eucalypt species that grow where it was found, as it needs to eat these readily before release.",
       "Offer about 5 kg of fresh leaf a day; it will eat only part of this, so expect plenty left over.",
       "Stand the branches upright in heavy, stable containers of water among its climbing branches, so it feeds as it would in a tree.",
       "Put in fresh branches daily, remove old or wilted leaf, and rearrange and spray the leaves with water at least twice a day to encourage feeding.",
       "Offer a shallow bowl of fresh water, changed daily."
      ],
      "activity": [
       "Handle it as little and as briefly as possible and do not tame it, so it keeps its fear of people.",
       "If it must be moved, unhook its claws by pushing forward then lifting and use a canvas catch bag; never hold it around the chest, as ribs can fracture and it can turn and injure you.",
       "If it shows stress (constant ear flicking, calling out, urinating or passing droppings, fast breathing or refusing to uncurl), leave it in a dark, quiet carrier or enclosure to settle."
      ],
      "care": [
       "Weigh it once a week at the same time of day.",
       "Keep its care record up to date with weights, leaf eaten and anything unusual, as authorised carers must keep records for 3 years.",
       "Wash any bite that breaks the skin thoroughly straight away, as koala bites can cause serious infection."
      ],
      "daily_checks": [
       "Leaf eaten",
       "Droppings counted",
       "Eyes and bottom clean",
       "Fresh leaf and water",
       "Bright and alert"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 7000,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating eucalyptus leaf, not a measured milk amount",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully recovered and needs no more medical care.",
        "Weight and body condition healthy and steady.",
        "Climbs strongly and readily eats leaf from the eucalypt species where it was found.",
        "Shows normal wild behaviour, including fear of people."
       ],
       "target_weight": "About 7 kg, its healthy adult weight, holding steady",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Release in the late afternoon or early evening, never on a day over 38°C or in severe storms.",
        "Transport it in a secure, ventilated carrier with the car below 25°C, and never in the boot.",
        "Monitor it after release for at least six weeks where possible."
       ],
       "where": "Release it where it was found, ideally the same tree, using the GPS or Melways location recorded at rescue; if that spot is unsuitable, use the closest suitable place within its home range."
      },
      "escalate": {
       "vet": [
        "Weight changes by more than 10% in a week.",
        "Eats much less leaf, or passes fewer than 100 droppings in 24 hours.",
        "Eye discharge, a wet or stained bottom, or pain when urinating (possible chlamydia): keep it apart from other koalas and service it last.",
        "Diarrhoea or very soft droppings."
       ],
       "urgent": [
        "Collapsed, cold, floppy or unable to hold its head up: give nothing by mouth.",
        "Panting, drooling or lying flat on a hot day (heat stress).",
        "Fast breathing or panting at rest.",
        "Any fall, injury or bleeding."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "koala",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-koalas",
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a"
      ]
     }
    }
   ]
  },
  {
   "id": "duck",
   "name": "Pacific black duck",
   "plans": [
    {
     "id": "lib-duck-duckling",
     "stage": "Downy duckling",
     "weight": "about 40 g",
     "text": "Ready-made plan: an orphaned Pacific black duck duckling, about 40 g, covered in down, a few days old. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a duckling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Pacific black duck duckling",
      "species": "Pacific black duck (Anas superciliosa)",
      "kind": "wildlife",
      "summary": "This orphaned Pacific black duck duckling is healthy, only a few days old, about 40 g and still covered in down. The goal is to raise it warm, well fed and wild, with waterproof feathers and strong flight, ready to return to a flock of its own kind.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 10 (to about 2 weeks old)",
        "tasks": [
         "Keep the diet higher in protein, as ducklings need more protein in their first 2 weeks."
        ]
       },
       {
        "when": "Day 11 to about 7 weeks old",
        "tasks": [
         "Step protein down gradually, with less Insectivore Rearing Mix and more greens and grass, to reach the adult level for a mixed-feeding duck (about 19% protein) by 7 weeks old, as too much protein during fast growth causes angel wing."
        ]
       },
       {
        "when": "As feathers replace the down",
        "tasks": [
         "Add a shallow pool with branches or a plank so it can climb out easily, keeping the heat source available until it is fully feathered."
        ]
       },
       {
        "when": "Once fully feathered",
        "tasks": [
         "Move it to an outdoor aviary with grass and a larger pool to build flight and waterproofing, and switch off the heat.",
         "Move its diet mostly to natural foods: grass, aquatic plants and insects."
        ]
       }
      ],
      "housing": [
       "Keep it in a lined brooder box with a heat source at one end at the duckling temperature the app shows (about 28 to 30°C), so it can move closer or away; panting or holding its wings out means it is too hot.",
       "Line the floor with a soft, non-slip towel to protect its beak, feet and down, and change the bedding twice a day.",
       "Keep it apart from other birds until its health is known, with its own dishes, and well away from the room and air space of any pet birds, as serious diseases pass between them through the air.",
       "Psittacosis is common in Victorian waterfowl, so wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Feed Passwell Crumbles (15% protein) with finely chopped greens and Insectivore Rearing Mix, plus soft fresh grass, a tray of soil with grass roots, and aquatic plants, as Pacific black ducks eat both plant and animal food.",
       "The guidance gives no set amount for ducklings, so keep food in front of it all day and offer a little more than it eats; growing birds need up to 50% more than adults.",
       "Refresh the food several times a day and throw out what is left in the dish; made-up Insectivore Rearing Mix keeps one day in the fridge or 2 weeks frozen.",
       "Put food in a shallow dish it can reach easily; it feeds itself, so never syringe food into its bill, as birds easily inhale food that way.",
       "Offer clean fresh water at all times in a shallow dish it can dip its bill into but cannot climb into, changed at least once a day; never syringe water or put it in water, as young ducklings chill easily.",
       "Weigh it every day at the same time, before fresh food goes in, and record its weight and how much it eats; it should gain steadily.",
       "Do not add vitamin or mineral supplements to the commercial foods, and never feed bread, which has little nutrition and can grow mould that causes aspergillosis."
      ],
      "activity": [
       "Handle it only when needed, gently and briefly, cupped in both hands.",
       "Once its health is known, raise it with other Pacific black ducklings if any are in care, so it grows up with its own kind and can be released with them.",
       "Keep it away from pets, noise and visitors, and do not talk to or cuddle it, so it keeps its natural fear of people."
      ],
      "care": [
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and delay release.",
       "Keep its record up to date, including its condition, fate, and release date and place.",
       "If you develop a fever, headache or cough, tell your doctor you work with birds."
      ],
      "daily_checks": [
       "Weighed and recorded",
       "Eating and drinking",
       "Warm, not panting",
       "Bedding changed twice",
       "Droppings look normal"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "Passwell Crumbles and Insectivore Rearing Mix",
       "weight_g": 40,
       "stage": "Downy duckling, a few days old",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Ducklings feed themselves from a dish; the guidance gives no body-weight amount.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully feathered, with waterproof feathers that stay dry after swimming.",
        "Flies strongly and sees and moves well.",
        "Feeds itself on natural foods and is wary of people and predators.",
        "Healthy, needing no more care, and at adult size."
       ],
       "target_weight": "About 1 kg (adult size) for a Pacific black duck",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild day and release it in daylight, avoiding extreme weather.",
        "Carry it in a lined, well-ventilated box, one bird per box.",
        "Release it with its fellow ducklings or near other Pacific black ducks, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found, using the GPS or Melways record kept with it, or if that spot is unsuitable, at the closest suitable wetland within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Loses weight, or does not gain for two days in a row.",
        "Eats little or nothing, or has diarrhoea.",
        "Wing tips start to droop or twist outwards (early angel wing).",
        "Legs splay or it limps."
       ],
       "urgent": [
        "Cold, floppy, or cannot hold its head up: give nothing by mouth and go straight to a vet.",
        "Poor coordination, tremors, twisted neck, cannot stand, or trouble breathing (possible bird flu): see a vet straight away and report it on 1800 675 888.",
        "Sudden death of this or any other bird in care: report it straight away on 1800 675 888."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "waterbird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "vic-rehab-guidelines-waterbirds-marine",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-duck-older",
     "stage": "Feathering duckling",
     "weight": "about 300 g",
     "text": "Ready-made plan: an orphaned Pacific black duck duckling, about 300 g, with feathers coming through the down. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a duckling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Pacific black duck duckling",
      "species": "Pacific black duck (Anas superciliosa)",
      "kind": "wildlife",
      "summary": "This orphaned Pacific black duck duckling is healthy and growing well, about 300 g with feathers coming through its down. The goal is to finish raising it wild, waterproof and flying strongly, ready to join a flock of its own kind.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 7",
        "tasks": [
         "Start stepping protein down, with less Insectivore Rearing Mix and more greens and grass, as too much protein in fast-growing ducklings (about 3 to 7 weeks old) causes angel wing; if its age is unclear, check the stage with your vet.",
         "Add a shallow pool with branches or a plank so it can climb out easily, keeping the heat source available until it is fully feathered."
        ]
       },
       {
        "when": "Weeks 2 to 4",
        "tasks": [
         "Keep lowering protein so the diet reaches the adult level for a mixed-feeding duck (about 19% protein) by about 7 weeks old."
        ]
       },
       {
        "when": "Once fully feathered",
        "tasks": [
         "Move it to an outdoor aviary with grass and a larger pool to build flight and waterproofing, and switch off the heat.",
         "Move its diet mostly to natural foods: grass, aquatic plants and insects."
        ]
       }
      ],
      "housing": [
       "Keep it in a lined pen with a heat source at one end at the duckling temperature the app shows (about 28 to 30°C), so it can move to and from it; panting or holding its wings out means it is too hot.",
       "Line the floor with soft, non-slip bedding to protect its beak, feet and growing feathers, and change it twice a day.",
       "Keep it apart from other birds until its health is known, with its own dishes, and well away from the room and air space of any pet birds, as serious diseases pass between them through the air.",
       "Psittacosis is common in Victorian waterfowl, so wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Feed Passwell Crumbles (15% protein) with chopped greens and Insectivore Rearing Mix, plus fresh unsprayed grass, a tray of soil with grass roots, and aquatic plants, as Pacific black ducks eat both plant and animal food.",
       "The guidance gives no set amount for ducklings, so keep food in front of it all day and offer a little more than it eats; growing birds need up to 50% more than adults.",
       "Refresh the food several times a day and throw out what is left in the dish; made-up Insectivore Rearing Mix keeps one day in the fridge or 2 weeks frozen.",
       "Put food in a shallow dish beside its water; it feeds itself, so never syringe food into its bill, as birds easily inhale food that way.",
       "Offer clean fresh water at all times in a dish it can dip its whole bill into, changed at least once a day; never syringe water into its bill.",
       "Weigh it every day at the same time, before fresh food goes in, and record its weight and how much it eats; it should keep gaining steadily.",
       "Do not add vitamin or mineral supplements to the commercial foods, and never feed bread, which has little nutrition and can grow mould that causes aspergillosis."
      ],
      "activity": [
       "Handle it only when needed, quickly and gently, wrapped in a towel with its wings folded against its body.",
       "Once its health is known, raise it with other Pacific black ducklings if any are in care, so it grows up with its own kind and can be released with them.",
       "Keep it away from pets, noise and visitors, and do not talk to or cuddle it, so it keeps its natural fear of people."
      ],
      "care": [
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and delay release.",
       "Keep its record up to date, including its condition, fate, and release date and place.",
       "If you develop a fever, headache or cough, tell your doctor you work with birds."
      ],
      "daily_checks": [
       "Weighed and recorded",
       "Eating and drinking",
       "Warm, not panting",
       "Bedding changed twice",
       "Wings held neatly"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "Passwell Crumbles and Insectivore Rearing Mix",
       "weight_g": 300,
       "stage": "Duckling with feathers coming through",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Ducklings feed themselves from a dish; the guidance gives no body-weight amount.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully feathered, with waterproof feathers that stay dry after swimming.",
        "Flies strongly and sees and moves well.",
        "Feeds itself on natural foods and is wary of people and predators.",
        "Healthy, needing no more care, and at adult size."
       ],
       "target_weight": "About 1 kg (adult size) for a Pacific black duck",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild day and release it in daylight, avoiding extreme weather.",
        "Carry it in a lined, well-ventilated box, one bird per box.",
        "Release it with its fellow ducklings or near other Pacific black ducks, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found, using the GPS or Melways record kept with it, or if that spot is unsuitable, at the closest suitable wetland within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Loses weight, or does not gain for two days in a row.",
        "Eats little or nothing, or has diarrhoea.",
        "Wing tips start to droop or twist outwards (early angel wing).",
        "Feathers soak through and stay wet after swimming once fully feathered, or it limps."
       ],
       "urgent": [
        "Cold, floppy, or cannot hold its head up: give nothing by mouth and go straight to a vet.",
        "Poor coordination, tremors, twisted neck, cannot stand, or trouble breathing (possible bird flu): see a vet straight away and report it on 1800 675 888.",
        "Sudden death of this or any other bird in care: report it straight away on 1800 675 888."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "waterbird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "vic-rehab-guidelines-waterbirds-marine",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    },
    {
     "id": "lib-duck-adult",
     "stage": "Adult",
     "weight": "about 1 kg",
     "text": "Ready-made plan: an adult Pacific black duck, about 1 kg, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a duck like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult Pacific black duck",
      "species": "Pacific black duck (Anas superciliosa)",
      "kind": "wildlife",
      "summary": "This adult Pacific black duck, about 1 kg, is recovering well in care and has no injuries needing treatment. The goal is to keep it eating well, waterproof and flying strongly so it can go back to the wild as soon as it is ready.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Let it settle in the quiet indoor pen until it is eating well and steady on its feet."
        ]
       },
       {
        "when": "Days 4 to 7",
        "tasks": [
         "Move it to a larger outdoor aviary with grass and a shallow pool that has branches or a plank so it can climb out easily, to rebuild waterproofing and flight."
        ]
       },
       {
        "when": "Week 2",
        "tasks": [
         "Shift its diet mostly to natural foods: fresh grass, aquatic plants and insects."
        ]
       }
      ],
      "housing": [
       "Keep it on its own in a quiet, sheltered, draught-free pen at the warmth the app shows for ducks and waterbirds, well away from the room and air space of any pet birds, as serious diseases pass between them through the air.",
       "Line the floor with soft, non-slip bedding to protect its beak, feet and feathers, and change it twice a day, as ducks foul their bedding quickly.",
       "Give it its own food dishes, water dishes and cleaning gear while it is kept apart from other birds.",
       "Psittacosis is common in Victorian waterfowl, so wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Pacific black ducks eat both plants and small animals, so feed Passwell Crumbles (15% protein) with chopped greens and Insectivore Rearing Mix, plus fresh unsprayed grass and aquatic plants, aiming for a whole diet of about 19% protein for a mixed-feeding duck.",
       "The guidance gives no set daily amount for this species (grey teal eat 35 to 50 g a day and Australian shelduck 70 to 110 g a day), so offer a little more than it finishes and adjust; a recovering bird may need up to 50% more than usual.",
       "Put out fresh food every morning, and remove leftovers and any spoilt food before the next feed.",
       "Present food in a shallow dish beside its water, and float some greens in a shallow tray of water, the way a dabbling duck feeds.",
       "Give clean fresh water at all times in a dish deep enough for it to dip its whole bill, changed at least once a day.",
       "Do not add vitamin or mineral supplements to the commercial foods, and never feed bread, which has little nutrition and can grow mould that causes aspergillosis.",
       "Weigh the food offered and left over each day, weigh the duck at least once a week, and record both."
      ],
      "activity": [
       "Handle it only when needed, quickly and gently: wrap it in a towel with the wings folded against its body, as ducks defend themselves with their wings.",
       "Keep people and pets away and do not tame it, so it keeps its natural fear of people.",
       "Scatter greens and unsprayed grass sods each day so it can forage."
      ],
      "care": [
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and delay release.",
       "Keep its record up to date, including its condition, fate, and release date and place.",
       "If you develop a fever, headache or cough, tell your doctor you work with birds."
      ],
      "daily_checks": [
       "Eating and drinking",
       "Droppings look normal",
       "Bedding changed twice",
       "Preening, feathers dry",
       "Bright and alert"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 1000,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult duck feeding itself from a dish; not fed a measured amount by body weight.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully recovered and needs no more medical care.",
        "Feathers fully waterproof, with water beading off after bathing.",
        "Flies strongly and sees and moves well.",
        "Shows wild behaviour: wary of people and predators, forages and seeks shelter."
       ],
       "target_weight": "About 1 kg, at least its weight on arrival, for this adult Pacific black duck",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild day and release it in daylight, avoiding extreme heat, cold, wind or storms.",
        "Carry it in a lined, well-ventilated box, one bird per box.",
        "Release it near other Pacific black ducks if possible, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found, using the GPS or Melways record kept with it, or if that spot is unsuitable, at the closest suitable wetland within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Eats little or nothing for a day, or keeps losing weight.",
        "Feathers soak through or stay wet after bathing.",
        "Diarrhoea or unusual droppings.",
        "Limping, swollen feet or sores on the feet."
       ],
       "urgent": [
        "Collapsed, cold, or cannot hold its head up: give nothing by mouth and go straight to a vet.",
        "Poor coordination, tremors, twisted neck, cannot stand, or trouble breathing (possible bird flu): see a vet straight away and report it on 1800 675 888.",
        "Sudden death of this or any other bird in care: report it straight away on 1800 675 888."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "waterbird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "vic-rehab-guidelines-waterbirds-marine",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "roo",
   "name": "Eastern grey kangaroo",
   "plans": [
    {
     "id": "lib-roo-unfurred",
     "stage": "Unfurred joey",
     "weight": "about 800 g",
     "text": "Ready-made plan: an orphaned eastern grey kangaroo joey, about 800 g, unfurred with eyes just opening. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned eastern grey kangaroo joey",
      "species": "Eastern grey kangaroo (Macropus giganteus)",
      "kind": "wildlife",
      "summary": "This healthy orphaned eastern grey kangaroo joey weighs about 800 g, is still unfurred and its eyes are just opening, so it relies completely on its pouch and milk. The goal is to raise it steadily through each milk stage and weaning with other young kangaroos, then release it fit and wild.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 2",
        "tasks": [
         "Arrange through an experienced macropod carer for it to be raised with other eastern grey joeys of a similar age, so they are released together as a group."
        ]
       },
       {
        "when": "About weeks 2 to 4 (around 180 days old, about 950 g, fine fur coming through)",
        "tasks": [
         "Change to Wombaroo Kangaroo Milk Replacer 0.6 gradually over 10 to 20 days, keeping the total daily amount the same, and drop to 5 feeds a day.",
         "If droppings turn runny during any milk change, go back a step and change more slowly."
        ]
       },
       {
        "when": "About weeks 7 to 9 (around 210 to 220 days old, about 1.5 to 1.8 kg, head out of the pouch)",
        "tasks": [
         "Change to Wombaroo Kangaroo Milk Replacer >0.7 the same gradual way and drop to 4 feeds a day.",
         "Start offering a shallow dish of fresh water to lap, changed daily."
        ]
       },
       {
        "when": "From about week 15 (around 270 days old)",
        "tasks": [
         "Drop to 3 feeds and add macropod pellets, such as Wombaroo Kangaroo Pellets, and hay, never cattle or sheep pellets, which can contain coccidiostats that are fatal to kangaroos.",
         "Weaning follows from about 330 days, with the last bottle at about 450 days and no bottles in the month before release."
        ]
       }
      ],
      "housing": [
       "Keep it in a soft fabric pouch with a cotton liner, inside a hospital box in a dark, quiet room away from pets, noise and smells.",
       "Hold the pouch at the temperature the app shows for this stage, using a heat source that never touches the joey and a thermometer beside the pouch, as an unfurred joey cannot keep itself warm; if it ever feels cool, warm it slowly over two to three hours before any feed.",
       "Change the liner whenever it is soiled so its bare skin stays clean and dry.",
       "Wash your hands before and after every feed and clean-up, wear gloves for droppings, and disinfect bottles and equipment with F10 left on for 5 to 10 minutes, as kangaroos can carry Q fever, salmonella and ringworm without looking sick; Q fever and tetanus vaccination give carers the best protection."
      ],
      "feeding": [
       "Feed Wombaroo Kangaroo Milk Replacer 0.4, a low-lactose milk made for young kangaroos at this stage; never cow's milk, which gives joeys diarrhoea.",
       "Give the amount in the feed calculator each day, split evenly across the feeds.",
       "Give 6 feeds a day, about every 4 hours: 6 am, 10 am, 2 pm, 6 pm, 10 pm and 2 am.",
       "Feed it inside its pouch, held upright, letting it suck slowly at its own pace through a teat with a hole of about 1 mm so milk drips rather than flows, and stop straight away if milk comes out of its nose.",
       "Mix 18 g of powder (2½ scoops) with 90 mL of pre-boiled water at about 50°C to make 100 mL in sterilised bottles, warm it to about 30°C, keep made-up milk in the fridge for no more than a day (or frozen up to 2 weeks, never refrozen) and throw out leftovers.",
       "After every feed, gently wipe its genital area with a warm damp cloth until it wees and poos, as it cannot toilet by itself yet; droppings at this stage look like thick custard to toothpaste.",
       "Once fine fur is coming through and it pokes its head out of the pouch, put fresh grass with roots and a little soil in the pouch each day to nibble."
      ],
      "activity": [
       "Handle it gently and only for feeds, toileting and weighing, and if it calls out, breathes fast, pants or grinds its teeth, stop and let it settle, as stress lowers a joey's resistance to disease.",
       "Lift it out of the pouch by easing it out back first, never by its tail or legs alone.",
       "Keep it away from pets and visitors and avoid making a pet of it, so it grows up wary of people and dogs."
      ],
      "care": [
       "Joeys at this early stage are fragile and prone to illness, so it is best raised by an experienced macropod carer.",
       "Keep its record up to date with weights, feeds and droppings, as authorised carers must keep records for 3 years.",
       "Its age is estimated from its size and looks; if it seems younger or older than this plan assumes, check its milk stage with your vet."
      ],
      "daily_checks": [
       "Weigh before first feed",
       "All feeds taken",
       "Toileted after feeds",
       "Pouch temperature right",
       "Liner clean and dry"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Kangaroo Milk Replacer 0.4",
       "weight_g": 800,
       "stage": "Age Factor 0.4, about 170 days, unfurred, eyes opening",
       "percent_body_weight_per_day": 11,
       "feeds_per_day": 6,
       "basis": "Worked out from DEECA Table 6.8 (about 88 mL a day at 800 g); the percentage falls as it grows.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned and off the bottle for at least a month",
        "Weighs at least about 15 kg",
        "Healthy, moving well and grazing on its own",
        "Wary of people and dogs and keeps with its group"
       ],
       "target_weight": "About 15 kg at the earliest for an eastern grey kangaroo",
       "how": [
        "Release it within 24 hours of being ready, together with the group it was raised with.",
        "Choose mild weather and the time of day kangaroos are normally out feeding, avoiding heat and storms.",
        "Move it calmly in a covered, well-ventilated crate with its head covered, keeping the trip short.",
        "If a vet sedates it for the trip, stay and watch until it is fully awake, to protect it from predators."
       ],
       "where": "Release it where it was found (record that spot with GPS coordinates), or if that is unsuitable, at the closest suitable spot within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Runny droppings that do not firm up after going back a milk step.",
        "Refusing feeds, or not gaining or losing weight two days running.",
        "Dry, red or scaly skin.",
        "Cloudy eyes."
       ],
       "urgent": [
        "Cool to touch, floppy, unable to hold its head up or not sucking: give nothing by mouth on the way to the vet.",
        "Coughing, noisy breathing or milk coming from the nose after a feed.",
        "Fast breathing, panting or teeth grinding that does not settle once handling stops."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "macropod",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wires-kangaroos-and-wallabies"
      ]
     }
    },
    {
     "id": "lib-roo-furred",
     "stage": "Furred pouch joey",
     "weight": "about 3 kg",
     "text": "Ready-made plan: an orphaned eastern grey kangaroo joey, about 3 kg, fully furred, spending most of its time in the pouch and drinking milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned eastern grey kangaroo joey",
      "species": "Eastern grey kangaroo (Macropus giganteus)",
      "kind": "wildlife",
      "summary": "This healthy orphaned eastern grey kangaroo joey weighs about 3 kg, is fully furred and still spends most of its time in the pouch drinking milk. The goal is to raise it through the rest of pouch life and weaning with other young kangaroos, then release it fit and wild.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 2",
        "tasks": [
         "Join it with other eastern grey joeys of a similar age through an experienced macropod carer, so they are raised together and released together as a group."
        ]
       },
       {
        "when": "About week 3 (around 270 days old, about 4 kg)",
        "tasks": [
         "Drop to 3 milk feeds a day and start pellets and hay."
        ]
       },
       {
        "when": "About weeks 7 to 10 (around 300 to 320 days old, out of the pouch most of the time)",
        "tasks": [
         "Drop to 2 milk feeds a day.",
         "Move it with its group to a large, secure grassy outdoor enclosure with shelter and shade."
        ]
       },
       {
        "when": "From about week 12 (around 330 days old)",
        "tasks": [
         "Start weaning: lower the milk bit by bit, going to 1 feed a day from about 360 days and giving the last bottle at about 450 days.",
         "Give no bottles at all in the month between weaning and release."
        ]
       }
      ],
      "housing": [
       "Keep it in a fabric pouch hung in a quiet, dark spot, at the temperature the app shows for this stage, away from pets, noise and smells.",
       "Line the pouch with soft cotton liners and change them whenever soiled, so its fur and skin stay clean and dry.",
       "Give it a safe, grassy area to hop and explore for longer each day as it leaves the pouch more, with the pouch hung where it can climb back in.",
       "Wash your hands before and after every feed and clean-up, wear gloves and a mask when handling droppings, and disinfect bottles and equipment with F10 left on for 5 to 10 minutes, as kangaroos can carry Q fever, salmonella and ringworm without looking sick; Q fever and tetanus vaccination give carers the best protection."
      ],
      "feeding": [
       "Feed Wombaroo Kangaroo Milk Replacer >0.7, a low-lactose milk made for kangaroos; never cow's milk, which gives joeys diarrhoea.",
       "Give the amount in the feed calculator each day, split evenly across the feeds.",
       "Give 4 feeds a day, about 6 am, 11 am, 4 pm and 9 pm.",
       "Feed it in or just out of its pouch, letting it suck at its own pace through a teat with a hole of about 1 mm so the milk drips slowly, and stop if milk comes out of its nose.",
       "Mix 25 g of powder (3½ scoops) with 80 mL of pre-boiled water at about 50°C to make 100 mL in sterilised bottles, warm it to about 30°C, keep made-up milk in the fridge for no more than a day (or frozen up to 2 weeks, never refrozen) and throw out leftovers.",
       "If it does not wee and poo by itself after a feed, gently wipe its bottom with a warm damp cloth until it goes; joeys usually start toileting on their own at about this size.",
       "Put out a shallow dish of fresh water, changed every day, for it to lap when it is out of the pouch.",
       "Offer fresh grass with roots and a little soil every day now, then macropod pellets such as Wombaroo Kangaroo Pellets and hay from about 270 days; never cattle or sheep pellets, which can contain coccidiostats that are fatal to kangaroos, and no seed mixes, short chaff or bread, as sharp pieces injure the gums and lead to lumpy jaw."
      ],
      "activity": [
       "Handle it gently and briefly, and if it calls out, breathes fast, pants or grinds its teeth, stop and let it settle in its pouch, as stress lowers a joey's resistance to disease.",
       "Lift it out of the pouch by easing it out back first, never by its tail or legs alone.",
       "Keep it away from pets and visitors and avoid making a pet of it, so it stays wary of people and dogs."
      ],
      "care": [
       "Never chase it, tie its legs or hold it down to catch it, especially on hot days, as stress and struggling can bring on capture myopathy, which can kill.",
       "Keep its record up to date with weights, feeds and droppings, as authorised carers must keep records for 3 years.",
       "Its age is estimated from its size and fur; if it seems younger or older than this plan assumes, check its milk stage with your vet or an experienced macropod carer."
      ],
      "daily_checks": [
       "Weigh before morning feed",
       "All milk feeds taken",
       "Droppings soft to firm",
       "Pouch liners clean",
       "Bright and hopping well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Kangaroo Milk Replacer >0.7",
       "weight_g": 3000,
       "stage": "Age Factor >0.7, about 250 days, fully furred",
       "percent_body_weight_per_day": 5.3,
       "feeds_per_day": 4,
       "basis": "Worked out from DEECA Table 6.8 (about 160 mL a day at 3 kg); the percentage falls as it grows.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned and off the bottle for at least a month",
        "Weighs at least about 15 kg",
        "Healthy, moving well and grazing on its own",
        "Wary of people and dogs and keeps with its group"
       ],
       "target_weight": "About 15 kg at the earliest for an eastern grey kangaroo",
       "how": [
        "Release it within 24 hours of being ready, together with the group it was raised with.",
        "Choose mild weather and the time of day kangaroos are normally out feeding, avoiding heat and storms.",
        "Move it calmly in a covered, well-ventilated crate with its head covered, keeping the trip short.",
        "If a vet sedates it for the trip, stay and watch until it is fully awake, to protect it from predators."
       ],
       "where": "Release it where it was found (record that spot with GPS coordinates), or if that is unsuitable, at the closest suitable spot within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Diarrhoea, or droppings runny for more than a day.",
        "Refusing feeds, or losing weight two days running.",
        "Patches of hair loss, crusty or scaly skin.",
        "Cloudy eyes."
       ],
       "urgent": [
        "Cold, floppy or unable to hold its head up: give nothing by mouth on the way to the vet.",
        "Coughing, noisy breathing or milk coming from the nose after a feed.",
        "Stiff, wobbly or weak after a fright, chase or handling (possible capture myopathy).",
        "Drooling, panting or lying down and slow to get up on a hot day (heat stress)."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "macropod",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wires-kangaroos-and-wallabies",
       "wires-extreme-heat-factsheet"
      ]
     }
    },
    {
     "id": "lib-roo-atfoot",
     "stage": "Young at foot",
     "weight": "about 10 kg",
     "text": "Ready-made plan: a young-at-foot eastern grey kangaroo, about 10 kg, grazing and being weaned off milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a kangaroo like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Young-at-foot eastern grey kangaroo",
      "species": "Eastern grey kangaroo (Macropus giganteus)",
      "kind": "wildlife",
      "summary": "This healthy young-at-foot eastern grey kangaroo weighs about 10 kg, is grazing well and is part-way through weaning off milk. The goal is to finish weaning it onto a natural grazing diet, grow it up with other young kangaroos and release it as a fit, wild-wary animal.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 2",
        "tasks": [
         "Join it with other young eastern grey kangaroos of a similar size through an experienced macropod carer, so they grow up together and are released together as a group."
        ]
       },
       {
        "when": "About week 3 (around 360 days old)",
        "tasks": [
         "Drop to one milk feed a day, keeping the amount falling as it grazes more."
        ]
       },
       {
        "when": "About weeks 10 to 13 (around 420 to 450 days old)",
        "tasks": [
         "Give the last bottle, so it is fully weaned onto grass, hay and pellets."
        ]
       },
       {
        "when": "The month after weaning",
        "tasks": [
         "Keep it with its group in the large enclosure with no bottles at all, building fitness and wariness before release."
        ]
       }
      ],
      "housing": [
       "Keep it in a large, secure outdoor grassy enclosure with a sheltered shed, shade and dense cover, at normal outdoor temperature, away from dogs, traffic and people.",
       "Give it a quiet, screened corner to retreat to, as kangaroos have a strong flight response and panic easily.",
       "Wash your hands after every feed and clean-up, and wear gloves and a mask when handling droppings, as kangaroos can carry Q fever, salmonella and ringworm without looking sick; Q fever and tetanus vaccination give carers the best protection.",
       "Pick up droppings and clean dishes every day, and disinfect bottles and equipment with F10 left on for 5 to 10 minutes."
      ],
      "feeding": [
       "Its main food is fresh grass to graze, ideally native grasses, with good-quality hay and macropod pellets such as Wombaroo Kangaroo Pellets offered every day; never cattle or sheep pellets, which can contain coccidiostats that are fatal to kangaroos, and no seed mixes, short chaff, bread, grain mixes or molasses, as sharp pieces injure the gums and lead to lumpy jaw.",
       "Its milk is Wombaroo Kangaroo Milk Replacer >0.7, a low-lactose milk made for kangaroos; never cow's milk, which gives joeys diarrhoea.",
       "Give the amount in the feed calculator, lowering it bit by bit over the coming weeks as it eats more solid food.",
       "Give 2 milk feeds a day, about 7 am and 6 pm; if it is already down to one feed a day, stay at one.",
       "Let it suck at its own pace through a teat with a hole of about 1 mm so the milk drips slowly, and stop if milk comes out of its nose.",
       "Mix 25 g of powder (3½ scoops) with 80 mL of pre-boiled water at about 50°C to make 100 mL, warm it to about 30°C, keep made-up milk in the fridge for no more than a day and throw out leftovers.",
       "Keep a shallow dish of fresh water out at all times, changed every day."
      ],
      "activity": [
       "Handle it as little as possible and never chase it, tie its legs or hold it by force, especially on hot days, as stress and struggling can bring on capture myopathy, which can kill.",
       "Keep it wild: no petting or fussing, and no visitors or pets near it, so it stays wary of people and dogs.",
       "Scatter fresh grass, browse and pellets around the enclosure so it forages and explores like a wild kangaroo."
      ],
      "care": [
       "Keep its record up to date with weights, feeds and droppings, as authorised carers must keep records for 3 years.",
       "Its age is estimated from its size; if its weaning is further along than this plan assumes, check the milk amount with your vet or an experienced macropod carer."
      ],
      "daily_checks": [
       "Weigh before morning feed",
       "Grazing and eating pellets",
       "Droppings firm pellets",
       "Fresh water dish",
       "Hopping normally"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Kangaroo Milk Replacer >0.7",
       "weight_g": 10000,
       "stage": "Weaning, about 360 days old",
       "percent_body_weight_per_day": 1.8,
       "feeds_per_day": 2,
       "basis": "Estimated from DEECA Table 6.8 weaning row (about 180 mL a day near 360 days); milk falls with age, not weight.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned and off the bottle for at least a month",
        "Weighs at least about 15 kg",
        "Healthy, moving well and grazing on its own",
        "Wary of people and dogs and keeps with its group"
       ],
       "target_weight": "About 15 kg at the earliest for an eastern grey kangaroo",
       "how": [
        "Release it within 24 hours of being ready, together with the group it was raised with.",
        "Choose mild weather and the time of day kangaroos are normally out feeding, avoiding heat and storms.",
        "Move it calmly in a covered, well-ventilated crate with its head covered, keeping the trip short.",
        "If a vet sedates it for the trip, stay and watch until it is fully awake, to protect it from predators."
       ],
       "where": "Release it where it was found (record that spot with GPS coordinates), or if that is unsuitable, at the closest suitable spot within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Diarrhoea, or droppings soft and sloppy for more than a day.",
        "Eating less, refusing its milk or losing weight two days running.",
        "Patches of hair loss or crusty skin, which can be ringworm.",
        "A lump or swelling on the jaw or face, or drooling while eating, which can be lumpy jaw."
       ],
       "urgent": [
        "Stiff, wobbly, weak or slow to get up after a fright, chase or handling (possible capture myopathy).",
        "Drooling, panting or lying down and slow to get up on a hot day (heat stress).",
        "Coughing, noisy breathing or milk coming from the nose after a feed.",
        "Any injury, bleeding or collapse: give nothing by mouth on the way to the vet."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "macropod",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wires-extreme-heat-factsheet"
      ]
     }
    }
   ]
  },
  {
   "id": "ringtail",
   "name": "Common ringtail possum",
   "plans": [
    {
     "id": "lib-ringtail-pinkie",
     "stage": "Unfurred joey",
     "weight": "about 30 g",
     "text": "Ready-made plan: an orphaned common ringtail possum joey, about 30 g, unfurred with eyes closed. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Common ringtail possum joey",
      "species": "Common ringtail possum (Pseudocheirus peregrinus)",
      "kind": "wildlife",
      "summary": "This orphaned common ringtail possum joey weighs about 30 g, is unfurred with its eyes still closed, and is healthy. The goal is to hand-raise it on possum milk and then fresh leaves, alongside other ringtails, until it is ready for release at about 490 g.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 5",
        "tasks": [
         "Through an experienced carer, arrange for it to be raised with other ringtail joeys of a similar age so they can be released together."
        ]
       },
       {
        "when": "About weeks 5 to 6 (eyes opening, about 52 g)",
        "tasks": [
         "Change gradually to Wombaroo Possum Milk Replacer >0.8 over about a week, keeping the daily total the same and only changing the mix of the two.",
         "Ease down to 4 feeds a day, without overnight feeds."
        ]
       },
       {
        "when": "About weeks 8 to 11 (leaving the pouch)",
        "tasks": [
         "Start offering fresh eucalypt tips from 3 to 5 species every day, and move it to a small enclosure with branches once it spends most of its time out of the pouch."
        ]
       },
       {
        "when": "About weeks 15 to 18",
        "tasks": [
         "Wean: cut the milk back gradually until it stops, at about 310 g, then move the group to a larger outdoor enclosure."
        ]
       }
      ],
      "housing": [
       "Keep it in a soft, clean fabric pouch inside a ventilated, lidded box in a dark, quiet room away from pets, at the pouch temperature the app shows for an unfurred joey.",
       "Check the warmth with a thermometer beside the pouch, and if the joey ever feels cool, warm it gradually over two to three hours before giving any milk.",
       "Change the pouch lining whenever it is soiled.",
       "Wash your hands before and after every feed, and wear disposable gloves when cleaning up droppings."
      ],
      "feeding": [
       "Feed Wombaroo Possum Milk Replacer <0.8, the possum formula for this stage; never cow's milk, which gives joeys diarrhoea.",
       "Give the amount in the feed calculator each day, split evenly between feeds, and weigh it every day at the same time before a feed so the amount stays right.",
       "8 feeds a day, about every 3 hours around the clock: 6 am, 9 am, 12 noon, 3 pm, 6 pm, 9 pm, midnight and 3 am.",
       "Use a syringe or bottle with a fine teat (hole about 1 mm) sterilised before every feed, hold the joey wrapped and upright, and let it suck drop by drop at its own pace; stop at once if milk comes out of its nose.",
       "Mix 16 g of powder (2½ scoops) with 90 mL of cooled, pre-boiled water to make 100 mL, never stronger or weaker; warm each feed to about 30°C, keep made-up milk in the fridge for no more than a day and throw out leftovers.",
       "After each feed, gently stroke its genital opening with warm, damp cotton wool until it passes urine and droppings.",
       "Any extra fluid it needs is given separately, never by watering down the milk.",
       "As it grows, it moves on to Possum Milk Replacer >0.8 when its eyes open and then to fresh leaves once it starts leaving the pouch; give no fruit, vegetables or flowers while it is under 250 g, as the wrong diet causes bloat in ringtails."
      ],
      "activity": [
       "Handle it only for feeds, toileting and weighing, quickly and gently, and keep lights dim and voices low around it.",
       "Don't make a pet of it, so it grows up wary of people."
      ],
      "care": [
       "Keep its daily record of weight, feeds, toileting and any changes up to date, as your authorisation requires.",
       "The week numbers in this plan are a rough guide worked out from its weight; go by how it develops, such as its eyes opening and fur growing, and its weight gain."
      ],
      "daily_checks": [
       "Weight before a feed",
       "All 8 feeds given",
       "Toileted after feeds",
       "Warmth checked",
       "Skin pink and soft"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Possum Milk Replacer <0.8",
       "weight_g": 30,
       "stage": "Unfurred, eyes closed, fully pouch-bound (under 0.8)",
       "percent_body_weight_per_day": 25,
       "feeds_per_day": 8,
       "basis": "Nearest Wombaroo ringtail chart point: 9 mL a day at 35 g (about 25 to 26% of body weight).",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Weighs about 490 g and is fully weaned, eating plenty of browse.",
        "Healthy, with full, good fur, and needs no more care.",
        "Climbs strongly, sees and moves well, and uses a nest box or builds a nest.",
        "Wary of people and predators and active at night like a wild ringtail."
       ],
       "target_weight": "About 490 g for a common ringtail possum",
       "how": [
        "Release within 24 hours of it being ready, together with the ringtails it was raised with.",
        "Release at dusk, never during the day, and not in extreme heat, cold, wind or rain.",
        "Put a temporary nest box in a tree at the release site."
       ],
       "where": "Release it where it was found, using the location recorded on admission, or if that spot is unsuitable, at the closest suitable place within its home range without crossing a boundary it wouldn't normally cross."
      },
      "escalate": {
       "vet": [
        "Diarrhoea or very runny, pale droppings.",
        "No weight gain for two days running, or losing weight.",
        "Refusing two feeds in a row.",
        "Red, dry, cracked or peeling skin."
       ],
       "urgent": [
        "Milk coming from the nose, coughing or noisy breathing after a feed.",
        "A swollen, tight belly.",
        "Cold, floppy or not responding.",
        "Any injury, bleeding or attack by another animal."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "ringtail",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wires-possums"
      ]
     }
    },
    {
     "id": "lib-ringtail-furred",
     "stage": "Furred joey",
     "weight": "about 120 g",
     "text": "Ready-made plan: an orphaned common ringtail possum joey, about 120 g, furred with eyes open, drinking milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Common ringtail possum joey",
      "species": "Common ringtail possum (Pseudocheirus peregrinus)",
      "kind": "wildlife",
      "summary": "This orphaned common ringtail possum joey weighs about 120 g, is furred with its eyes open, healthy and drinking milk well. The goal is to raise it on possum milk and then fresh leaves, alongside other ringtails, until it is ready for release at about 490 g.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 7",
        "tasks": [
         "Through an experienced carer, arrange for it to be raised with other ringtail joeys so they can be released together."
        ]
       },
       {
        "when": "About weeks 1 to 4",
        "tasks": [
         "Move it from the pouch box into a small enclosure with branches once it spends most of its time out of the pouch."
        ]
       },
       {
        "when": "About weeks 4 to 7",
        "tasks": [
         "Start weaning: cut the milk back gradually until it stops, at about 310 g."
        ]
       },
       {
        "when": "About weeks 8 to 12",
        "tasks": [
         "Move the group into a larger outdoor enclosure with branches and nest boxes to build climbing fitness before release."
        ]
       }
      ],
      "housing": [
       "Keep it in a soft fabric pouch inside a ventilated, lidded box in a dark, quiet room away from pets, at the warmth the app shows for a furred joey.",
       "If it ever feels cool, warm it gradually over two to three hours before giving any milk.",
       "Change soiled pouch linings and bedding every day.",
       "Wear gloves, long sleeves and a mask when handling and cleaning, and wash your hands afterwards."
      ],
      "feeding": [
       "Feed Wombaroo Possum Milk Replacer >0.8 (a possum formula; never cow's milk, which gives joeys diarrhoea), plus fresh eucalypt tips from 3 to 5 species every day.",
       "Give the amount in the feed calculator each day, split evenly between feeds, and weigh it every day at the same time before a feed so the amount stays right.",
       "3 feeds a day spread evenly, for example about 7 am, 3 pm and 11 pm (the guide gives 2 to 4 feeds a day at this stage).",
       "Feed slowly from a bottle or syringe with a teat hole of about 1 mm so milk drips slowly, holding it upright and letting it suck at its own pace; stop at once if milk comes out of its nose.",
       "Mix 25 g of powder (3½ scoops) with 80 mL of cooled, pre-boiled water to make 100 mL, never stronger or weaker; warm it to about 30°C, keep made-up milk in the fridge for no more than a day, throw out leftovers and sterilise the bottle and teat before each feed.",
       "Give no fruit, vegetables or flowers while it is under 250 g, as the wrong diet causes bloat in ringtails; it is normal for it to eat some of its own droppings, which it needs for healthy digestion.",
       "In hot weather, offer extra water in a shallow dish between feeds, never by watering down the milk.",
       "As it eats more leaves, it moves toward weaning: on the Wombaroo ringtail chart, milk is cut back from about 160 days old and stops by about 180 days, when it is fully weaned at about 310 g."
      ],
      "activity": [
       "Handle it only for feeds and weighing, quickly and gently, and don't make a pet of it so it stays wary of people.",
       "Let it climb and explore among leafy branches in the evening, when ringtails are naturally active."
      ],
      "care": [
       "Keep its daily record of weight, feeds, droppings and any changes up to date, as your authorisation requires.",
       "The week numbers in this plan are a rough guide worked out from its weight; go by how it develops, its weight gain and how well it eats leaves."
      ],
      "daily_checks": [
       "Weight before a feed",
       "All milk feeds taken",
       "Fresh leaves eaten",
       "Urine and droppings normal",
       "Bright and alert"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Possum Milk Replacer >0.8",
       "weight_g": 120,
       "stage": "Furred, eyes open, about 100 to 140 days (over 0.8)",
       "percent_body_weight_per_day": 14,
       "feeds_per_day": 3,
       "basis": "Wombaroo ringtail chart: 12 mL a day at 62 g rising to 18 mL at 135 g, about 17 mL (14%) at 120 g.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Weighs about 490 g and is fully weaned, eating plenty of browse.",
        "Healthy, with full, good fur, and needs no more care.",
        "Climbs strongly, sees and moves well, and uses a nest box or builds a nest.",
        "Wary of people and predators and active at night like a wild ringtail."
       ],
       "target_weight": "About 490 g for a common ringtail possum",
       "how": [
        "Release within 24 hours of it being ready, together with the ringtails it was raised with.",
        "Release at dusk, never during the day, and not in extreme heat, cold, wind or rain.",
        "Put a temporary nest box in a tree at the release site."
       ],
       "where": "Release it where it was found, using the location recorded on admission, or if that spot is unsuitable, at the closest suitable place within its home range without crossing a boundary it wouldn't normally cross."
      },
      "escalate": {
       "vet": [
        "Diarrhoea or pasty droppings lasting more than a day.",
        "No weight gain for two days running, or losing weight.",
        "Refusing two milk feeds in a row.",
        "Fur loss, sores, or crusty or weepy eyes."
       ],
       "urgent": [
        "Milk coming from the nose, coughing or noisy breathing after a feed.",
        "A swollen, tight belly (bloat).",
        "Cold, floppy or not responding.",
        "Any injury, bleeding or attack by another animal."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "ringtail",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wires-possums"
      ]
     }
    },
    {
     "id": "lib-ringtail-juvenile",
     "stage": "Young, nearly weaned",
     "weight": "about 400 g",
     "text": "Ready-made plan: a young common ringtail possum, about 400 g, eating leaves and nearly weaned. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a possum like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Young common ringtail possum",
      "species": "Common ringtail possum (Pseudocheirus peregrinus)",
      "kind": "wildlife",
      "summary": "This young common ringtail possum weighs about 400 g, is healthy, eating leaves well and nearly weaned. The goal is to finish weaning it onto native browse alongside other ringtails and release it at about 490 g.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 7",
        "tasks": [
         "Through an experienced carer, put it with other ringtails so they can finish growing and be released together."
        ]
       },
       {
        "when": "Weeks 1 to 2",
        "tasks": [
         "Cut the milk down to one small feed and then stop it, as it is already past the usual fully weaned weight of about 310 g."
        ]
       },
       {
        "when": "Weeks 2 to 4",
        "tasks": [
         "Move the group into a larger outdoor enclosure with branches and nest boxes to build climbing fitness before release."
        ]
       }
      ],
      "housing": [
       "Keep it in a well-ventilated enclosure with branches and a nest box to sleep in, at the warmth the app shows for its stage.",
       "Place the enclosure somewhere quiet, away from pets and household noise.",
       "Clear out stale leaves and droppings every day.",
       "Wear gloves, long sleeves and a mask when handling and cleaning, and wash your hands afterwards."
      ],
      "feeding": [
       "Its main food is fresh native browse: tips from 3 to 5 eucalypt species every day, with the odd native flower, as ringtails are strict leaf eaters.",
       "Offer roughly its own body weight in fresh leaf each day (about 1 kg of leaf per kg of possum, so about 400 g now), more as it grows.",
       "Put fresh branches in each evening, since it feeds at night, hung at different heights as it would feed in trees, and remove wilted leaves.",
       "Give no fruit or vegetables, as they upset a ringtail's gut and can cause bloat, and keep lantana, oleander and hydrangea out of the browse.",
       "Any milk still given is Wombaroo Possum Milk Replacer >0.8 (never cow's milk, which causes diarrhoea), no more than the amount in the feed calculator, split over 2 small evening feeds.",
       "Mix 25 g of powder (3½ scoops) with 80 mL of cooled, pre-boiled water to make 100 mL, warm it to about 30°C and throw out any leftovers.",
       "Offer fresh water in a shallow dish, changed every day.",
       "It is normal for it to eat some of its own droppings, which it needs for healthy digestion."
      ],
      "activity": [
       "Handle it only when needed, quickly and gently, so it stays wary of people.",
       "Give plenty of branches, leafy cover and a nest box so it can climb, forage and hide."
      ],
      "care": [
       "Weigh it every day at the same time, before its evening feed, and keep its daily record of weight, food eaten, droppings and any changes up to date, as your authorisation requires."
      ],
      "daily_checks": [
       "Weight recorded",
       "Fresh browse given",
       "Leaves eaten overnight",
       "Droppings normal",
       "Water changed"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Possum Milk Replacer >0.8 (weaning)",
       "weight_g": 400,
       "stage": "Nearly weaned, past about 310 g",
       "percent_body_weight_per_day": 3,
       "feeds_per_day": 2,
       "basis": "Wombaroo ringtail chart: weaning starts at 12 mL a day and falls to none; 12 mL is about 3% of 400 g, as an upper limit.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Weighs about 490 g and is fully weaned, eating plenty of browse.",
        "Healthy, with full, good fur, and needs no more care.",
        "Climbs strongly, sees and moves well, and uses a nest box or builds a nest.",
        "Wary of people and predators and active at night like a wild ringtail."
       ],
       "target_weight": "About 490 g for a common ringtail possum",
       "how": [
        "Release within 24 hours of it being ready, together with the ringtails it was raised with.",
        "Release at dusk, never during the day, and not in extreme heat, cold, wind or rain.",
        "Put a temporary nest box in a tree at the release site."
       ],
       "where": "Release it where it was found, using the location recorded on admission, or if that spot is unsuitable, at the closest suitable place within its home range without crossing a boundary it wouldn't normally cross."
      },
      "escalate": {
       "vet": [
        "Diarrhoea or soft droppings lasting more than a day.",
        "Losing weight, or not gaining over several days.",
        "Eating noticeably fewer leaves for a day.",
        "Fur loss, sores or constant scratching."
       ],
       "urgent": [
        "A swollen, tight belly (bloat).",
        "Cold, floppy, collapsed or struggling to breathe.",
        "Lying on the floor, panting or limp on a hot day.",
        "Any injury, bleeding or attack by another animal."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "ringtail",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wires-possums"
      ]
     }
    }
   ]
  },
  {
   "id": "brushtail",
   "name": "Common brushtail possum",
   "plans": [
    {
     "id": "lib-brushtail-furred",
     "stage": "Furred joey",
     "weight": "about 300 g",
     "text": "Ready-made plan: an orphaned common brushtail possum joey, about 300 g, furred with eyes open, drinking milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Common brushtail possum joey",
      "species": "Common brushtail possum (Trichosurus vulpecula)",
      "kind": "wildlife",
      "summary": "This orphaned common brushtail possum joey, about 300 g, is healthy, fully furred with its eyes open, and drinking milk well. The goal is to raise it on the right possum milk, wean it onto natural foods, and return it to the wild where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 3 (timing assumes it is about 140 days old at 300 g; if it looks younger or older, check its stage with your vet)",
        "tasks": [
         "Once it is leaving the pouch on its own, move it to a larger indoor enclosure with branches and a nest box."
        ]
       },
       {
        "when": "Weeks 4 to 6",
        "tasks": [
         "Start weaning: drop to 2 feeds a day and reduce milk gradually to about 20 mL a day by the end of week 6."
        ]
       },
       {
        "when": "Weeks 7 to 9",
        "tasks": [
         "Keep reducing milk gently until it stops altogether at around week 9 (about 200 days old).",
         "Once fully weaned, move it to a large outdoor pre-release enclosure with branches, a nest box and natural shelter."
        ]
       },
       {
        "when": "Week 10 onwards",
        "tasks": [
         "Keep it in the pre-release enclosure for at least two weeks on a fully natural diet, as possums must hold their weight on natural food before release."
        ]
       }
      ],
      "housing": [
       "Keep it in a soft fabric pouch inside a nest box in a quiet room, away from pets, noise and household activity, at the pouch or enclosure temperature the app shows for its stage.",
       "Hang the pouch in a small, secure enclosure with low branches so it can climb out and explore as it gains confidence.",
       "Keep it apart from other wildlife until its health is known.",
       "Wear gloves when cleaning up droppings and urine and wash your hands after every handling and feed, as possums can carry leptospirosis, salmonella and Q fever."
      ],
      "feeding": [
       "Feed Wombaroo Possum Milk Replacer >0.8, the right stage for a furred joey with its eyes open; never cow's milk, which lacks what possums need and gives them diarrhoea.",
       "Give the amount in the feed calculator each day, split evenly across the feeds, raising it as its weight goes up.",
       "Give 3 feeds a day, about 6 am, 2 pm and 10 pm.",
       "Feed from a bottle with a small teat whose hole is about 1 mm so milk drips slowly; hold it upright on its tummy, let it suck at its own pace, and stop if milk comes out of its nose.",
       "Make up 100 mL by mixing 25 g of powder (3½ scoops) with 80 mL of pre-boiled water at about 50°C; never make it stronger or weaker, keep made-up milk in the fridge for one day (or frozen up to 2 weeks), warm it to about 30°C and throw out leftovers.",
       "If it is not yet toileting on its own, gently stroke its bottom with a warm damp tissue after each feed until it wees and poos.",
       "Keep a shallow dish of fresh water in the enclosure, changed every day, and offer extra water between feeds in hot weather.",
       "Put fresh native browse such as eucalyptus leaves and native flowers in the enclosure every evening now; once it is nibbling regularly, add Wombaroo High Protein Supplement or Small Carnivore Food to boost protein, as brushtails are omnivores."
      ],
      "activity": [
       "Handle it gently and only for feeds, weighing and cleaning, so it stays wild and wary of people.",
       "Hang browse among the branches so it learns to climb and forage at night."
      ],
      "care": [
       "Weigh it every day at the same time, before a feed, and record it, so the feed calculator stays right.",
       "Keep its record sheet up to date with weights, feeds and care given, and keep the records for 3 years."
      ],
      "daily_checks": [
       "All feeds taken",
       "Weight going up",
       "Droppings firm and normal",
       "Browse nibbled overnight",
       "Bright and active"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Possum Milk Replacer >0.8",
       "weight_g": 300,
       "stage": "Furred, eyes open, emerging (about 140 days)",
       "percent_body_weight_per_day": 11,
       "feeds_per_day": 3,
       "basis": "Wombaroo Milk Booklet brushtail chart: about 33 mL a day at 300 g (20 mL at 150 g to 40 mL at 390 g)",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned and about 250 days old.",
        "Holding steady weight on a fully natural diet, with a full, healthy coat.",
        "Sees well and climbs and moves confidently.",
        "Shows normal wild behaviour: wary of people and predators, finds its own food and uses its nest box for shelter."
       ],
       "target_weight": "",
       "how": [
        "Release within 24 hours of it being ready, in mild, settled weather.",
        "Release at dusk, as it is nocturnal; never release it during the day.",
        "Take it to the site in a quiet, well-ventilated, lined box.",
        "Fix a temporary nest box in a tree at the release spot, as brushtails depend on hollows for shelter."
       ],
       "where": "Release it where it was found, using the GPS or Melways record of that spot; if the spot is unsuitable, use the closest suitable place within its home range without crossing a boundary it would not normally cross, and if there is no such place it cannot be released elsewhere."
      },
      "escalate": {
       "vet": [
        "Diarrhoea or loose droppings: go back to the last amount that suited it while getting advice.",
        "No weight gain, or weight loss, over two or three days.",
        "Refusing feeds for a whole day.",
        "Hair loss, sores or a swollen tummy."
       ],
       "urgent": [
        "Cold, floppy or unable to hold its head up: give nothing by mouth, warm it gently in its pouch and go straight to a vet.",
        "Coughing, rattly or laboured breathing, especially after milk came out of its nose.",
        "Collapsed or not responding.",
        "Any injury or bleeding."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "brushtail",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wires-possums"
      ]
     }
    },
    {
     "id": "lib-brushtail-juvenile",
     "stage": "Weaning young",
     "weight": "about 1 kg",
     "text": "Ready-made plan: a young common brushtail possum, about 1 kg, eating solid food and being weaned off milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a possum like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Young common brushtail possum",
      "species": "Common brushtail possum (Trichosurus vulpecula)",
      "kind": "wildlife",
      "summary": "This young common brushtail possum, about 1 kg, is healthy, eating solid food well and in the last stage of weaning off milk. The goal is to finish weaning, build its fitness on a fully natural diet, and return it to the wild where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 3",
        "tasks": [
         "Reduce its milk gently until it stops altogether by the end of week 3."
        ]
       },
       {
        "when": "Week 4, once fully weaned",
        "tasks": [
         "Move it to a large outdoor pre-release enclosure with branches to climb, a nest box and natural shelter.",
         "Phase out the protein supplement so it is on a fully natural diet."
        ]
       },
       {
        "when": "Weeks 4 to 6 and beyond",
        "tasks": [
         "Keep it in the pre-release enclosure for at least two weeks on a fully natural diet, as possums must hold their weight on natural food before release."
        ]
       }
      ],
      "housing": [
       "Keep it in a secure, well-ventilated indoor enclosure in a quiet room, away from pets, noise and household activity, at the enclosure temperature the app shows for its stage.",
       "Give it a nest box or hollow log to sleep in by day and sturdy branches to climb, as brushtails shelter in tree hollows.",
       "Keep it apart from other wildlife until its health is known.",
       "Wear gloves when cleaning up droppings and urine and wash your hands after handling, as possums can carry leptospirosis, salmonella and Q fever."
      ],
      "feeding": [
       "Feed plenty of fresh native browse such as eucalyptus leaves, with native flowers and blossom, plus a little Wombaroo High Protein Supplement or Small Carnivore Food to boost protein while it finishes weaning, as brushtails are omnivores.",
       "Put out enough browse at dusk that a little is left by morning, and clear out the old browse each day.",
       "Present the browse as branches wedged upright or fixed high in the enclosure, so it feeds the way it would in the trees.",
       "Give Wombaroo Possum Milk Replacer >0.8 at the amount in the feed calculator; if it is currently having more, step down gradually over several days rather than all at once, as sudden changes can cause diarrhoea.",
       "Give the milk as one feed in the evening, from a bottle with a teat hole of about 1 mm or lapped from a shallow dish, letting it take it at its own pace.",
       "Make up 100 mL by mixing 25 g of powder (3½ scoops) with 80 mL of pre-boiled water at about 50°C; never make it stronger or weaker, keep made-up milk in the fridge for one day, warm it to about 30°C and throw out leftovers.",
       "Keep a shallow, heavy dish of fresh water in the enclosure, changed every day."
      ],
      "activity": [
       "Handle it gently and only when needed, such as for weighing or moving enclosures, so it stays wild and wary of people.",
       "Hide browse and flowers around the branches so it forages and explores at night as it would in the wild."
      ],
      "care": [
       "Weigh it every day at the same time, before its milk feed, and record it, so the feed calculator stays right and any weight loss during weaning is picked up early.",
       "Keep its record sheet up to date with weights, feeds and care given, and keep the records for 3 years."
      ],
      "daily_checks": [
       "Browse eaten overnight",
       "Weight steady or rising",
       "Droppings firm and normal",
       "Fresh water given",
       "Bright and active"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Possum Milk Replacer >0.8",
       "weight_g": 1000,
       "stage": "Late weaning, eating solids",
       "percent_body_weight_per_day": 2,
       "feeds_per_day": 1,
       "basis": "Wombaroo Milk Booklet brushtail weaning chart: 20 mL a day at 180 days, down to none by 200 days",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned and about 250 days old or more.",
        "Holding steady weight on a fully natural diet, with a full, healthy coat.",
        "Sees well and climbs and moves confidently.",
        "Shows normal wild behaviour: wary of people and predators, finds its own food and uses its nest box for shelter."
       ],
       "target_weight": "",
       "how": [
        "Release within 24 hours of it being ready, in mild, settled weather.",
        "Release at dusk, as it is nocturnal; never release it during the day.",
        "Take it to the site in a quiet, well-ventilated, lined box.",
        "Fix a temporary nest box in a tree at the release spot, as brushtails depend on hollows for shelter."
       ],
       "where": "Release it where it was found, using the GPS or Melways record of that spot; if the spot is unsuitable, use the closest suitable place within its home range without crossing a boundary it would not normally cross, and if there is no such place it cannot be released elsewhere."
      },
      "escalate": {
       "vet": [
        "Losing weight for two or three days, or eating little browse.",
        "Diarrhoea or loose droppings: go back to the last milk amount that suited it while getting advice.",
        "Hair loss, crusty skin or sores.",
        "Limping, a new wound, or any swelling."
       ],
       "urgent": [
        "Cold, floppy or unable to hold its head up: give nothing by mouth, keep it warm, dark and quiet, and go straight to a vet.",
        "Struggling to breathe or coughing after a feed.",
        "Collapsed or not responding.",
        "Signs of heat stress on a hot day, such as panting, drooling or lying flat: place it in a cool, ventilated container on a damp towel, gently spray it with room-temperature water, and go straight to a vet."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "brushtail",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wires-possums"
      ]
     }
    },
    {
     "id": "lib-brushtail-adult",
     "stage": "Adult",
     "weight": "about 2.5 kg",
     "text": "Ready-made plan: an adult common brushtail possum, about 2.5 kg, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a possum like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult common brushtail possum",
      "species": "Common brushtail possum (Trichosurus vulpecula)",
      "kind": "wildlife",
      "summary": "This adult common brushtail possum, about 2.5 kg, is recovering well in care with no injuries needing treatment and no medicines. The goal is to keep it calm and eating well on natural foods, rebuild its fitness in pre-release housing, and return it to the wild where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Let it settle in the indoor enclosure and confirm it is eating its browse well each night."
        ]
       },
       {
        "when": "Day 4 onwards, once eating well with steady weight",
        "tasks": [
         "Move it to a large outdoor pre-release enclosure with branches to climb, a nest box and natural shelter."
        ]
       },
       {
        "when": "First two weeks in the pre-release enclosure",
        "tasks": [
         "Keep it there for at least two weeks on a fully natural diet, as possums must hold their weight on natural food before release."
        ]
       }
      ],
      "housing": [
       "Keep it on its own in a secure, well-ventilated enclosure in a quiet, dim room, away from pets, people and household noise, at the enclosure temperature the app shows for brushtail possums.",
       "Give it a nest box or hollow log to sleep in by day and sturdy branches to climb, as brushtails shelter in tree hollows.",
       "Keep it apart from other wildlife and service it after healthy animals if any sick ones are in care.",
       "Wear gloves and long sleeves when handling it or cleaning up droppings and urine, and wash your hands afterwards, as possums can carry leptospirosis, salmonella and Q fever."
      ],
      "feeding": [
       "Feed a diet close to its natural one: plenty of fresh native browse such as eucalyptus leaves, with native flowers and blossom.",
       "Give enough fresh browse that a little is left by morning, and clear out the old browse each day.",
       "Put food in at dusk, as brushtails are nocturnal and feed at night.",
       "Present the browse as branches wedged upright or fixed high in the enclosure, so it feeds the way it would in the trees.",
       "Offer fresh water in a shallow, heavy dish, changed every day."
      ],
      "activity": [
       "Handle it quickly, gently and only when needed, such as for weighing or moving enclosures, so it stays wild and wary of people.",
       "Hide browse and flowers around the branches so it forages and explores as it would in the wild."
      ],
      "care": [
       "Weigh it at the same time twice a week and record it, to confirm it is holding its weight.",
       "Keep its record sheet up to date with its condition, weights and care given, and keep the records for 3 years."
      ],
      "daily_checks": [
       "Browse eaten overnight",
       "Droppings look normal",
       "Bright and alert",
       "Fresh water given",
       "Climbing normally"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": null,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating browse, not fed a measured amount",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully recovered, needing no more medical care, with a full, healthy coat.",
        "Holding steady weight on a fully natural diet.",
        "Sees well and climbs and moves confidently.",
        "Shows normal wild behaviour: wary of people and predators, finds its own food and uses its nest box for shelter."
       ],
       "target_weight": "About 2.5 kg, holding its current weight",
       "how": [
        "Release within 24 hours of it being ready, in mild, settled weather.",
        "Release at dusk, as it is nocturnal; never release it during the day.",
        "Take it to the site in a quiet, well-ventilated, lined box.",
        "Fix a temporary nest box in a tree at the release spot, as brushtails depend on hollows for shelter."
       ],
       "where": "Release it exactly where it was found, using the GPS or Melways record of that spot; if the spot is unsuitable, use the closest suitable place within its home range without crossing a boundary it would not normally cross, and if there is no such place it cannot be released elsewhere."
      },
      "escalate": {
       "vet": [
        "Eating little or none of its browse for a night or more, or losing weight.",
        "Diarrhoea, or no droppings for a day.",
        "Hair loss, crusty skin or sores.",
        "Limping, a new wound, or any swelling."
       ],
       "urgent": [
        "Collapsed, cold to touch or unable to hold its head up: give nothing by mouth, keep it warm, dark and quiet, and go straight to a vet.",
        "Struggling to breathe or breathing with its mouth open.",
        "Signs of heat stress on a hot day, such as panting, drooling or lying flat: place it in a cool, ventilated container on a damp towel, gently spray it with room-temperature water, and go straight to a vet.",
        "Bleeding that will not stop."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "brushtail",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wires-possums",
       "wires-extreme-heat-factsheet"
      ]
     }
    }
   ]
  },
  {
   "id": "echidna",
   "name": "Short-beaked echidna",
   "plans": [
    {
     "id": "lib-echidna-puggle",
     "stage": "Puggle",
     "weight": "about 400 g",
     "text": "Ready-made plan: an orphaned short-beaked echidna puggle, about 400 g, with spines just coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a puggle like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Short-beaked echidna puggle",
      "species": "Short-beaked echidna (Tachyglossus aculeatus)",
      "kind": "wildlife",
      "summary": "This orphaned short-beaked echidna puggle, about 400 g with its spines just coming through, is healthy and uninjured. The goal is to raise it on echidna milk, wean it onto solid food and return it to the wild where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "From about 120 days old",
        "tasks": [
         "Start offering a slurry of Wombaroo Echidna Food alongside its milk."
        ]
       },
       {
        "when": "As it eats more solids",
        "tasks": [
         "Space milk feeds further apart, then stop them once it is eating solids well.",
         "Move it to a larger smooth-walled enclosure with deep, clean, dry substrate to dig in."
        ]
       }
      ],
      "housing": [
       "Keep it in a dark, quiet, smooth-walled box with a bolted lid, lined with soft cotton or flannelette, like a burrow.",
       "Keep it cool, at the burrow-young temperature shown in the app and never above about 25°C, checking with a max/min thermometer, as puggles overheat easily and can't pant or sweat.",
       "Use no heat pad unless it feels cold to touch, and never put it directly on a heat pad or hot water bottle.",
       "Wash your hands thoroughly after handling it, even if you wore gloves, as echidnas can carry Salmonella without looking sick."
      ],
      "feeding": [
       "Feed Wombaroo Echidna Milk Replacer Late Lactation, as puggles need an echidna-specific milk that is very high in fat and low in lactose; never cow's milk, which can cause diarrhoea.",
       "The Wombaroo chart averages 20 mL a day at 170 g and 35 mL a day at 755 g, so at about 400 g that is roughly 25 mL a day; multiply by the days between feeds (about 50 mL a feed when fed every 2 days) and recheck the chart on the pack as it grows.",
       "Feed every 2 days or a little longer, as wild burrow young are suckled only every five days; the first feed is not urgent, so check it is well hydrated first, and if it looks younger than the burrow stage, check its stage with an experienced echidna hand-raiser.",
       "Let it lap the milk from a shallow silicone cup or small flexible bowl rather than your palm, as bacteria on human skin may harm its gut, and let it take its time.",
       "Mix 36 g of powder (5 scoops) with 70 mL of warm water to make 100 mL, warm it to about 30°C, mix it fresh for each feed and throw out any leftovers.",
       "From about 120 days old, offer a slurry of Wombaroo Echidna Food mixed with about 10% crushed termite mound, or with termites and ants, as its first solid food."
      ],
      "activity": [
       "Support its body with two hands underneath; never lift it by the back legs or force it to uncurl, as this injures it and causes great stress.",
       "Handle it only for feeds and weighing, keeping noise and strong smells low and pets well away, so it stays wild."
      ],
      "care": [
       "Weigh it every day at the same time (before the feed on feed days) and record it, so its feed amount stays right.",
       "Puggles do best with an experienced echidna hand-raiser; if this is your first puggle, arrange for one to take it on or guide its care."
      ],
      "daily_checks": [
       "Weighed and recorded",
       "Box temperature checked",
       "Droppings normal",
       "Bright and alert",
       "Feed given if due"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "Wombaroo Echidna Milk Late Lactation",
       "weight_g": 400,
       "stage": "Burrow young (spines just through)",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Puggles are fed every 36 hours to 2 days or more from Wombaroo chart volumes, not a percentage of body weight.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully weaned and eating solid echidna food, ants and termites on its own.",
        "Growing steadily and in good, healthy condition.",
        "Digs, curls up and walks normally, and is wary of people.",
        "Fully healthy and needs no more care."
       ],
       "target_weight": "",
       "how": [
        "Release within 24 hours of it being ready.",
        "Choose mild weather, avoiding hot or extreme days, and a time when echidnas are normally active.",
        "Carry it in a smooth-walled, bolted-lid container, kept below 25°C and out of the sun.",
        "Set it down near cover such as logs or leaf litter where it can dig in."
       ],
       "where": "Release it exactly where it was found (recorded with GPS or a Melways reference); if that spot is unsuitable, use the closest suitable spot in its home range, and if there is none it must not be released anywhere else."
      },
      "escalate": {
       "vet": [
        "Not taking enough milk over 3 days, or losing weight.",
        "Any wound, swelling or limp."
       ],
       "urgent": [
        "Diarrhoea lasting more than 24 to 36 hours, or any blood in the droppings.",
        "Signs of dehydration such as dry, tacky gums or skin that stays tented.",
        "Cold, limp or unable to lift its head: give nothing by mouth.",
        "Any injury or bleeding from the beak."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "echidna",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-echidnas",
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-rehab-guidelines-part-a",
       "vic-shelter-foster-carer-authorisation",
       "wombaroo-milk-replacers-feeding-guide",
       "fowler-fluid-therapy-in-wildlife-2007"
      ]
     }
    },
    {
     "id": "lib-echidna-adult",
     "stage": "Adult",
     "weight": "about 4 kg",
     "text": "Ready-made plan: an adult short-beaked echidna, about 4 kg, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for an echidna like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult short-beaked echidna",
      "species": "Short-beaked echidna (Tachyglossus aculeatus)",
      "kind": "wildlife",
      "summary": "This adult short-beaked echidna, about 4 kg, is recovering well in care with no injuries needing treatment and no medicines. The goal is to keep it calm, cool and eating well so it can go back to where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Weigh it and record a starting weight to compare against before release.",
         "Without uncurling it, check gently for a pouch or milk; if either is found it may be feeding a puggle in a burrow, so keep its time in care as short as possible."
        ]
       },
       {
        "when": "Week 2",
        "tasks": [
         "Weigh it again: once it is eating, its weight should be steady or rising."
        ]
       }
      ],
      "housing": [
       "House it alone in a smooth-walled enclosure with a bolted lid and no gaps, as echidnas are escape artists and damage their beaks on gaps.",
       "Give it 15 to 20 cm of clean, dry substrate to dig into, plus a dark, quiet hiding spot.",
       "Keep the enclosure between about 18 and 25°C and never above 25°C, as echidnas can't pant or sweat and overheat easily; never put it on a heat pad or hot water bottle.",
       "Wash your hands thoroughly after handling it or cleaning up, even if you wore gloves, as echidnas can carry Salmonella without looking sick."
      ],
      "feeding": [
       "Feed Wombaroo Complete Echidna Diet, the commercial echidna diet recommended in Victoria.",
       "Offer the amount the pack directions give for its weight of about 4 kg.",
       "Feed once a day at about the same time, and remove any uneaten food before the next feed.",
       "Put the food in a shallow, heavy dish it can reach easily with its beak and tongue.",
       "Many echidnas refuse food for the first 5 to 7 days in care; this is normal and a healthy adult can safely go a week or more without eating, so never force-feed it.",
       "Give fresh water every day in a shallow, heavy dish."
      ],
      "activity": [
       "Lift it with both hands under the body between the front and back legs, using a quiet cotton cloth; never lift it by the back legs, dig under it with a shovel or force it to uncurl, as this injures it and causes great stress.",
       "Handle it quickly, gently and only when needed, keeping noise and strong smells low and pets well away.",
       "Let it dig, forage and explore in its substrate and hiding spot so it keeps its wild behaviour."
      ],
      "care": [
       "If it goes cold and sluggish (torpor, which is normal below about 12°C), bring the room to about 21°C and check it again after one to two hours."
      ],
      "daily_checks": [
       "Food eaten",
       "Fresh water given",
       "Enclosure 18 to 25°C",
       "Droppings normal",
       "Bright and alert"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 4000,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult on a commercial echidna diet, not a measured milk feed.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully recovered and needs no more care.",
        "Eating well every day, with weight at or above its starting weight.",
        "Walks, digs and sees normally.",
        "Shows normal wild behaviour, curling up or digging in when disturbed."
       ],
       "target_weight": "About 4 kg (its starting weight) or more",
       "how": [
        "Release within 24 hours of it being ready.",
        "Choose mild weather, avoiding hot or extreme days, and a time when echidnas are normally active.",
        "Carry it in a smooth-walled, bolted-lid container, kept below 25°C and out of the sun.",
        "Set it down near cover such as logs or leaf litter where it can dig in."
       ],
       "where": "Release it exactly where it was found (recorded with GPS or a Melways reference); if that spot is unsuitable, use the closest suitable spot in its home range, and if there is none it must not be released anywhere else."
      },
      "escalate": {
       "vet": [
        "Still not eating by the end of the second week, or losing weight.",
        "A pouch or milk is found, as it may be feeding a puggle in a burrow.",
        "Any new limp, wound or swelling, especially on the back legs or tail."
       ],
       "urgent": [
        "Diarrhoea lasting more than 24 to 36 hours, or any blood in the droppings.",
        "Signs of dehydration such as dry, tacky gums or skin that stays tented.",
        "A sudden change in behaviour: dull, weak, collapsed or unable to lift its head; give nothing by mouth.",
        "Any injury or bleeding from the beak."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "echidna",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-echidnas",
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-rehab-guidelines-part-a",
       "vic-shelter-foster-carer-authorisation",
       "fowler-fluid-therapy-in-wildlife-2007"
      ]
     }
    }
   ]
  },
  {
   "id": "flyingfox",
   "name": "Grey-headed flying-fox",
   "plans": [
    {
     "id": "lib-flyingfox-pup",
     "stage": "Pup (vaccinated carers only)",
     "weight": "about 100 g",
     "text": "Ready-made plan: an orphaned grey-headed flying-fox pup, about 100 g, with fur on its back and eyes open. Healthy, no injuries and no medicines. For vaccinated, trained carers only. Write a standard plan another carer can follow for a pup like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Grey-headed flying-fox pup",
      "species": "Grey-headed flying-fox (Pteropus poliocephalus)",
      "kind": "wildlife",
      "summary": "This orphaned grey-headed flying-fox pup, about 100 g with fur on its back and eyes open, is healthy and uninjured. Grey-headed flying-foxes are a threatened species, and the goal is to hand-raise it with other pups, wean it onto fruit and return it to the wild.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Report it to the Conservation Regulator (your local Authorised Officer) within 48 hours, as your authorisation requires for a threatened species.",
         "Pair it with at least one other pup through an experienced flying-fox carer, as flying-foxes are raised and released together."
        ]
       },
       {
        "when": "About 4 to 5 weeks old (about 150 g)",
        "tasks": [
         "Drop to 4 milk feeds a day.",
         "Turn off artificial heat from 5 weeks old."
        ]
       },
       {
        "when": "About 7 to 9 weeks old",
        "tasks": [
         "Start steamed apple between milk feeds, then diced soft fruit with High Protein Supplement from 8 weeks."
        ]
       },
       {
        "when": "About 10 to 12 weeks old",
        "tasks": [
         "Cut milk to 3 to 4 feeds a day at 10 weeks and 1 to 2 at 11 weeks, fully weaned at 12 weeks.",
         "Move into a creche with other young flying-foxes for at least 3 weeks before release."
        ]
       }
      ],
      "housing": [
       "Wrap it on a rolled \"mumma roll\" and keep it at about 28°C (29 to 31°C if weak), using a heat pad under part of its enclosure with a thermometer.",
       "Keep its enclosure quiet and clean, with natural branches to climb rather than plastic toys or cyclone fencing, which can injure it."
      ],
      "feeding": [
       "Feed Wombaroo Flying Fox Milk Replacer (or Biolac flying fox milk); never cow's milk, which lacks key nutrients and can cause diarrhoea.",
       "Give the amount in the feed calculator; the amount per feed rises with age, from 10 mL a feed at 4 weeks to 15 mL at 10 to 11 weeks, so recheck it each week.",
       "Give 5 feeds a day, about 6 am, 10 am, 2 pm, 6 pm and 10 pm.",
       "Feed it head down, tilted to one side, from a small teat with a hole of about 1 mm so milk drips slowly; go at its pace and stop if milk comes out of its nose.",
       "Mix 14 g of powder (2 scoops) with 90 mL of warm water to make 100 mL, warm it to about 35°C, keep made-up milk in the fridge for no more than a day and throw out leftovers.",
       "Toilet it gently after every feed until it is 4 to 6 weeks old.",
       "From about 7 weeks, offer steamed or pureed apple between milk feeds, then from 8 weeks diced soft fruit such as apple and pear coated in Wombaroo High Protein Supplement: 50 g a day at 8 weeks, 50 to 100 g of up to 3 fruits at 9 weeks, 100 to 200 g at 10 weeks, and more than 250 g each evening once weaned at 12 weeks."
      ],
      "activity": [
       "Only handle it if you are rabies-vaccinated and trained, wearing double nitrile gloves, and wash your hands afterwards, as any bat can carry lyssavirus without looking sick.",
       "Keep handling to feeds, toileting and weighing, so it stays wild.",
       "Give it at least 20 minutes of sunlight every day, watching that it doesn't overheat."
      ],
      "care": [
       "Weigh it every day at the same time, before the first feed, and record it, so the feed calculator stays right.",
       "After any bite, scratch or saliva contact, wash the area with soap and water for 15 minutes, apply povidone-iodine (Betadine), flush any splash to the eyes, nose or mouth with water, and get medical care straight away, even if vaccinated."
      ],
      "daily_checks": [
       "Weighed before first feed",
       "All feeds given",
       "Toileted after feeds",
       "Temperature about 28°C",
       "Droppings normal"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Flying Fox Milk Replacer",
       "weight_g": 100,
       "stage": "About 1 week old (about 100 g, eyes open)",
       "percent_body_weight_per_day": 25,
       "feeds_per_day": 5,
       "basis": "DEECA Table 4.7: 5 mL a feed, 5 feeds a day at about 1 week (about 100 g), worked out as about 25% of body weight.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned, eating natural foods and at a healthy weight.",
        "Flies at least 10 laps of the pre-release aviary without open-mouth breathing.",
        "Turns head-up to pass urine and droppings, as healthy flying-foxes do.",
        "Healthy, needs no more care and is wary of people."
       ],
       "target_weight": "",
       "how": [
        "Use a soft release, as Victorian guidance advises for hand-reared pups.",
        "Release within 24 hours of it being ready.",
        "Avoid release when the forecast is over 38°C for three or more days.",
        "Transport it in its own container where it can hang, at a cool time of day, and never leave it in a hot car."
       ],
       "where": "Release it at or near the camp closest to where it was found (recorded with GPS or a Melways reference), within its home range; if that isn't possible, it must not be released anywhere else."
      },
      "escalate": {
       "vet": [
        "Refusing feeds, or weight falling or not rising over two days.",
        "Bringing milk back up, or undigested milk in its droppings.",
        "Diarrhoea."
       ],
       "urgent": [
        "Cold, limp, or unable to lift its head or swallow: give nothing by mouth.",
        "Coughing, rattly or laboured breathing after milk has come from its nose.",
        "Panting, open-mouth breathing or drooling: unwrap it, move it somewhere cooler and give nothing by mouth, as it needs a vet for fluids."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "flyingfox",
      "next_visit": "",
      "sources": [
       "vic-ablv-better-health",
       "vic-rehabilitator-authorisation-conditions",
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-rehab-guidelines-part-a",
       "vic-shelter-foster-carer-authorisation",
       "wombaroo-milk-replacers-feeding-guide"
      ]
     }
    },
    {
     "id": "lib-flyingfox-adult",
     "stage": "Adult (vaccinated carers only)",
     "weight": "about 700 g",
     "text": "Ready-made plan: an adult grey-headed flying-fox, about 700 g, in care and recovering, with no injuries needing treatment and no medicines. For vaccinated, trained carers only. Write a standard plan another carer can follow for a flying-fox like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult grey-headed flying-fox",
      "species": "Grey-headed flying-fox (Pteropus poliocephalus)",
      "kind": "wildlife",
      "summary": "This adult grey-headed flying-fox, about 700 g, is recovering well in care with no injuries needing treatment and no medicines. Grey-headed flying-foxes are a threatened species, and the goal is to keep it eating and fit so it can return to its camp as soon as it is ready.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Report it to the Conservation Regulator (your local Authorised Officer) within 48 hours, as your authorisation requires for a threatened species."
        ]
       },
       {
        "when": "Weeks 1 to 2, once eating well",
        "tasks": [
         "Move it to a pre-release flight aviary, with other flying-foxes in care where possible, as flying-foxes are social and are best released together."
        ]
       }
      ],
      "housing": [
       "Keep it in a cage it can hang in without its head touching the floor, somewhere quiet, shaded and out of hot sun.",
       "Never wrap it on a warm day, as a wrapped flying-fox can die of heat stress within minutes.",
       "Clean the cage floor every day."
      ],
      "feeding": [
       "Feed a mix of chopped fresh fruit such as apple and pear, dusted with Wombaroo High Protein Supplement, plus flowering native branches where available so it keeps eating natural foods.",
       "Offer at least 250 g of fruit each evening, with about 20 g (3 scoops) of High Protein Supplement per 300 g of fruit; these figures come from guidance for newly weaned flying-foxes, so if it finishes everything by morning, offer more.",
       "Feed once a day, in the evening, as flying-foxes feed at night.",
       "Hang the fruit or fix the dishes up high near where it roosts, so it can feed while hanging as it would in the wild.",
       "Remove uneaten fruit each morning and put out fresh food each evening.",
       "Give fresh water every day in a dish fixed up high where it can reach it while hanging."
      ],
      "activity": [
       "Only handle it if you are rabies-vaccinated and trained, wearing double nitrile gloves plus gauntlets or a towel, and wash your hands afterwards, as any bat can carry lyssavirus without looking sick.",
       "Handle it quickly, gently and as little as possible, and don't tame it."
      ],
      "care": [
       "After any bite, scratch or saliva contact, wash the area with soap and water for 15 minutes, apply povidone-iodine (Betadine), flush any splash to the eyes, nose or mouth with water, and get medical care straight away, even if vaccinated."
      ],
      "daily_checks": [
       "Fruit eaten overnight",
       "Fresh water given",
       "Hanging normally",
       "Droppings normal",
       "Bright and alert"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 700,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating fruit, not a measured milk feed.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully recovered, needs no more care and is a healthy weight.",
        "Eating natural foods such as native blossom.",
        "Flies at least 10 laps of the pre-release aviary without open-mouth breathing.",
        "Turns head-up to pass urine and droppings, as healthy flying-foxes do."
       ],
       "target_weight": "About 700 g (its current weight) or more, in good body condition",
       "how": [
        "Release within 24 hours of it being ready.",
        "Release it at the camp during the day, as Victorian flying-fox guidance advises for adults.",
        "Avoid release when the forecast is over 38°C for three or more days.",
        "Transport it in its own container where it can hang, at a cool time of day, and never leave it in a hot car."
       ],
       "where": "Release it at the nearest established camp to where it was found (recorded with GPS or a Melways reference), within its home range; if that isn't possible, it must not be released anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating for two days in a row.",
        "Losing weight or body condition.",
        "Red, cloudy or weepy eyes.",
        "A new tear or wound in a wing."
       ],
       "urgent": [
        "Panting, open-mouth breathing, drooling or lying on the cage floor on a hot day: unwrap it, move it somewhere cool and shaded and give nothing by mouth, as it needs a vet for fluids.",
        "Collapsed, cold or unable to lift its head or swallow: give nothing by mouth.",
        "Sudden odd behaviour or weakness with no clear cause: avoid handling it, and also report it to the Emergency Animal Disease Hotline on 1800 675 888."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "flyingfox",
      "next_visit": "",
      "sources": [
       "vic-ablv-better-health",
       "vic-rehabilitator-authorisation-conditions",
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-rehab-guidelines-part-a",
       "vic-shelter-foster-carer-authorisation",
       "wombaroo-milk-replacers-feeding-guide",
       "wires-flying-foxes"
      ]
     }
    }
   ]
  },
  {
   "id": "magpie",
   "name": "Australian magpie",
   "plans": [
    {
     "id": "lib-magpie-nestling",
     "stage": "Nestling",
     "weight": "about 100 g",
     "text": "Ready-made plan: an orphaned Australian magpie nestling, about 100 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Australian magpie nestling",
      "species": "Australian magpie (Gymnorhina tibicen)",
      "kind": "wildlife",
      "summary": "This orphaned Australian magpie nestling, about 100 g with pin feathers coming through, is healthy and ready to be hand-reared. The goal is to raise it to a strong, wild, self-feeding young magpie and release it where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 14",
        "tasks": [
         "Lower the heat bit by bit as its feathers open and cover its body, staying within the range the app shows for its stage."
        ]
       },
       {
        "when": "About week 3",
        "tasks": [
         "Once it climbs out of the nest, move it to a larger cage with low perches.",
         "Start leaving a dish of food and a shallow water dish in the cage."
        ]
       },
       {
        "when": "About weeks 4 to 5",
        "tasks": [
         "Once it flutters and flies, move it to an outdoor aviary big enough to fly, with soil and leaf litter to forage in.",
         "Cut back hand-feeds as it eats more on its own."
        ]
       },
       {
        "when": "About weeks 6 to 7",
        "tasks": [
         "Stop hand-feeding once it feeds itself fully and holds its weight."
        ]
       }
      ],
      "housing": [
       "Sit it in a small artificial nest, such as a container lined with tissue that holds it upright with its legs tucked under, inside a heated box at the temperature the app shows for magpie nestlings, with room to move away from the heat, as nestlings cannot keep themselves warm.",
       "Keep the box in a quiet room, in a separate air space from pet birds and other wildlife, with its own equipment.",
       "Change the nest lining whenever it is soiled and remove droppings after each feed.",
       "Wash your hands with soap before and after every feed, and wear gloves, a mask and eye protection when cleaning, as wild birds in Victoria often carry psittacosis."
      ],
      "feeding": [
       "Feed Wombaroo Insectivore Rearing Mix made up as moist pellets, the rearing food for orphan magpies, with small pieces of earthworm, crickets and woodies; add no vitamins or supplements, and no bread, dairy, honey, avocado or plain mince.",
       "Give the amount in the feed calculator each day, split evenly across the feeds, and stop a feed when it stops gaping.",
       "About 8 feeds a day, every 2 hours from about 6 am to 8 pm, with no overnight feeds; the guide sets no frequency, so check the timing with an experienced bird carer.",
       "Offer pea-sized pellets from blunt tweezers into its gaping beak, letting it swallow each one before the next, and never squirt food in with a syringe, as birds easily inhale it.",
       "Mix the moist pellets fresh with warm water following the directions on the Wombaroo pack; made-up food keeps a day in the fridge or 2 weeks frozen, never refreeze thawed food, and throw out leftovers.",
       "After each feed, drip a few drops of water slowly at the tip of its beak and let it swallow; it needs no water dish yet, as nestlings get most of their fluid from food.",
       "Once it climbs out of the nest and starts pecking, offer pellets, worms and insects in a shallow dish, then build live insects up to about half its diet before release, using mealworms as a small part only."
      ],
      "activity": [
       "Handle it only for feeds and weighing, quickly and gently, without talking to it or letting visitors see it, so it does not become tame.",
       "Where another young magpie is in care with an experienced bird carer, raising them together helps it grow up knowing its own kind.",
       "From the aviary stage, hide worms and insects in leaf litter and soil so it learns to forage on the ground."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Keep a daily record of its weight, food eaten and progress; your authorisation requires records to be kept for 3 years.",
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Gaping well at feeds",
       "Droppings normal",
       "Nest clean and warm",
       "Feathers growing"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Insectivore Rearing Mix moist pellets",
       "weight_g": 100,
       "stage": "Nestling with pin feathers (about 1 to 2 weeks old)",
       "percent_body_weight_per_day": 32,
       "feeds_per_day": 8,
       "basis": "Wombaroo magpie chart: 70 g chick eats 25 g a day, 135 g chick 40 g a day; about 32% at 100 g. Feeds a day not given.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Feeds itself fully, with live insects and worms making up about half its diet",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy plumage and needing no more care",
        "Wary of people and holding a steady weight"
       ],
       "target_weight": "About 300 g for an Australian magpie",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, dry, mild morning, never extreme weather, so it has the whole day to settle.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Magpies live in family groups, so release it where local magpies live."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else, and euthanasia is required if neither is possible."
      },
      "escalate": {
       "vet": [
        "Will not gape or refuses two feeds in a row",
        "Weight drops, or stays the same for two days",
        "Watery or oddly coloured droppings for more than a day",
        "Weak, splayed or bent legs, or curled toes, which can mean a diet problem"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Food or water bubbling from its nostrils, or struggling to breathe",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog, or bleeding: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "magpie",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    },
    {
     "id": "lib-magpie-fledgling",
     "stage": "Fledgling (reunite with its parents first)",
     "weight": "about 250 g",
     "text": "Ready-made plan: an Australian magpie fledgling, about 250 g, fully feathered with a short tail and not yet flying well. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a fledgling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Australian magpie fledgling",
      "species": "Australian magpie (Gymnorhina tibicen)",
      "kind": "wildlife",
      "summary": "This healthy, fully feathered magpie fledgling of about 250 g is at the normal stage where young magpies spend a few weeks on the ground before they fly well, while their parents keep feeding them. The goal is to reunite it with its family where it was found, as soon as possible.",
      "photo_findings": [],
      "medications": [],
      "plan": [],
      "housing": [
       "Take it back to exactly where it was found as soon as possible, ideally the same day, as its parents are the best carers it can have.",
       "Put it on a low branch, or in a basket with drainage holes fixed to a post or tree, out of reach of cats and dogs, and ask people nearby to keep pets inside.",
       "Move well away and watch quietly from out of sight for a few hours, up to a day, for an adult magpie coming to feed it.",
       "Bring it back into care only if it is injured, sick, cold, or no adult has come by the end of the watch, keeping it in a lined, ventilated box in a warm, dark, quiet room."
      ],
      "feeding": [
       "It usually needs no food during a short stay; only feed it if it has to stay overnight or the parents do not return.",
       "If it needs feeding, offer Wombaroo Insectivore Rearing Mix as moist pellets or Meat Mix, with earthworms, crickets and woodies; a magpie this size eats about 50 g of food a day in total.",
       "Offer small pieces from blunt tweezers when it gapes, letting it swallow each piece, and never squirt food into its beak with a syringe, as birds easily inhale it.",
       "Give no bread, dairy, honey, avocado or plain mince, as these are harmful or unbalanced for young birds.",
       "Offer clean water in a shallow dish only, never dripped or squirted into its beak."
      ],
      "activity": [
       "Handle it as little as possible and keep it covered, away from people and pets, so it stays calm and wild.",
       "Wear gloves and wash your hands with soap after handling it, as wild birds in Victoria often carry psittacosis."
      ],
      "care": [],
      "daily_checks": [],
      "log_days": 1,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 250,
       "stage": "Fledgling, to be reunited with its parents",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Healthy fledgling going back to its parents, so it is not hand-reared on a measured amount.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Bright, alert and uninjured",
        "Warm, and grips a perch firmly",
        "A calm, dry day forecast"
       ],
       "target_weight": "",
       "how": [
        "Go back in daylight, ideally in the morning, so the parents have the whole day to find it.",
        "Carry it in a lined, ventilated box."
       ],
       "where": "Return it to the exact spot where it was found (recorded with GPS coordinates or a Melways reference), as that is where its parents are."
      },
      "escalate": {
       "vet": [
        "A drooping wing, limping or a closed or cloudy eye",
        "Fluffed up, sleepy or not gaping for food"
       ],
       "urgent": [
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen",
        "Cannot hold its head up, cannot stand or is cold and collapsed: give nothing by mouth on the way",
        "Bleeding, or breathing with its beak open while resting"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "magpie",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "wires-helping-chicks",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    },
    {
     "id": "lib-magpie-adult",
     "stage": "Adult",
     "weight": "about 300 g",
     "text": "Ready-made plan: an adult Australian magpie, about 300 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a magpie like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult Australian magpie",
      "species": "Australian magpie (Gymnorhina tibicen)",
      "kind": "wildlife",
      "summary": "This adult Australian magpie, about 300 g, is recovering well in care, with no injuries needing treatment and no medicines. The goal is to keep it eating a natural diet, flying strongly and wary of people, so it can go home to its family group as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Let it settle in its indoor cage and make sure it is eating the meat mix well."
        ]
       },
       {
        "when": "Days 4 to 7",
        "tasks": [
         "Move it to the outdoor aviary once it is bright and eating well."
        ]
       },
       {
        "when": "Week 2",
        "tasks": [
         "Start shifting its diet towards live insects and worms.",
         "Watch that it flies strongly and lands well the full length of the aviary."
        ]
       }
      ],
      "housing": [
       "Keep it on its own, with its own dishes and equipment, in a room and air space well away from pet birds and other wildlife, as serious diseases pass between birds through the air.",
       "Keep its cage or aviary at the temperature the app shows for magpies, sheltered from wind, rain and hot sun.",
       "For the outdoor stage, use an aviary long enough for it to fly, with natural branches at different heights, a sheltered corner and a floor area of soil or leaf litter.",
       "Wear gloves, a mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria often carry psittacosis and can carry bird flu."
      ],
      "feeding": [
       "Feed Wombaroo Insectivore Rearing Mix made up as Meat Mix, plus earthworms, crickets, woodies and the occasional mouse, as magpies need both animal and plant food.",
       "An adult magpie of about 300 g needs about 50 g of food a day; while it is still recovering or moulting it may need up to 50% more (about 75 g), so weigh the food and the bird to get it right.",
       "Split the day's food into a morning and an afternoon serve in shallow dishes on the ground, where magpies naturally feed.",
       "Make Meat Mix by mixing 10 g of powder with 20 g of minced meat; it keeps a day in the fridge or 2 weeks frozen, never refreeze thawed food, and throw out leftovers each day.",
       "Add no extra vitamins, minerals or supplements, and no bread, cereal, dairy, honey or avocado, as these unbalance the diet or are harmful.",
       "Keep clean, fresh water in a shallow dish at all times and change it every day.",
       "Before release, build live insects and worms up to about half of what it eats, using mealworms as a small part only, so it is used to wild food."
      ],
      "activity": [
       "Handle it quickly, gently and as little as possible, and do not talk to or pet it, so it stays wary of people.",
       "Scatter live food and earthworms through leaf litter or a tray of soil so it forages on the ground as wild magpies do.",
       "Keep pets well away and out of its sight and hearing."
      ],
      "care": [
       "Keep a daily record of its weight, food eaten and condition; your authorisation requires records to be kept for 3 years.",
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Food eaten",
       "Water changed",
       "Droppings normal",
       "Weight recorded",
       "Bright and active"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 300,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult on a solid diet; Wombaroo Feeding Guidelines for Native Birds give about 50 g a day for a 300 g magpie.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully recovered, with complete, healthy plumage and needing no more care",
        "Flies strongly and lands well in the aviary",
        "Finds and eats live food for itself, with insects and worms making up about half its diet",
        "Wary of people and holding a steady weight"
       ],
       "target_weight": "About 300 g for an adult Australian magpie",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, dry, mild morning, never extreme weather, so it has the whole day to settle.",
        "Carry it in a lined, ventilated box, open the box near trees and cover, and step well back.",
        "Magpies live in family groups, so release it where its own group lives."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else, and euthanasia is required if neither is possible."
      },
      "escalate": {
       "vet": [
        "Eats little or nothing for a day, or loses weight two days running",
        "Sits fluffed up, sleepy or bobbing its tail as it breathes",
        "Watery, bloody or oddly coloured droppings for more than a day",
        "A drooping wing, limping, or flying no better after a week in the aviary"
       ],
       "urgent": [
        "Cannot hold its head up, cannot stand or has collapsed: give nothing by mouth on the way",
        "Breathing with its beak open or with clicking sounds while resting",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new wound"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "magpie",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "frogmouth",
   "name": "Tawny frogmouth",
   "plans": [
    {
     "id": "lib-frogmouth-chick",
     "stage": "Downy chick",
     "weight": "about 150 g",
     "text": "Ready-made plan: an orphaned tawny frogmouth chick, about 150 g, covered in down. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a chick like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned tawny frogmouth chick, about 150 g, downy",
      "species": "Tawny frogmouth (Podargus strigoides)",
      "kind": "wildlife",
      "summary": "This orphaned tawny frogmouth chick, about 150 g and still covered in down, is healthy with no injuries. The goal is to hand-rear it with as little human contact as possible until it is flying, feeding itself and ready to go home to where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Look for circling, staggering, screaming calls, discharge from the eyes or nostrils, and the condition of its breastbone, feathers and vent; at about 150 g it is likely around 2 to 3 weeks old, and if it looks younger, check the stage with your vet."
        ]
       },
       {
        "when": "As feathers replace the down (about week 3 to 4, around 200 g)",
        "tasks": [
         "Lower the heat step by step and stop it once it stays warm on its own.",
         "Move it to a larger enclosure with low branches to perch on."
        ]
       },
       {
        "when": "Once perching well",
        "tasks": [
         "Start offering live insects in a dish so it learns to feed itself, and cut back hand feeds as it eats more on its own."
        ]
       },
       {
        "when": "Once fully feathered and feeding itself",
        "tasks": [
         "Move it to a flight aviary with perches at different heights to build flying fitness."
        ]
       }
      ],
      "housing": [
       "Keep it on its own in a brooder with a heat pad, plus some humidity, in a quiet, dim room with no pet birds and no shared air.",
       "Keep the brooder at the nestling temperature the app shows for frogmouths, at the higher end while it is mostly down, with a cooler area it can move to.",
       "Line the brooder with a soft nest of cloth or paper towel it can grip, and change it whenever it is soiled; give it its own dishes and cleaning gear.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal, and wash your hands with soap afterwards, as wild birds can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed Wombaroo Insectivore Rearing Mix made into moist pellets, with finely chopped mice added (bones removed for the first few days, then included).",
       "Give the amount in the feed calculator each day, split evenly across the feeds, and weigh the food before and after each feed to record what it ate.",
       "Give 4 feeds a day spread from dusk to dawn, as frogmouths feed at night, for example about 7 pm, 10 pm, 1 am and 5 am.",
       "Offer one pellet at a time from blunt-tipped forceps at the front of the beak and let it take and swallow each one; never syringe food into its open beak, as it can inhale it.",
       "Make the mix up fresh, keep made-up mix no more than a day in the fridge or 2 weeks frozen, thaw frozen food fully, never refreeze it, and throw out leftovers after each feed.",
       "Drip a little extra water slowly onto the tip of the beak by syringe at each feed so it can swallow without inhaling it; it does not need a water dish until it feeds itself.",
       "Do not feed avocado, bread, dairy, honey or sugar water, or plain mince, which lacks calcium.",
       "Once it is perching and feathered, add calcium-dusted live insects such as moths, beetles, crickets and a few mealworms, building up until at least half its diet is live insects before release (an adult eats about 40 to 45 g a day)."
      ],
      "activity": [
       "Handle it only for feeding, weighing and cleaning, and keep talking and contact to a minimum so it does not become tame or attached to people.",
       "Weigh it every day at the same time, before the first feed, and record the weight so the feed calculator stays right.",
       "Keep pets, children and noise well away from it."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Weight recorded",
       "All feeds taken",
       "Warm and alert",
       "Droppings look normal",
       "Breathing quiet, beak closed"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Insectivore Rearing Mix moist pellets",
       "weight_g": 150,
       "stage": "Downy nestling, about 2 to 3 weeks old",
       "percent_body_weight_per_day": 19,
       "feeds_per_day": 4,
       "basis": "Wombaroo frogmouth chart: 120 g chick 25 g a day, 160 g chick 30 g a day; 4 feeds from South Australian raptor guidelines.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully feathered, flying strongly and landing steadily on a perch.",
        "Catching and eating live insects on its own and holding its weight.",
        "Needs no more medical care and its feathers are in good condition.",
        "Wary of people and roosting quietly by day like a wild frogmouth."
       ],
       "target_weight": "",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Carry it in a lined, well-ventilated box.",
        "Release it at dusk, never during the day and never in rain, strong wind or extreme heat or cold.",
        "Place it on a branch in a tree at the release site and leave it quietly."
       ],
       "where": "Release it very close to where it was found (recorded by GPS coordinates or a Melways reference), as tawny frogmouths rarely move more than about a kilometre; if that spot is unsuitable use the closest suitable place within its home range, and never anywhere else."
      },
      "escalate": {
       "vet": [
        "Not interested in food: do not force-feed it.",
        "Losing weight, or not gaining over several daily weighs.",
        "Diarrhoea or droppings that change colour.",
        "Feathers growing in weak, bent or patchy."
       ],
       "urgent": [
        "Cold, floppy or unable to hold its head up: keep it warm and give nothing by mouth.",
        "Open-mouth breathing, gasping, or food or water coming from the nostrils.",
        "Twisted neck, tremors or poor balance (also call the Emergency Animal Disease Watch Hotline on 1800 675 888, as these can be signs of bird flu).",
        "Bleeding or a new injury."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "frogmouth-owl",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-authorisation-guide-first-aid",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    },
    {
     "id": "lib-frogmouth-adult",
     "stage": "Adult",
     "weight": "about 400 g",
     "text": "Ready-made plan: an adult tawny frogmouth, about 400 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a frogmouth like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult tawny frogmouth, about 400 g",
      "species": "Tawny frogmouth (Podargus strigoides)",
      "kind": "wildlife",
      "summary": "This adult tawny frogmouth, about 400 g, is recovering well in care with no injuries needing treatment. The goal is to keep it calm and well fed, get it flying and catching insects again, and return it to where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Weigh it, write down the weight, and look for circling, staggering, screaming calls, discharge from the eyes or nostrils, and the condition of its breastbone, feathers and vent."
        ]
       },
       {
        "when": "Week 2, once eating well on its own",
        "tasks": [
         "Move it to a flight aviary with perches at different heights so it can rebuild flying fitness."
        ]
       }
      ],
      "housing": [
       "Keep it on its own in a quiet, dimly lit enclosure with a sturdy natural branch to roost on by day, in a room with no pet birds and no shared air.",
       "Keep it at the temperature the app shows for frogmouths, avoiding extra heat, as frogmouths and owls get agitated when kept too warm.",
       "Give it its own food dishes, water dish and cleaning gear, clean the enclosure daily, and disinfect perches and dishes regularly.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal, and wash your hands with soap afterwards, as wild birds can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed Wombaroo Insectivore Meat Mix (Insectivore Rearing Mix made up as Meat Mix following the packet), plus calcium-dusted live insects and worms, crickets, a few mealworms and mice; frogmouths naturally eat mainly beetles and moths.",
       "Offer about 40 to 45 g of food a day for an adult, and weigh the food offered and left over so you know what it ate.",
       "Give the day's food in the evening after dusk, as frogmouths feed at night.",
       "Put food in a shallow dish on a low perch or platform it can reach, and remove leftovers next morning; never syringe food into its open beak, as it can inhale it.",
       "Thaw frozen food fully, keep made-up Meat Mix no more than a day in the fridge, and never refreeze thawed food.",
       "Keep fresh water in a shallow dish at all times and change it daily.",
       "Do not feed avocado, bread, dairy, honey or sugar water, or plain mince, which lacks calcium.",
       "Before release, build its diet up until at least half of what it eats is live insects and other natural prey."
      ],
      "activity": [
       "Handle it as little, as quickly and as gently as possible, and do not try to tame it.",
       "An open-beaked, puffed-up frogmouth is usually making a threat display; this is different from open-mouth breathing.",
       "Keep pets, children and noise well away from its enclosure."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Food eaten recorded",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet, beak closed"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 400,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating Meat Mix, insects and mice; Wombaroo guide gives about 40 to 45 g a day for an adult frogmouth.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands steadily on a perch in the flight aviary.",
        "Catches and eats live insects on its own and holds its weight.",
        "Feathers are in good condition and it needs no more medical care.",
        "Alert, wary of people and roosts quietly by day like a wild frogmouth."
       ],
       "target_weight": "About 400 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Carry it in a lined, well-ventilated box.",
        "Release it at dusk, never during the day and never in rain, strong wind or extreme heat or cold.",
        "Place it on a branch in a tree at the release site and leave it quietly."
       ],
       "where": "Release it very close to where it was found (recorded by GPS coordinates or a Melways reference), as tawny frogmouths rarely move more than about a kilometre; if that spot is unsuitable use the closest suitable place within its home range, and never anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating on its own or losing weight, as frogmouths often refuse food in care and may need assisted feeding.",
        "Diarrhoea or droppings that change colour.",
        "Discharge from the eyes or nostrils, or feather loss.",
        "Not flying properly once in the flight aviary."
       ],
       "urgent": [
        "Twisted neck, tremors, poor balance, or can't stand or fly (also call the Emergency Animal Disease Watch Hotline on 1800 675 888, as these can be signs of bird flu).",
        "Open-mouth breathing, gasping or tail bobbing with each breath.",
        "Fluffed up, cold, collapsed or unable to hold its head up: give nothing by mouth.",
        "Bleeding or a new injury."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "frogmouth-owl",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-authorisation-guide-first-aid",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "bluetongue",
   "name": "Eastern blue-tongue lizard",
   "plans": [
    {
     "id": "lib-bluetongue-juvenile",
     "stage": "Juvenile",
     "weight": "about 30 g",
     "text": "Ready-made plan: a juvenile eastern blue-tongue lizard, about 30 g. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a lizard like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Juvenile eastern blue-tongue lizard, about 30 g",
      "species": "Eastern blue-tongue lizard (Tiliqua scincoides)",
      "kind": "wildlife",
      "summary": "This young eastern blue-tongue lizard, about 30 g, is healthy with no injuries. The goal is to keep it warm, well fed and settled for as short a time as possible, then send it home to where it was found as soon as the weather allows.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Weigh it on scales accurate to 0.1 g and write down the weight as its starting weight.",
         "Check inside the ear openings and around the front legs for ticks, as a heavy tick load causes blood loss and can make a blue-tongue look wobbly or unwell."
        ]
       },
       {
        "when": "End of week 1, then once a week",
        "tasks": [
         "Weigh it again and compare with the starting weight."
        ]
       }
      ],
      "housing": [
       "Keep it on its own in a secure, escape-proof enclosure with a small hide, in a room away from other lizards and pet reptiles with no shared air, as blue-tongue nidovirus spreads very easily between lizards.",
       "Set up a warm basking spot at one end and a cooler end at the other so it can move between them, matching the temperatures the app shows for blue-tongues; keep it in that range the whole time, as a lizard in care must not go into winter shutdown (brumation).",
       "Give a UV lamp on a 12-hour light and 12-hour dark cycle, shining straight onto the basking area with no glass or plastic in between (these block UV, and metal mesh cuts it by a third to a half), and replace the lamp on the maker's schedule.",
       "Give the enclosure its own equipment, clean it daily with detergent and then Virkon or F10 while wearing gloves, and wash your hands thoroughly after every handling, as all reptiles can carry Salmonella (most risky for children under 10 and people with weak immunity)."
      ],
      "feeding": [
       "Feed small gut-loaded live insects dusted with calcium, plus finely chopped vegetables sprinkled with a reptile supplement; avoid pet food and too many mealworms.",
       "Offer about 5 to 10% of its body weight at each meal, which is about 1.5 to 3 g for a 30 g lizard, and work the amount out again from each weekly weight as it grows.",
       "Offer meals in the warm part of the day, only once it has basked and warmed up fully, as a cold lizard cannot digest food.",
       "Choose insects small enough for it to swallow easily, put food in a shallow dish on the warm side and remove anything uneaten the same day.",
       "Keep fresh water in a very shallow dish it can climb out of easily, and change it daily.",
       "Record what it eats each day so any drop in appetite is noticed early."
      ],
      "activity": [
       "Handle it as little and as quickly as possible: hold it gently behind the head and support the hips and back legs, never by the tail, as it can drop its tail.",
       "Add leaf litter, bark and a small flat rock to explore and bask on, and scatter some insects so it forages as it would in the wild.",
       "Keep it away from pets and noise, and do not try to tame it."
      ],
      "care": [
       "If it drops its tail, keep it in a fly-free enclosure for two weeks and put nothing on the stump."
      ],
      "daily_checks": [
       "Basking and active",
       "Food eaten recorded",
       "Fresh water given",
       "Droppings look normal",
       "Breathing quiet and clear"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 30,
       "stage": "Juvenile, self-feeding",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Young lizard eating insects and vegetables by itself, not a measured milk feed.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Eating well by itself and holding or gaining weight.",
        "Alert and active, moving normally, hiding and wary of people.",
        "Clear eyes and nose, quiet breathing and normal droppings.",
        "The forecast is 20°C or more for three days running; in autumn or winter this usually means staying in care, kept warm, until spring."
       ],
       "target_weight": "",
       "how": [
        "Release it within 24 hours of it being ready, on a warm, calm day.",
        "Carry it in a small lined, well-ventilated box.",
        "Release it in the warm part of the day while blue-tongues are active, never in extreme heat, cold, wind or rain.",
        "Place it beside dense cover such as leaf litter, a log or thick ground plants and let it walk off on its own."
       ],
       "where": "Release it exactly where it was found (recorded by GPS coordinates or a Melways reference), or at the closest suitable spot within its home range, and never anywhere else."
      },
      "escalate": {
       "vet": [
        "Weight changes by more than 10% from its starting weight (about 3 g at this size).",
        "Diarrhoea: collect a fresh dropping in a clean container to take along rather than treating it at home.",
        "Keeps refusing food or looks thinner, as it may need assisted feeding with a product such as Wombaroo Reptile Supplement or EmerAid.",
        "Bubbles or discharge from the nose or mouth, wheezing or open-mouth breathing."
       ],
       "urgent": [
        "Limp, floppy, unresponsive or unable to turn itself over.",
        "Any burn, bleeding or new wound.",
        "Sudden wobbling, head tilt or circling.",
        "Gasping or struggling to breathe."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bluetongue",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-authorisation-guide-first-aid",
       "vic-rehab-guidelines-part-a"
      ]
     }
    },
    {
     "id": "lib-bluetongue-adult",
     "stage": "Adult",
     "weight": "about 400 g",
     "text": "Ready-made plan: an adult eastern blue-tongue lizard, about 400 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a lizard like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult eastern blue-tongue lizard, about 400 g",
      "species": "Eastern blue-tongue lizard (Tiliqua scincoides)",
      "kind": "wildlife",
      "summary": "This adult eastern blue-tongue lizard, about 400 g, is recovering well in care with no injuries needing treatment. The goal is to keep it warm, well fed and settled so it can go home to where it was found as soon as it is fit and the weather allows.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Weigh it and write down the weight as its starting weight.",
         "Check inside the ear openings and around the front legs for ticks, as a heavy tick load can make a blue-tongue look wobbly or unwell and causes blood loss."
        ]
       },
       {
        "when": "End of week 1, then once a week",
        "tasks": [
         "Weigh it again and compare with the starting weight."
        ]
       }
      ],
      "housing": [
       "Keep it on its own in a secure, escape-proof enclosure with a hide box, in a room away from other lizards and pet reptiles with no shared air, as blue-tongue nidovirus spreads very easily between lizards.",
       "Set up a warm basking spot at one end and a cooler end at the other so it can move between them, matching the temperatures the app shows for blue-tongues; keep it in that range the whole time, as a lizard in care must not go into winter shutdown (brumation) and cannot heal when cold.",
       "Give a UV lamp on a 12-hour light and 12-hour dark cycle, shining straight onto the basking area with no glass or plastic in between (these block UV, and metal mesh cuts it by a third to a half), and replace the lamp on the maker's schedule.",
       "Give the enclosure its own equipment, clean it daily with detergent and then Virkon or F10 while wearing gloves, and wash your hands thoroughly after every handling, as all reptiles can carry Salmonella (most risky for children under 10 and people with weak immunity)."
      ],
      "feeding": [
       "Feed gut-loaded live insects dusted with calcium, plus chopped vegetables sprinkled with a reptile supplement; avoid pet food and too many mealworms.",
       "Offer about 5 to 10% of its body weight at each meal, which is about 20 to 40 g for a 400 g lizard.",
       "Offer meals in the warm part of the day, only once it has basked and warmed up fully, as a cold lizard cannot digest food.",
       "Put food in a shallow dish on the warm side and remove anything uneaten the same day so it does not spoil.",
       "Keep fresh water in a shallow dish at all times and change it daily.",
       "Many wild lizards eat poorly when they first come into care, so record what it eats each day to spot a pattern early."
      ],
      "activity": [
       "Handle it as little and as quickly as possible: hold it behind the head with one hand and support the hips and back legs with the other, never by the tail, as it can drop its tail.",
       "Add leaf litter, a log or flat rock to explore and bask on, and scatter some food so it forages as it would in the wild.",
       "Keep it away from pets and noise, and do not try to tame it."
      ],
      "care": [
       "If it drops its tail, keep it in a fly-free enclosure for two weeks and put nothing on the stump."
      ],
      "daily_checks": [
       "Basking and active",
       "Food eaten recorded",
       "Fresh water given",
       "Droppings look normal",
       "Breathing quiet and clear"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 400,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult lizard eating insects and vegetables, not a measured milk feed.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Eating well and holding its weight, with no more medical care needed.",
        "Alert and active, moving normally, hiding and wary of people.",
        "Clear eyes and nose, quiet breathing and normal droppings.",
        "The forecast is 20°C or more for three days running; in autumn or winter this usually means staying in care, kept warm, until spring."
       ],
       "target_weight": "About 400 g, holding at or above its starting weight",
       "how": [
        "Release it within 24 hours of it being ready, on a warm, calm day.",
        "Carry it in a lined, well-ventilated box.",
        "Release it in the warm part of the day while blue-tongues are active, never in extreme heat, cold, wind or rain.",
        "Place it beside dense cover such as a log, rock or thick ground plants and let it walk off on its own."
       ],
       "where": "Release it exactly where it was found (recorded by GPS coordinates or a Melways reference), or at the closest suitable spot within its home range, and never anywhere else."
      },
      "escalate": {
       "vet": [
        "Weight changes by more than 10% from its starting weight.",
        "Diarrhoea: collect a fresh dropping in a clean container to take along rather than treating it at home.",
        "Keeps refusing food and losing condition, as it may need assisted feeding with a product such as Wombaroo Reptile Supplement or EmerAid.",
        "Bubbles or discharge from the nose or mouth, wheezing or open-mouth breathing."
       ],
       "urgent": [
        "Limp, floppy, unresponsive or unable to turn itself over.",
        "Any burn, bleeding or new wound.",
        "Sudden wobbling, head tilt or circling.",
        "Gasping or struggling to breathe."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bluetongue",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-authorisation-guide-first-aid",
       "vic-rehab-guidelines-part-a"
      ]
     }
    }
   ]
  },
  {
   "id": "erosella",
   "name": "Eastern rosella",
   "plans": [
    {
     "id": "lib-erosella-nestling",
     "stage": "Nestling",
     "weight": "about 40 g",
     "text": "Ready-made plan: an orphaned eastern rosella nestling, about 40 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned eastern rosella nestling",
      "case_number": "",
      "species": "Eastern rosella (Platycercus eximius)",
      "kind": "wildlife",
      "summary": "This orphaned eastern rosella nestling, about 40 g with pin feathers coming through, is healthy and ready to be hand-reared. The goal is to raise it to a strong, wild, seed-eating young rosella and release it with a local flock where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "About weeks 1 to 2",
        "tasks": [
         "Thicken the formula step by step as its pin feathers open, dropping to 4 feeds a day."
        ]
       },
       {
        "when": "About weeks 3 to 4 (fully feathered, short tail)",
        "tasks": [
         "Move it to a cage with low perches and start offering soaked seed and soft food in a dish.",
         "Drop to 2 to 3 hand-feeds a day as it eats more on its own."
        ]
       },
       {
        "when": "About weeks 5 to 6",
        "tasks": [
         "Stop hand-feeding once it eats seed on its own and holds its weight.",
         "Move it to an outdoor flight aviary to build flying fitness, ideally with other young rosellas."
        ]
       }
      ],
      "housing": [
       "Keep it in a small container lined with paper towel, like a nest, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat; lower the heat bit by bit as its feathers cover its body.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the lining whenever it is soiled and clean up droppings after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Feed Passwell Hand Rearing Food or Wombaroo Granivore Rearing Mix, the hand-rearing formula for parrots, mixed at 1 g of powder to 3 mL of water while it is in pin feathers, then thicker (1 g to 2.5 mL, then 1 g to 2 mL) as its feathers open.",
       "Give the amount in the feed calculator each day, split evenly across the feeds, which is up to about 10% of its body weight at each feed, stopping when the crop is comfortably full. The Wombaroo guide for eastern rosellas goes from about 1 mL a feed at hatching down to one 7 mL feed a day at about 6 weeks.",
       "Give 5 feeds a day, about 6 am, 10 am, 2 pm, 6 pm and 10 pm, then leave it about 6 hours overnight so the crop empties fully at least once a day.",
       "Feed it from a small spoon with the sides bent up, letting it pump and swallow at its own pace, and stop if food comes out of its nostrils; never squirt food into its open beak with a syringe, as it can inhale it.",
       "Mix each feed fresh with pre-boiled water at about 50°C, let it stand 2 minutes, feed it at 38 to 40°C (test it on your wrist) and throw out what is left.",
       "Wipe its beak and face clean with a warm damp cloth after each feed so formula does not dry on its feathers.",
       "It gets its fluid from the formula, so it needs no water dish until it starts eating on its own.",
       "Once it is fully feathered, offer soaked or sprouted small parrot seed, defrosted peas and corn mixed with Parrot Soft Food, and natural foods such as seeding grasses, gum nuts and sheoak cones in a shallow dish, and cut back hand-feeds as it eats more by itself."
      ],
      "activity": [
       "Handle it only for feeds, weighing and cleaning, quickly and gently, and do not talk to it or let visitors see it, so it does not become tame.",
       "If another young eastern rosella is in care with an experienced bird carer, raising them together helps it grow up knowing its own kind.",
       "From the aviary stage, scatter seed heads, grasses and branches with gum nuts so it learns to forage."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Keep a daily record of its weight, feeds and progress; your authorisation requires records to be kept for 3 years."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Crop empty overnight",
       "Droppings look normal",
       "Nest clean and warm",
       "Feathers growing well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Passwell Hand Rearing Food or Granivore Rearing Mix",
       "weight_g": 40,
       "stage": "Nestling in pin feathers (eyes open)",
       "percent_body_weight_per_day": 50,
       "feeds_per_day": 5,
       "basis": "Wombaroo parrot hand-rearing table: up to 10% of body weight a feed, 5 feeds a day at pin-feather stage.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Eats seed and natural foods on its own and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy feathers with no signs of feather or beak disease",
        "Wary of people"
       ],
       "target_weight": "About 105 g for an eastern rosella",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Rosellas live in flocks, so release it where local eastern rosellas are feeding, with any rosellas it was raised with."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Crop still full in the morning, or slow to empty between feeds",
        "Weight drops, or stays the same for two days",
        "Watery or oddly coloured droppings for more than a day",
        "Feathers that look pinched, curled or bloody, or a beak that looks overgrown, which can mean beak and feather disease"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Formula bubbling from its nostrils, or struggling to breathe",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-erosella-fledgling",
     "stage": "Fledgling",
     "weight": "about 95 g",
     "text": "Ready-made plan: an eastern rosella fledgling, about 95 g, fully feathered with a short tail and not yet flying well. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a fledgling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Eastern rosella fledgling",
      "case_number": "",
      "species": "Eastern rosella (Platycercus eximius)",
      "kind": "wildlife",
      "summary": "This eastern rosella fledgling, about 95 g, is fully feathered with a short tail but not yet flying well, and is healthy. Parrot chicks only leave the hollow once they can fly, so one on the ground needs care; the goal is to finish weaning it, get it flying strongly and release it with a local flock.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Week 1",
        "tasks": [
         "Keep it in a cage with low perches while it settles and eats on its own."
        ]
       },
       {
        "when": "About week 2",
        "tasks": [
         "Stop hand-feeding once it eats seed on its own and holds its weight.",
         "Move it to an outdoor flight aviary to build flying fitness, ideally with other young rosellas."
        ]
       }
      ],
      "housing": [
       "Keep it in a cage with low natural branches for perches, at the temperature the app shows for fledglings, covered on three sides so it feels safe.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Use an aviary with weathered or vinegar-washed wire, as new galvanised wire can poison parrots with zinc. Clean the floor and dishes daily.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Offer small parrot seed mix (not one heavy in sunflower or other oily seed), soaked or sprouted seed, defrosted peas and corn mixed with Parrot Soft Food, and natural foods such as seeding grasses, gum nuts and sheoak cones; never avocado, bread or dairy.",
       "Keep the seed dish topped up and weigh what is left each morning, so you know how much it eats.",
       "Until it is eating well on its own, also give 2 hand-feeds a day of Passwell Hand Rearing Food or Wombaroo Granivore Rearing Mix mixed at 1 g of powder to 2 mL of water, up to about 10% of its body weight a feed (the amount in the feed calculator), morning and evening.",
       "Give hand-feeds from a small spoon with the sides bent up, letting it take the food at its own pace, and never squirt food into its open beak with a syringe, as it can inhale it.",
       "Mix each hand-feed fresh with pre-boiled water at about 50°C, let it stand 2 minutes, feed it at 38 to 40°C and throw out what is left.",
       "Keep fresh water in a shallow dish at all times and change it every day."
      ],
      "activity": [
       "Handle it only when needed, quickly and gently, and do not talk to it or let visitors see it, so it stays wild.",
       "Scatter seed heads, grasses and branches with gum nuts around the aviary so it learns to forage."
      ],
      "care": [
       "Weigh it every morning before food goes in and keep a daily record of its weight, food eaten and progress for 3 years, as your authorisation requires."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Seed eaten, dish topped up",
       "Fresh water given",
       "Droppings look normal",
       "Perching and fluttering"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Passwell Hand Rearing Food or Granivore Rearing Mix",
       "weight_g": 95,
       "stage": "Fledgling, fully feathered with a short tail (weaning)",
       "percent_body_weight_per_day": 20,
       "feeds_per_day": 2,
       "basis": "Wombaroo parrot hand-rearing table: up to 10% of body weight a feed, 2 feeds a day at fledgling and weaning stage.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Eats seed and natural foods on its own and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy feathers with no signs of feather or beak disease",
        "Wary of people"
       ],
       "target_weight": "About 105 g for an eastern rosella",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Release it where local eastern rosellas are feeding, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating on its own, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Still not flying a week after moving to the aviary",
        "Feathers that look pinched, curled or bloody, or a beak that looks overgrown, which can mean beak and feather disease"
       ],
       "urgent": [
        "Fluffed up, sleepy, cold or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-erosella-adult",
     "stage": "Adult",
     "weight": "about 105 g",
     "text": "Ready-made plan: an adult eastern rosella, about 105 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a rosella like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult eastern rosella",
      "case_number": "",
      "species": "Eastern rosella (Platycercus eximius)",
      "kind": "wildlife",
      "summary": "This adult eastern rosella, about 105 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating well, rebuild its flying fitness and return it to its flock where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a small, covered hospital cage while it settles."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to an outdoor flight aviary to rebuild flying fitness."
        ]
       }
      ],
      "housing": [
       "Keep it in a covered cage with low natural branch perches, in a quiet, dim room at the temperature the app shows for adult birds.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Use an aviary with weathered or vinegar-washed wire, as new galvanised wire can poison parrots with zinc. Clean the floor and dishes daily.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Offer small parrot seed mix (not one heavy in sunflower or other oily seed) with natural foods such as seeding grasses, gum nuts, sheoak cones and native flowers, plus a little apple or defrosted peas and corn; never avocado, bread or dairy.",
       "An adult eastern rosella eats about 18 g of food a day; weigh what you put in and what is left so you know it is eating.",
       "Put the food in shallow dishes on the floor and near a perch, and top it up every morning.",
       "Keep fresh water in a shallow dish at all times and change it every day.",
       "Once in the aviary, offer most of its food as natural seed heads and branches so it is foraging for itself before release."
      ],
      "activity": [
       "Handle it as little, as quickly and as gently as possible, wrapped in a towel, and do not try to tame it.",
       "Keep pets, children and noise well away from its cage."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Food eaten, dish topped up",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 105,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating seed and natural foods; the Wombaroo guide gives about 18 g a day for an adult eastern rosella.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands well the length of the aviary",
        "Eating natural foods and holding its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 105 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Release it where local eastern rosellas are, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Not flying properly once in the flight aviary",
        "Feathers that look pinched, curled or bloody, or an overgrown beak, which can mean beak and feather disease"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "lorikeet",
   "name": "Rainbow lorikeet",
   "plans": [
    {
     "id": "lib-lorikeet-nestling",
     "stage": "Nestling",
     "weight": "about 70 g",
     "text": "Ready-made plan: an orphaned rainbow lorikeet nestling, about 70 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned rainbow lorikeet nestling",
      "case_number": "",
      "species": "Rainbow lorikeet (Trichoglossus moluccanus)",
      "kind": "wildlife",
      "summary": "This orphaned rainbow lorikeet nestling, about 70 g with pin feathers coming through, is healthy and ready to be hand-reared. The goal is to raise it on to nectar and blossom, get it flying strongly and release it with a local flock where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "About weeks 1 to 2",
        "tasks": [
         "Thicken the formula step by step as its pin feathers open, staying at about 4 feeds a day."
        ]
       },
       {
        "when": "About weeks 2 to 3 (most body and wing feathers grown)",
        "tasks": [
         "Start weaning on to Lorikeet & Honeyeater Food and native blossom in a dish, and move it to a cage with low perches."
        ]
       },
       {
        "when": "About weeks 4 to 5",
        "tasks": [
         "Cut back to 1 hand-feed a day, then stop once it feeds itself and holds its weight; rainbow lorikeets are usually weaned by about 9 weeks old.",
         "Move it to an outdoor flight aviary to build flying fitness, ideally with other young lorikeets."
        ]
       }
      ],
      "housing": [
       "Keep it in a small container lined with paper towel, like a nest, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat; lower the heat bit by bit as its feathers cover its body.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the lining whenever it is soiled, and wipe sticky food off the container after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Until most body and wing feathers have grown, feed Passwell Hand Rearing Food or Wombaroo Granivore Rearing Mix, the parrot hand-rearing formula, mixed at 1 g of powder to 3 mL of water and a little thicker as its feathers open.",
       "Give the amount in the feed calculator each day, split evenly across the feeds; the Wombaroo rainbow lorikeet chart gives about 8 to 9 mL a feed at 4 to 5 weeks old.",
       "Give 4 feeds a day, about 6 am, 11 am, 4 pm and 9 pm, then leave it overnight so the crop empties fully at least once a day.",
       "Feed it from a small spoon with the sides bent up, letting it lap and swallow at its own pace, and stop if food comes out of its nostrils; never squirt food into its open beak with a syringe, as it can inhale it.",
       "Mix each feed fresh with pre-boiled water at about 50°C, let it stand 2 minutes, feed it at 38 to 40°C and throw out what is left; wipe its face clean afterwards.",
       "When weaning, offer Lorikeet & Honeyeater Food in a shallow dish with fresh native blossom (eucalypt, melaleuca, bottlebrush and grevillea); lorikeets have brush-tipped tongues and no grinding gizzard, so never give seed.",
       "Make up Lorikeet & Honeyeater Food exactly as the pack says (30 g, 3 scoops, of powder with 80 mL of warm pre-boiled water makes 100 mL), as too thick dehydrates birds and too thin makes them lose weight; keep made-up food a day in the fridge or 2 weeks frozen, and in hot weather put out fresh food morning and evening, as it spoils quickly.",
       "Once it feeds itself, keep fresh water in a shallow dish at all times and change it daily."
      ],
      "activity": [
       "Handle it only for feeds, weighing and cleaning, quickly and gently, and do not talk to it or let visitors see it, as young lorikeets tame easily.",
       "If another young rainbow lorikeet is in care with an experienced bird carer, raising them together helps it grow up knowing its own kind.",
       "From the aviary stage, hang flowering branches so it learns to feed from blossom."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Keep a daily record of its weight, feeds and progress; your authorisation requires records to be kept for 3 years."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Crop empty overnight",
       "Droppings look normal",
       "Nest clean and warm",
       "Feathers growing well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Passwell Hand Rearing Food or Granivore Rearing Mix",
       "weight_g": 70,
       "stage": "Nestling in pin feathers (about 3 to 4 weeks old)",
       "percent_body_weight_per_day": 48,
       "feeds_per_day": 4,
       "basis": "Wombaroo rainbow lorikeet chart: 4 feeds of about 8 to 9 mL a day at 4 to 5 weeks.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Feeds itself on nectar and blossom and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy feathers with no signs of feather or beak disease",
        "Wary of people"
       ],
       "target_weight": "About 130 g for a rainbow lorikeet",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near flowering trees, and step well back.",
        "Rainbow lorikeets live in noisy flocks, so release it where local lorikeets are feeding, with any lorikeets it was raised with."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Crop still full in the morning, or slow to empty between feeds",
        "Weight drops, or stays the same for two days",
        "Watery or oddly coloured droppings for more than a day",
        "Feathers that look pinched, curled or bloody, or missing flight feathers, which can mean beak and feather disease"
       ],
       "urgent": [
        "Cold, fluffed up, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or food or fluid bubbling from its nostrils",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "lorikeet",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-lorikeet-adult",
     "stage": "Adult",
     "weight": "about 130 g",
     "text": "Ready-made plan: an adult rainbow lorikeet, about 130 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a lorikeet like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult rainbow lorikeet",
      "case_number": "",
      "species": "Rainbow lorikeet (Trichoglossus moluccanus)",
      "kind": "wildlife",
      "summary": "This adult rainbow lorikeet, about 130 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and feeding well on nectar and blossom, rebuild its flying fitness and return it to its flock where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a covered hospital cage while it settles."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to an outdoor flight aviary to rebuild flying fitness."
        ]
       }
      ],
      "housing": [
       "Keep it in a covered cage with low natural branch perches, in a quiet, dim room at the temperature the app shows for adult birds.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Use an aviary with weathered or vinegar-washed wire, as new galvanised wire can poison parrots with zinc; wipe sticky food off perches and the floor every day.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed Lorikeet & Honeyeater Food, a complete wet nectar mix, with fresh native blossom (eucalypt, melaleuca, bottlebrush and grevillea) and 1 or 2 small pieces of fruit or vegetable a day; lorikeets have brush-tipped tongues and no grinding gizzard, so never give seed, bread or honey water.",
       "Give about 45 mL of made-up Lorikeet & Honeyeater Food a day for a bird of this size, split into a morning and an afternoon feed.",
       "Put the food in a shallow dish fixed near a perch, and hang the blossom where it can climb to it.",
       "Make up Lorikeet & Honeyeater Food exactly as the pack says (30 g, 3 scoops, of powder with 80 mL of warm pre-boiled water makes 100 mL), as too thick dehydrates birds and too thin makes them lose weight; keep made-up food a day in the fridge or 2 weeks frozen, and in hot weather put out fresh food morning and evening, as it spoils quickly.",
       "Keep fresh water in a shallow dish at all times and change it every day.",
       "Once in the aviary, give more of its food as fresh flowering branches so it is feeding from blossom before release."
      ],
      "activity": [
       "Handle it as little, as quickly and as gently as possible, wrapped in a towel, and do not try to tame it.",
       "Keep pets, children and noise well away from its cage."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Nectar eaten, dishes fresh",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 130,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself; the Wombaroo guide gives about 45 mL of Lorikeet & Honeyeater Food a day for a 140 g lorikeet.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands well the length of the aviary",
        "Feeding from blossom and holding its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 130 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near flowering trees, and step well back.",
        "Release it where local rainbow lorikeets are, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Not flying properly once in the flight aviary",
        "Feathers that look pinched, curled or bloody, or missing flight feathers, which can mean beak and feather disease"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "lorikeet",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "woodduck",
   "name": "Australian wood duck",
   "plans": [
    {
     "id": "lib-woodduck-duckling",
     "stage": "Downy duckling",
     "weight": "about 40 g",
     "text": "Ready-made plan: an orphaned Australian wood duck (maned duck) duckling, about 40 g, covered in down, a few days old. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a duckling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Australian wood duck duckling",
      "case_number": "",
      "species": "Australian wood duck, also called maned duck (Chenonetta jubata)",
      "kind": "wildlife",
      "summary": "This orphaned Australian wood duck duckling is healthy, only a few days old, about 40 g and still covered in down. The goal is to raise it warm, well fed and wild, with waterproof feathers and strong flight, ready to return to a flock of its own kind.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 14 (to about 2 weeks old)",
        "tasks": [
         "Keep the diet higher in protein, as ducklings need more protein in their first 2 weeks."
        ]
       },
       {
        "when": "From about 2 weeks to 7 weeks old",
        "tasks": [
         "Step protein down bit by bit, with less Insectivore Rearing Mix and more grass and greens, to reach the adult level for a grazing duck (about 17% protein) by 7 weeks, as too much protein during fast growth causes angel wing."
        ]
       },
       {
        "when": "As feathers replace the down",
        "tasks": [
         "Add a shallow pool with branches or a plank so it can climb out easily, keeping the heat source available until it is fully feathered."
        ]
       },
       {
        "when": "Once fully feathered",
        "tasks": [
         "Move it to an outdoor aviary with grass to graze and a larger pool, and switch off the heat."
        ]
       }
      ],
      "housing": [
       "Keep it in a lined brooder box with a heat source at one end at the duckling temperature the app shows (about 28 to 30°C), so it can move closer or away; panting or holding its wings out means it is too hot.",
       "Line the floor with a soft, non-slip towel to protect its beak, feet and down, and change the bedding twice a day.",
       "Keep it apart from other birds until its health is known, with its own dishes and cleaning gear, and well away from the room and air space of any pet birds, as serious diseases pass between them through the air.",
       "Psittacosis is common in Victorian waterfowl and bird flu is in wild waterbirds along the coast, so wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Wood ducks are grazers, so feed soft fresh green grass (unsprayed) with roots and soil, chopped greens and Passwell Crumbles (15% protein), with a little Insectivore Rearing Mix in the first 2 weeks.",
       "The guidance gives no set amount for ducklings, so keep food in front of it all day and offer a little more than it eats; growing birds need up to 50% more than adults.",
       "Refresh the food several times a day and throw out what is left in the dish; made-up Insectivore Rearing Mix keeps one day in the fridge or 2 weeks frozen.",
       "Put food in a shallow dish it can reach easily, and a tray of grass sods to graze; it feeds itself, so never syringe food into its bill, as birds easily inhale food that way.",
       "Offer clean fresh water at all times in a shallow dish it can dip its bill into but cannot climb into, changed at least once a day; never syringe water or put it in water, as young ducklings chill easily.",
       "Do not add vitamin or mineral supplements to the commercial foods, and never feed bread, which has little nutrition and can grow mould that causes aspergillosis."
      ],
      "activity": [
       "Handle it only when needed, gently and briefly, cupped in both hands.",
       "Once its health is known, raise it with other wood ducklings if any are in care, so it grows up with its own kind and can be released with them.",
       "Keep it away from pets, noise and visitors, and do not talk to or cuddle it, so it keeps its natural fear of people."
      ],
      "care": [
       "Weigh it every day at the same time, before fresh food goes in, and record its weight and how much it eats; it should gain steadily.",
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and delay release."
      ],
      "daily_checks": [
       "Weighed and recorded",
       "Eating and drinking",
       "Warm, not panting",
       "Bedding changed twice",
       "Droppings look normal"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "Grass, greens and Passwell Crumbles",
       "weight_g": 40,
       "stage": "Downy duckling, a few days old",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Ducklings feed themselves from a dish; the guidance gives no body-weight amount.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully feathered, with waterproof feathers that stay dry after swimming",
        "Flies strongly and sees and moves well",
        "Grazes on its own and is wary of people and predators",
        "Healthy, needing no more care, and at adult size"
       ],
       "target_weight": "About 800 g (adult size) for an Australian wood duck",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild day and release it in daylight, avoiding extreme weather.",
        "Carry it in a lined, well-ventilated box, one bird per box.",
        "Release it with its fellow ducklings or near other wood ducks, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found, using the GPS or Melways record kept with it, or if that spot is unsuitable, at the closest suitable grassy wetland within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Loses weight, or does not gain for two days in a row",
        "Eats little or nothing, or has diarrhoea",
        "Wing tips start to droop or twist outwards (early angel wing)",
        "Legs splay or it limps"
       ],
       "urgent": [
        "Cold, floppy, or cannot hold its head up: give nothing by mouth and go straight to a vet",
        "Tremors, a twisted neck, poor balance, swimming in circles or sudden death of any bird in care, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Struggling to breathe",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "waterbird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "vic-rehab-guidelines-waterbirds-marine",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-woodduck-older",
     "stage": "Feathering duckling",
     "weight": "about 350 g",
     "text": "Ready-made plan: an orphaned Australian wood duck (maned duck) duckling, about 350 g, with feathers coming through the down. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a duckling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Australian wood duck duckling",
      "case_number": "",
      "species": "Australian wood duck, also called maned duck (Chenonetta jubata)",
      "kind": "wildlife",
      "summary": "This orphaned Australian wood duck duckling, about 350 g, is healthy, with feathers coming through its down. The goal is to finish raising it on a grazing diet, with waterproof feathers and strong flight, and return it to a flock of its own kind.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Now to about 7 weeks old",
        "tasks": [
         "Keep stepping protein down so most of its diet is grass and greens, reaching the adult level for a grazing duck (about 17% protein) by 7 weeks, as too much protein during fast growth causes angel wing."
        ]
       },
       {
        "when": "Once fully feathered",
        "tasks": [
         "Move it to an outdoor aviary with grass to graze and a larger pool, switch off the heat, and add more grass and less Crumbles."
        ]
       },
       {
        "when": "Last 2 weeks before release",
        "tasks": [
         "Check it flies the length of the aviary and stays dry after swimming."
        ]
       }
      ],
      "housing": [
       "Keep it in a lined pen with a heat source at one end until it is fully feathered, so it can move closer or away; panting or holding its wings out means it is too hot.",
       "Give it a shallow pool with branches or a plank so it can climb out easily, and a dry, soft-floored area; change the bedding twice a day.",
       "Keep it apart from other birds until its health is known, with its own dishes and cleaning gear, and well away from the room and air space of any pet birds, as serious diseases pass between them through the air.",
       "Psittacosis is common in Victorian waterfowl and bird flu is in wild waterbirds along the coast, so wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Feed mostly soft fresh green grass (unsprayed) with roots and soil, clover and chopped greens, with some Passwell Crumbles (15% protein), as wood ducks are grazers.",
       "The guidance gives no set amount for growing ducks, so keep food in front of it all day and offer a little more than it eats.",
       "Put food in a shallow dish and grass sods on the floor to graze, and refresh it several times a day, throwing out leftovers.",
       "Offer clean fresh water at all times in a dish it can dip its whole bill into, changed at least once a day.",
       "Do not add vitamin or mineral supplements, and never feed bread, which has little nutrition and can grow mould that causes aspergillosis."
      ],
      "activity": [
       "Handle it only when needed, wrapped in a towel with its wings folded against its body, as ducks defend themselves with their wings.",
       "Raise it with other wood ducks if any are in care, so it is released with them.",
       "Keep it away from pets, noise and visitors, and do not talk to or cuddle it, so it keeps its natural fear of people."
      ],
      "care": [
       "Weigh it every day at the same time, before fresh food goes in, and record its weight and how much it eats.",
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and delay release."
      ],
      "daily_checks": [
       "Weighed and recorded",
       "Grazing and drinking",
       "Wings held neatly",
       "Bedding changed twice",
       "Droppings look normal"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "Grass, greens and Passwell Crumbles",
       "weight_g": 350,
       "stage": "Feathering duckling",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Ducklings feed themselves; the guidance gives no body-weight amount.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully feathered, with waterproof feathers that stay dry after swimming",
        "Flies strongly and sees and moves well",
        "Grazes on its own and is wary of people and predators",
        "Healthy, needing no more care, and at adult size"
       ],
       "target_weight": "About 800 g (adult size) for an Australian wood duck",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild day and release it in daylight, avoiding extreme weather.",
        "Carry it in a lined, well-ventilated box, one bird per box.",
        "Release it with the ducks it was raised with or near other wood ducks, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found, using the GPS or Melways record kept with it, or if that spot is unsuitable, at the closest suitable grassy wetland within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Loses weight, or does not gain for two days in a row",
        "Eats little or nothing, or has diarrhoea",
        "Wing tips droop or twist outwards (angel wing)",
        "Legs splay or it limps"
       ],
       "urgent": [
        "Weak, floppy or cannot hold its head up: give nothing by mouth and go straight to a vet",
        "Tremors, a twisted neck, poor balance, swimming in circles or sudden death of any bird in care, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Struggling to breathe",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "waterbird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "vic-rehab-guidelines-waterbirds-marine"
      ]
     }
    },
    {
     "id": "lib-woodduck-adult",
     "stage": "Adult",
     "weight": "about 800 g",
     "text": "Ready-made plan: an adult Australian wood duck (maned duck), about 800 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a duck like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult Australian wood duck",
      "case_number": "",
      "species": "Australian wood duck, also called maned duck (Chenonetta jubata)",
      "kind": "wildlife",
      "summary": "This adult Australian wood duck, about 800 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and grazing well, check its flight and waterproofing, and return it to its flock where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a quiet, lined pen while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to an outdoor aviary with grass and a pool to rebuild flight and check its waterproofing."
        ]
       }
      ],
      "housing": [
       "Keep it in a quiet, lined pen with a soft, non-slip floor, never bare concrete, at the temperature the app shows for adult waterbirds, and change the bedding twice a day.",
       "Once settled, give it a pool deep enough to swim without scraping its feet, with an easy way out and a dry, soft area to rest.",
       "Keep it apart from other birds until its health is known, with its own dishes and cleaning gear, and well away from the room and air space of any pet birds, as serious diseases pass between them through the air.",
       "Psittacosis is common in Victorian waterfowl and bird flu is in wild waterbirds along the coast, so wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Feed mostly fresh green grass (unsprayed), clover and grass sods with roots, as wood ducks are grazers, with some Passwell Crumbles; too much high-protein food harms grazing ducks.",
       "The guidance gives no set amount for wood ducks, so keep grass and Crumbles in front of it all day and weigh what is left to see what it eats.",
       "Put Crumbles in a shallow dish and grass sods on the floor to graze, and throw out spoilt food every day.",
       "Keep clean fresh water at all times in a dish deep enough to dip its whole bill, changed at least once a day.",
       "Never feed bread, which has little nutrition and can grow mould that causes aspergillosis."
      ],
      "activity": [
       "Handle it only when needed, wrapped in a towel with its wings folded against its body, as ducks defend themselves with their wings; keep away from the water’s edge while catching it.",
       "Keep pets, children and noise well away, and do not try to tame it."
      ],
      "care": [
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and delay release."
      ],
      "daily_checks": [
       "Grazing and eating",
       "Fresh water given",
       "Bedding changed twice",
       "Droppings look normal",
       "Standing and walking well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 800,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult grazing and feeding itself; no measured amount is needed.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly the length of the aviary",
        "Waterproof, staying dry after swimming",
        "Grazing on its own and holding its weight",
        "Healthy, needing no more care, and wary of people"
       ],
       "target_weight": "About 800 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild day and release it in daylight, avoiding extreme weather.",
        "Carry it in a lined, well-ventilated box.",
        "Release it near other wood ducks, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found, using the GPS or Melways record kept with it, or if that spot is unsuitable, at the closest suitable grassy wetland within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Diarrhoea for more than a day",
        "Feathers soaking through when it swims",
        "Limping or sores on its feet"
       ],
       "urgent": [
        "Weak, floppy or cannot hold its head up: give nothing by mouth and go straight to a vet",
        "Tremors, a twisted neck, poor balance, swimming in circles or sudden death of any bird in care, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Struggling to breathe",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "waterbird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "vic-rehab-guidelines-waterbirds-marine"
      ]
     }
    }
   ]
  },
  {
   "id": "shearwater",
   "name": "Short-tailed shearwater",
   "plans": [
    {
     "id": "lib-shearwater-fledgling",
     "stage": "Grounded fledgling",
     "weight": "about 550 g",
     "text": "Ready-made plan: a short-tailed shearwater fledgling, about 550 g, found grounded inland in April, fully feathered and alert, waterproof unknown. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a fledgling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Grounded short-tailed shearwater fledgling",
      "case_number": "",
      "species": "Short-tailed shearwater (Ardenna tenuirostris)",
      "kind": "wildlife",
      "summary": "This short-tailed shearwater fledgling, about 550 g, was found grounded inland in autumn, fully feathered and alert. Young shearwaters are often drawn inland by lights on their first flight to sea, so the goal is a short stay: check it is uninjured and waterproof, then release it at the coast as soon as possible.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Have it checked for injuries and waterproofing by an experienced seabird carer."
        ]
       },
       {
        "when": "Day 1 or 2 (if uninjured and waterproof)",
        "tasks": [
         "Release it at the coast that evening."
        ]
       },
       {
        "when": "If it is injured, thin or not waterproof",
        "tasks": [
         "Pass it to an experienced seabird shelter, as marine birds need specialist housing and feeding."
        ]
       }
      ],
      "housing": [
       "Keep it in a ventilated cardboard box lined with a towel, in a dark, quiet room at the temperature the app shows for seabirds, away from pets and other birds.",
       "Shearwaters cannot stand well or take off from flat ground, so do not let it loose in a room or on the floor.",
       "Change the towel whenever it is soiled, as droppings ruin its waterproofing.",
       "Bird flu is in wild seabirds along the Victorian coast, so wear disposable gloves (which also keep skin oils off its feathers), a surgical or N95 mask and eye protection when handling it, and wash your hands with soap afterwards."
      ],
      "feeding": [
       "A healthy fledgling released within a day or two does not need feeding; give no food or water unless an experienced seabird carer says to.",
       "If it has to stay longer, an experienced seabird carer will feed it small whole fish such as pilchards with a seabird vitamin tablet, as shearwaters have a specialised diet and are hard to feed."
      ],
      "activity": [
       "Handle it as little as possible, gently, with gloved hands around its wings, and keep it away from your face, as shearwaters bite."
      ],
      "care": [
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and stop it being released."
      ],
      "daily_checks": [
       "Alert and lively",
       "Box clean and dry",
       "Feathers dry and neat",
       "Breathing quiet"
      ],
      "log_days": 2,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 550,
       "stage": "Fledgling, fully feathered",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Short stay before release; not fed unless an experienced seabird carer says so.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Alert, uninjured and holding its head up well",
        "Waterproof, as checked by an experienced seabird carer",
        "At a good weight for a fledgling, not thin"
       ],
       "target_weight": "About 550 g for a short-tailed shearwater fledgling",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Release it at dusk on a calm evening, never in strong wind, rain or storms.",
        "Take it to the beach or a dune near the sea and place it on the sand near the water, or let it walk to the water, rather than throwing it in the air.",
        "Step well back and watch from a distance until it reaches the sea."
       ],
       "where": "Release it at the nearest suitable stretch of coast to where it was found, close to a shearwater colony if there is one in the area, as these birds belong at sea."
      },
      "escalate": {
       "vet": [
        "Cannot hold its head up well, or one wing droops",
        "Feathers look wet, ruffled or soaked",
        "Thin, with a sharp breastbone"
       ],
       "urgent": [
        "Weak, collapsed or not responding: give nothing by mouth on the way",
        "Tremors, a twisted neck or poor balance, which can be bird flu: ring the Emergency Animal Disease Watch Hotline on 1800 675 888 straight away",
        "Struggling to breathe",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "seabird",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-waterbirds-marine",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "agvic-report-sick-dead-wild-birds",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "vic-h5n1-guidance-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    },
    {
     "id": "lib-shearwater-adult",
     "stage": "Adult (beach-washed)",
     "weight": "about 550 g",
     "text": "Ready-made plan: an adult short-tailed shearwater, about 550 g, found washed up on a beach, thin but alert, with no injuries needing treatment and no medicines. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a shearwater like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Beach-washed short-tailed shearwater",
      "case_number": "",
      "species": "Short-tailed shearwater (Ardenna tenuirostris)",
      "kind": "wildlife",
      "summary": "This adult short-tailed shearwater, about 550 g, was found washed up on a beach, thin but alert. Seabirds need specialist care and are high risk for bird flu, so the goal is to keep it safely, hand it to an experienced seabird carer, and release it at the coast once it is strong and waterproof.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Before bringing it in, check it shows no signs of bird flu and that an experienced seabird carer or vet with quarantine facilities can take it.",
         "Pass it to an experienced seabird carer, as marine birds need specialist housing and feeding."
        ]
       },
       {
        "when": "Once eating well",
        "tasks": [
         "The seabird carer gives it daily swims in a salt-water pool to restore its waterproofing."
        ]
       }
      ],
      "housing": [
       "Keep it in a ventilated box or pen lined with a towel, in a dark, quiet room at the temperature the app shows for seabirds, away from pets and other birds until its health is known.",
       "Shearwaters cannot stand well or take off from flat ground, so do not let it loose; once settled it needs a salt-water pool deep enough to swim in and a dry area with rubber matting or raked sand, never bare concrete.",
       "Change the floor material at least three times a day, as droppings ruin its waterproofing.",
       "Bird flu is in wild seabirds along the Victorian coast, so wear disposable gloves (which also keep skin oils off its feathers), a surgical or N95 mask and eye protection, coveralls and cleanable shoes when handling it, and wash your hands with soap afterwards."
      ],
      "feeding": [
       "An experienced seabird carer feeds it small whole fish such as pilchards or whitebait, as shearwaters have a specialised diet; it may need hand-feeding at first.",
       "Weigh it and the fish every day, as thin seabirds must gain steadily; pilchards are richer than whiting or squid, so it needs less of them by weight.",
       "Thaw frozen fish in the fridge or under cold running water, never in hot water, use it the same day and throw out leftovers; frozen fish loses vitamin B1, so give a seabird vitamin tablet (such as Vetafarm Sea Bird Tablets) tucked into a fish every day, as a lack causes fits and weakness.",
       "Give no food or water before it is warm, alert and checked by the seabird carer."
      ],
      "activity": [
       "Handle it as little as possible, gently, with gloved hands around its wings, and keep it away from your face, as shearwaters bite."
      ],
      "care": [
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and stop it being released.",
       "Anyone who has handled a seabird that might have bird flu should keep away from backyard poultry and pet birds for 48 hours."
      ],
      "daily_checks": [
       "Weighed and recorded",
       "Fish eaten",
       "Box or pen clean and dry",
       "Feathers dry and neat",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 550,
       "stage": "Adult, thin",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Fed by an experienced seabird carer; no measured amount is given.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Alert, strong and holding a good weight",
        "Waterproof, staying dry after swimming",
        "Swims and dives normally",
        "Needing no more care"
       ],
       "target_weight": "About 550 g or more for a short-tailed shearwater",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Release it at dusk on a calm evening, never in strong wind, rain or storms.",
        "Place it on the sand near the water, or let it walk to the water, rather than throwing it in the air, then step well back."
       ],
       "where": "Release it on the coast where it was found (recorded with GPS coordinates or a Melways reference), or at the closest suitable stretch of coast within its range."
      },
      "escalate": {
       "vet": [
        "Losing weight, or not gaining after two days of feeding",
        "Feathers soaking through when it swims",
        "Diarrhoea, or green droppings",
        "Sores on its feet or keel"
       ],
       "urgent": [
        "Weak, collapsed or not responding: give nothing by mouth on the way",
        "Tremors, a twisted neck, poor balance or swimming in circles, which can be bird flu: ring the Emergency Animal Disease Watch Hotline on 1800 675 888 straight away",
        "Struggling to breathe",
        "Any other seabird in care getting sick or dying suddenly: report it on 1800 675 888"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "seabird",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-waterbirds-marine",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "agvic-report-sick-dead-wild-birds",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "vic-h5n1-guidance-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "crosella",
   "name": "Crimson rosella",
   "plans": [
    {
     "id": "lib-crosella-nestling",
     "stage": "Nestling",
     "weight": "about 60 g",
     "text": "Ready-made plan: an orphaned crimson rosella nestling, about 60 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned crimson rosella nestling",
      "case_number": "",
      "species": "Crimson rosella (Platycercus elegans)",
      "kind": "wildlife",
      "summary": "This orphaned crimson rosella nestling, about 60 g with pin feathers coming through, is healthy and ready to be hand-reared. The goal is to raise it to a strong, wild, seed-eating young rosella and release it with a local flock where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "About weeks 1 to 2",
        "tasks": [
         "Thicken the formula step by step as its pin feathers open, dropping to 4 feeds a day."
        ]
       },
       {
        "when": "About weeks 3 to 4 (fully feathered, short tail)",
        "tasks": [
         "Move it to a cage with low perches and start offering soaked seed and soft food in a dish.",
         "Drop to 2 to 3 hand-feeds a day as it eats more on its own."
        ]
       },
       {
        "when": "About weeks 5 to 7",
        "tasks": [
         "Stop hand-feeding once it eats seed on its own and holds its weight.",
         "Move it to an outdoor flight aviary to build flying fitness, ideally with other young rosellas."
        ]
       }
      ],
      "housing": [
       "Keep it in a small container lined with paper towel, like a nest, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat; lower the heat bit by bit as its feathers cover its body.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the lining whenever it is soiled and clean up droppings after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Feed Passwell Hand Rearing Food or Wombaroo Granivore Rearing Mix, the hand-rearing formula for parrots, mixed at 1 g of powder to 3 mL of water while it is in pin feathers, then thicker (1 g to 2.5 mL, then 1 g to 2 mL) as its feathers open.",
       "Give the amount in the feed calculator each day, split evenly across the feeds, which is up to about 10% of its body weight at each feed, stopping when the crop is comfortably full. An adult crimson rosella eats about 20 g of food a day, so expect it to work up towards that as it weans.",
       "Give 5 feeds a day, about 6 am, 10 am, 2 pm, 6 pm and 10 pm, then leave it about 6 hours overnight so the crop empties fully at least once a day.",
       "Feed it from a small spoon with the sides bent up, letting it pump and swallow at its own pace, and stop if food comes out of its nostrils; never squirt food into its open beak with a syringe, as it can inhale it.",
       "Mix each feed fresh with pre-boiled water at about 50°C, let it stand 2 minutes, feed it at 38 to 40°C (test it on your wrist) and throw out what is left.",
       "Wipe its beak and face clean with a warm damp cloth after each feed so formula does not dry on its feathers.",
       "It gets its fluid from the formula, so it needs no water dish until it starts eating on its own.",
       "Once it is fully feathered, offer soaked or sprouted small parrot seed, defrosted peas and corn mixed with Parrot Soft Food, and natural foods such as seeding grasses, gum nuts and sheoak cones in a shallow dish, and cut back hand-feeds as it eats more by itself."
      ],
      "activity": [
       "Handle it only for feeds, weighing and cleaning, quickly and gently, and do not talk to it or let visitors see it, so it does not become tame.",
       "If another young crimson rosella is in care with an experienced bird carer, raising them together helps it grow up knowing its own kind.",
       "From the aviary stage, scatter seed heads, grasses and branches with gum nuts so it learns to forage."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Keep a daily record of its weight, feeds and progress; your authorisation requires records to be kept for 3 years."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Crop empty overnight",
       "Droppings look normal",
       "Nest clean and warm",
       "Feathers growing well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Passwell Hand Rearing Food or Granivore Rearing Mix",
       "weight_g": 60,
       "stage": "Nestling in pin feathers (eyes open)",
       "percent_body_weight_per_day": 50,
       "feeds_per_day": 5,
       "basis": "Wombaroo parrot hand-rearing table: up to 10% of body weight a feed, 5 feeds a day at pin-feather stage.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Eats seed and natural foods on its own and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy feathers with no signs of feather or beak disease",
        "Wary of people"
       ],
       "target_weight": "About 130 g for a crimson rosella",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Release it where local crimson rosellas are feeding, with any rosellas it was raised with."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Crop still full in the morning, or slow to empty between feeds",
        "Weight drops, or stays the same for two days",
        "Watery or oddly coloured droppings for more than a day",
        "Feathers that look pinched, curled or bloody, or a beak that looks overgrown, which can mean beak and feather disease"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Formula bubbling from its nostrils, or struggling to breathe",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-crosella-adult",
     "stage": "Adult",
     "weight": "about 130 g",
     "text": "Ready-made plan: an adult crimson rosella, about 130 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a rosella like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult crimson rosella",
      "case_number": "",
      "species": "Crimson rosella (Platycercus elegans)",
      "kind": "wildlife",
      "summary": "This adult crimson rosella, about 130 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating well, rebuild its flying fitness and return it to its flock where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a small, covered hospital cage while it settles."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to an outdoor flight aviary to rebuild flying fitness."
        ]
       }
      ],
      "housing": [
       "Keep it in a covered cage with low natural branch perches, in a quiet, dim room at the temperature the app shows for adult birds.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Use an aviary with weathered or vinegar-washed wire, as new galvanised wire can poison parrots with zinc. Clean the floor and dishes daily.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Offer small parrot seed mix (not one heavy in sunflower or other oily seed) with natural foods such as seeding grasses, gum nuts, eucalypt and acacia seed, native flowers and a little apple or defrosted peas and corn; never avocado, bread or dairy.",
       "An adult crimson rosella eats about 20 g of food a day; weigh what you put in and what is left so you know it is eating.",
       "Put the food in shallow dishes on the floor and near a perch, and top it up every morning.",
       "Keep fresh water in a shallow dish at all times and change it every day.",
       "Once in the aviary, offer most of its food as natural seed heads and branches so it is foraging for itself before release."
      ],
      "activity": [
       "Handle it as little, as quickly and as gently as possible, wrapped in a towel, and do not try to tame it.",
       "Keep pets, children and noise well away from its cage."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Food eaten, dish topped up",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 130,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating seed and natural foods; the Wombaroo guide gives about 20 g a day for an adult crimson rosella.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands well the length of the aviary",
        "Eating natural foods and holding its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 130 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Release it where local crimson rosellas are, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Not flying properly once in the flight aviary",
        "Feathers that look pinched, curled or bloody, or an overgrown beak, which can mean beak and feather disease"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "heron",
   "name": "White-faced heron",
   "plans": [
    {
     "id": "lib-heron-nestling",
     "stage": "Nestling",
     "weight": "about 300 g",
     "text": "Ready-made plan: an orphaned white-faced heron nestling, about 300 g, downy with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned white-faced heron nestling",
      "case_number": "",
      "species": "White-faced heron (Egretta novaehollandiae)",
      "kind": "wildlife",
      "summary": "This orphaned white-faced heron nestling, about 300 g, is downy with pin feathers coming through and is healthy. The goal is to teach it to feed itself early, raise it to a strong, wild young heron and release it where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 7",
        "tasks": [
         "Start offering small fish and insects in a shallow dish of water at every feed, as heron chicks can usually be taught to feed themselves early."
        ]
       },
       {
        "when": "About week 2 (feeding itself)",
        "tasks": [
         "Stop hand-feeding once it picks up all its food from the dish.",
         "Move it to a larger enclosure with low perches and a shallow pool."
        ]
       },
       {
        "when": "About weeks 4 to 6 (flying)",
        "tasks": [
         "Move it to a large outdoor aviary with a shallow pool to build flight and catch live food."
        ]
       }
      ],
      "housing": [
       "Keep it in a lined, nest-like container inside a heated box at the temperature the app shows for its stage, with room to move away from the heat; lower the heat as its feathers grow.",
       "Line it with a soft, non-slip towel and change the lining whenever soiled, at least once a day.",
       "Keep it apart from other birds until its health is known, with its own dishes and cleaning gear, and well away from the room and air space of any pet birds, as serious diseases pass between them through the air.",
       "Psittacosis is common in Victorian waterfowl and bird flu is in wild waterbirds along the coast, so wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards. Wear safety glasses, as herons stab at faces with their beaks."
      ],
      "feeding": [
       "Feed small whole fish such as whitebait, with insects, earthworms and small yabbies, as white-faced herons eat fish, frogs, insects and crustaceans.",
       "Give the amount in the feed calculator each day, split across the feeds; weigh the food you give and what is left.",
       "Give about 4 feeds a day, about 7 am, 11 am, 3 pm and 7 pm.",
       "Offer each piece from long blunt tweezers held low in front of it, then drop food into a shallow dish of water so it learns to pick it up; never force food into its beak.",
       "Thaw frozen fish in the fridge or under cold running water, never in hot water, use it the same day and throw out leftovers; frozen fish loses vitamin B1, so give a seabird vitamin tablet (such as Vetafarm Sea Bird Tablets) tucked into a fish every day, as a lack causes fits and weakness.",
       "Once it feeds itself, keep fresh water in a shallow dish at all times and change it daily.",
       "Before release, put live fish, yabbies and insects in its pool every day so it learns to catch its own food."
      ],
      "activity": [
       "Handle it only for weighing and cleaning, quickly and gently, holding its head away from your face, and do not talk to it or let visitors see it, so it does not become tame.",
       "If another young heron is in care with an experienced waterbird carer, raising them together helps it grow up knowing its own kind."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Eating well",
       "Droppings normal",
       "Nest clean and dry",
       "Feathers growing"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Small whole fish and insects",
       "weight_g": 300,
       "stage": "Downy nestling with pin feathers",
       "percent_body_weight_per_day": 20,
       "feeds_per_day": 4,
       "basis": "Best estimate for a growing fish-eating nestling; no heron chart is given in the guidance.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Catches live fish and insects on its own and holds its weight",
        "Flies strongly the length of the aviary",
        "Full, healthy plumage and needing no more care",
        "Wary of people"
       ],
       "target_weight": "About 550 g for a white-faced heron",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near shallow water and cover, and step well back."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable wetland within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Refuses food, or loses weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Weak or bent legs",
        "Wobbly or having small fits, which can mean a lack of vitamin B1"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Tremors, a twisted neck, poor balance, swimming in circles or sudden death of any bird in care, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Struggling to breathe",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "waterbird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "vic-rehab-guidelines-waterbirds-marine",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-heron-adult",
     "stage": "Adult",
     "weight": "about 550 g",
     "text": "Ready-made plan: an adult white-faced heron, about 550 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a heron like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult white-faced heron",
      "case_number": "",
      "species": "White-faced heron (Egretta novaehollandiae)",
      "kind": "wildlife",
      "summary": "This adult white-faced heron, about 550 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating well, rebuild its flight and return it to where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a quiet, covered, lined enclosure while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to a large outdoor aviary with a shallow pool to rebuild flight and catch live food."
        ]
       }
      ],
      "housing": [
       "Keep it in a quiet, covered enclosure tall enough for it to stand upright, with a soft, non-slip floor, never bare concrete, at the temperature the app shows for adult waterbirds.",
       "Clean the floor and change the lining every day.",
       "Keep it apart from other birds until its health is known, with its own dishes and cleaning gear, and well away from the room and air space of any pet birds, as serious diseases pass between them through the air.",
       "Psittacosis is common in Victorian waterfowl and bird flu is in wild waterbirds along the coast, so wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards. Wear safety glasses, as herons stab at faces with their beaks."
      ],
      "feeding": [
       "Feed small whole fish such as whitebait, with yabbies, earthworms and insects, as white-faced herons eat fish, frogs, insects and crustaceans.",
       "The guidance gives no set amount for herons, so offer fish twice a day in the amount it clears, and weigh what you give and what is left.",
       "Put food in a shallow dish of water, where it will pick it up; never force food into its beak.",
       "Thaw frozen fish in the fridge or under cold running water, never in hot water, use it the same day and throw out leftovers; frozen fish loses vitamin B1, so give a seabird vitamin tablet (such as Vetafarm Sea Bird Tablets) tucked into a fish every day, as a lack causes fits and weakness.",
       "Keep fresh water in a shallow dish at all times and change it daily.",
       "Once in the aviary, put live fish, yabbies and insects in its pool every day so it is catching its own food before release."
      ],
      "activity": [
       "Handle it as little as possible, with a towel over its body and its head held firmly away from your face, and do not try to tame it.",
       "Keep pets, children and noise well away from its enclosure."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Food eaten recorded",
       "Fresh water given",
       "Standing steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 550,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself on fish and invertebrates; no measured amount is needed.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly the length of the aviary",
        "Catches live food and holds its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 550 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near shallow water, and step well back."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable wetland within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Not flying properly once in the aviary",
        "Wobbly or having small fits, which can mean a lack of vitamin B1"
       ],
       "urgent": [
        "Weak, collapsed or cannot hold its head up: give nothing by mouth on the way",
        "Tremors, a twisted neck, poor balance, swimming in circles or sudden death of any bird in care, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Struggling to breathe",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "waterbird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "vic-rehab-guidelines-waterbirds-marine"
      ]
     }
    }
   ]
  },
  {
   "id": "swallow",
   "name": "Welcome swallow",
   "plans": [
    {
     "id": "lib-swallow-nestling",
     "stage": "Nestling",
     "weight": "about 10 g",
     "text": "Ready-made plan: an orphaned welcome swallow nestling, about 10 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned welcome swallow nestling",
      "case_number": "",
      "species": "Welcome swallow (Hirundo neoxena)",
      "kind": "wildlife",
      "summary": "This orphaned welcome swallow nestling, about 10 g with pin feathers coming through, is healthy and ready to be hand-reared. Swallows catch all their food in flight, so the goal is to raise it with an experienced small-bird carer until it catches flying insects on its own, then release it where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 7",
        "tasks": [
         "If the nest and parents are found nearby, try putting it back in the nest (or a makeshift nest in the same spot) and watch from a distance for the parents first.",
         "Lower the heat bit by bit as its feathers open, staying within the range the app shows for its stage."
        ]
       },
       {
        "when": "About week 2 (well feathered)",
        "tasks": [
         "Move it to a small aviary or flight cage and start releasing small flying insects for it to chase.",
         "Feed less often as it starts catching insects."
        ]
       },
       {
        "when": "About weeks 3 to 4",
        "tasks": [
         "Stop hand-feeding once it catches flying insects on its own and holds its weight."
        ]
       }
      ],
      "housing": [
       "Sit it in a small, deep artificial nest lined with tissue, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat, as nestlings cannot keep themselves warm.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the nest lining whenever it is soiled and remove droppings after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed small live insects (fly pupae, flies, small moths and tiny crickets) with their wings and legs removed while it is young, plus Wombaroo Insectivore Egg Mix (20 g of powder with one mashed hard-boiled egg) as it grows.",
       "Give the amount in the feed calculator each day; the Wombaroo welcome swallow chart gives about 5 g of food a day at 7 days old (eyes open), rising to about 7 g a day at 10 days.",
       "Feed it about every 30 minutes from dawn to dusk while it gapes, with no overnight feeds; young insect-eating chicks ideally feed every 15 minutes, so feed more often if it is smaller or younger.",
       "Place tiny pieces into its gaping beak from fine blunt tweezers, letting it swallow each one before the next, and never squirt food into its beak with a syringe, as birds easily inhale it.",
       "Keep made-up Egg Mix in the fridge for no more than a day (or frozen up to 2 weeks), never refreeze thawed food, and throw out leftovers.",
       "At each feed, drip a little water slowly at the tip of its beak and let it swallow, especially in hot weather; it needs no water dish yet.",
       "Before release it must catch flying insects for itself, so from the flight-cage stage release live flies and moths into the cage every day."
      ],
      "activity": [
       "Swallows are hard to hand-rear and often refuse to feed themselves, so pass it to an experienced small-bird carer if you can.",
       "Hold it cupped gently in your hand rather than in a towel, and handle it only for feeds and weighing, without talking to it, so it does not become tame."
      ],
      "care": [
       "Weigh it every morning at the same time, on scales that read to 0.1 g, before the first feed, and enter the weight so the feed calculator stays right.",
       "Keep a daily record of its weight, food eaten and progress; your authorisation requires records to be kept for 3 years."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Gaping well at feeds",
       "Droppings normal",
       "Nest clean and warm",
       "Feathers growing"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Small insects and Insectivore Egg Mix",
       "weight_g": 10,
       "stage": "Nestling in pin feathers (about 7 to 10 days old)",
       "percent_body_weight_per_day": 55,
       "feeds_per_day": 28,
       "basis": "Wombaroo welcome swallow chart: about 5 to 7 g a day at 7 to 10 days old. Feeds a day not given.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Catches flying insects on its own and holds its weight",
        "Flies strongly, twisting and turning, the length of the flight cage",
        "Full, healthy plumage and needing no more care",
        "Wary of people"
       ],
       "target_weight": "About 15 g for a welcome swallow",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a warm, calm, mid-morning when insects are flying, never cold, wet or windy weather.",
        "Release it where other welcome swallows are feeding, over open ground or water."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Will not gape or refuses two feeds in a row",
        "Weight drops, or stays the same for a day",
        "Watery or oddly coloured droppings",
        "Weak or splayed legs, or feathers growing poorly"
       ],
       "urgent": [
        "Cold, fluffed up, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or food or fluid bubbling from its nostrils",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-swallow-adult",
     "stage": "Adult",
     "weight": "about 15 g",
     "text": "Ready-made plan: an adult welcome swallow, about 15 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a swallow like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult welcome swallow",
      "case_number": "",
      "species": "Welcome swallow (Hirundo neoxena)",
      "kind": "wildlife",
      "summary": "This adult welcome swallow, about 15 g, is recovering in care with no injuries needing treatment. Swallows catch all their food in flight and cope poorly in care, so the goal is a short stay, keeping it fed and calm, and returning it to where it was found as soon as it flies well.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 2",
        "tasks": [
         "Keep it in a small covered box or hospital cage while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating and moving normally",
        "tasks": [
         "Move it to a flight cage or small aviary and release live flying insects into it every day."
        ]
       }
      ],
      "housing": [
       "Keep it in a small, covered, padded box or hospital cage with a low perch, in a quiet, dim room at the temperature the app shows for adult birds.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Clean the floor and dishes every day.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed live insects such as flies, small moths, fly pupae and small crickets, dusted with calcium, plus a little Wombaroo Insectivore Egg Mix; swallows often do not recognise food in a dish.",
       "A small insect-eating bird of this size needs about 5 g of food a day; weigh what you give so you know it is eating.",
       "Release live flying insects into its cage several times a day, and also leave insects and Egg Mix in a shallow dish in case it takes them.",
       "If it will not eat on its own after the first day, an experienced small-bird carer may need to hand-feed it, as adult swallows take assisted feeding poorly.",
       "Keep a shallow dish of fresh water at all times, changed daily, and in hot weather drip a little water at the tip of its beak if it is not drinking."
      ],
      "activity": [
       "Hold it cupped gently in your hand rather than in a towel, as little and as quickly as possible, and do not try to tame it.",
       "Pass it to an experienced small-bird carer if it is not feeding itself by day 2, as swallows do poorly in care."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Insects eaten",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 7,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 15,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself on live insects; about 5 g a day for a flying welcome swallow (Wombaroo chart).",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly, twisting and turning, the length of the flight cage",
        "Catching flying insects and holding its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 15 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a warm, calm, mid-morning when insects are flying, never cold, wet or windy weather.",
        "Release it where other welcome swallows are feeding, over open ground or water."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating by the end of day 1",
        "Losing weight",
        "Watery or oddly coloured droppings",
        "Not flying properly once in the flight cage"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "microbat",
   "name": "Microbats (vaccinated carers only)",
   "plans": [
    {
     "id": "lib-forestbat-adult",
     "stage": "Little forest bat, adult",
     "weight": "about 4 g",
     "text": "Ready-made plan: an adult little forest bat (microbat), about 4 g, in care and recovering, with no injuries needing treatment and no medicines. For vaccinated, trained carers only. Write a standard plan another carer can follow for a bat like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult little forest bat",
      "case_number": "",
      "species": "Little forest bat (Vespadelus vulturnus)",
      "kind": "wildlife",
      "summary": "This adult little forest bat, a microbat of about 4 g, is recovering in care with no injuries needing treatment, with a vaccinated, trained carer. The goal is a short stay: keep it warm, hydrated and eating insects, check it flies well, and release it at dusk where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Warm it slowly and give water before offering any food."
        ]
       },
       {
        "when": "Days 2 to 5",
        "tasks": [
         "Once it is eating well, give it a nightly flight in a closed room or flight tent to check and build its flying."
        ]
       }
      ],
      "housing": [
       "Only rabies-vaccinated, trained carers wearing protective gloves may handle it, as any bat can carry Australian bat lyssavirus, which can kill people.",
       "Keep it in a small, escape-proof container with a soft cloth or pouch hung inside to crawl into and hang from, in a quiet, dark room at the temperature the app shows for microbats, with a warm end and a cooler end.",
       "Keep it away from pets and other animals, and clean the cloth and container every day."
      ],
      "feeding": [
       "Feed small live mealworms with the heads pinched off, plus other small live insects such as moths, flies and fly pupae; microbats eat only insects.",
       "Feed it only once it is warm and has had water, as a cold bat cannot digest food.",
       "Offer insects one at a time from blunt tweezers in the evening, then leave a few mealworms in a smooth-sided dish overnight; weigh it each evening to check it is eating enough.",
       "Offer water as small drops from a fine syringe held at its mouth for it to lap at its own pace, at each feed and once more during the night."
      ],
      "activity": [
       "Handle it as little as possible, always with gloves, cupping it gently with its wings folded.",
       "If you are bitten or scratched, wash the wound with soap and water for at least 15 minutes, put on an antiseptic such as iodine, and see a doctor urgently, even if you are vaccinated."
      ],
      "care": [
       "If it came in during the cold months, ask an experienced microbat carer whether it should stay in care until spring, as bats in winter are often in torpor."
      ],
      "daily_checks": [
       "Weighed in the evening",
       "Insects eaten",
       "Water offered",
       "Container clean",
       "Alert and responsive"
      ],
      "log_days": 7,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 4,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating live insects; no measured amount is given.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and turns well in a closed room or flight tent",
        "Eating well and holding its weight",
        "Healthy and needing no more care"
       ],
       "target_weight": "About 4 to 5 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Release it at dusk on a mild, still, dry evening when insects are flying, never during the day or in rain or wind.",
        "Hold it up on a tree trunk or branch near where it was found and let it crawl off and fly when ready."
       ],
       "where": "Release it exactly where it was found (recorded with GPS coordinates or a Melways reference), near its roost, or if that spot is unsuitable, at the closest suitable place within its home range."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight",
        "Not flying, or flying lopsided",
        "Holes or tears in the wing membranes",
        "Weak, cold or very slow to respond after warming"
       ],
       "urgent": [
        "Collapsed or cannot hold its head up: give nothing by mouth on the way",
        "Struggling to breathe",
        "Caught by a cat: a vet the same day, even if no wound can be seen",
        "Anyone bitten or scratched: first aid and a doctor straight away"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "microbat",
      "next_visit": "",
      "sources": [
       "vic-ablv-better-health",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a"
      ]
     }
    },
    {
     "id": "lib-largeforestbat-adult",
     "stage": "Large forest bat, adult",
     "weight": "about 7 g",
     "text": "Ready-made plan: an adult large forest bat (microbat), about 7 g, in care and recovering, with no injuries needing treatment and no medicines. For vaccinated, trained carers only. Write a standard plan another carer can follow for a bat like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult large forest bat",
      "case_number": "",
      "species": "Large forest bat (Vespadelus darlingtoni)",
      "kind": "wildlife",
      "summary": "This adult large forest bat, a microbat of about 7 g, is recovering in care with no injuries needing treatment, with a vaccinated, trained carer. The goal is a short stay: keep it warm, hydrated and eating insects, check it flies well, and release it at dusk where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Warm it slowly and give water before offering any food."
        ]
       },
       {
        "when": "Days 2 to 5",
        "tasks": [
         "Once it is eating well, give it a nightly flight in a closed room or flight tent to check and build its flying."
        ]
       }
      ],
      "housing": [
       "Only rabies-vaccinated, trained carers wearing protective gloves may handle it, as any bat can carry Australian bat lyssavirus, which can kill people.",
       "Keep it in a small, escape-proof container with a soft cloth or pouch hung inside to crawl into and hang from, in a quiet, dark room at the temperature the app shows for microbats, with a warm end and a cooler end.",
       "Keep it away from pets and other animals, and clean the cloth and container every day."
      ],
      "feeding": [
       "Feed small live mealworms with the heads pinched off, plus other small live insects such as moths, flies and fly pupae; microbats eat only insects.",
       "Feed it only once it is warm and has had water, as a cold bat cannot digest food.",
       "Offer insects one at a time from blunt tweezers in the evening, then leave a few mealworms in a smooth-sided dish overnight; weigh it each evening to check it is eating enough.",
       "Offer water as small drops from a fine syringe held at its mouth for it to lap at its own pace, at each feed and once more during the night."
      ],
      "activity": [
       "Handle it as little as possible, always with gloves, cupping it gently with its wings folded.",
       "If you are bitten or scratched, wash the wound with soap and water for at least 15 minutes, put on an antiseptic such as iodine, and see a doctor urgently, even if you are vaccinated."
      ],
      "care": [
       "If it came in during the cold months, ask an experienced microbat carer whether it should stay in care until spring, as bats in winter are often in torpor."
      ],
      "daily_checks": [
       "Weighed in the evening",
       "Insects eaten",
       "Water offered",
       "Container clean",
       "Alert and responsive"
      ],
      "log_days": 7,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 7,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating live insects; no measured amount is given.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and turns well in a closed room or flight tent",
        "Eating well and holding its weight",
        "Healthy and needing no more care"
       ],
       "target_weight": "About 7 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Release it at dusk on a mild, still, dry evening when insects are flying, never during the day or in rain or wind.",
        "Hold it up on a tree trunk or branch near where it was found and let it crawl off and fly when ready."
       ],
       "where": "Release it exactly where it was found (recorded with GPS coordinates or a Melways reference), near its roost, or if that spot is unsuitable, at the closest suitable place within its home range."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight",
        "Not flying, or flying lopsided",
        "Holes or tears in the wing membranes",
        "Weak, cold or very slow to respond after warming"
       ],
       "urgent": [
        "Collapsed or cannot hold its head up: give nothing by mouth on the way",
        "Struggling to breathe",
        "Caught by a cat: a vet the same day, even if no wound can be seen",
        "Anyone bitten or scratched: first aid and a doctor straight away"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "microbat",
      "next_visit": "",
      "sources": [
       "vic-ablv-better-health",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a"
      ]
     }
    },
    {
     "id": "lib-microbat-unknown",
     "stage": "Unidentified microbat, adult",
     "weight": "about 5 to 10 g",
     "text": "Ready-made plan: an adult microbat of a species not yet identified, about 5 to 10 g, in care and recovering, with no injuries needing treatment and no medicines. For vaccinated, trained carers only. Write a standard plan another carer can follow for a microbat like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult microbat (species not yet known)",
      "case_number": "",
      "species": "Microbat, species to be identified",
      "kind": "wildlife",
      "summary": "This adult microbat, about 5 to 10 g, is recovering in care with no injuries needing treatment, with a vaccinated, trained carer. The goal is to have its species confirmed, keep it warm, hydrated and eating insects, and release it at dusk where it was found once it flies well.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Warm it slowly and give water before offering any food.",
         "Send clear photos of its face, ears and tail to an experienced microbat carer to confirm the species, as care and release timing can differ."
        ]
       },
       {
        "when": "Days 2 to 5",
        "tasks": [
         "Once it is eating well, give it a nightly flight in a closed room or flight tent to check and build its flying."
        ]
       }
      ],
      "housing": [
       "Only rabies-vaccinated, trained carers wearing protective gloves may handle it, as any bat can carry Australian bat lyssavirus, which can kill people.",
       "Keep it in a small, escape-proof container with a soft cloth or pouch hung inside to crawl into and hang from, in a quiet, dark room at the temperature the app shows for microbats, with a warm end and a cooler end.",
       "Keep it away from pets and other animals, and clean the cloth and container every day."
      ],
      "feeding": [
       "Feed small live mealworms with the heads pinched off, plus other small live insects such as moths, flies and fly pupae; microbats eat only insects.",
       "Feed it only once it is warm and has had water, as a cold bat cannot digest food.",
       "Offer insects one at a time from blunt tweezers in the evening, then leave a few mealworms in a smooth-sided dish overnight; weigh it each evening to check it is eating enough.",
       "Offer water as small drops from a fine syringe held at its mouth for it to lap at its own pace, at each feed and once more during the night."
      ],
      "activity": [
       "Handle it as little as possible, always with gloves, cupping it gently with its wings folded.",
       "If you are bitten or scratched, wash the wound with soap and water for at least 15 minutes, put on an antiseptic such as iodine, and see a doctor urgently, even if you are vaccinated."
      ],
      "care": [
       "If it came in during the cold months, ask an experienced microbat carer whether it should stay in care until spring, as bats in winter are often in torpor."
      ],
      "daily_checks": [
       "Weighed in the evening",
       "Insects eaten",
       "Water offered",
       "Container clean",
       "Alert and responsive"
      ],
      "log_days": 7,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": null,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating live insects; no measured amount is given.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and turns well in a closed room or flight tent",
        "Eating well and holding its weight",
        "Healthy and needing no more care"
       ],
       "target_weight": "Holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Release it at dusk on a mild, still, dry evening when insects are flying, never during the day or in rain or wind.",
        "Hold it up on a tree trunk or branch near where it was found and let it crawl off and fly when ready."
       ],
       "where": "Release it exactly where it was found (recorded with GPS coordinates or a Melways reference), near its roost, or if that spot is unsuitable, at the closest suitable place within its home range."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight",
        "Not flying, or flying lopsided",
        "Holes or tears in the wing membranes",
        "Weak, cold or very slow to respond after warming"
       ],
       "urgent": [
        "Collapsed or cannot hold its head up: give nothing by mouth on the way",
        "Struggling to breathe",
        "Caught by a cat: a vet the same day, even if no wound can be seen",
        "Anyone bitten or scratched: first aid and a doctor straight away"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "microbat",
      "next_visit": "",
      "sources": [
       "vic-ablv-better-health",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a"
      ]
     }
    }
   ]
  },
  {
   "id": "cormorant",
   "name": "Cormorants",
   "plans": [
    {
     "id": "lib-lbcormorant-adult",
     "stage": "Little black cormorant, adult",
     "weight": "about 800 g",
     "text": "Ready-made plan: an adult little black cormorant, about 800 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a cormorant like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult little black cormorant",
      "case_number": "",
      "species": "Little black cormorant (Phalacrocorax sulcirostris)",
      "kind": "wildlife",
      "summary": "This adult little black cormorant, about 800 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating fish, rebuild its swimming and flight, and return it to where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a quiet, lined enclosure with a perch while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating well",
        "tasks": [
         "Give it daily swims in a pool, then move it to an aviary with a pool and high perches to rebuild swimming and flight."
        ]
       }
      ],
      "housing": [
       "Keep it in a quiet, covered enclosure with a soft, non-slip floor (rubber matting or raked sand, never bare concrete) and a sturdy perch where it can spread its wings to dry, at the temperature the app shows for adult waterbirds.",
       "Give it a pool deep enough to swim and dive without scraping its feet, with an easy way out, and change soiled floor material every day.",
       "Keep it apart from other birds until its health is known, with its own dishes and cleaning gear, and well away from the room and air space of any pet birds, as serious diseases pass between them through the air.",
       "Psittacosis is common in Victorian waterfowl and bird flu is in wild waterbirds along the coast, so wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Feed small whole fish such as whitebait, pilchards or small mullet, as little black cormorants eat fish they catch underwater.",
       "The guidance gives no set amount for cormorants, so offer fish twice a day in the amount it clears, and weigh what you give and what is left.",
       "Drop fish into its pool or a dish of water so it learns to pick it up; never force food into its beak.",
       "Thaw frozen fish in the fridge or under cold running water, never in hot water, use it the same day and throw out leftovers; frozen fish loses vitamin B1, so give a seabird vitamin tablet (such as Vetafarm Sea Bird Tablets) tucked into a fish every day, as a lack causes fits and weakness.",
       "Keep fresh water available at all times and change it daily."
      ],
      "activity": [
       "Handle it with a towel over its body and your hand around its neck behind the head, and never hold its beak shut for more than a few seconds, as cormorants have no outside nostrils and cannot breathe with the beak closed.",
       "Keep pets, children and noise well away, and do not try to tame it."
      ],
      "care": [
       "Never use oil-based ointments or creams on it, as they ruin its feathers and delay release."
      ],
      "daily_checks": [
       "Fish eaten recorded",
       "Fresh water given",
       "Swimming normally",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 800,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself on fish; no measured amount is given.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Swims, dives and dries its wings normally",
        "Flies strongly from the pool to a high perch",
        "Eating well and holding its weight",
        "Healthy, needing no more care, and wary of people"
       ],
       "target_weight": "About 800 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it at the water’s edge, and step well back."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable waterway within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Diarrhoea for more than a day",
        "Feathers staying soaked or it shivers after swimming",
        "Wobbly or having small fits, which can mean a lack of vitamin B1"
       ],
       "urgent": [
        "Weak, collapsed or cannot hold its head up: give nothing by mouth on the way",
        "Tremors, a twisted neck, poor balance, swimming in circles or sudden death of any bird in care, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Struggling to breathe",
        "Fishing line or a hook coming from its mouth: never pull it"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "waterbird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "vic-rehab-guidelines-waterbirds-marine"
      ]
     }
    },
    {
     "id": "lib-bfcormorant-adult",
     "stage": "Black-faced cormorant, adult",
     "weight": "about 1.6 kg",
     "text": "Ready-made plan: an adult black-faced cormorant, about 1.6 kg, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a cormorant like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult black-faced cormorant",
      "case_number": "",
      "species": "Black-faced cormorant (Phalacrocorax fuscescens)",
      "kind": "wildlife",
      "summary": "This adult black-faced cormorant, about 1.6 kg, is recovering in care with no injuries needing treatment. It is a marine bird, so the goal is care with an experienced seabird carer, keeping it eating fish, rebuilding its swimming and flight, and returning it to its coast as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a quiet, lined enclosure with a perch while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating well",
        "tasks": [
         "Give it daily swims in a salt-water pool, then move it to an aviary with a salt-water pool and high perches to rebuild swimming and flight."
        ]
       }
      ],
      "housing": [
       "Marine birds need specialist housing and lots of fish, so it should be cared for by an experienced seabird shelter in the region where it was found.",
       "Keep it in a quiet, covered enclosure with a soft, non-slip floor (rubber matting or raked sand, never bare concrete) and a sturdy perch where it can spread its wings to dry, at the temperature the app shows for adult seabirds; change soiled floor material at least three times a day.",
       "Give it a salt-water pool deep enough to swim and dive without scraping its feet, with an easy way out, and keep it apart from other birds and any pet birds’ air space.",
       "Bird flu is in wild seabirds along the Victorian coast, so wear disposable gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Feed whole fish such as pilchards, whitebait or small mullet, as black-faced cormorants catch fish at sea.",
       "The guidance gives no set amount for cormorants, so offer fish twice a day in the amount it clears, and weigh what you give and what is left; pilchards are richer than whiting or squid, so it needs less of them by weight.",
       "Drop fish into its pool or a dish of water so it learns to pick it up; never force food into its beak.",
       "Thaw frozen fish in the fridge or under cold running water, never in hot water, use it the same day and throw out leftovers; frozen fish loses vitamin B1, so give a seabird vitamin tablet (such as Vetafarm Sea Bird Tablets) tucked into a fish every day, as a lack causes fits and weakness.",
       "Keep fresh water available at all times and change it daily."
      ],
      "activity": [
       "Handle it with a towel over its body and your hand around its neck behind the head, and never hold its beak shut for more than a few seconds, as cormorants have no outside nostrils and cannot breathe with the beak closed.",
       "Keep pets, children and noise well away, and do not try to tame it."
      ],
      "care": [
       "Never use oil-based ointments or creams on it, as they ruin its feathers and delay release."
      ],
      "daily_checks": [
       "Fish eaten recorded",
       "Fresh water given",
       "Swimming normally",
       "Floor changed three times",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 1600,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself on fish; no measured amount is given.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Swims, dives and dries its wings normally",
        "Flies strongly from the pool to a high perch",
        "Eating well and holding its weight",
        "Healthy, needing no more care, and wary of people"
       ],
       "target_weight": "About 1.6 kg, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning with a gentle sea, never extreme weather.",
        "Carry it in a lined, ventilated box, open it at the water’s edge on the coast, and step well back."
       ],
       "where": "Release it where it was found on the coast (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Diarrhoea for more than a day",
        "Feathers staying soaked or it shivers after swimming",
        "Wobbly or having small fits, which can mean a lack of vitamin B1"
       ],
       "urgent": [
        "Weak, collapsed or cannot hold its head up: give nothing by mouth on the way",
        "Tremors, a twisted neck, poor balance or swimming in circles, which can be bird flu: ring the Emergency Animal Disease Watch Hotline on 1800 675 888 straight away",
        "Struggling to breathe",
        "Fishing line or a hook coming from its mouth: never pull it"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "waterbird",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-waterbirds-marine",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "agvic-report-sick-dead-wild-birds",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "vic-h5n1-guidance-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "turtle",
   "name": "Common long-necked turtle",
   "plans": [
    {
     "id": "lib-turtle-hatchling",
     "stage": "Hatchling",
     "weight": "about 8 g",
     "text": "Ready-made plan: a common (eastern) long-necked turtle hatchling, about 8 g, found away from water. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a hatchling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Common long-necked turtle hatchling",
      "case_number": "",
      "species": "Common (eastern) long-necked turtle (Chelodina longicollis)",
      "kind": "wildlife",
      "summary": "This common long-necked turtle hatchling, about 8 g, was found away from water and is healthy. Hatchlings walk from the nest to water on their own, so the goal is a short stay and release into the nearest suitable water where it was found, as soon as the weather allows.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Check the weather forecast for its release."
        ]
       },
       {
        "when": "First suitable day",
        "tasks": [
         "Release it in the warmest part of the day at the water nearest where it was found."
        ]
       }
      ],
      "housing": [
       "Keep it in a plastic tub with clean, dechlorinated water no deeper than its shell is long, plus a dry rock or platform to climb out on, as hatchlings tire and can drown in deep water.",
       "Keep the air and water at about 20 to 26°C, with a warm basking spot of 26 to 30°C under a lamp and a UV light on a 12-hour cycle about 30 cm above it.",
       "Keep it on its own, away from pet reptiles, with its own equipment.",
       "Assume it carries salmonella: wash your hands with soap after touching it, its water or its equipment, keep its gear separate from the kitchen, and keep young children away from it."
      ],
      "feeding": [
       "Offer small live food in the water, such as bloodworms, small earthworms, small insects and tiny pieces of fish, as turtles only eat in water.",
       "Give a portion about the size of its head once a day, and remove leftovers within 12 hours.",
       "Warm it to its preferred temperature before offering food, as cold turtles cannot digest it; many hatchlings will not eat in a short stay, which is fine."
      ],
      "activity": [
       "Hold it gently by both sides of the shell, never upside down or by the neck; it may release a strong musky smell, which is normal."
      ],
      "care": [
       "Check the water weekly (pH about 7, ammonia below 0.02 ppm, nitrite below 0.1 ppm, nitrate below 50 ppm) and change about a quarter of it each week with new water within 2 to 3°C of the tank, as poor water causes shell and skin infections."
      ],
      "daily_checks": [
       "Water clean and warm",
       "Basking spot working",
       "Alert and swimming",
       "Leftovers removed"
      ],
      "log_days": 7,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 8,
       "stage": "Hatchling",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Feeds itself in water; no measured amount is given.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Alert and healthy, with no injuries",
        "Swims normally and dives to the bottom",
        "The weather forecast is warm enough"
       ],
       "target_weight": "",
       "how": [
        "Release it only when the forecast is 20°C or more for three days running; if that is not until spring, keep it in care at its preferred temperature until then, as a turtle in care must never be left to go into brumation.",
        "Carry it out of water on a damp towel in a lidded tub, as turtles can tire and drown in water during transport.",
        "Release it in the warmest part of the day at the edge of shallow water with plants and cover, and let it walk in."
       ],
       "where": "Release it at the water nearest to where it was found (recorded with GPS coordinates or a Melways reference), within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Swollen or closed eyes",
        "Soft, flaky or discoloured patches on the shell or skin",
        "Floating lopsided or unable to dive",
        "Not active after warming up"
       ],
       "urgent": [
        "Limp, not moving or not responding after warming: give nothing by mouth on the way",
        "Bleeding, or a cracked shell",
        "Bubbles from the nose or open-mouth breathing",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "turtle",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-authorisation-guide-first-aid"
      ]
     }
    },
    {
     "id": "lib-turtle-adult",
     "stage": "Adult",
     "weight": "about 1 kg",
     "text": "Ready-made plan: an adult common (eastern) long-necked turtle, about 1 kg, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a turtle like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult common long-necked turtle",
      "case_number": "",
      "species": "Common (eastern) long-necked turtle (Chelodina longicollis)",
      "kind": "wildlife",
      "summary": "This adult common long-necked turtle, about 1 kg, is recovering in care with no injuries needing treatment. The goal is to keep it warm, clean and eating, check it swims and dives normally, and return it to where it was found as soon as the weather allows.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Let it settle in its tank and warm up before offering food."
        ]
       },
       {
        "when": "Once eating and swimming normally",
        "tasks": [
         "Check the weather forecast for its release."
        ]
       }
      ],
      "housing": [
       "Keep it in a tank with clean, filtered water deep enough to swim and dive, plus a dry basking area it can climb onto easily.",
       "Keep the air and water at about 20 to 26°C, with a warm basking spot of 26 to 30°C under a lamp and a UV light on a 12-hour cycle about 30 cm above it.",
       "Keep it on its own, away from pet reptiles, with its own equipment.",
       "Assume it carries salmonella: wash your hands with soap after touching it, its water or its equipment, keep its gear separate from the kitchen, and keep young children away from it."
      ],
      "feeding": [
       "Feed in the water, as turtles only eat in water: small whole fish, yabbies, earthworms, insects and pieces of fish, as long-necked turtles hunt small animals.",
       "Give a portion about the size of its head every day or two, and remove leftovers within 12 hours.",
       "Warm it to its preferred temperature before offering food, as cold turtles cannot digest it; many wild turtles refuse food at first, so tell the vet if it has not eaten after a week."
      ],
      "activity": [
       "Hold it by the front and back of the shell, away from its head, never upside down or by the neck; it may release a strong musky smell, which is normal."
      ],
      "care": [
       "Check the water weekly (pH about 7, ammonia below 0.02 ppm, nitrite below 0.1 ppm, nitrate below 50 ppm) and change about a quarter of it each week with new water within 2 to 3°C of the tank, as poor water causes shell and skin infections.",
       "Keep its record up to date with weights, food eaten and progress, as your authorisation requires."
      ],
      "daily_checks": [
       "Water clean and warm",
       "Basking spot working",
       "Food eaten recorded",
       "Leftovers removed",
       "Swimming and diving"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 1000,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself in water; no measured amount is given.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully recovered and at a healthy weight",
        "Swims normally and dives to the bottom",
        "Forages and eats on its own",
        "The weather forecast is warm enough"
       ],
       "target_weight": "About 1 kg, holding at or above its arrival weight",
       "how": [
        "Release it only when the forecast is 20°C or more for three days running; if that is not until spring, keep it in care at its preferred temperature until then, as a turtle in care must never be left to go into brumation.",
        "Carry it out of water on a damp towel in a lidded tub, as turtles can tire and drown in water during transport.",
        "Release it in the warmest part of the day at the edge of the water and let it walk in."
       ],
       "where": "Release it where it was found, at the same wetland or waterway (recorded with GPS coordinates or a Melways reference), as soon as possible; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating after a week at the right temperature",
        "Swollen or closed eyes",
        "Soft, flaky, smelly or discoloured patches on the shell or skin",
        "Floating lopsided or unable to dive"
       ],
       "urgent": [
        "Limp, not moving or not responding after warming: give nothing by mouth on the way",
        "Bleeding, or a cracked shell",
        "Bubbles from the nose or open-mouth breathing",
        "Fishing line or a hook from its mouth: leave 20 to 30 cm of line hanging, never pull it, and go to a vet"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "turtle",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-authorisation-guide-first-aid"
      ]
     }
    }
   ]
  },
  {
   "id": "boobook",
   "name": "Southern boobook",
   "plans": [
    {
     "id": "lib-boobook-owlet",
     "stage": "Owlet",
     "weight": "about 180 g",
     "text": "Ready-made plan: an orphaned southern boobook owlet, about 180 g, downy with feathers coming through, not yet flying. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a owlet like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned southern boobook owlet",
      "case_number": "",
      "species": "Southern boobook (Ninox boobook)",
      "kind": "wildlife",
      "summary": "This orphaned southern boobook owlet, about 180 g, is downy with feathers coming through and not yet flying, and is healthy. The goal is to raise it on whole prey with as little human contact as possible, ideally alongside other owlets, and release it at dusk where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "First 2 to 3 days",
        "tasks": [
         "Feed prey finely chopped with bones, fur and feathers removed, with a calcium supplement."
        ]
       },
       {
        "when": "About days 4 to 14",
        "tasks": [
         "Include the bones in its food, chopped less finely as it grows, and stop the calcium.",
         "Move it to a larger enclosure with low branches once it starts climbing out of the nest."
        ]
       },
       {
        "when": "About weeks 3 to 6 (flying)",
        "tasks": [
         "Move it to a large outdoor flight aviary with branches and cover.",
         "Start giving whole mice and live insects at night so it learns to catch and tear its own food."
        ]
       }
      ],
      "housing": [
       "Keep it in a nest box or deep container lined with a towel, in a dim, quiet room at the temperature the app shows for its stage, with room to move away from the heat; owls get agitated if kept too warm.",
       "Keep it in a separate air space from pet birds and other wildlife, with its own equipment.",
       "Clean out droppings and leftover food every morning.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild birds can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed a mixed diet of whole prey (mice, rats, day-old chicks and rabbit), finely chopped or minced at first, plus insects such as crickets and moths, as boobooks eat insects and small mammals and birds.",
       "Give the amount in the feed calculator each day, split across the feeds, weighing it before and after feeds.",
       "Give 4 feeds a day, about 6 am, 12 pm, 6 pm and 10 pm, moving more of its food to the evening as it grows, as owls feed at night.",
       "Offer pieces from blunt tweezers held low in front of it, letting it take each one; never force-feed an owlet that is not interested, but tell the vet if it refuses food.",
       "Thaw frozen prey fully in the fridge, use it the same day, never refreeze thawed food, and throw out leftovers.",
       "Owlets get most of their fluid from food; once it feeds itself, keep a shallow dish of fresh water in the enclosure, changed daily."
      ],
      "activity": [
       "Keep contact to a minimum and do not talk to it, as owlets imprint on people easily; raise it with other owlets through an experienced raptor carer if possible.",
       "Hold it with a towel over its body and its feet held firmly, as even young owls grip hard with their talons."
      ],
      "care": [
       "Weigh it every morning before the first feed and enter the weight so the feed calculator stays right."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Food eaten",
       "Pellets and droppings normal",
       "Nest clean",
       "Feathers growing"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Chopped whole prey (mice, chicks, rat)",
       "weight_g": 180,
       "stage": "Downy owlet with feathers coming through",
       "percent_body_weight_per_day": 18,
       "feeds_per_day": 4,
       "basis": "Wombaroo tawny frogmouth chart as the nearest guide: about 30 to 35 g a day at 160 to 200 g. No boobook chart given.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Catches and eats whole prey and live insects on its own and holds its weight",
        "Flies strongly and silently the length of the aviary",
        "Full, healthy feathers and needing no more care",
        "Wary of people"
       ],
       "target_weight": "About 250 g for a southern boobook",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Release it at dusk, never during the day, and never in rain, strong wind or extreme heat or cold.",
        "Carry it in a lined, ventilated box and place it on a branch in a tree at the release site, then leave quietly."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Refuses food, or weight drops two days running",
        "No pellets or droppings, or watery droppings",
        "Weak or bent legs",
        "Discharge from the eyes or nostrils"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Struggling to breathe or open-mouth breathing",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "frogmouth-owl",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-boobook-adult",
     "stage": "Adult",
     "weight": "about 250 g",
     "text": "Ready-made plan: an adult southern boobook, about 250 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a owl like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult southern boobook",
      "case_number": "",
      "species": "Southern boobook (Ninox boobook)",
      "kind": "wildlife",
      "summary": "This adult southern boobook, about 250 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating at night, rebuild its flying fitness and return it at dusk to where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a dim, covered hospital box with a low perch while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating well on its own",
        "tasks": [
         "Move it to a flight aviary with perches at different heights and cover, to rebuild flying fitness.",
         "Give whole mice and live insects so it practises catching and tearing its own food."
        ]
       }
      ],
      "housing": [
       "Keep it on its own in a quiet, dimly lit, covered enclosure with a sturdy branch to roost on by day, at the temperature the app shows for owls, avoiding extra heat, as owls get agitated if kept too warm.",
       "Keep it in a separate air space from pet birds and other wildlife, with its own dishes and cleaning gear.",
       "Clean out pellets, droppings and leftover food every morning.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild birds can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed whole prey such as mice and day-old chicks, plus live insects such as crickets and moths, as boobooks eat insects and small mammals and birds.",
       "The guidance gives no set amount for boobooks, so offer a little more than it clears each night, and weigh the food offered and left over so you know what it ate.",
       "Give the food in the evening after dusk, on a low platform or in a shallow dish it can reach, as owls feed at night.",
       "Thaw frozen prey fully in the fridge, use it the same day, never refreeze thawed food, and remove leftovers next morning.",
       "Keep fresh water in a shallow dish at all times and change it daily."
      ],
      "activity": [
       "Handle it as little as possible, with a towel over its body and its feet held firmly, as owls grip hard with their talons; do not try to tame it.",
       "Keep pets, children and noise well away from its enclosure."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Food eaten recorded",
       "Fresh water given",
       "Perching steadily",
       "Pellets and droppings normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 250,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself on whole prey and insects; no measured amount is given for boobooks.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Flies strongly and silently and lands steadily on a perch",
        "Catches and eats prey on its own and holds its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 250 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Release it at dusk, never during the day, and never in rain, strong wind or extreme heat or cold.",
        "Carry it in a lined, ventilated box and place it on a branch in a tree at the release site, then leave quietly."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating on its own, or losing weight two days running",
        "No pellets, or watery droppings",
        "Discharge from the eyes or nostrils",
        "Not flying properly once in the flight aviary"
       ],
       "urgent": [
        "Fluffed up, cold or collapsed, or cannot hold its head up: give nothing by mouth on the way",
        "Open-mouth breathing, gasping or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "frogmouth-owl",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "blackwallaby",
   "name": "Black wallaby",
   "plans": [
    {
     "id": "lib-blackwallaby-unfurred",
     "stage": "Unfurred joey",
     "weight": "about 250 g",
     "text": "Ready-made plan: an orphaned black (swamp) wallaby joey, about 250 g, unfurred with eyes open and ears up. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned black wallaby joey",
      "case_number": "",
      "species": "Black wallaby, also called swamp wallaby (Wallabia bicolor)",
      "kind": "wildlife",
      "summary": "This orphaned black (swamp) wallaby joey, about 250 g, is unfurred with its eyes open and ears up, and is healthy. The goal is to raise it through pouch life and weaning with other young swamp wallabies, then release it fit and wild where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 2",
        "tasks": [
         "Join it with other swamp wallaby joeys of a similar age through an experienced macropod carer, so they are raised and released together.",
         "Give Impact Colostrum Supplement in its milk this first week."
        ]
       },
       {
        "when": "About week 5 (around 160 days old, about 450 g, fur coming through)",
        "tasks": [
         "Change over to Kangaroo Milk Replacer 0.6 bit by bit over 10 to 20 days, keeping the total amount the same, and drop to 5 feeds a day.",
         "Start offering fresh grass with roots and soil in the pouch."
        ]
       },
       {
        "when": "About week 9 (around 190 days old, about 820 g)",
        "tasks": [
         "Change over to Kangaroo Milk Replacer >0.7 bit by bit over 10 to 20 days, and drop to 4 feeds a day."
        ]
       },
       {
        "when": "About weeks 14 to 25 (220 to 260 days old)",
        "tasks": [
         "Drop to 3 feeds a day as it starts toileting itself and leaves the pouch, and move it to a grassy outdoor enclosure with its group."
        ]
       }
      ],
      "housing": [
       "Keep it in a fabric pouch inside a heated box at the temperature the app shows for its stage (about 32°C now), in a warm, dark, quiet place away from pets, noise and smells, with the heat source never touching it.",
       "Line the pouch with soft cotton liners and change them whenever soiled, so its skin stays clean and dry.",
       "Wash your hands before and after every feed and clean-up, wear gloves and a mask when handling droppings, and disinfect bottles and equipment, as wallabies can carry Q fever, salmonella and ringworm without looking sick; Q fever and tetanus vaccination give carers the best protection."
      ],
      "feeding": [
       "Feed Wombaroo Kangaroo Milk Replacer 0.4, a low-lactose milk made for kangaroos and wallabies; never cow’s milk, which gives joeys diarrhoea.",
       "Give the amount in the feed calculator each day, split evenly across the feeds; the swamp wallaby chart rises from about 24 mL a day at 145 g to about 50 mL a day at 370 g.",
       "Give 6 feeds a day, about every 4 hours from 6 am to 10 pm.",
       "Feed it in its pouch, letting it suck at its own pace through a small teat with a hole of about 1 mm so the milk drips slowly, and stop if milk comes out of its nose.",
       "Mix 18 g of powder (2½ scoops) with 90 mL of pre-boiled water at about 50°C to make 100 mL, in sterilised bottles; warm it to about 30°C, keep made-up milk in the fridge no more than a day (or frozen up to 2 weeks, never refrozen) and throw out leftovers.",
       "After every feed, gently wipe its bottom and genitals with a warm damp cloth until it wees and poos, as it cannot go on its own yet.",
       "It needs no extra water while in the pouch on milk; if it seems dehydrated, give water between feeds, never mixed into the milk."
      ],
      "activity": [
       "Handle it gently and briefly, and if it calls out, breathes fast, pants or grinds its teeth, stop and let it settle in its pouch, as stress lowers a joey’s resistance to disease.",
       "Keep it away from pets and visitors and avoid making a pet of it, so it stays wary of people and dogs."
      ],
      "care": [
       "Weigh it every morning before the first feed and enter the weight so the feed calculator stays right.",
       "Its age is estimated from its size and fur; if it seems younger or older than this plan assumes, check its milk stage with your vet or an experienced macropod carer."
      ],
      "daily_checks": [
       "Weigh before morning feed",
       "All milk feeds taken",
       "Toileted after each feed",
       "Pouch liners clean",
       "Warm and settled"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Kangaroo Milk Replacer 0.4",
       "weight_g": 250,
       "stage": "Age Factor 0.4, about 120 to 130 days, unfurred",
       "percent_body_weight_per_day": 14.4,
       "feeds_per_day": 6,
       "basis": "Worked out from DEECA Table 6.11 for swamp wallabies (about 36 mL a day at 250 g); the percentage falls as it grows.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned and off the bottle for at least a month",
        "Weighs at least about 8 kg",
        "Healthy, moving well and browsing on its own",
        "Wary of people and dogs and keeps with its group"
       ],
       "target_weight": "About 8 kg at the earliest for a black wallaby",
       "how": [
        "Release it within 24 hours of being ready, together with the group it was raised with.",
        "Choose mild weather and the time of day wallabies are normally out feeding, avoiding heat and storms.",
        "Move it calmly in a covered, well-ventilated crate with its head covered, keeping the trip short."
       ],
       "where": "Release it where it was found (record that spot with GPS coordinates), or if that is unsuitable, at the closest suitable spot within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Diarrhoea, or droppings runny for more than a day.",
        "Refusing feeds, or losing weight two days running.",
        "Patches of hair loss, crusty or scaly skin.",
        "Not gaining weight for three days."
       ],
       "urgent": [
        "Cold, floppy or unable to hold its head up: give nothing by mouth on the way to the vet.",
        "Coughing, noisy breathing or milk coming from the nose after a feed.",
        "Stiff, wobbly or weak after a fright, chase or handling (possible capture myopathy).",
        "Bloated, hard belly or straining."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "macropod",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wombaroo-marsupial-milk-how-to-feed",
       "wires-kangaroos-and-wallabies",
       "wires-extreme-heat-factsheet"
      ]
     }
    },
    {
     "id": "lib-blackwallaby-furred",
     "stage": "Furred pouch joey",
     "weight": "about 1.5 kg",
     "text": "Ready-made plan: an orphaned black (swamp) wallaby joey, about 1.5 kg, fully furred, spending most of its time in the pouch and drinking milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned black wallaby joey",
      "case_number": "",
      "species": "Black wallaby, also called swamp wallaby (Wallabia bicolor)",
      "kind": "wildlife",
      "summary": "This orphaned black (swamp) wallaby joey, about 1.5 kg, is fully furred and still spends most of its time in the pouch drinking milk, and is healthy. The goal is to raise it through the rest of pouch life and weaning with other young swamp wallabies, then release it fit and wild.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 2",
        "tasks": [
         "Join it with other swamp wallaby joeys of a similar age through an experienced macropod carer, so they are raised and released together."
        ]
       },
       {
        "when": "About weeks 3 to 6 (around 240 to 260 days old, out of the pouch more)",
        "tasks": [
         "Drop to 3 milk feeds a day and move it with its group to a large, secure outdoor enclosure with dense cover and shade."
        ]
       },
       {
        "when": "About weeks 7 to 17 (around 270 to 340 days old)",
        "tasks": [
         "Wean it: lower the milk bit by bit, going to 1 to 2 feeds a day and giving the last bottle at about 340 days old.",
         "Give no bottles at all in the month between weaning and release."
        ]
       }
      ],
      "housing": [
       "Keep it in a fabric pouch hung in a quiet, dark spot, at the temperature the app shows for this stage, away from pets, noise and smells.",
       "Line the pouch with soft cotton liners and change them whenever soiled.",
       "Give it a safe area with leafy cover to hop and explore for longer each day as it leaves the pouch more, with the pouch hung where it can climb back in.",
       "Wash your hands before and after every feed and clean-up, wear gloves and a mask when handling droppings, and disinfect bottles and equipment, as wallabies can carry Q fever, salmonella and ringworm without looking sick; Q fever and tetanus vaccination give carers the best protection."
      ],
      "feeding": [
       "Feed Wombaroo Kangaroo Milk Replacer >0.7, a low-lactose milk made for kangaroos and wallabies; never cow’s milk, which gives joeys diarrhoea.",
       "Give the amount in the feed calculator each day, split evenly across the feeds; the swamp wallaby chart rises from about 65 mL a day at 820 g to about 145 mL a day at 2.35 kg.",
       "Give 4 feeds a day, about 6 am, 11 am, 4 pm and 9 pm.",
       "Feed it in or just out of its pouch, letting it suck at its own pace through a teat with a hole of about 1 mm so the milk drips slowly, and stop if milk comes out of its nose.",
       "Mix 25 g of powder (3½ scoops) with 80 mL of pre-boiled water at about 50°C to make 100 mL, in sterilised bottles; warm it to about 30°C, keep made-up milk in the fridge no more than a day (or frozen up to 2 weeks, never refrozen) and throw out leftovers.",
       "If it does not wee and poo by itself after a feed, gently wipe its bottom with a warm damp cloth until it goes; swamp wallabies usually start toileting on their own at about this size.",
       "Put out a shallow dish of fresh water, changed every day, for it to lap when it is out of the pouch.",
       "Swamp wallabies are browsers, so offer fresh native browse, grass with roots and soil, hay and macropod pellets such as Wombaroo Kangaroo Pellets every day; never cattle or sheep pellets, which can contain coccidiostats that are fatal to wallabies, and no seed mixes, short chaff or bread, as sharp pieces injure the gums and lead to lumpy jaw."
      ],
      "activity": [
       "Handle it gently and briefly, and if it calls out, breathes fast, pants or grinds its teeth, stop and let it settle in its pouch, as stress lowers a joey’s resistance to disease.",
       "Lift it out of the pouch by easing it out back first, never by its tail or legs alone.",
       "Keep it away from pets and visitors and avoid making a pet of it, so it stays wary of people and dogs."
      ],
      "care": [
       "Never chase it, tie its legs or hold it down to catch it, especially on hot days, as stress and struggling can bring on capture myopathy, which can kill.",
       "Weigh it every morning before the first feed and enter the weight so the feed calculator stays right."
      ],
      "daily_checks": [
       "Weigh before morning feed",
       "All milk feeds taken",
       "Droppings soft to firm",
       "Pouch liners clean",
       "Bright and hopping well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Kangaroo Milk Replacer >0.7",
       "weight_g": 1500,
       "stage": "Age Factor >0.7, about 220 days, fully furred",
       "percent_body_weight_per_day": 6.7,
       "feeds_per_day": 4,
       "basis": "Worked out from DEECA Table 6.11 for swamp wallabies (about 100 mL a day at 1.5 kg); the percentage falls as it grows.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned and off the bottle for at least a month",
        "Weighs at least about 8 kg",
        "Healthy, moving well and browsing on its own",
        "Wary of people and dogs and keeps with its group"
       ],
       "target_weight": "About 8 kg at the earliest for a black wallaby",
       "how": [
        "Release it within 24 hours of being ready, together with the group it was raised with.",
        "Choose mild weather and the time of day wallabies are normally out feeding, avoiding heat and storms.",
        "Move it calmly in a covered, well-ventilated crate with its head covered, keeping the trip short.",
        "If a vet sedates it for the trip, stay and watch until it is fully awake, to protect it from predators."
       ],
       "where": "Release it where it was found (record that spot with GPS coordinates), or if that is unsuitable, at the closest suitable spot within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Diarrhoea, or droppings runny for more than a day.",
        "Refusing feeds, or losing weight two days running.",
        "Patches of hair loss, crusty or scaly skin.",
        "Cloudy eyes."
       ],
       "urgent": [
        "Cold, floppy or unable to hold its head up: give nothing by mouth on the way to the vet.",
        "Coughing, noisy breathing or milk coming from the nose after a feed.",
        "Stiff, wobbly or weak after a fright, chase or handling (possible capture myopathy).",
        "Drooling, panting or lying down and slow to get up on a hot day (heat stress)."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "macropod",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wombaroo-marsupial-milk-how-to-feed",
       "wires-kangaroos-and-wallabies",
       "wires-extreme-heat-factsheet"
      ]
     }
    },
    {
     "id": "lib-blackwallaby-atfoot",
     "stage": "Young at foot",
     "weight": "about 6 kg",
     "text": "Ready-made plan: a young-at-foot black (swamp) wallaby, about 6 kg, browsing and being weaned off milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a wallaby like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Young black wallaby",
      "case_number": "",
      "species": "Black wallaby, also called swamp wallaby (Wallabia bicolor)",
      "kind": "wildlife",
      "summary": "This young-at-foot black (swamp) wallaby, about 6 kg, is browsing and being weaned off milk, and is healthy. The goal is to finish weaning it with its group in a large outdoor enclosure and release it fit and wild once it reaches release weight.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Now to about week 4",
        "tasks": [
         "Keep lowering the milk bit by bit, going to 1 feed a day, as it eats more browse and grass."
        ]
       },
       {
        "when": "About weeks 4 to 6 (around 340 days old)",
        "tasks": [
         "Give the last bottle, and give no bottles at all in the month between weaning and release."
        ]
       },
       {
        "when": "Last month before release",
        "tasks": [
         "Keep people contact to the minimum needed for its care, so it is wary of people when released."
        ]
       }
      ],
      "housing": [
       "Keep it with its group in a large, secure outdoor enclosure with grass, dense shrubby cover and shade, and a sheltered spot out of wind and rain.",
       "Make the fences high and solid enough that it cannot jump out or see dogs through them, as a fright can bring on capture myopathy.",
       "Clean up droppings and old food every day and keep the area free of sharp objects.",
       "Wash your hands before and after every feed and clean-up, wear gloves and a mask when handling droppings, and disinfect bottles and equipment, as wallabies can carry Q fever, salmonella and ringworm without looking sick; Q fever and tetanus vaccination give carers the best protection."
      ],
      "feeding": [
       "Feed a natural browser’s diet: plenty of fresh native browse, grass with roots and soil, hay and macropod pellets such as Wombaroo Kangaroo Pellets; never cattle or sheep pellets, which can contain coccidiostats that are fatal to wallabies, and no seed mixes, short chaff or bread, as sharp pieces injure the gums and lead to lumpy jaw.",
       "Give the amount of Kangaroo Milk Replacer >0.7 in the feed calculator, as 1 to 2 feeds a day, lowering it steadily; the swamp wallaby chart falls from about 125 mL a day at 270 days to 30 mL at 320 days, with none by 340 days.",
       "Give the milk from a bottle with a teat, letting it drink at its own pace, and stop if milk comes out of its nose.",
       "Mix 25 g of powder (3½ scoops) with 80 mL of pre-boiled water at about 50°C to make 100 mL, warm it to about 30°C and throw out leftovers.",
       "Keep fresh water in a heavy, shallow dish it cannot tip over, changed every day."
      ],
      "activity": [
       "Handle it only when needed, quietly and briefly, and never chase it, tie its legs or hold it down, especially on hot days, as stress and struggling can bring on capture myopathy, which can kill.",
       "Keep pets and visitors away from its enclosure, so it stays wary of people and dogs."
      ],
      "care": [
       "Weigh it once a week, by walking it calmly onto scales or into a weighing bag, and record its weight and progress."
      ],
      "daily_checks": [
       "Browse and grass eaten",
       "Milk feed taken",
       "Water dish full",
       "Droppings firm pellets",
       "Moving and grazing well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Kangaroo Milk Replacer >0.7",
       "weight_g": 6000,
       "stage": "Weaning, about 290 to 300 days",
       "percent_body_weight_per_day": 1.5,
       "feeds_per_day": 2,
       "basis": "Worked out from DEECA Table 6.11 for swamp wallabies (about 90 mL a day partway through weaning); it falls to none by 340 days.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned and off the bottle for at least a month",
        "Weighs at least about 8 kg",
        "Healthy, moving well and browsing on its own",
        "Wary of people and dogs and keeps with its group"
       ],
       "target_weight": "About 8 kg at the earliest for a black wallaby",
       "how": [
        "Release it within 24 hours of being ready, together with the group it was raised with.",
        "Choose mild weather and the time of day wallabies are normally out feeding, avoiding heat and storms.",
        "Move it calmly in a covered, well-ventilated crate with its head covered, keeping the trip short.",
        "If a vet sedates it for the trip, stay and watch until it is fully awake, to protect it from predators."
       ],
       "where": "Release it where it was found (record that spot with GPS coordinates), or if that is unsuitable, at the closest suitable spot within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Diarrhoea, or soft droppings for more than a day.",
        "Losing weight, or not eating browse and grass.",
        "A lump or swelling on the jaw, or drooling while eating (possible lumpy jaw).",
        "Patches of hair loss, crusty or scaly skin."
       ],
       "urgent": [
        "Weak, wobbly or lying down and slow to get up.",
        "Stiff, wobbly or weak after a fright, chase or handling (possible capture myopathy).",
        "Drooling, panting or lying down on a hot day (heat stress).",
        "Caught by a dog or hurt jumping the fence: a vet the same day."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "macropod",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wombaroo-marsupial-milk-how-to-feed",
       "wires-kangaroos-and-wallabies",
       "wires-extreme-heat-factsheet"
      ]
     }
    }
   ]
  },
  {
   "id": "galah",
   "name": "Galah",
   "plans": [
    {
     "id": "lib-galah-nestling",
     "stage": "Nestling",
     "weight": "about 150 g",
     "text": "Ready-made plan: an orphaned galah nestling, about 150 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned galah nestling",
      "case_number": "",
      "species": "Galah (Eolophus roseicapilla)",
      "kind": "wildlife",
      "summary": "This orphaned galah nestling, about 150 g with pin feathers coming through, is healthy and ready to be hand-reared. The goal is to raise it to a strong, wild, seed-eating young galah and release it with a local flock where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "About weeks 1 to 3",
        "tasks": [
         "Thicken the formula step by step as its pin feathers open, dropping to 3 to 4 feeds a day."
        ]
       },
       {
        "when": "About weeks 4 to 6 (fully feathered)",
        "tasks": [
         "Move it to a cage with low perches and start offering soaked seed and soft food in a dish.",
         "Drop to 1 to 2 hand-feeds a day as it eats more on its own."
        ]
       },
       {
        "when": "About weeks 7 to 9",
        "tasks": [
         "Stop hand-feeding once it eats seed on its own and holds its weight; galahs are usually weaned by about 12 weeks old.",
         "Move it to an outdoor flight aviary to build flying fitness, ideally with other young galahs."
        ]
       }
      ],
      "housing": [
       "Keep it in a small container lined with paper towel, like a nest, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat; lower the heat bit by bit as its feathers cover its body.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the lining whenever it is soiled and clean up droppings after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Feed Passwell Hand Rearing Food or Wombaroo Granivore Rearing Mix, the hand-rearing formula for parrots, mixed at 1 g of powder to 3 mL of water while it is in pin feathers, then thicker (1 g to 2.5 mL, then 1 g to 2 mL) as its feathers open.",
       "Give the amount in the feed calculator each day, split evenly across the feeds, which is up to about 10% of its body weight at each feed, stopping when the crop is comfortably full. The Wombaroo guide for galahs peaks at about three 24 mL feeds a day at 4 weeks old, falling to one 20 mL feed a day at 10 weeks.",
       "Give 5 feeds a day, about 6 am, 10 am, 2 pm, 6 pm and 10 pm, then leave it about 6 hours overnight so the crop empties fully at least once a day.",
       "Feed it from a small spoon with the sides bent up, letting it pump and swallow at its own pace, and stop if food comes out of its nostrils; never squirt food into its open beak with a syringe, as it can inhale it.",
       "Mix each feed fresh with pre-boiled water at about 50°C, let it stand 2 minutes, feed it at 38 to 40°C (test it on your wrist) and throw out what is left.",
       "Wipe its beak and face clean with a warm damp cloth after each feed so formula does not dry on its feathers.",
       "It gets its fluid from the formula, so it needs no water dish until it starts eating on its own.",
       "Once it is fully feathered, offer soaked or sprouted small parrot seed, defrosted peas and corn mixed with Parrot Soft Food, and natural foods such as seeding grasses, gum nuts and sheoak cones in a shallow dish, and cut back hand-feeds as it eats more by itself."
      ],
      "activity": [
       "Handle it only for feeds, weighing and cleaning, quickly and gently, and do not talk to it or let visitors see it, as young galahs tame very easily.",
       "If another young galah is in care with an experienced bird carer, raising them together helps it grow up knowing its own kind.",
       "From the aviary stage, give it seeding grasses, branches and grass sods to forage and chew."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Keep a daily record of its weight, feeds and progress; your authorisation requires records to be kept for 3 years."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Crop empty overnight",
       "Droppings look normal",
       "Nest clean and warm",
       "Feathers growing well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Passwell Hand Rearing Food or Granivore Rearing Mix",
       "weight_g": 150,
       "stage": "Nestling in pin feathers (eyes open)",
       "percent_body_weight_per_day": 50,
       "feeds_per_day": 5,
       "basis": "Wombaroo parrot hand-rearing table: up to 10% of body weight a feed, 5 feeds a day at pin-feather stage.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Eats seed and natural foods on its own and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy feathers with no signs of feather or beak disease",
        "Wary of people"
       ],
       "target_weight": "About 300 g for a galah",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Galahs live in flocks, so release it where local galahs are feeding, with any galahs it was raised with."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Crop still full in the morning, or slow to empty between feeds",
        "Weight drops, or stays the same for two days",
        "Watery or oddly coloured droppings for more than a day",
        "Feathers that look pinched, curled or bloody, or a beak that looks overgrown, which can mean beak and feather disease"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Formula bubbling from its nostrils, or struggling to breathe",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-galah-adult",
     "stage": "Adult",
     "weight": "about 330 g",
     "text": "Ready-made plan: an adult galah, about 330 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a galah like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult galah",
      "case_number": "",
      "species": "Galah (Eolophus roseicapilla)",
      "kind": "wildlife",
      "summary": "This adult galah, about 330 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating well, rebuild its flying fitness and return it to its flock where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a covered hospital cage while it settles."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to an outdoor flight aviary to rebuild flying fitness."
        ]
       }
      ],
      "housing": [
       "Keep it in a sturdy covered cage with natural branch perches, in a quiet, dim room at the temperature the app shows for adult birds.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Use an aviary with weathered or vinegar-washed wire, as new galvanised wire can poison parrots with zinc. Clean the floor and dishes daily.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Offer budgie or small parrot seed mix (not one heavy in sunflower or other oily seed) with natural foods such as seeding grasses and grass sods with roots, plus defrosted peas and corn mixed with Parrot Soft Food; never avocado, bread or dairy.",
       "Keep the seed dish topped up and weigh what is left each morning, so you know how much it eats.",
       "Galahs feed on the ground, so put the food in shallow dishes on the floor.",
       "Keep fresh water in a shallow dish at all times and change it every day.",
       "Once in the aviary, offer most of its food as seeding grasses and sods so it is foraging for itself before release."
      ],
      "activity": [
       "Handle it as little, as quickly and as gently as possible, wrapped in a towel with your hand behind its head, as galahs bite hard; do not try to tame it.",
       "Give it fresh branches to chew every few days, as galahs need to chew."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Food eaten, dish topped up",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 330,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating seed and natural foods; no measured amount is needed.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands well the length of the aviary",
        "Eating natural foods and holding its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 300 to 330 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it in an open area near trees, and step well back.",
        "Release it where local galahs are, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Not flying properly once in the flight aviary",
        "Feathers that look pinched, curled or bloody, or an overgrown beak, which can mean beak and feather disease"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "wattlebird",
   "name": "Red wattlebird",
   "plans": [
    {
     "id": "lib-wattlebird-nestling",
     "stage": "Nestling",
     "weight": "about 60 g",
     "text": "Ready-made plan: an orphaned red wattlebird nestling, about 60 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned red wattlebird nestling",
      "case_number": "",
      "species": "Red wattlebird (Anthochaera carunculata)",
      "kind": "wildlife",
      "summary": "This orphaned red wattlebird nestling, about 60 g with pin feathers coming through, is healthy and ready to be hand-reared. The goal is to raise it on insects and nectar to a strong, wild young wattlebird and release it where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 7",
        "tasks": [
         "Lower the heat bit by bit as its feathers open and cover its body, staying within the range the app shows for its stage."
        ]
       },
       {
        "when": "About week 2 (climbing out of the nest)",
        "tasks": [
         "Move it to a cage with low perches and start leaving nectar and insects in shallow dishes.",
         "Make the feeds less often as it eats more on its own."
        ]
       },
       {
        "when": "About weeks 3 to 4",
        "tasks": [
         "Stop hand-feeding once it feeds itself and holds its weight.",
         "Move it to an outdoor flight aviary with flowering branches to build flying fitness."
        ]
       }
      ],
      "housing": [
       "Sit it in a small artificial nest, such as a container lined with tissue that holds it upright, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the nest lining whenever it is soiled and remove droppings after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed Wombaroo Insectivore Egg Mix (20 g of powder with one mashed hard-boiled egg) with small insects such as small crickets and fly pupae, plus Lorikeet & Honeyeater Food; insects are the main food for growing chicks, and as feathers grow give more nectar and less Egg Mix.",
       "Give the amount in the feed calculator each day, split across the feeds; the Wombaroo red wattlebird chart goes from about 5 g of Egg Mix and 3 mL of nectar a day at 3 days old to about 9 g and 18 mL a day at 2 weeks.",
       "Feed it about every 45 minutes from dawn to dusk while it gapes, with no overnight feeds; the guide gives no set interval for honeyeater chicks, so check the timing with an experienced bird carer.",
       "Place pea-sized pieces of Egg Mix and insects into its gaping beak from blunt tweezers, letting it swallow each one before the next, and offer nectar as a drop at the beak tip from a 1 mL syringe for it to lap, never squirted in, as birds easily inhale it.",
       "Make up Lorikeet & Honeyeater Food exactly as the pack says (30 g, 3 scoops, of powder with 80 mL of warm pre-boiled water makes 100 mL), as too thick dehydrates birds and too thin makes them lose weight; keep made-up food a day in the fridge or 2 weeks frozen, and in hot weather put out fresh food morning and evening, as it spoils quickly.",
       "After each feed, drip a few drops of water slowly at the tip of its beak and let it swallow; it needs no water dish until it feeds itself.",
       "Once it climbs out of the nest, offer nectar, Egg Mix and live insects in shallow dishes, with fresh native flowers, and build live insects up to about half its diet before release."
      ],
      "activity": [
       "Hold it gently with its feet restrained, as wattlebirds have sharp claws.",
       "Handle it only for feeds and weighing, quickly and gently, without talking to it or letting visitors see it, so it does not become tame.",
       "From the aviary stage, hang flowering branches and hide insects in bark and leaf litter so it learns to forage."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Keep a daily record of its weight, food eaten and progress; your authorisation requires records to be kept for 3 years."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Gaping well at feeds",
       "Droppings normal",
       "Nest clean and warm",
       "Feathers growing"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Insectivore Egg Mix and Lorikeet & Honeyeater Food",
       "weight_g": 60,
       "stage": "Nestling in pin feathers (about 10 days old)",
       "percent_body_weight_per_day": 33,
       "feeds_per_day": 18,
       "basis": "Wombaroo red wattlebird chart: about 8 g Egg Mix and 12 mL nectar a day near day 10. Feeds a day not given.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Feeds itself on nectar, flowers and live insects and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy plumage and needing no more care",
        "Wary of people"
       ],
       "target_weight": "About 110 g for a red wattlebird",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near flowering trees and cover, and step well back."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Will not gape or refuses two feeds in a row",
        "Weight drops, or stays the same for two days",
        "Watery or oddly coloured droppings for more than a day",
        "Weak or splayed legs, or curled toes, which can mean a diet problem"
       ],
       "urgent": [
        "Cold, fluffed up, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or food or fluid bubbling from its nostrils",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-wattlebird-adult",
     "stage": "Adult",
     "weight": "about 110 g",
     "text": "Ready-made plan: an adult red wattlebird, about 110 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a wattlebird like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult red wattlebird",
      "case_number": "",
      "species": "Red wattlebird (Anthochaera carunculata)",
      "kind": "wildlife",
      "summary": "This adult red wattlebird, about 110 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and feeding well on nectar and insects, rebuild its flying fitness and return it to where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a covered hospital cage while it settles."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to an outdoor flight aviary with flowering branches to rebuild flying fitness."
        ]
       }
      ],
      "housing": [
       "Keep it in a covered cage with low natural branch perches, in a quiet, dim room at the temperature the app shows for adult birds.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Wipe sticky food off perches and the floor, and clean dishes, every day.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed Lorikeet & Honeyeater Food with fresh native flowers (grevillea, bottlebrush, banksia and eucalypt blossom) and live insects or a little Insectivore Egg Mix; never honey or sugar water, bread or avocado.",
       "Give about 45 mL of made-up Lorikeet & Honeyeater Food and about 2 g of insects or Egg Mix a day for a bird of this size, putting nectar out fresh in the morning and again in the afternoon.",
       "Put the food in shallow dishes fixed near a perch, and hang the flowers where it can reach them.",
       "Make up Lorikeet & Honeyeater Food exactly as the pack says (30 g, 3 scoops, of powder with 80 mL of warm pre-boiled water makes 100 mL), as too thick dehydrates birds and too thin makes them lose weight; keep made-up food a day in the fridge or 2 weeks frozen, and in hot weather put out fresh food morning and evening, as it spoils quickly.",
       "Keep fresh water in a shallow dish at all times and change it every day.",
       "Once in the aviary, give more of its food as flowering branches and live insects so it is foraging for itself before release."
      ],
      "activity": [
       "Hold it gently with its feet restrained, as wattlebirds have sharp claws; handle it as little and as quickly as possible and do not try to tame it.",
       "Keep pets, children and noise well away from its cage."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Nectar eaten, dishes fresh",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 110,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself; the Wombaroo guide gives about 45 mL nectar and 2 g insects or Egg Mix a day for a 110 g red wattlebird.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands well the length of the aviary",
        "Feeding on nectar, flowers and insects and holding its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 110 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near flowering trees, and step well back."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Not flying properly once in the flight aviary",
        "Feather loss or discharge from the eyes or nostrils"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "penguin",
   "name": "Little penguin",
   "plans": [
    {
     "id": "lib-penguin-juvenile",
     "stage": "Underweight juvenile",
     "weight": "about 700 g",
     "text": "Ready-made plan: a juvenile little penguin, about 700 g, underweight but alert, found on a beach. No injuries and no medicines. Write a standard plan another carer can follow for a penguin like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Underweight juvenile little penguin",
      "case_number": "",
      "species": "Little penguin (Eudyptula minor)",
      "kind": "wildlife",
      "summary": "This juvenile little penguin, about 700 g, was found on a beach underweight but alert, with no injuries. Penguins need a facility set up for them, so the goal is to keep it safe and cool and get it quickly to an experienced penguin rehabilitation centre, such as Phillip Island Nature Parks, which takes penguins from across Victoria.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Ring Wildlife Victoria on 03 8400 7300 or the penguin rehabilitation centre to arrange transfer, and check it shows no signs of bird flu before bringing it in."
        ]
       },
       {
        "when": "Until transfer",
        "tasks": [
         "Keep it in a cool, quiet box and give no food or water unless the centre says to."
        ]
       }
      ],
      "housing": [
       "Keep it in a ventilated box lined with a towel, in a dark, quiet room at about 26°C, cooler than for other birds, as penguins overheat easily out of the water.",
       "Keep it apart from pets and other birds, and change the towel whenever it is soiled, as droppings ruin waterproofing.",
       "Bird flu is in wild seabirds along the Victorian coast, so wear disposable gloves (which also keep skin oils off its feathers), a surgical or N95 mask and eye protection when handling it, and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Give no food or water before the rehabilitation centre has checked it, unless they tell you to.",
       "At the centre, little penguins are fed small fish such as pilchards and whitebait, and squid, with a seabird vitamin tablet; an adult eats about 140 to 180 g a day, and thin, growing or sick birds need up to 50% more."
      ],
      "activity": [
       "Handle it as little as possible, gently, holding its body with gloved hands and keeping its beak away from your face, as penguins bite."
      ],
      "care": [
       "Never use oil-based ointments or creams on it; even a thumbnail-sized patch of oil can kill a little penguin, so any oil on it needs the centre straight away.",
       "Anyone who has handled a seabird that might have bird flu should keep away from backyard poultry and pet birds for 48 hours."
      ],
      "daily_checks": [
       "Alert and responsive",
       "Box clean and dry",
       "Cool, not panting",
       "Breathing quiet"
      ],
      "log_days": 2,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 700,
       "stage": "Juvenile, underweight",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Fed by the penguin rehabilitation centre, not before transfer.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "At a healthy weight, as judged by the rehabilitation centre",
        "Waterproof and swimming strongly",
        "Healthy and needing no more care"
       ],
       "target_weight": "About 1 kg or more for a little penguin",
       "how": [
        "The rehabilitation centre decides when it is ready and releases it.",
        "Release is at dusk at the coast, near a penguin colony, in calm weather."
       ],
       "where": "Released by the rehabilitation centre on the coast where it was found (recorded with GPS coordinates or a Melways reference), or the closest suitable stretch of coast near a little penguin colony."
      },
      "escalate": {
       "vet": [
        "Getting weaker, or not standing",
        "Feathers wet, soaked or oily",
        "Discharge from the eyes or nostrils"
       ],
       "urgent": [
        "Collapsed or not responding: give nothing by mouth on the way",
        "Panting or holding its flippers out, which means it is too hot: move it somewhere cooler straight away",
        "Tremors, a twisted neck or poor balance, which can be bird flu: ring the Emergency Animal Disease Watch Hotline on 1800 675 888 straight away",
        "Struggling to breathe"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "penguin",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-waterbirds-marine",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "agvic-report-sick-dead-wild-birds",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "vic-h5n1-guidance-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    },
    {
     "id": "lib-penguin-adult",
     "stage": "Adult",
     "weight": "about 1.1 kg",
     "text": "Ready-made plan: an adult little penguin, about 1.1 kg, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a penguin like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult little penguin",
      "case_number": "",
      "species": "Little penguin (Eudyptula minor)",
      "kind": "wildlife",
      "summary": "This adult little penguin, about 1.1 kg, is recovering in care with no injuries needing treatment. Penguins need a facility set up for them, so the goal is to keep it safe and cool and transfer it to an experienced penguin rehabilitation centre, such as Phillip Island Nature Parks, which returns it to the sea once it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Ring Wildlife Victoria on 03 8400 7300 or the penguin rehabilitation centre to arrange transfer, and check it shows no signs of bird flu before bringing it in."
        ]
       },
       {
        "when": "Until transfer",
        "tasks": [
         "Keep it in a cool, quiet box and give no food or water unless the centre says to."
        ]
       }
      ],
      "housing": [
       "Keep it in a ventilated box lined with a towel, in a dark, quiet room at about 26°C, cooler than for other birds, as penguins overheat easily out of the water.",
       "Keep it apart from pets and other birds, and change the towel whenever it is soiled, as droppings ruin waterproofing.",
       "Bird flu is in wild seabirds along the Victorian coast, so wear disposable gloves (which also keep skin oils off its feathers), a surgical or N95 mask and eye protection when handling it, and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Give no food or water before the rehabilitation centre has checked it, unless they tell you to.",
       "At the centre, little penguins are fed small fish such as pilchards and whitebait, and squid, with a seabird vitamin tablet; an adult eats about 140 to 180 g a day."
      ],
      "activity": [
       "Handle it as little as possible, gently, holding its body with gloved hands and keeping its beak away from your face, as penguins bite."
      ],
      "care": [
       "A moulting penguin looks scruffy and stays ashore for weeks; it is normal and only needs rescue if it is in danger, such as on a busy beach or where dogs run.",
       "Never use oil-based ointments or creams on it; even a thumbnail-sized patch of oil can kill a little penguin, so any oil on it needs the centre straight away."
      ],
      "daily_checks": [
       "Alert and responsive",
       "Box clean and dry",
       "Cool, not panting",
       "Breathing quiet"
      ],
      "log_days": 2,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 1100,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Fed by the penguin rehabilitation centre, not before transfer.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "At a healthy weight, as judged by the rehabilitation centre",
        "Waterproof and swimming strongly",
        "Healthy and needing no more care"
       ],
       "target_weight": "About 1.1 kg, holding at or above its arrival weight",
       "how": [
        "The rehabilitation centre decides when it is ready and releases it.",
        "Release is at dusk at the coast, near a penguin colony, in calm weather."
       ],
       "where": "Released by the rehabilitation centre on the coast where it was found (recorded with GPS coordinates or a Melways reference), close to its colony."
      },
      "escalate": {
       "vet": [
        "Getting weaker, or not standing",
        "Feathers wet, soaked or oily",
        "Discharge from the eyes or nostrils"
       ],
       "urgent": [
        "Collapsed or not responding: give nothing by mouth on the way",
        "Panting or holding its flippers out, which means it is too hot: move it somewhere cooler straight away",
        "Tremors, a twisted neck or poor balance, which can be bird flu: ring the Emergency Animal Disease Watch Hotline on 1800 675 888 straight away",
        "Struggling to breathe"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "penguin",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-waterbirds-marine",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "agvic-report-sick-dead-wild-birds",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "vic-h5n1-guidance-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "kookaburra",
   "name": "Laughing kookaburra",
   "plans": [
    {
     "id": "lib-kookaburra-nestling",
     "stage": "Nestling",
     "weight": "about 200 g",
     "text": "Ready-made plan: an orphaned laughing kookaburra nestling, about 200 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned laughing kookaburra nestling",
      "case_number": "",
      "species": "Laughing kookaburra (Dacelo novaeguineae)",
      "kind": "wildlife",
      "summary": "This orphaned laughing kookaburra nestling, about 200 g with pin feathers coming through, is healthy and ready to be hand-reared. Kookaburra chicks only leave the hollow once they can fly, so the goal is to raise it to a strong, wild, self-feeding young kookaburra and release it where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "About weeks 1 to 2 (to about 4 weeks old)",
        "tasks": [
         "Lower the heat bit by bit as its feathers cover its body."
        ]
       },
       {
        "when": "About week 3 (fledging, around 5 weeks old)",
        "tasks": [
         "Move it to a large cage with perches and start leaving chopped food and insects in a dish."
        ]
       },
       {
        "when": "About weeks 4 to 7",
        "tasks": [
         "Move it to an outdoor flight aviary and give live insects and whole mice so it learns to catch and kill prey.",
         "Stop hand-feeding once it feeds itself and holds its weight; kookaburras are independent at about 10 weeks old."
        ]
       }
      ],
      "housing": [
       "Sit it in a small artificial nest, such as a container lined with tissue that holds it upright, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat; lower the heat bit by bit as its feathers open.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the nest lining whenever it is soiled and remove droppings after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed Wombaroo Insectivore Rearing Mix made up as moist pellets, the rearing food for orphan kookaburras, with chopped mice or pinkie rats, crickets and a few mealworms; cut prey so no sharp bone ends stick out, and add no vitamins or supplements.",
       "Give the amount in the feed calculator each day, split across the feeds; the Wombaroo kookaburra chart gives about 30 g a day at 160 g and 40 g a day at 240 g.",
       "Give about 5 feeds a day, every 3 hours from about 6 am to 6 pm, with no overnight feeds; the guide gives no set interval, so check the timing with an experienced bird carer.",
       "Offer pieces from blunt tweezers into its gaping beak, letting it swallow each one before the next, and never squirt food in with a syringe, as birds easily inhale it.",
       "Thaw frozen prey fully in the fridge, use it the same day, never refreeze thawed food, keep made-up Wombaroo food no more than a day in the fridge (or 2 weeks frozen) and throw out leftovers.",
       "After each feed, drip a few drops of water slowly at the tip of its beak and let it swallow; once it feeds itself, keep a shallow dish of fresh water, changed daily."
      ],
      "activity": [
       "Hold its head gently but firmly when handling it, as kookaburras can injure people with their beak; gaping is a normal threat display.",
       "Handle it only for feeds and weighing, without talking to it or letting visitors see it, so it does not become tame.",
       "If another young kookaburra is in care with an experienced bird carer, raising them together helps it grow up knowing its own kind."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Bringing up a small pellet of fur, bone and insect parts is normal for this bird, not vomiting."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Gaping well at feeds",
       "Droppings normal",
       "Nest clean and warm",
       "Feathers growing"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Insectivore Rearing Mix moist pellets and mice",
       "weight_g": 200,
       "stage": "Nestling in pin feathers (about 2 to 3 weeks old)",
       "percent_body_weight_per_day": 17.5,
       "feeds_per_day": 5,
       "basis": "Wombaroo kookaburra chart: about 30 g a day at 160 g and 40 g a day at 240 g. Feeds a day not given.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Catches and kills live prey and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy plumage and needing no more care",
        "Wary of people"
       ],
       "target_weight": "About 350 g for a laughing kookaburra",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near trees, and step well back."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Will not gape or refuses two feeds in a row",
        "Weight drops, or stays the same for two days",
        "Watery or oddly coloured droppings for more than a day",
        "Weak or bent legs, which can mean a diet problem"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Food bubbling from its nostrils, or struggling to breathe",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "kookaburra",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-kookaburra-adult",
     "stage": "Adult",
     "weight": "about 350 g",
     "text": "Ready-made plan: an adult laughing kookaburra, about 350 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a kookaburra like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult laughing kookaburra",
      "case_number": "",
      "species": "Laughing kookaburra (Dacelo novaeguineae)",
      "kind": "wildlife",
      "summary": "This adult laughing kookaburra, about 350 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating well, rebuild its flying and hunting, and return it to its family group where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a quiet, covered hospital cage with a low perch while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to an outdoor flight aviary and give live insects and whole mice so it is hunting again before release."
        ]
       }
      ],
      "housing": [
       "Keep it in a covered cage with a sturdy natural branch perch, in a quiet, dim room at the temperature the app shows for adult birds.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Clean the floor and dishes every day.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed whole prey such as mice and day-old chicks, cut so no sharp bone ends stick out, with crickets, mealworms and Wombaroo Insectivore Meat Mix (10 g of powder with 20 g of minced meat).",
       "An adult kookaburra of this size needs about 40 g of food a day; weigh what you give and what is left so you know it is eating.",
       "Put the food on a low platform or in a shallow dish it can see from its perch.",
       "Thaw frozen prey fully in the fridge, use it the same day, never refreeze thawed food, keep made-up Wombaroo food no more than a day in the fridge (or 2 weeks frozen) and throw out leftovers.",
       "Keep fresh water in a shallow dish at all times and change it daily."
      ],
      "activity": [
       "Hold its head gently but firmly when handling it, as kookaburras can injure people with their beak; gaping is a normal threat display.",
       "Handle it as little as possible and keep pets, children and noise well away; do not try to tame it."
      ],
      "care": [
       "Bringing up a small pellet of fur, bone and insect parts is normal for this bird, not vomiting.",
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Food eaten recorded",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 350,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself; the Wombaroo guide gives about 40 g a day for a 350 g kookaburra.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands well the length of the aviary",
        "Catches live prey and holds its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 350 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near trees, and step well back.",
        "Kookaburras live in family groups that hold a territory, so release it where it was found, where its family lives."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Not flying properly once in the flight aviary",
        "Discharge from the eyes or nostrils"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "kookaburra",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "silvergull",
   "name": "Silver gull",
   "plans": [
    {
     "id": "lib-silvergull-chick",
     "stage": "Downy chick",
     "weight": "about 100 g",
     "text": "Ready-made plan: an orphaned silver gull chick, about 100 g, covered in down. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a chick like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned silver gull chick",
      "case_number": "",
      "species": "Silver gull (Chroicocephalus novaehollandiae)",
      "kind": "wildlife",
      "summary": "This orphaned silver gull chick, about 100 g, is covered in down and healthy. The goal is to raise it to a strong, waterproof young gull that feeds itself, and release it with other silver gulls where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 7",
        "tasks": [
         "Start dropping food into a shallow dish at each feed so it learns to pick it up itself."
        ]
       },
       {
        "when": "About weeks 2 to 3 (feathers replacing the down)",
        "tasks": [
         "Move it to a larger pen with a shallow pool and switch off the heat once it is feathered.",
         "Stop hand-feeding once it eats from the dish on its own and holds its weight."
        ]
       },
       {
        "when": "About weeks 4 to 6 (flying)",
        "tasks": [
         "Move it to an outdoor aviary with a pool, ideally with other young gulls, to build flight and waterproofing."
        ]
       }
      ],
      "housing": [
       "Keep it in a lined box with a heat source at one end at the temperature the app shows for its stage, so it can move closer or away; panting or holding its wings out means it is too hot.",
       "Use rubber matting or raked sand on the floor, never bare concrete, and change soiled floor material at least three times a day, as droppings ruin waterproofing and cause foot sores.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Bird flu is in wild seabirds and waterbirds along the Victorian coast, so wear disposable gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Feed small pieces of fish such as whitebait and pilchard, with Wombaroo Insectivore Meat Mix (10 g of powder with 20 g of minced fish) and small insects, as silver gulls eat fish, insects and other small animals.",
       "Give the amount in the feed calculator each day, split across the feeds; there is no gull chart, so watch its weight closely.",
       "Give about 5 feeds a day, every 3 hours from about 6 am to 6 pm, with no overnight feeds.",
       "Offer pieces from blunt tweezers held low in front of it, then drop them into a shallow dish so it learns to pick them up; never squirt food into its beak.",
       "Thaw frozen fish in the fridge or under cold running water, never in hot water, use it the same day and throw out leftovers; frozen fish loses vitamin B1, so give a seabird vitamin tablet (such as Vetafarm Sea Bird Tablets) tucked into a fish every day, as a lack causes fits and weakness.",
       "Keep a shallow dish of fresh water it can dip its bill into but not climb into, changed daily; never put it in water while it is downy, as it chills easily."
      ],
      "activity": [
       "Handle it only for weighing and cleaning, quickly and gently, without talking to it or letting visitors see it, so it does not become tame.",
       "If other young silver gulls are in care with an experienced seabird carer, raising them together helps it grow up knowing its own kind."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and delay release."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Eating well",
       "Droppings normal",
       "Floor clean and dry",
       "Warm, not panting"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Fish and Insectivore Meat Mix",
       "weight_g": 100,
       "stage": "Downy chick",
       "percent_body_weight_per_day": 25,
       "feeds_per_day": 5,
       "basis": "Best estimate for a growing gull chick; growing birds need up to 50% more than adults. No gull chart given.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Feeds itself and holds its weight",
        "Flies strongly the length of the aviary",
        "Waterproof, staying dry after swimming",
        "Wary of people"
       ],
       "target_weight": "About 280 g for a silver gull",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Release it where other silver gulls gather, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Refuses food, or loses weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Weak or splayed legs",
        "Wobbly or having small fits, which can mean a lack of vitamin B1"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Tremors, a twisted neck, poor balance or swimming in circles, which can be bird flu: ring the Emergency Animal Disease Watch Hotline on 1800 675 888 straight away",
        "Struggling to breathe",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "seabird",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-waterbirds-marine",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "agvic-report-sick-dead-wild-birds",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "vic-h5n1-guidance-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-silvergull-adult",
     "stage": "Adult",
     "weight": "about 280 g",
     "text": "Ready-made plan: an adult silver gull, about 280 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a gull like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult silver gull",
      "case_number": "",
      "species": "Silver gull (Chroicocephalus novaehollandiae)",
      "kind": "wildlife",
      "summary": "This adult silver gull, about 280 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating, check its flight and waterproofing, and return it to its flock where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a quiet, lined pen while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating well",
        "tasks": [
         "Move it to an outdoor aviary with a pool to rebuild flight and check its waterproofing."
        ]
       }
      ],
      "housing": [
       "Keep it in a quiet, covered pen at the temperature the app shows for adult seabirds, with a shallow pool once it is settled.",
       "Use rubber matting or raked sand on the floor, never bare concrete, and change soiled floor material at least three times a day, as droppings ruin waterproofing and cause foot sores.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Bird flu is in wild seabirds and waterbirds along the Victorian coast, so wear disposable gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Feed whole small fish such as whitebait and pilchards, with Wombaroo Insectivore Meat Mix and insects; never bread or chips, which have little nutrition and can grow mould.",
       "The guidance gives no set amount for gulls, so offer a little more than it clears twice a day, and weigh what you give and what is left.",
       "Put food in a shallow dish or drop it into its pool.",
       "Thaw frozen fish in the fridge or under cold running water, never in hot water, use it the same day and throw out leftovers; frozen fish loses vitamin B1, so give a seabird vitamin tablet (such as Vetafarm Sea Bird Tablets) tucked into a fish every day, as a lack causes fits and weakness.",
       "Keep fresh water available at all times and change it daily."
      ],
      "activity": [
       "Handle it as little as possible, wrapped in a towel with its wings folded and its beak held away from your face."
      ],
      "care": [
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and delay release."
      ],
      "daily_checks": [
       "Food eaten recorded",
       "Fresh water given",
       "Floor changed",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 280,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself; no measured amount is given.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly the length of the aviary",
        "Waterproof, staying dry after swimming",
        "Eating well and holding its weight",
        "Healthy and wary of people"
       ],
       "target_weight": "About 280 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Release it where other silver gulls gather, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Diarrhoea for more than a day",
        "Feathers soaking through when it swims",
        "Limping or sores on its feet"
       ],
       "urgent": [
        "Weak, collapsed or cannot hold its head up: give nothing by mouth on the way",
        "Tremors, a twisted neck, poor balance or swimming in circles, which can be bird flu: ring the Emergency Animal Disease Watch Hotline on 1800 675 888 straight away",
        "Struggling to breathe",
        "Fishing line or a hook from its mouth: never pull it"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "seabird",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-waterbirds-marine",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "agvic-report-sick-dead-wild-birds",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "vic-h5n1-guidance-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "kingparrot",
   "name": "Australian king-parrot",
   "plans": [
    {
     "id": "lib-kingparrot-nestling",
     "stage": "Nestling",
     "weight": "about 120 g",
     "text": "Ready-made plan: an orphaned Australian king-parrot nestling, about 120 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned Australian king-parrot nestling",
      "case_number": "",
      "species": "Australian king-parrot (Alisterus scapularis)",
      "kind": "wildlife",
      "summary": "This orphaned Australian king-parrot nestling, about 120 g with pin feathers coming through, is healthy and ready to be hand-reared. The goal is to raise it to a strong, wild, self-feeding young bird and release it with a local flock where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "About weeks 1 to 2",
        "tasks": [
         "Thicken the formula step by step as its pin feathers open, dropping to 3 to 4 feeds a day."
        ]
       },
       {
        "when": "About weeks 3 to 5 (fully feathered)",
        "tasks": [
         "Move it to a sturdy cage with low perches and start offering soaked seed and soft food in a dish.",
         "Drop to 1 to 2 hand-feeds a day as it eats more on its own."
        ]
       },
       {
        "when": "About weeks 6 to 8",
        "tasks": [
         "Stop hand-feeding once it eats on its own and holds its weight; check the weaning timing with an experienced bird carer, as young king-parrots can be slow to wean.",
         "Move it to an outdoor flight aviary to build flying fitness, ideally with other young king-parrots."
        ]
       }
      ],
      "housing": [
       "Keep it in a small container lined with paper towel, like a nest, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat; lower the heat bit by bit as its feathers cover its body.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the lining whenever it is soiled and clean up droppings after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Feed Passwell Hand Rearing Food or Wombaroo Granivore Rearing Mix, the hand-rearing formula for parrots and cockatoos, mixed at 1 g of powder to 3 mL of water while it is in pin feathers, then thicker (1 g to 2.5 mL, then 1 g to 2 mL) as its feathers open.",
       "Give the amount in the feed calculator each day, split evenly across the feeds, which is up to about 10% of its body weight at each feed, stopping when the crop is comfortably full. An adult king-parrot eats about 20 to 25 g of food a day, so expect it to work up towards that as it weans.",
       "Give 5 feeds a day, about 6 am, 10 am, 2 pm, 6 pm and 10 pm, then leave it about 6 hours overnight so the crop empties fully at least once a day.",
       "Feed it from a small spoon with the sides bent up, letting it pump and swallow at its own pace, and stop if food comes out of its nostrils; never squirt food into its open beak with a syringe, as it can inhale it.",
       "Mix each feed fresh with pre-boiled water at about 50°C, let it stand 2 minutes, feed it at 38 to 40°C (test it on your wrist) and throw out what is left.",
       "Wipe its beak and face clean with a warm damp cloth after each feed so formula does not dry on its feathers.",
       "It gets its fluid from the formula, so it needs no water dish until it starts eating on its own.",
       "Once it is fully feathered, offer soaked or sprouted seed, defrosted peas and corn mixed with Parrot Soft Food, and natural foods such as seeding grasses, eucalypt and acacia seed, native fruits and berries in a shallow dish, and cut back hand-feeds as it eats more by itself."
      ],
      "activity": [
       "Handle it only for feeds, weighing and cleaning, quickly and gently, and do not talk to it or let visitors see it, as young parrots tame very easily.",
       "If another young Australian king-parrot is in care with an experienced bird carer, raising them together helps it grow up knowing its own kind.",
       "From the aviary stage, give it natural foods such as seeding grasses, eucalypt and acacia seed, native fruits and berries and fresh branches to forage and chew."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Keep a daily record of its weight, feeds and progress; your authorisation requires records to be kept for 3 years."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Crop empty overnight",
       "Droppings look normal",
       "Nest clean and warm",
       "Feathers growing well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Passwell Hand Rearing Food or Granivore Rearing Mix",
       "weight_g": 120,
       "stage": "Nestling in pin feathers (eyes open)",
       "percent_body_weight_per_day": 50,
       "feeds_per_day": 5,
       "basis": "Wombaroo parrot hand-rearing table: up to 10% of body weight a feed, 5 feeds a day at pin-feather stage.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Eats seed and natural foods on its own and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy feathers with no signs of feather or beak disease",
        "Wary of people"
       ],
       "target_weight": "About 220 g for an Australian king-parrot",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "King-parrots move in pairs and small groups, so release it where local king-parrots are feeding, with any it was raised with."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Crop still full in the morning, or slow to empty between feeds",
        "Weight drops, or stays the same for two days",
        "Watery or oddly coloured droppings for more than a day",
        "Feathers that look pinched, curled or bloody, or a beak that looks overgrown, which can mean beak and feather disease"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Food bubbling from its nostrils, or struggling to breathe",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-kingparrot-adult",
     "stage": "Adult",
     "weight": "about 220 g",
     "text": "Ready-made plan: an adult Australian king-parrot, about 220 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a king-parrot like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult Australian king-parrot",
      "case_number": "",
      "species": "Australian king-parrot (Alisterus scapularis)",
      "kind": "wildlife",
      "summary": "This adult Australian king-parrot, about 220 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating well, rebuild its flying fitness and return it to its flock where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a covered hospital cage while it settles."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to an outdoor flight aviary to rebuild flying fitness."
        ]
       }
      ],
      "housing": [
       "Keep it in a sturdy covered cage with natural branch perches, in a quiet, dim room at the temperature the app shows for adult birds.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Use an aviary with weathered or vinegar-washed wire, as new galvanised wire can poison parrots with zinc. Clean the floor and dishes daily.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Offer a small parrot seed mix (not one heavy in sunflower or other oily seed) with natural foods such as eucalypt and acacia seed, native fruits and berries and blossom, plus defrosted peas and corn and a little apple; never avocado, bread or dairy.",
       "An adult king-parrot eats about 20 to 25 g of food a day; weigh what you put in and what is left so you know it is eating.",
       "Put the food in shallow dishes on the floor and near a perch, and top it up every morning.",
       "Keep fresh water in a shallow dish at all times and change it every day.",
       "Once in the aviary, offer most of its food as natural seed heads, cones and branches so it is foraging for itself before release."
      ],
      "activity": [
       "Handle it as little, as quickly and as gently as possible, wrapped in a towel, and do not try to tame it.",
       "Give it fresh branches to chew every few days, and keep pets, children and noise well away from its cage."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Food eaten, dish topped up",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 220,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating seed and natural foods; no measured milk or formula amount.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands well the length of the aviary",
        "Eating natural foods and holding its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 220 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Release it where local king-parrots are feeding, as they settle best near their own kind."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Not flying properly once in the flight aviary",
        "Feathers that look pinched, curled or bloody, or a beak that looks overgrown, which can mean beak and feather disease"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "swan",
   "name": "Black swan",
   "plans": [
    {
     "id": "lib-swan-cygnet",
     "stage": "Downy cygnet",
     "weight": "about 300 g",
     "text": "Ready-made plan: an orphaned black swan cygnet, about 300 g, covered in grey down, a couple of weeks old. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a cygnet like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned black swan cygnet",
      "case_number": "",
      "species": "Black swan (Cygnus atratus)",
      "kind": "wildlife",
      "summary": "This orphaned black swan cygnet, about 300 g and a couple of weeks old, is covered in grey down and healthy. The goal is to raise it on a grazing diet to a strong, waterproof young swan that flies, and release it with other black swans where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Now to about 7 weeks old",
        "tasks": [
         "Step protein down bit by bit so most of its diet is grass and water plants, as too much protein during fast growth causes angel wing."
        ]
       },
       {
        "when": "As feathers replace the down",
        "tasks": [
         "Give it a shallow pool with an easy ramp out, keeping the heat source until it is fully feathered."
        ]
       },
       {
        "when": "Once fully feathered",
        "tasks": [
         "Move it to a large outdoor enclosure with grass and a big pool, ideally with other cygnets, and switch off the heat."
        ]
       }
      ],
      "housing": [
       "Keep it in a lined brooder pen with a heat source at one end at the temperature the app shows for cygnets, so it can move closer or away; panting or holding its wings out means it is too hot.",
       "Line the floor with a soft, non-slip towel to protect its feet and down, and change the bedding twice a day.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Psittacosis is common in Victorian waterfowl and bird flu is in wild waterbirds such as black swans, so wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Feed mostly soft fresh green grass (unsprayed) with roots and soil, water plants and chopped greens, with a little Passwell Crumbles while it is small, as black swans are grazers.",
       "The guidance gives no set amount for cygnets, so keep food in front of it all day and offer a little more than it eats.",
       "Float chopped greens and water plants in a shallow dish of water and put grass sods on the floor, refreshing them several times a day; it feeds itself, so never syringe food into its bill.",
       "Offer clean fresh water at all times in a dish it can dip its whole bill into but not climb into, changed at least once a day; never leave it in water while it is downy, as it chills easily.",
       "Do not add vitamin or mineral supplements, and never feed bread, which has little nutrition and can grow mould that causes aspergillosis."
      ],
      "activity": [
       "Handle it only when needed, gently, cupped in both hands with its wings folded.",
       "Raise it with other cygnets if any are in care, and do not talk to or cuddle it, so it keeps its natural fear of people."
      ],
      "care": [
       "Weigh it every day at the same time and record its weight and how much it eats; it should gain steadily.",
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and delay release."
      ],
      "daily_checks": [
       "Weighed and recorded",
       "Grazing and drinking",
       "Wings held neatly",
       "Bedding changed twice",
       "Droppings look normal"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "Grass, water plants and Passwell Crumbles",
       "weight_g": 300,
       "stage": "Downy cygnet",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Cygnets feed themselves; the guidance gives no body-weight amount.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Fully feathered, with waterproof feathers that stay dry after swimming",
        "Flies strongly",
        "Grazes on its own and is wary of people",
        "Healthy and needing no more care"
       ],
       "target_weight": "About 5 kg (adult size) for a black swan",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild day and release it in daylight, avoiding extreme weather.",
        "Release it at the water’s edge near other black swans, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found, using the GPS or Melways record kept with it, or if that spot is unsuitable, at the closest suitable wetland within its home range."
      },
      "escalate": {
       "vet": [
        "Loses weight, or does not gain for two days in a row",
        "Eats little or nothing, or has diarrhoea",
        "Wing tips droop or twist outwards (early angel wing)",
        "Legs splay or it limps"
       ],
       "urgent": [
        "Cold, floppy or cannot hold its head up: give nothing by mouth on the way",
        "Tremors, a twisted neck, poor balance or swimming in circles, which can be bird flu: ring the Emergency Animal Disease Watch Hotline on 1800 675 888 straight away",
        "Struggling to breathe",
        "Caught by a dog or fox: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "waterbird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "vic-rehab-guidelines-waterbirds-marine",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-swan-adult",
     "stage": "Adult",
     "weight": "about 5.5 kg",
     "text": "Ready-made plan: an adult black swan, about 5.5 kg, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a swan like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult black swan",
      "case_number": "",
      "species": "Black swan (Cygnus atratus)",
      "kind": "wildlife",
      "summary": "This adult black swan, about 5.5 kg, is recovering in care with no injuries needing treatment. The goal is to keep it calm and grazing well, check its flight and waterproofing, and return it to its wetland as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a quiet, lined pen while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to a large outdoor enclosure with grass and a pool big enough to swim in, to check its waterproofing and flight."
        ]
       }
      ],
      "housing": [
       "Keep it in a quiet pen with a soft, non-slip floor, never bare concrete, at the temperature the app shows for adult waterbirds, and change the bedding twice a day.",
       "Once settled, give it a pool deep enough to swim without scraping its feet, with an easy ramp out and a dry, soft area to rest.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Bird flu is in wild waterbirds such as black swans along the Victorian coast, and psittacosis is common in waterfowl, so wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Feed mostly fresh green grass (unsprayed), grass sods and water plants, as black swans are grazers; too much high-protein food harms them.",
       "The guidance gives no set amount for swans, so keep grass and water plants in front of it all day and weigh what is left to see what it eats.",
       "Float water plants and chopped greens in its pool or a deep dish of water, and put grass sods on the floor to graze.",
       "Keep clean fresh water at all times in a container deep enough to dip its whole head, changed at least once a day.",
       "Never feed bread, which has little nutrition and can grow mould that causes aspergillosis."
      ],
      "activity": [
       "Handle it only when needed, with two people if possible, wrapping it in a large towel with its wings folded against its body, as swans can hit hard with their wings; keep away from the water’s edge while catching it."
      ],
      "care": [
       "A moulting swan cannot fly for several weeks and stays on the water; this is normal, and it only needs rescue if it is in danger.",
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and delay release."
      ],
      "daily_checks": [
       "Grazing and eating",
       "Fresh water given",
       "Bedding changed twice",
       "Droppings look normal",
       "Standing and walking well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 5500,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult grazing and feeding itself; no measured amount is needed.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Swims strongly and stays dry after swimming",
        "Flies, unless it is in its normal moult",
        "Grazing on its own and holding its weight",
        "Healthy, needing no more care, and wary of people"
       ],
       "target_weight": "About 5.5 kg, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild day and release it in daylight, avoiding extreme weather.",
        "Release it at the water’s edge near other black swans."
       ],
       "where": "Release it where it was found, using the GPS or Melways record kept with it, or if that spot is unsuitable, at the closest suitable wetland within its home range."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Diarrhoea for more than a day",
        "Feathers soaking through when it swims",
        "Limping or sores on its feet"
       ],
       "urgent": [
        "Weak, collapsed or cannot hold its head up: give nothing by mouth on the way",
        "Tremors, a twisted neck, poor balance or swimming in circles, which can be bird flu: ring the Emergency Animal Disease Watch Hotline on 1800 675 888 straight away",
        "Struggling to breathe",
        "Fishing line or a hook from its mouth: never pull it"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "waterbird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "vic-rehab-guidelines-waterbirds-marine"
      ]
     }
    }
   ]
  },
  {
   "id": "corella",
   "name": "Little corella",
   "plans": [
    {
     "id": "lib-corella-nestling",
     "stage": "Nestling",
     "weight": "about 200 g",
     "text": "Ready-made plan: an orphaned little corella nestling, about 200 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned little corella nestling",
      "case_number": "",
      "species": "Little corella (Cacatua sanguinea)",
      "kind": "wildlife",
      "summary": "This orphaned little corella nestling, about 200 g with pin feathers coming through, is healthy and ready to be hand-reared. The goal is to raise it to a strong, wild, self-feeding young bird and release it with a local flock where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "About weeks 1 to 3",
        "tasks": [
         "Thicken the formula step by step as its pin feathers open, dropping to 3 to 4 feeds a day."
        ]
       },
       {
        "when": "About weeks 4 to 6 (fully feathered)",
        "tasks": [
         "Move it to a sturdy cage with low perches and start offering soaked seed and soft food in a dish.",
         "Drop to 1 to 2 hand-feeds a day as it eats more on its own."
        ]
       },
       {
        "when": "About weeks 7 to 9",
        "tasks": [
         "Stop hand-feeding once it eats on its own and holds its weight; corellas usually take several weeks longer to wean than smaller parrots.",
         "Move it to an outdoor flight aviary to build flying fitness, ideally with other young corellas."
        ]
       }
      ],
      "housing": [
       "Keep it in a small container lined with paper towel, like a nest, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat; lower the heat bit by bit as its feathers cover its body.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the lining whenever it is soiled and clean up droppings after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Feed Passwell Hand Rearing Food or Wombaroo Granivore Rearing Mix, the hand-rearing formula for parrots and cockatoos, mixed at 1 g of powder to 3 mL of water while it is in pin feathers, then thicker (1 g to 2.5 mL, then 1 g to 2 mL) as its feathers open.",
       "Give the amount in the feed calculator each day, split evenly across the feeds, which is up to about 10% of its body weight at each feed, stopping when the crop is comfortably full. An adult little corella eats about 30 to 40 g of food a day, so expect it to work up towards that as it weans.",
       "Give 5 feeds a day, about 6 am, 10 am, 2 pm, 6 pm and 10 pm, then leave it about 6 hours overnight so the crop empties fully at least once a day.",
       "Feed it from a small spoon with the sides bent up, letting it pump and swallow at its own pace, and stop if food comes out of its nostrils; never squirt food into its open beak with a syringe, as it can inhale it.",
       "Mix each feed fresh with pre-boiled water at about 50°C, let it stand 2 minutes, feed it at 38 to 40°C (test it on your wrist) and throw out what is left.",
       "Wipe its beak and face clean with a warm damp cloth after each feed so formula does not dry on its feathers.",
       "It gets its fluid from the formula, so it needs no water dish until it starts eating on its own.",
       "Once it is fully feathered, offer soaked or sprouted seed, defrosted peas and corn mixed with Parrot Soft Food, and seeding grasses, grass sods with roots, and native seed heads in a shallow dish, and cut back hand-feeds as it eats more by itself."
      ],
      "activity": [
       "Handle it only for feeds, weighing and cleaning, quickly and gently, and do not talk to it or let visitors see it, as young parrots tame very easily.",
       "If another young little corella is in care with an experienced bird carer, raising them together helps it grow up knowing its own kind.",
       "From the aviary stage, give it seeding grasses, grass sods with roots, and native seed heads and fresh branches to forage and chew."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Keep a daily record of its weight, feeds and progress; your authorisation requires records to be kept for 3 years."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Crop empty overnight",
       "Droppings look normal",
       "Nest clean and warm",
       "Feathers growing well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Passwell Hand Rearing Food or Granivore Rearing Mix",
       "weight_g": 200,
       "stage": "Nestling in pin feathers (eyes open)",
       "percent_body_weight_per_day": 50,
       "feeds_per_day": 5,
       "basis": "Wombaroo parrot hand-rearing table: up to 10% of body weight a feed, 5 feeds a day at pin-feather stage.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Eats seed and natural foods on its own and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy feathers with no signs of feather or beak disease",
        "Wary of people"
       ],
       "target_weight": "About 400 g for a little corella",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Little corellas live in big flocks, so release it where a local flock is feeding, with any corellas it was raised with."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Crop still full in the morning, or slow to empty between feeds",
        "Weight drops, or stays the same for two days",
        "Watery or oddly coloured droppings for more than a day",
        "Feathers that look pinched, curled or bloody, or a beak that looks overgrown, which can mean beak and feather disease"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Food bubbling from its nostrils, or struggling to breathe",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-corella-adult",
     "stage": "Adult",
     "weight": "about 400 g",
     "text": "Ready-made plan: an adult little corella, about 400 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a corella like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult little corella",
      "case_number": "",
      "species": "Little corella (Cacatua sanguinea)",
      "kind": "wildlife",
      "summary": "This adult little corella, about 400 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating well, rebuild its flying fitness and return it to its flock where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a covered hospital cage while it settles."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to an outdoor flight aviary to rebuild flying fitness."
        ]
       }
      ],
      "housing": [
       "Keep it in a sturdy covered cage with natural branch perches, in a quiet, dim room at the temperature the app shows for adult birds.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Use an aviary with weathered or vinegar-washed wire, as new galvanised wire can poison parrots with zinc. Clean the floor and dishes daily.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Offer budgie or small parrot seed mix (not one heavy in sunflower or other oily seed) with seeding grasses and grass sods with roots to dig in, plus defrosted peas and corn mixed with Parrot Soft Food; never avocado, bread or dairy.",
       "An adult little corella eats about 30 to 40 g of food a day; weigh what you put in and what is left so you know it is eating.",
       "Put the food in shallow dishes on the floor and near a perch, and top it up every morning.",
       "Keep fresh water in a shallow dish at all times and change it every day.",
       "Once in the aviary, offer most of its food as natural seed heads, cones and branches so it is foraging for itself before release."
      ],
      "activity": [
       "Handle it as little and as quickly as possible, wrapped in a towel with your hand behind its head, as corellas bite hard; do not try to tame it.",
       "Give it fresh branches to chew every few days, and keep pets, children and noise well away from its cage."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Food eaten, dish topped up",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 400,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating seed and natural foods; no measured milk or formula amount.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands well the length of the aviary",
        "Eating natural foods and holding its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 400 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Release it where a local flock of little corellas is feeding, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Not flying properly once in the flight aviary",
        "Feathers that look pinched, curled or bloody, or a beak that looks overgrown, which can mean beak and feather disease"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "raven",
   "name": "Australian raven",
   "plans": [
    {
     "id": "lib-raven-nestling",
     "stage": "Nestling",
     "weight": "about 300 g",
     "text": "Ready-made plan: an orphaned Australian raven nestling, about 300 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned Australian raven nestling",
      "case_number": "",
      "species": "Australian raven (Corvus coronoides)",
      "kind": "wildlife",
      "summary": "This orphaned Australian raven nestling, about 300 g with pin feathers coming through, is healthy and ready to be hand-reared. The goal is to raise it to a strong, wild, self-feeding young raven and release it where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "About weeks 1 to 2",
        "tasks": [
         "Lower the heat bit by bit as its feathers open and cover its body."
        ]
       },
       {
        "when": "About weeks 3 to 4 (climbing out of the nest)",
        "tasks": [
         "Move it to a larger cage with low perches and start leaving food and a shallow water dish in the cage."
        ]
       },
       {
        "when": "About weeks 5 to 8",
        "tasks": [
         "Move it to an outdoor aviary big enough to fly, with soil and leaf litter to forage in.",
         "Stop hand-feeding once it feeds itself fully and holds its weight."
        ]
       }
      ],
      "housing": [
       "Sit it in a small artificial nest, such as a container lined with tissue that holds it upright, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat; lower the heat bit by bit as its feathers open.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the nest lining whenever it is soiled and remove droppings after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed Wombaroo Insectivore Rearing Mix made up as moist pellets, the rearing food for orphan ravens, with earthworms, crickets and pieces of mouse; add no vitamins or supplements, and no bread, dairy, avocado or plain mince.",
       "Give the amount in the feed calculator each day, split across the feeds; there is no raven chick chart, so it follows the magpie chart, which reaches about 50 g a day at 220 g.",
       "Give about 6 feeds a day, every 2 to 3 hours from about 6 am to 8 pm, with no overnight feeds; check the timing with an experienced bird carer.",
       "Offer pieces from blunt tweezers into its gaping beak, letting it swallow each one before the next, and never squirt food in with a syringe, as birds easily inhale it.",
       "Thaw frozen prey fully in the fridge, use it the same day, never refreeze thawed food, keep made-up Wombaroo food no more than a day in the fridge (or 2 weeks frozen) and throw out leftovers.",
       "After each feed, drip a few drops of water slowly at the tip of its beak and let it swallow; it needs no water dish until it climbs out of the nest.",
       "Once it starts pecking, offer pellets, worms, insects and a little chopped mixed vegetable in a shallow dish, building live food up before release."
      ],
      "activity": [
       "Handle it only for feeds and weighing, quickly and gently, without talking to it or letting visitors see it, as young ravens tame easily.",
       "From the aviary stage, hide food in leaf litter and soil so it learns to forage on the ground."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Bringing up a small pellet of fur, bone and insect parts is normal for this bird, not vomiting."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Gaping well at feeds",
       "Droppings normal",
       "Nest clean and warm",
       "Feathers growing"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Insectivore Rearing Mix moist pellets",
       "weight_g": 300,
       "stage": "Nestling in pin feathers",
       "percent_body_weight_per_day": 23,
       "feeds_per_day": 6,
       "basis": "Wombaroo magpie chart used as the nearest guide (about 50 g a day at 220 g); no raven chick chart given.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Feeds itself fully and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy plumage and needing no more care",
        "Wary of people"
       ],
       "target_weight": "About 550 to 650 g for an Australian raven",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near trees and open ground, and step well back."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Will not gape or refuses two feeds in a row",
        "Weight drops, or stays the same for two days",
        "Watery or oddly coloured droppings for more than a day",
        "Weak, splayed or bent legs, which can mean a diet problem"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Food bubbling from its nostrils, or struggling to breathe",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-raven-adult",
     "stage": "Adult",
     "weight": "about 650 g",
     "text": "Ready-made plan: an adult Australian raven, about 650 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a raven like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult Australian raven",
      "case_number": "",
      "species": "Australian raven (Corvus coronoides)",
      "kind": "wildlife",
      "summary": "This adult Australian raven, about 650 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating well, rebuild its flying fitness and return it to where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a covered hospital cage with a low perch while it settles."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to an outdoor flight aviary to rebuild flying fitness."
        ]
       }
      ],
      "housing": [
       "Keep it in a sturdy covered cage with natural branch perches, in a quiet, dim room at the temperature the app shows for adult birds.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Clean the floor and dishes every day.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed Wombaroo Insectivore Meat Mix (10 g of powder with 20 g of minced meat), with mice, earthworms, insects and some chopped mixed vegetables, as ravens eat both animal and plant food.",
       "An adult raven needs about 70 g of food a day; weigh what you give and what is left so you know it is eating.",
       "Put the food in a shallow dish on the floor, where ravens like to feed.",
       "Thaw frozen prey fully in the fridge, use it the same day, never refreeze thawed food, keep made-up Wombaroo food no more than a day in the fridge (or 2 weeks frozen) and throw out leftovers.",
       "Keep fresh water in a shallow dish at all times and change it daily."
      ],
      "activity": [
       "Handle it as little and as quickly as possible, wrapped in a towel, and do not try to tame it.",
       "Ravens are clever and get bored, so give it leaf litter, sticks and hidden food to forage for."
      ],
      "care": [
       "Bringing up a small pellet of fur, bone and insect parts is normal for this bird, not vomiting.",
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Food eaten recorded",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 650,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself; the Wombaroo guide gives about 70 g a day for a 550 g raven.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands well the length of the aviary",
        "Eating well and holding its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 650 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near trees and open ground, and step well back."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Not flying properly once in the flight aviary",
        "Discharge from the eyes or nostrils"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "tern",
   "name": "Crested tern",
   "plans": [
    {
     "id": "lib-tern-chick",
     "stage": "Downy chick",
     "weight": "about 100 g",
     "text": "Ready-made plan: an orphaned crested tern chick, about 100 g, covered in down. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a chick like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned crested tern chick",
      "case_number": "",
      "species": "Greater crested tern (Thalasseus bergii)",
      "kind": "wildlife",
      "summary": "This orphaned crested tern chick, about 100 g, is covered in down and healthy. Terns are marine birds that need specialist care, so the goal is to raise it with an experienced seabird carer until it catches fish on its own, then release it near a tern colony on the coast where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Pass it to an experienced seabird carer, as marine birds need specialist housing and lots of fish."
        ]
       },
       {
        "when": "About weeks 2 to 4 (feathering)",
        "tasks": [
         "Start dropping whole fish into a shallow dish and then a pool so it learns to pick them up itself."
        ]
       },
       {
        "when": "About weeks 5 to 8 (flying)",
        "tasks": [
         "Move it to a large aviary with a salt-water pool to build flight and waterproofing, and put live fish in the pool so it learns to catch them."
        ]
       }
      ],
      "housing": [
       "Keep it in a lined box with a heat source at one end at the temperature the app shows for its stage, so it can move closer or away.",
       "Use rubber matting or raked sand on the floor, never bare concrete, and change soiled floor material at least three times a day, as droppings ruin waterproofing and cause foot sores.",
       "Keep it apart from other birds and any pet birds’ air space, with its own equipment.",
       "Bird flu is in wild seabirds and waterbirds along the Victorian coast, so wear disposable gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Feed small whole fish such as whitebait, as crested terns feed their chicks whole fish.",
       "Give the amount in the feed calculator each day, split across the feeds; there is no tern chart, so watch its weight closely.",
       "Give about 5 feeds a day, every 3 hours from about 6 am to 6 pm, with no overnight feeds.",
       "Offer each fish head first from blunt tweezers so it swallows it easily, and never force food into its beak.",
       "Thaw frozen fish in the fridge or under cold running water, never in hot water, use it the same day and throw out leftovers; frozen fish loses vitamin B1, so give a seabird vitamin tablet (such as Vetafarm Sea Bird Tablets) tucked into a fish every day, as a lack causes fits and weakness.",
       "Keep a shallow dish of fresh water it can dip its bill into but not climb into, changed daily; never put it in water while it is downy, as it chills easily."
      ],
      "activity": [
       "Handle it only for weighing and cleaning, quickly and gently, keeping its beak away from your face, and do not let it become used to people."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and delay release."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Fish eaten",
       "Droppings normal",
       "Floor clean and dry",
       "Warm, not panting"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Small whole fish (whitebait)",
       "weight_g": 100,
       "stage": "Downy chick",
       "percent_body_weight_per_day": 30,
       "feeds_per_day": 5,
       "basis": "Best estimate for a growing fish-eating chick; there is no tern chart in the guidance.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Catches live fish on its own and holds its weight",
        "Flies strongly the length of the aviary",
        "Waterproof, staying dry after swimming",
        "Wary of people"
       ],
       "target_weight": "About 350 g for a crested tern",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Release it on the coast near a crested tern colony or where terns gather, as flocking birds settle best into an existing group."
       ],
       "where": "Release it on the coast where it was found (recorded with GPS coordinates or a Melways reference), or the closest suitable place within its range."
      },
      "escalate": {
       "vet": [
        "Refuses fish, or loses weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Weak or splayed legs",
        "Wobbly or having small fits, which can mean a lack of vitamin B1"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Tremors, a twisted neck, poor balance or swimming in circles, which can be bird flu: ring the Emergency Animal Disease Watch Hotline on 1800 675 888 straight away",
        "Struggling to breathe",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "seabird",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-waterbirds-marine",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "agvic-report-sick-dead-wild-birds",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "vic-h5n1-guidance-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-tern-adult",
     "stage": "Adult",
     "weight": "about 350 g",
     "text": "Ready-made plan: an adult crested tern, about 350 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a tern like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult crested tern",
      "case_number": "",
      "species": "Greater crested tern (Thalasseus bergii)",
      "kind": "wildlife",
      "summary": "This adult crested tern, about 350 g, is recovering in care with no injuries needing treatment. Terns are marine birds that need specialist care, so the goal is a stay with an experienced seabird carer, keeping it eating fish and waterproof, and returning it to the coast where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Pass it to an experienced seabird carer, and keep it in a quiet, lined pen while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating well",
        "tasks": [
         "Give it daily swims in a salt-water pool, then move it to a large aviary to rebuild flight and waterproofing."
        ]
       }
      ],
      "housing": [
       "Keep it in a quiet, covered pen at the temperature the app shows for adult seabirds.",
       "Use rubber matting or raked sand on the floor, never bare concrete, and change soiled floor material at least three times a day, as droppings ruin waterproofing and cause foot sores.",
       "Give it a salt-water pool deep enough to swim without scraping its feet once settled, and keep it apart from other birds and pet birds’ air space.",
       "Bird flu is in wild seabirds and waterbirds along the Victorian coast, so wear disposable gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards."
      ],
      "feeding": [
       "Feed small whole fish such as whitebait and small pilchards, as crested terns dive for small fish.",
       "The guidance gives no set amount for terns, so offer a little more than it clears twice a day, and weigh what you give and what is left.",
       "Drop fish into a shallow dish of water or its pool; if it will not feed itself at first, an experienced seabird carer can hand-feed it.",
       "Thaw frozen fish in the fridge or under cold running water, never in hot water, use it the same day and throw out leftovers; frozen fish loses vitamin B1, so give a seabird vitamin tablet (such as Vetafarm Sea Bird Tablets) tucked into a fish every day, as a lack causes fits and weakness.",
       "Keep fresh water available at all times and change it daily."
      ],
      "activity": [
       "Handle it as little as possible, wrapped in a towel with its wings folded and its sharp beak held away from your face."
      ],
      "care": [
       "Never use oil-based ointments or creams on it, as they ruin waterproofing and delay release."
      ],
      "daily_checks": [
       "Fish eaten recorded",
       "Fresh water given",
       "Floor changed",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 350,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding on fish; no measured amount is given.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly the length of the aviary",
        "Waterproof, staying dry after swimming",
        "Eating well and holding its weight",
        "Healthy and wary of people"
       ],
       "target_weight": "About 350 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Release it on the coast where terns gather, as flocking birds settle best into an existing group."
       ],
       "where": "Release it on the coast where it was found (recorded with GPS coordinates or a Melways reference), or the closest suitable place within its range."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Diarrhoea for more than a day",
        "Feathers soaking through when it swims",
        "Sores on its feet"
       ],
       "urgent": [
        "Weak, collapsed or cannot hold its head up: give nothing by mouth on the way",
        "Tremors, a twisted neck, poor balance or swimming in circles, which can be bird flu: ring the Emergency Animal Disease Watch Hotline on 1800 675 888 straight away",
        "Struggling to breathe",
        "Fishing line or a hook from its mouth: never pull it"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "seabird",
      "next_visit": "",
      "sources": [
       "vic-rehab-guidelines-waterbirds-marine",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "agvic-report-sick-dead-wild-birds",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "vic-h5n1-guidance-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "sugarglider",
   "name": "Sugar glider",
   "plans": [
    {
     "id": "lib-sugarglider-joey",
     "stage": "Furred joey",
     "weight": "about 40 g",
     "text": "Ready-made plan: an orphaned sugar glider joey, about 40 g, furred with eyes open, drinking milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned sugar glider joey",
      "case_number": "",
      "species": "Sugar glider (Petaurus breviceps)",
      "kind": "wildlife",
      "summary": "This orphaned sugar glider joey, about 40 g, is furred with its eyes open and is still drinking milk, and is healthy. Sugar gliders live in family groups, so the goal is to raise it with other young gliders through an experienced carer, wean it and release the group together where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 2",
        "tasks": [
         "Join it with other sugar glider joeys of a similar age through an experienced glider carer, so they are raised and released together.",
         "Start offering small pieces of solid food in a dish each evening."
        ]
       },
       {
        "when": "About weeks 3 to 5 (around 100 to 120 days old)",
        "tasks": [
         "Lower the milk bit by bit as it eats more solid food, stopping by about 120 days old, when it should weigh about 75 to 90 g."
        ]
       },
       {
        "when": "Once weaned",
        "tasks": [
         "Move the group to an outdoor pre-release enclosure with branches, foliage and a nest box, as long stays in care give small gliders poor outcomes."
        ]
       }
      ],
      "housing": [
       "Keep it in a soft cloth pouch inside a secure, gap-free enclosure, at the temperature the app shows for its stage, in a quiet, dark room away from pets and noise.",
       "Gliders are expert escapers, so tie pouches so it cannot be caught in the knot and check every gap and door is closed.",
       "Give it branches to climb and glide between as it grows, and a nest box to sleep in by day.",
       "Wear gloves when cleaning up droppings and urine and wash your hands after handling, as possums and gliders can carry leptospirosis, salmonella and Q fever."
      ],
      "feeding": [
       "Feed Wombaroo Possum Milk Replacer >0.8, a milk made for possum and glider joeys; never cow’s milk, which causes diarrhoea.",
       "Give the amount in the feed calculator each day, split across the feeds; the Wombaroo glider chart gives about 3 mL a day at 12 g, rising to about 9 mL a day at 54 g, then falling to none by about 120 days.",
       "Give 3 feeds a day, about 7 am, 3 pm and 10 pm.",
       "Feed it from a small syringe or an eye dropper, one drop at a time so it can lap and swallow at its own pace, and stop if milk comes out of its nose.",
       "Mix 25 g of powder (3½ scoops) with 80 mL of pre-boiled water at about 50°C to make 100 mL, never stronger or weaker; keep made-up milk in the fridge no more than a day (or frozen in small portions up to 2 weeks, never refrozen), warm it to about 30°C and throw out leftovers.",
       "As it starts eating, offer Wombaroo Small Carnivore Food (up to a fifth of its diet), small pieces of fruit sprinkled with Wombaroo High Protein Supplement, native flowers and live insects gut-loaded with vitamins, in a dish each evening.",
       "Put out a shallow dish of fresh water, changed daily, once it is eating solids, and offer extra water between feeds in hot weather."
      ],
      "activity": [
       "Handle it only for feeds, weighing and cleaning, gently and briefly, so it stays wild.",
       "Hide food and flowers among the branches so it forages at night as it would in the wild."
      ],
      "care": [
       "Weigh it every morning on scales that read to 0.1 g, before the first feed, and enter the weight so the feed calculator stays right.",
       "If it ever comes in cold, warm it gradually over 2 to 3 hours before giving any milk or food."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "All milk feeds taken",
       "Droppings normal",
       "Pouch clean and dry",
       "Enclosure escape-proof"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Possum Milk Replacer >0.8",
       "weight_g": 40,
       "stage": "Over 0.8 of pouch life, furred, eyes open (about 85 to 90 days)",
       "percent_body_weight_per_day": 17.5,
       "feeds_per_day": 3,
       "basis": "Wombaroo sugar glider chart: about 7 mL a day at 40 g, between 3 mL at 12 g and 9 mL at 54 g.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned and holding its weight on natural foods",
        "Climbs and glides confidently",
        "Healthy, with a full coat, and needing no more care",
        "Wary of people and keeps with its group"
       ],
       "target_weight": "About 90 to 135 g for a sugar glider",
       "how": [
        "Release it within 24 hours of it being ready, together with the group it was raised with.",
        "Release at dusk in mild, settled weather, never during the day.",
        "Fix a temporary nest box in a tree at the release spot and place the group in it, as sugar gliders depend on tree hollows."
       ],
       "where": "Release it where it was found, using the GPS or Melways record of that spot; if the spot is unsuitable, use the closest suitable place within its home range without crossing a boundary it would not normally cross, and if there is no such place it cannot be released elsewhere."
      },
      "escalate": {
       "vet": [
        "Diarrhoea, or droppings runny for more than a day.",
        "Refusing feeds, or losing weight two days running.",
        "Patches of hair loss or crusty skin.",
        "Not gaining weight for three days."
       ],
       "urgent": [
        "Cold, floppy or unable to hold its head up: give nothing by mouth on the way to the vet.",
        "Coughing, noisy breathing or milk coming from the nose after a feed.",
        "Wobbly, trembling or having fits.",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "glider",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wombaroo-marsupial-milk-how-to-feed",
       "wires-possums"
      ]
     }
    },
    {
     "id": "lib-sugarglider-adult",
     "stage": "Adult",
     "weight": "about 120 g",
     "text": "Ready-made plan: an adult sugar glider, about 120 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a glider like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult sugar glider",
      "case_number": "",
      "species": "Sugar glider (Petaurus breviceps)",
      "kind": "wildlife",
      "summary": "This adult sugar glider, about 120 g, is recovering in care with no injuries needing treatment. Long stays in care do small gliders no good, so the goal is a short stay, keeping it calm and eating, and returning it at dusk to its family group where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a small, secure enclosure with a pouch while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating well",
        "tasks": [
         "Move it to a larger, gap-free enclosure with branches to climb and glide, to check it moves and glides normally."
        ]
       }
      ],
      "housing": [
       "Keep it in a secure, gap-free enclosure with a cloth pouch or nest box to sleep in by day, at the temperature the app shows for gliders, in a quiet, dark room away from pets and noise.",
       "Gliders are expert escapers, so tie pouches so it cannot be caught in the knot and check every gap and door is closed.",
       "Clean out droppings and old food every morning.",
       "Wear gloves when cleaning up droppings and urine and wash your hands after handling, as possums and gliders can carry leptospirosis, salmonella and Q fever."
      ],
      "feeding": [
       "Feed Wombaroo Small Carnivore Food (up to a fifth of its diet), small pieces of fruit sprinkled with Wombaroo High Protein Supplement, native flowers and blossom, and live insects such as mealworms and crickets gut-loaded with vitamins, as sugar gliders eat sap, nectar and insects.",
       "The guidance gives no set amount for sugar gliders, so offer a little more than it clears each night and weigh what is left.",
       "Put the food out at dusk in a dish fixed high in the enclosure, and hide some among the branches.",
       "Keep a shallow dish of fresh water at all times, changed daily."
      ],
      "activity": [
       "Handle it as little as possible, gently and briefly, with gloves, as gliders can bite."
      ],
      "care": [
       "If it ever comes in cold, warm it gradually over 2 to 3 hours before giving any milk or food."
      ],
      "daily_checks": [
       "Food eaten recorded",
       "Fresh water given",
       "Droppings normal",
       "Pouch clean and dry",
       "Enclosure escape-proof"
      ],
      "log_days": 7,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 120,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself; no measured amount is given.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Eating well and holding its weight",
        "Climbs and glides confidently",
        "Healthy, with a full coat, and needing no more care",
        "Wary of people"
       ],
       "target_weight": "About 120 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Release at dusk in mild, settled weather, never during the day.",
        "Place it in a temporary nest box fixed in a tree at the release spot, as sugar gliders depend on tree hollows."
       ],
       "where": "Release it where it was found, using the GPS or Melways record of that spot; if the spot is unsuitable, use the closest suitable place within its home range without crossing a boundary it would not normally cross, and if there is no such place it cannot be released elsewhere."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running.",
        "Diarrhoea for more than a day.",
        "Patches of hair loss or crusty skin.",
        "Not climbing or gliding normally."
       ],
       "urgent": [
        "Cold, floppy or unable to hold its head up: give nothing by mouth on the way to the vet.",
        "Struggling to breathe.",
        "Wobbly, trembling or having fits.",
        "Bleeding or a new injury."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "glider",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wombaroo-marsupial-milk-how-to-feed",
       "wires-possums"
      ]
     }
    }
   ]
  },
  {
   "id": "kingfisher",
   "name": "Sacred kingfisher",
   "plans": [
    {
     "id": "lib-kingfisher-nestling",
     "stage": "Nestling",
     "weight": "about 25 g",
     "text": "Ready-made plan: an orphaned sacred kingfisher nestling, about 25 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned sacred kingfisher nestling",
      "case_number": "",
      "species": "Sacred kingfisher (Todiramphus sanctus)",
      "kind": "wildlife",
      "summary": "This orphaned sacred kingfisher nestling, about 25 g with pin feathers coming through, is healthy and ready to be hand-reared. The goal is to raise it to a strong, wild young kingfisher that catches its own food and release it where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 7",
        "tasks": [
         "Lower the heat bit by bit as its feathers open and cover its body."
        ]
       },
       {
        "when": "About week 2 (feathered)",
        "tasks": [
         "Move it to a cage with low perches and start leaving live insects in a smooth-sided dish."
        ]
       },
       {
        "when": "About weeks 3 to 4",
        "tasks": [
         "Move it to a flight aviary with perches over open ground and give live insects so it learns to swoop on them.",
         "Stop hand-feeding once it catches its own food and holds its weight."
        ]
       }
      ],
      "housing": [
       "Sit it in a small artificial nest, such as a container lined with tissue that holds it upright, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat; lower the heat bit by bit as its feathers open. Kingfishers are easily stressed, so keep it covered and very quiet.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the nest lining whenever it is soiled and remove droppings after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed Wombaroo Insectivore Rearing Mix made up as moist pellets, with small crickets, mealworms, woodies and other small insects, as sacred kingfishers eat insects, small lizards and crustaceans.",
       "Give the amount in the feed calculator each day, split across the feeds; there is no kingfisher chart, so watch its weight closely.",
       "Feed it about every 45 minutes from dawn to dusk while it gapes, with no overnight feeds; young insect-eating chicks ideally feed often, so check the timing with an experienced bird carer.",
       "Offer small pieces from fine blunt tweezers into its gaping beak, letting it swallow each one before the next, and never squirt food in with a syringe, as birds easily inhale it.",
       "Thaw frozen prey fully in the fridge, use it the same day, never refreeze thawed food, keep made-up Wombaroo food no more than a day in the fridge (or 2 weeks frozen) and throw out leftovers.",
       "At each feed, drip a little water slowly at the tip of its beak and let it swallow; it needs no water dish until it feeds itself."
      ],
      "activity": [
       "Handle it only for feeds and weighing, quickly and gently, without talking to it or letting visitors see it, so it does not become tame; gaping is a normal threat display."
      ],
      "care": [
       "Weigh it every morning at the same time, on scales that read to 0.1 g, before the first feed, and enter the weight so the feed calculator stays right.",
       "Bringing up a small pellet of fur, bone and insect parts is normal for this bird, not vomiting.",
       "Sacred kingfishers are summer visitors to Victoria; if it is nearly ready late in the season, check the release timing with an experienced bird carer."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Gaping well at feeds",
       "Droppings normal",
       "Nest clean and warm",
       "Feathers growing"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Insectivore Rearing Mix moist pellets and insects",
       "weight_g": 25,
       "stage": "Nestling in pin feathers",
       "percent_body_weight_per_day": 40,
       "feeds_per_day": 16,
       "basis": "Best estimate for a small insect-eating nestling; there is no kingfisher chart in the guidance.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Catches live insects on its own and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy plumage and needing no more care",
        "Wary of people"
       ],
       "target_weight": "About 45 g for a sacred kingfisher",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a warm, calm morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near trees beside open ground or water, and step well back."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Will not gape or refuses two feeds in a row",
        "Weight drops, or stays the same for a day",
        "Watery or oddly coloured droppings",
        "Weak or bent legs, which can mean a diet problem"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Food bubbling from its nostrils, or struggling to breathe",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-kingfisher-adult",
     "stage": "Adult",
     "weight": "about 45 g",
     "text": "Ready-made plan: an adult sacred kingfisher, about 45 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a kingfisher like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult sacred kingfisher",
      "case_number": "",
      "species": "Sacred kingfisher (Todiramphus sanctus)",
      "kind": "wildlife",
      "summary": "This adult sacred kingfisher, about 45 g, is recovering in care with no injuries needing treatment. Kingfishers stress easily, so the goal is a short, quiet stay, keeping it eating, rebuilding its flight and returning it to where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a small covered box or hospital cage with a low perch while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating well",
        "tasks": [
         "Move it to a flight aviary with perches over open ground, and give live insects so it is swooping on prey again before release."
        ]
       }
      ],
      "housing": [
       "Keep it in a small, covered cage with a low natural perch, in a very quiet, dim room at the temperature the app shows for adult birds, as kingfishers are easily stressed.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the floor lining and clean dishes every day.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, use fresh gloves for each animal and wash your hands with soap afterwards, as wild birds in Victoria can carry psittacosis and bird flu."
      ],
      "feeding": [
       "Feed live insects such as crickets, mealworms and woodies, with small pieces of Wombaroo Insectivore Meat Mix, as sacred kingfishers eat insects, small lizards and crustaceans.",
       "The guidance gives no set amount for kingfishers, so offer a little more than it clears and weigh what you give and what is left.",
       "Put live insects in a smooth-sided dish below its perch, where it can see and swoop on them.",
       "Thaw frozen prey fully in the fridge, use it the same day, never refreeze thawed food, keep made-up Wombaroo food no more than a day in the fridge (or 2 weeks frozen) and throw out leftovers.",
       "Keep fresh water in a shallow dish at all times and change it daily."
      ],
      "activity": [
       "Handle it as little and as quickly as possible, cupped gently in a towel; gaping is a normal threat display."
      ],
      "care": [
       "Bringing up a small pellet of fur, bone and insect parts is normal for this bird, not vomiting.",
       "Sacred kingfishers are summer visitors to Victoria; if it is nearly ready late in the season, check the release timing with an experienced bird carer."
      ],
      "daily_checks": [
       "Insects eaten",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 7,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 45,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult feeding itself on live insects; no measured amount is given.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands well the length of the aviary",
        "Catching live insects and holding its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 45 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a warm, calm morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near trees beside open ground or water, and step well back."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating by the end of day 1",
        "Losing weight",
        "Watery or oddly coloured droppings",
        "Not flying properly once in the aviary"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "mtbrushtail",
   "name": "Mountain brushtail possum",
   "plans": [
    {
     "id": "lib-mtbrushtail-joey",
     "stage": "Furred joey",
     "weight": "about 500 g",
     "text": "Ready-made plan: an orphaned mountain brushtail possum (bobuck) joey, about 500 g, furred with eyes open, drinking milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned mountain brushtail possum joey",
      "case_number": "",
      "species": "Mountain brushtail possum, also called bobuck (Trichosurus cunninghami)",
      "kind": "wildlife",
      "summary": "This orphaned mountain brushtail possum (bobuck) joey, about 500 g, is furred with its eyes open and is still drinking milk, and is healthy. The goal is to wean it on to natural browse, then release it at dusk where it was found once it holds its weight on a fully natural diet.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 4",
        "tasks": [
         "Offer more browse and flowers each evening and lower the milk bit by bit as it eats more, stopping once it holds its weight on solids."
        ]
       },
       {
        "when": "Once fully weaned",
        "tasks": [
         "Move it to a large outdoor pre-release enclosure with branches to climb, a nest box and natural shelter."
        ]
       },
       {
        "when": "At least 2 weeks in the pre-release enclosure",
        "tasks": [
         "Keep it there on a fully natural diet until it holds its weight, as possums must do this before release."
        ]
       }
      ],
      "housing": [
       "Keep it in a secure, well-ventilated indoor enclosure in a quiet room, at the enclosure temperature the app shows for its stage, with a pouch or nest box to sleep in by day.",
       "Give it sturdy branches to climb, as brushtails live in trees and shelter in hollows.",
       "Keep it apart from other wildlife until its health is known.",
       "Wear gloves when cleaning up droppings and urine and wash your hands after handling, as possums and gliders can carry leptospirosis, salmonella and Q fever."
      ],
      "feeding": [
       "Feed plenty of fresh native browse, such as wattle and eucalypt leaves, with native flowers and blossom, plus a little Wombaroo High Protein Supplement or Small Carnivore Food while it weans, as brushtails are omnivores.",
       "Give Wombaroo Possum Milk Replacer >0.8 at the amount in the feed calculator; there is no mountain brushtail chart, so this follows the common brushtail chart, which weans from about 40 mL a day to none over about 40 days.",
       "Give 2 milk feeds a day, morning and evening, from a bottle with a teat hole of about 1 mm or lapped from a shallow dish, letting it take it at its own pace, and stop if milk comes out of its nose.",
       "Mix 25 g of powder (3½ scoops) with 80 mL of pre-boiled water at about 50°C to make 100 mL, never stronger or weaker; keep made-up milk in the fridge no more than a day (or frozen in small portions up to 2 weeks, never refrozen), warm it to about 30°C and throw out leftovers.",
       "Put out enough browse at dusk that a little is left by morning, wedged upright or fixed high in the enclosure, and clear out the old browse each day.",
       "Keep a shallow, heavy dish of fresh water in the enclosure, changed every day."
      ],
      "activity": [
       "Handle it gently and only when needed, such as for weighing or moving enclosures, so it stays wild and wary of people.",
       "Hide browse and flowers around the branches so it forages at night as it would in the wild."
      ],
      "care": [
       "Weigh it every day at the same time, before its first milk feed, and record it so the feed calculator stays right and any weight loss during weaning is picked up early.",
       "If it ever comes in cold, warm it gradually over 2 to 3 hours before giving any milk or food."
      ],
      "daily_checks": [
       "Weighed and recorded",
       "Milk feeds taken",
       "Browse eaten overnight",
       "Droppings firm",
       "Nest box clean"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Possum Milk Replacer >0.8",
       "weight_g": 500,
       "stage": "Weaning, eating some browse",
       "percent_body_weight_per_day": 7,
       "feeds_per_day": 2,
       "basis": "Wombaroo common brushtail weaning chart (40 mL a day at the start of weaning) used as the nearest guide; no mountain brushtail chart given.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned and holding steady weight on a fully natural diet",
        "Full, healthy coat and needing no more care",
        "Climbs confidently and uses its nest box",
        "Wary of people and predators"
       ],
       "target_weight": "",
       "how": [
        "Release within 24 hours of it being ready, in mild, settled weather.",
        "Release at dusk, as it is nocturnal; never release it during the day.",
        "Take it to the site in a quiet, well-ventilated, lined box.",
        "Fix a temporary nest box in a tree at the release spot, as brushtails depend on hollows for shelter."
       ],
       "where": "Release it where it was found, using the GPS or Melways record of that spot; if the spot is unsuitable, use the closest suitable place within its home range without crossing a boundary it would not normally cross, and if there is no such place it cannot be released elsewhere."
      },
      "escalate": {
       "vet": [
        "Diarrhoea, or droppings runny for more than a day.",
        "Refusing feeds, or losing weight two days running.",
        "Patches of hair loss or crusty skin.",
        "Not eating browse after a week of weaning."
       ],
       "urgent": [
        "Cold, floppy or unable to hold its head up: give nothing by mouth on the way to the vet.",
        "Coughing, noisy breathing or milk coming from the nose after a feed.",
        "On the ground in the heat, panting or drooling (heat stress).",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "brushtail",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wombaroo-marsupial-milk-how-to-feed",
       "wires-possums"
      ]
     }
    },
    {
     "id": "lib-mtbrushtail-adult",
     "stage": "Adult",
     "weight": "about 3.5 kg",
     "text": "Ready-made plan: an adult mountain brushtail possum (bobuck), about 3.5 kg, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a possum like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult mountain brushtail possum",
      "case_number": "",
      "species": "Mountain brushtail possum, also called bobuck (Trichosurus cunninghami)",
      "kind": "wildlife",
      "summary": "This adult mountain brushtail possum (bobuck), about 3.5 kg, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating natural browse, and return it at dusk to where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a quiet, secure enclosure with a nest box while it settles and starts eating."
        ]
       },
       {
        "when": "Once eating well",
        "tasks": [
         "Move it to a larger enclosure with branches to climb, to check it climbs and moves normally."
        ]
       }
      ],
      "housing": [
       "Keep it in a secure, well-ventilated enclosure in a quiet room or sheltered outdoor area, at the temperature the app shows for brushtails, with a nest box or hollow log to sleep in by day.",
       "Give it sturdy branches to climb, as brushtails live in trees and shelter in hollows.",
       "Keep it apart from other wildlife and pets, and clean out droppings and old browse every morning.",
       "Wear gloves when cleaning up droppings and urine and wash your hands after handling, as possums and gliders can carry leptospirosis, salmonella and Q fever."
      ],
      "feeding": [
       "Feed plenty of fresh native browse, such as wattle and eucalypt leaves, with native flowers and blossom, as mountain brushtails eat mostly leaves.",
       "Put out enough browse at dusk that a little is left by morning, wedged upright or fixed high in the enclosure.",
       "Keep a shallow, heavy dish of fresh water in the enclosure, changed every day."
      ],
      "activity": [
       "Handle it as little as possible, with thick gloves and a towel, as brushtails scratch and bite hard; never hold it by the tail alone."
      ],
      "care": [
       "Weigh it once or twice a week and record its weight and what it eats."
      ],
      "daily_checks": [
       "Browse eaten overnight",
       "Fresh water given",
       "Droppings firm",
       "Nest box clean",
       "Climbing well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 3500,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating browse; no measured amount is needed.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Eating well and holding steady weight on natural browse",
        "Full, healthy coat and needing no more care",
        "Climbs confidently",
        "Wary of people"
       ],
       "target_weight": "About 3.5 kg, holding at or above its arrival weight",
       "how": [
        "Release within 24 hours of it being ready, in mild, settled weather.",
        "Release at dusk, as it is nocturnal; never release it during the day.",
        "Take it to the site in a quiet, well-ventilated, lined box.",
        "Fix a temporary nest box in a tree at the release spot, as brushtails depend on hollows for shelter."
       ],
       "where": "Release it where it was found, using the GPS or Melways record of that spot; if the spot is unsuitable, use the closest suitable place within its home range without crossing a boundary it would not normally cross, and if there is no such place it cannot be released elsewhere."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running.",
        "Diarrhoea for more than a day.",
        "Patches of hair loss or crusty skin.",
        "Not climbing normally."
       ],
       "urgent": [
        "Collapsed, floppy or unable to hold its head up: give nothing by mouth on the way.",
        "Struggling to breathe.",
        "On the ground in the heat, panting or drooling (heat stress).",
        "Bleeding or a new injury."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "brushtail",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wombaroo-marsupial-milk-how-to-feed",
       "wires-possums"
      ]
     }
    }
   ]
  },
  {
   "id": "rnwallaby",
   "name": "Red-necked wallaby",
   "plans": [
    {
     "id": "lib-rnwallaby-unfurred",
     "stage": "Unfurred joey",
     "weight": "about 350 g",
     "text": "Ready-made plan: an orphaned red-necked (Bennett's) wallaby joey, about 350 g, unfurred with eyes open and ears up. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned red-necked wallaby joey",
      "case_number": "",
      "species": "Red-necked wallaby, also called Bennett's wallaby (Notamacropus rufogriseus)",
      "kind": "wildlife",
      "summary": "This orphaned red-necked (Bennett's) wallaby joey, about 350 g, is unfurred with its eyes open and ears up, and is healthy. The goal is to raise it through pouch life and weaning with other young wallabies, then release it fit and wild where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 2",
        "tasks": [
         "Join it with other red-necked wallaby joeys of a similar age through an experienced macropod carer, so they are raised and released together.",
         "Give Impact Colostrum Supplement in its milk this first week."
        ]
       },
       {
        "when": "About week 3 (around 170 days old, about 560 g, fine fur)",
        "tasks": [
         "Change over to Kangaroo Milk Replacer 0.6 bit by bit over 10 to 20 days, keeping the total amount the same, and drop to 5 feeds a day.",
         "Start offering fresh grass with roots in the pouch."
        ]
       },
       {
        "when": "About week 7 (around 200 days old, about 930 g)",
        "tasks": [
         "Change over to Kangaroo Milk Replacer >0.7 bit by bit over 10 to 20 days, and drop to 4 feeds a day."
        ]
       },
       {
        "when": "About weeks 10 to 18 (220 to 280 days old)",
        "tasks": [
         "Drop to 3, then 2, feeds a day as it starts toileting itself and leaves the pouch, and move it to a grassy outdoor enclosure with its group."
        ]
       }
      ],
      "housing": [
       "Keep it in a fabric pouch inside a heated box at the temperature the app shows for its stage (about 32°C now), in a warm, dark, quiet place away from pets, noise and smells, with the heat source never touching it.",
       "Line the pouch with soft cotton liners and change them whenever soiled, so its skin stays clean and dry.",
       "Wash your hands before and after every feed and clean-up, wear gloves and a mask when handling droppings, and disinfect bottles and equipment, as wallabies can carry Q fever, salmonella and ringworm without looking sick; Q fever and tetanus vaccination give carers the best protection."
      ],
      "feeding": [
       "Feed Wombaroo Kangaroo Milk Replacer 0.4, a low-lactose milk made for kangaroos and wallabies; never cow’s milk, which gives joeys diarrhoea.",
       "Give the amount in the feed calculator each day, split evenly across the feeds; the red-necked wallaby chart rises from about 47 mL a day at 320 g to about 60 mL a day at 470 g.",
       "Give 6 feeds a day, about every 4 hours from 6 am to 10 pm.",
       "Feed it in its pouch, letting it suck at its own pace through a small teat with a hole of about 1 mm so the milk drips slowly, and stop if milk comes out of its nose.",
       "Mix 18 g of powder (2½ scoops) with 90 mL of pre-boiled water at about 50°C to make 100 mL, in sterilised bottles; warm it to about 30°C, keep made-up milk in the fridge no more than a day (or frozen up to 2 weeks, never refrozen) and throw out leftovers.",
       "After every feed, gently wipe its bottom and genitals with a warm damp cloth until it wees and poos, as it cannot go on its own yet.",
       "It needs no extra water while in the pouch on milk; if it seems dehydrated, give water between feeds, never mixed into the milk."
      ],
      "activity": [
       "Handle it gently and briefly, and if it calls out, breathes fast, pants or grinds its teeth, stop and let it settle in its pouch, as stress lowers a joey’s resistance to disease.",
       "Keep it away from pets and visitors and avoid making a pet of it, so it stays wary of people and dogs."
      ],
      "care": [
       "Weigh it every morning before the first feed and enter the weight so the feed calculator stays right.",
       "Its age is estimated from its size and fur; if it seems younger or older than this plan assumes, check its milk stage with your vet or an experienced macropod carer."
      ],
      "daily_checks": [
       "Weigh before morning feed",
       "All milk feeds taken",
       "Toileted after each feed",
       "Pouch liners clean",
       "Warm and settled"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Kangaroo Milk Replacer 0.4",
       "weight_g": 350,
       "stage": "Age Factor 0.4, about 145 days, unfurred",
       "percent_body_weight_per_day": 14.3,
       "feeds_per_day": 6,
       "basis": "Worked out from DEECA Table 6.10 for red-necked wallabies (about 50 mL a day at 350 g); the percentage falls as it grows.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned (at about 370 days old) and off the bottle for at least a month",
        "Healthy, moving well and grazing and browsing on its own",
        "At a good weight for its age, as checked by an experienced macropod carer",
        "Wary of people and dogs and keeps with its group"
       ],
       "target_weight": "",
       "how": [
        "Release it within 24 hours of being ready, together with the group it was raised with.",
        "Choose mild weather and the time of day wallabies are normally out feeding, avoiding heat and storms.",
        "Move it calmly in a covered, well-ventilated crate with its head covered, keeping the trip short.",
        "If a vet sedates it for the trip, stay and watch until it is fully awake, to protect it from predators."
       ],
       "where": "Release it where it was found (record that spot with GPS coordinates), or if that is unsuitable, at the closest suitable spot within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Diarrhoea, or droppings runny for more than a day.",
        "Refusing feeds, or losing weight two days running.",
        "Patches of hair loss, crusty or scaly skin.",
        "Not gaining weight for three days."
       ],
       "urgent": [
        "Cold, floppy or unable to hold its head up: give nothing by mouth on the way to the vet.",
        "Coughing, noisy breathing or milk coming from the nose after a feed.",
        "Stiff, wobbly or weak after a fright, chase or handling (possible capture myopathy).",
        "Bloated, hard belly or straining."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "macropod",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wombaroo-marsupial-milk-how-to-feed",
       "wires-kangaroos-and-wallabies",
       "wires-extreme-heat-factsheet"
      ]
     }
    },
    {
     "id": "lib-rnwallaby-furred",
     "stage": "Furred pouch joey",
     "weight": "about 2 kg",
     "text": "Ready-made plan: an orphaned red-necked (Bennett's) wallaby joey, about 2 kg, fully furred, spending most of its time in the pouch and drinking milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a joey like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned red-necked wallaby joey",
      "case_number": "",
      "species": "Red-necked wallaby, also called Bennett's wallaby (Notamacropus rufogriseus)",
      "kind": "wildlife",
      "summary": "This orphaned red-necked (Bennett's) wallaby joey, about 2 kg, is fully furred and still spends most of its time in the pouch drinking milk, and is healthy. The goal is to raise it through the rest of pouch life and weaning with other young wallabies, then release it fit and wild.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Weeks 1 to 2",
        "tasks": [
         "Join it with other red-necked wallaby joeys of a similar age through an experienced macropod carer, so they are raised and released together."
        ]
       },
       {
        "when": "About weeks 2 to 6 (around 240 to 280 days old, out of the pouch more)",
        "tasks": [
         "Drop to 3, then 2, milk feeds a day and move it with its group to a large, secure grassy outdoor enclosure with shelter and shade."
        ]
       },
       {
        "when": "About weeks 7 to 18 (around 290 to 370 days old)",
        "tasks": [
         "Wean it: lower the milk bit by bit, giving the last bottle at about 370 days old, when weaning should end on native browse.",
         "Give no bottles at all in the month between weaning and release."
        ]
       }
      ],
      "housing": [
       "Keep it in a fabric pouch hung in a quiet, dark spot, at the temperature the app shows for this stage, away from pets, noise and smells.",
       "Line the pouch with soft cotton liners and change them whenever soiled.",
       "Give it a safe, grassy area to hop and explore for longer each day as it leaves the pouch more, with the pouch hung where it can climb back in.",
       "Wash your hands before and after every feed and clean-up, wear gloves and a mask when handling droppings, and disinfect bottles and equipment, as wallabies can carry Q fever, salmonella and ringworm without looking sick; Q fever and tetanus vaccination give carers the best protection."
      ],
      "feeding": [
       "Feed Wombaroo Kangaroo Milk Replacer >0.7, a low-lactose milk made for kangaroos and wallabies; never cow’s milk, which gives joeys diarrhoea.",
       "Give the amount in the feed calculator each day, split evenly across the feeds; the red-necked wallaby chart rises from about 72 mL a day at 930 g to about 155 mL a day at 2.75 kg.",
       "Give 4 feeds a day, about 6 am, 11 am, 4 pm and 9 pm.",
       "Feed it in or just out of its pouch, letting it suck at its own pace through a teat with a hole of about 1 mm so the milk drips slowly, and stop if milk comes out of its nose.",
       "Mix 25 g of powder (3½ scoops) with 80 mL of pre-boiled water at about 50°C to make 100 mL, in sterilised bottles; warm it to about 30°C, keep made-up milk in the fridge no more than a day (or frozen up to 2 weeks, never refrozen) and throw out leftovers.",
       "If it does not wee and poo by itself after a feed, gently wipe its bottom with a warm damp cloth until it goes; red-necked wallabies usually start toileting on their own at about this size.",
       "Put out a shallow dish of fresh water, changed every day, for it to lap when it is out of the pouch.",
       "Offer fresh grass with roots and soil, hay, native browse and macropod pellets such as Wombaroo Kangaroo Pellets every day; never cattle or sheep pellets, which can contain coccidiostats that are fatal to wallabies, and no seed mixes, short chaff or bread, as sharp pieces injure the gums and lead to lumpy jaw."
      ],
      "activity": [
       "Handle it gently and briefly, and if it calls out, breathes fast, pants or grinds its teeth, stop and let it settle in its pouch, as stress lowers a joey’s resistance to disease.",
       "Lift it out of the pouch by easing it out back first, never by its tail or legs alone.",
       "Keep it away from pets and visitors and avoid making a pet of it, so it stays wary of people and dogs."
      ],
      "care": [
       "Never chase it, tie its legs or hold it down to catch it, especially on hot days, as stress and struggling can bring on capture myopathy, which can kill.",
       "Weigh it every morning before the first feed and enter the weight so the feed calculator stays right."
      ],
      "daily_checks": [
       "Weigh before morning feed",
       "All milk feeds taken",
       "Droppings soft to firm",
       "Pouch liners clean",
       "Bright and hopping well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Kangaroo Milk Replacer >0.7",
       "weight_g": 2000,
       "stage": "Age Factor >0.7, about 240 days, fully furred",
       "percent_body_weight_per_day": 6,
       "feeds_per_day": 4,
       "basis": "Worked out from DEECA Table 6.10 for red-necked wallabies (about 120 mL a day at 2 kg); the percentage falls as it grows.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned (at about 370 days old) and off the bottle for at least a month",
        "Healthy, moving well and grazing and browsing on its own",
        "At a good weight for its age, as checked by an experienced macropod carer",
        "Wary of people and dogs and keeps with its group"
       ],
       "target_weight": "",
       "how": [
        "Release it within 24 hours of being ready, together with the group it was raised with.",
        "Choose mild weather and the time of day wallabies are normally out feeding, avoiding heat and storms.",
        "Move it calmly in a covered, well-ventilated crate with its head covered, keeping the trip short.",
        "If a vet sedates it for the trip, stay and watch until it is fully awake, to protect it from predators."
       ],
       "where": "Release it where it was found (record that spot with GPS coordinates), or if that is unsuitable, at the closest suitable spot within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Diarrhoea, or droppings runny for more than a day.",
        "Refusing feeds, or losing weight two days running.",
        "Patches of hair loss, crusty or scaly skin.",
        "Cloudy eyes."
       ],
       "urgent": [
        "Cold, floppy or unable to hold its head up: give nothing by mouth on the way to the vet.",
        "Coughing, noisy breathing or milk coming from the nose after a feed.",
        "Stiff, wobbly or weak after a fright, chase or handling (possible capture myopathy).",
        "Drooling, panting or lying down and slow to get up on a hot day (heat stress)."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "macropod",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wombaroo-marsupial-milk-how-to-feed",
       "wires-kangaroos-and-wallabies",
       "wires-extreme-heat-factsheet"
      ]
     }
    },
    {
     "id": "lib-rnwallaby-atfoot",
     "stage": "Young at foot",
     "weight": "about 8 kg",
     "text": "Ready-made plan: a young-at-foot red-necked (Bennett's) wallaby, about 8 kg, grazing and being weaned off milk. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a wallaby like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Young red-necked wallaby",
      "case_number": "",
      "species": "Red-necked wallaby, also called Bennett's wallaby (Notamacropus rufogriseus)",
      "kind": "wildlife",
      "summary": "This young-at-foot red-necked (Bennett's) wallaby, about 8 kg, is grazing and being weaned off milk, and is healthy. The goal is to finish weaning it with its group in a large outdoor enclosure and release it fit and wild where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Now to about week 6",
        "tasks": [
         "Keep lowering the milk bit by bit, going to 1 feed a day, as it eats more grass and browse; weaning should end on native browse."
        ]
       },
       {
        "when": "About week 7 (around 370 days old)",
        "tasks": [
         "Give the last bottle, and give no bottles at all in the month between weaning and release."
        ]
       },
       {
        "when": "Last month before release",
        "tasks": [
         "Keep people contact to the minimum needed for its care, so it is wary of people when released."
        ]
       }
      ],
      "housing": [
       "Keep it with its group in a large, secure grassy outdoor enclosure with shelter, shade and some shrubby cover.",
       "Make the fences high and solid enough that it cannot jump out or see dogs through them, as a fright can bring on capture myopathy.",
       "Clean up droppings and old food every day and keep the area free of sharp objects.",
       "Wash your hands before and after every feed and clean-up, wear gloves and a mask when handling droppings, and disinfect bottles and equipment, as wallabies can carry Q fever, salmonella and ringworm without looking sick; Q fever and tetanus vaccination give carers the best protection."
      ],
      "feeding": [
       "Feed plenty of fresh grass with roots and soil, hay, native browse and macropod pellets such as Wombaroo Kangaroo Pellets; never cattle or sheep pellets, which can contain coccidiostats that are fatal to wallabies, and no seed mixes, short chaff or bread, as sharp pieces injure the gums and lead to lumpy jaw.",
       "Give the amount of Kangaroo Milk Replacer >0.7 in the feed calculator, as 1 to 2 feeds a day, lowering it steadily; the red-necked wallaby chart falls from about 140 mL a day at 290 days to 30 mL at 350 days, with none by 370 days.",
       "Give the milk from a bottle with a teat, letting it drink at its own pace, and stop if milk comes out of its nose.",
       "Mix 25 g of powder (3½ scoops) with 80 mL of pre-boiled water at about 50°C to make 100 mL, warm it to about 30°C and throw out leftovers.",
       "Keep fresh water in a heavy, shallow dish it cannot tip over, changed every day."
      ],
      "activity": [
       "Handle it only when needed, quietly and briefly, and never chase it, tie its legs or hold it down, especially on hot days, as stress and struggling can bring on capture myopathy, which can kill.",
       "Keep pets and visitors away from its enclosure, so it stays wary of people and dogs."
      ],
      "care": [
       "Weigh it once a week, by walking it calmly onto scales or into a weighing bag, and record its weight and progress."
      ],
      "daily_checks": [
       "Grass and browse eaten",
       "Milk feed taken",
       "Water dish full",
       "Droppings firm pellets",
       "Moving and grazing well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Wombaroo Kangaroo Milk Replacer >0.7",
       "weight_g": 8000,
       "stage": "Weaning, about 310 days",
       "percent_body_weight_per_day": 1.25,
       "feeds_per_day": 2,
       "basis": "Worked out from DEECA Table 6.10 for red-necked wallabies (about 100 mL a day partway through weaning); it falls to none by 370 days.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Fully weaned (at about 370 days old) and off the bottle for at least a month",
        "Healthy, moving well and grazing and browsing on its own",
        "At a good weight for its age, as checked by an experienced macropod carer",
        "Wary of people and dogs and keeps with its group"
       ],
       "target_weight": "",
       "how": [
        "Release it within 24 hours of being ready, together with the group it was raised with.",
        "Choose mild weather and the time of day wallabies are normally out feeding, avoiding heat and storms.",
        "Move it calmly in a covered, well-ventilated crate with its head covered, keeping the trip short.",
        "If a vet sedates it for the trip, stay and watch until it is fully awake, to protect it from predators."
       ],
       "where": "Release it where it was found (record that spot with GPS coordinates), or if that is unsuitable, at the closest suitable spot within its home range without crossing a boundary it would not normally cross."
      },
      "escalate": {
       "vet": [
        "Diarrhoea, or soft droppings for more than a day.",
        "Losing weight, or not eating grass and browse.",
        "A lump or swelling on the jaw, or drooling while eating (possible lumpy jaw).",
        "Patches of hair loss, crusty or scaly skin."
       ],
       "urgent": [
        "Weak, wobbly or lying down and slow to get up.",
        "Stiff, wobbly or weak after a fright, chase or handling (possible capture myopathy).",
        "Drooling, panting or lying down on a hot day (heat stress).",
        "Caught by a dog or hurt jumping the fence: a vet the same day."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "macropod",
      "next_visit": "",
      "sources": [
       "vic-release-requirements",
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehabilitator-authorisation-conditions",
       "vic-rehab-guidelines-part-a",
       "wombaroo-milk-replacers-feeding-guide",
       "wombaroo-marsupial-milk-how-to-feed",
       "wires-kangaroos-and-wallabies",
       "wires-extreme-heat-factsheet"
      ]
     }
    }
   ]
  },
  {
   "id": "blotched",
   "name": "Blotched blue-tongue lizard",
   "plans": [
    {
     "id": "lib-blotched-juvenile",
     "stage": "Juvenile",
     "weight": "about 30 g",
     "text": "Ready-made plan: a juvenile blotched blue-tongue lizard, about 30 g. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a lizard like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Juvenile blotched blue-tongue lizard",
      "case_number": "",
      "species": "Blotched blue-tongue lizard (Tiliqua nigrolutea)",
      "kind": "wildlife",
      "summary": "This juvenile blotched blue-tongue lizard, about 30 g, is healthy. The goal is to keep it warm, well fed and growing, and release it where it was found once the weather is warm enough.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Weigh it on scales accurate to 0.1 g and write down the weight as its starting weight.",
         "Check inside the ear openings and around the front legs for ticks, as a heavy tick load causes blood loss and can make a blue-tongue look wobbly or unwell."
        ]
       },
       {
        "when": "End of week 1, then once a week",
        "tasks": [
         "Weigh it again and compare with the starting weight."
        ]
       }
      ],
      "housing": [
       "Keep it on its own in a secure, escape-proof enclosure with a hide, in a room away from other lizards and pet reptiles with no shared air, as blue-tongue nidovirus spreads very easily between lizards.",
       "Set up a warm basking spot at one end and a cooler end at the other so it can move between them, matching the temperatures the app shows for blue-tongues (a body temperature of about 28 to 32°C, with basking at 30 to 40°C); keep it in that range the whole time, as a lizard in care must not go into winter shutdown (brumation).",
       "Give a UV lamp on a 12-hour light and 12-hour dark cycle, shining straight onto the basking area with no glass or plastic in between (these block UV, and metal mesh cuts it by a third to a half), and replace the lamp on the maker’s schedule.",
       "Give the enclosure its own equipment, clean it daily with detergent and then Virkon or F10 while wearing gloves, and wash your hands thoroughly after every handling, as all reptiles can carry salmonella (most risky for children under 10 and people with weak immunity)."
      ],
      "feeding": [
       "Feed small gut-loaded live insects dusted with calcium, plus finely chopped vegetables sprinkled with a reptile supplement; avoid pet food and too many mealworms.",
       "Offer about 5 to 10% of its body weight at each meal, which is about 1.5 to 3 g for a 30 g lizard, and work the amount out again from each weekly weight as it grows.",
       "Offer meals in the warm part of the day, only once it has basked and warmed up fully, as a cold lizard cannot digest food.",
       "Choose insects small enough for it to swallow easily, put food in a shallow dish on the warm side and remove anything uneaten the same day.",
       "Keep fresh water in a very shallow dish it can climb out of easily, and change it daily."
      ],
      "activity": [
       "Handle it as little and as quickly as possible: hold it gently behind the head and support the hips and back legs, never by the tail, as it can drop its tail.",
       "Add leaf litter, bark and a flat rock to explore and bask on, and scatter some insects so it forages as it would in the wild.",
       "Keep it away from pets and noise, and do not try to tame it."
      ],
      "care": [
       "If it drops its tail, keep it in a fly-free enclosure for two weeks and put nothing on the stump."
      ],
      "daily_checks": [
       "Basking spot warm",
       "UV light on 12 hours",
       "Food eaten recorded",
       "Water dish fresh",
       "Enclosure cleaned"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 30,
       "stage": "Juvenile, self-feeding",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Young lizard eating insects and vegetables by itself, not a measured milk feed.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Eating well by itself and holding or gaining weight.",
        "Alert and active, moving normally, hiding and wary of people.",
        "Clear eyes and nose, quiet breathing and normal droppings.",
        "The forecast is 20°C or more for three days running; in autumn or winter this usually means staying in care, kept warm, until spring."
       ],
       "target_weight": "",
       "how": [
        "Release it within 24 hours of it being ready, on a warm, calm day.",
        "Carry it in a small lined, well-ventilated box.",
        "Release it in the warm part of the day while blue-tongues are active, never in extreme heat, cold, wind or rain.",
        "Place it beside dense cover such as leaf litter, a log or thick ground plants and let it walk off on its own."
       ],
       "where": "Release it exactly where it was found (recorded by GPS coordinates or a Melways reference), or at the closest suitable spot within its home range, and never anywhere else."
      },
      "escalate": {
       "vet": [
        "Weight changes by more than 10% from its starting weight.",
        "Not eating for a week while kept at the right temperature.",
        "Runny or bloody droppings, or no droppings for over a week.",
        "Bubbles or discharge from the nose or mouth, or noisy breathing."
       ],
       "urgent": [
        "Limp, floppy or not responding even when warm: give nothing by mouth on the way.",
        "Open-mouth breathing or gasping.",
        "Bleeding, a burn, or a new wound.",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bluetongue",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-authorisation-guide-first-aid",
       "vic-rehab-guidelines-part-a"
      ]
     }
    },
    {
     "id": "lib-blotched-adult",
     "stage": "Adult",
     "weight": "about 500 g",
     "text": "Ready-made plan: an adult blotched blue-tongue lizard, about 500 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a lizard like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult blotched blue-tongue lizard",
      "case_number": "",
      "species": "Blotched blue-tongue lizard (Tiliqua nigrolutea)",
      "kind": "wildlife",
      "summary": "This adult blotched blue-tongue lizard, about 500 g, is recovering in care with no injuries needing treatment. The goal is to keep it warm, eating and healthy, and release it where it was found once the weather is warm enough.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Day 1",
        "tasks": [
         "Weigh it and write down the weight as its starting weight.",
         "Check inside the ear openings and around the front legs for ticks, as a heavy tick load causes blood loss and can make a blue-tongue look wobbly or unwell."
        ]
       },
       {
        "when": "End of week 1, then once a week",
        "tasks": [
         "Weigh it again and compare with the starting weight."
        ]
       }
      ],
      "housing": [
       "Keep it on its own in a secure, escape-proof enclosure with a hide, in a room away from other lizards and pet reptiles with no shared air, as blue-tongue nidovirus spreads very easily between lizards.",
       "Set up a warm basking spot at one end and a cooler end at the other so it can move between them, matching the temperatures the app shows for blue-tongues (a body temperature of about 28 to 32°C, with basking at 30 to 40°C); keep it in that range the whole time, as a lizard in care must not go into winter shutdown (brumation).",
       "Give a UV lamp on a 12-hour light and 12-hour dark cycle, shining straight onto the basking area with no glass or plastic in between (these block UV, and metal mesh cuts it by a third to a half), and replace the lamp on the maker’s schedule.",
       "Give the enclosure its own equipment, clean it daily with detergent and then Virkon or F10 while wearing gloves, and wash your hands thoroughly after every handling, as all reptiles can carry salmonella (most risky for children under 10 and people with weak immunity)."
      ],
      "feeding": [
       "Feed gut-loaded live insects dusted with calcium, snails and chopped vegetables and flowers sprinkled with a reptile supplement; avoid pet food and too many mealworms.",
       "Offer about 5 to 10% of its body weight at each meal, which is about 25 to 50 g for a 500 g lizard.",
       "Offer meals in the warm part of the day, only once it has basked and warmed up fully, as a cold lizard cannot digest food.",
       "Put food in a shallow dish on the warm side and remove anything uneaten the same day.",
       "Keep fresh water in a shallow dish it can climb out of easily, and change it daily."
      ],
      "activity": [
       "Handle it as little and as quickly as possible: hold it gently behind the head and support the hips and back legs, never by the tail, as it can drop its tail.",
       "Add leaf litter, bark and a flat rock to explore and bask on, and scatter some insects so it forages as it would in the wild.",
       "Keep it away from pets and noise, and do not try to tame it."
      ],
      "care": [
       "If it drops its tail, keep it in a fly-free enclosure for two weeks and put nothing on the stump."
      ],
      "daily_checks": [
       "Basking spot warm",
       "UV light on 12 hours",
       "Food eaten recorded",
       "Water dish fresh",
       "Enclosure cleaned"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 500,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult lizard eating insects and vegetables by itself, not a measured milk feed.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Eating well by itself and holding or gaining weight.",
        "Alert and active, moving normally, hiding and wary of people.",
        "Clear eyes and nose, quiet breathing and normal droppings.",
        "The forecast is 20°C or more for three days running; in autumn or winter this usually means staying in care, kept warm, until spring."
       ],
       "target_weight": "About 500 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready, on a warm, calm day.",
        "Carry it in a small lined, well-ventilated box.",
        "Release it in the warm part of the day while blue-tongues are active, never in extreme heat, cold, wind or rain.",
        "Place it beside dense cover such as leaf litter, a log or thick ground plants and let it walk off on its own."
       ],
       "where": "Release it exactly where it was found (recorded by GPS coordinates or a Melways reference), or at the closest suitable spot within its home range, and never anywhere else."
      },
      "escalate": {
       "vet": [
        "Weight changes by more than 10% from its starting weight.",
        "Not eating for a week while kept at the right temperature.",
        "Runny or bloody droppings, or no droppings for over a week.",
        "Bubbles or discharge from the nose or mouth, or noisy breathing."
       ],
       "urgent": [
        "Limp, floppy or not responding even when warm: give nothing by mouth on the way.",
        "Open-mouth breathing or gasping.",
        "Bleeding, a burn, or a new wound.",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen."
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bluetongue",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-shelter-foster-carer-authorisation",
       "vic-authorisation-guide-first-aid",
       "vic-rehab-guidelines-part-a"
      ]
     }
    }
   ]
  },
  {
   "id": "sccockatoo",
   "name": "Sulphur-crested cockatoo",
   "plans": [
    {
     "id": "lib-sccockatoo-nestling",
     "stage": "Nestling",
     "weight": "about 350 g",
     "text": "Ready-made plan: an orphaned sulphur-crested cockatoo nestling, about 350 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned sulphur-crested cockatoo nestling",
      "case_number": "",
      "species": "Sulphur-crested cockatoo (Cacatua galerita)",
      "kind": "wildlife",
      "summary": "This orphaned sulphur-crested cockatoo nestling, about 350 g with pin feathers coming through, is healthy and ready to be hand-reared. The goal is to raise it to a strong, wild, self-feeding young bird and release it with a local flock where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "About weeks 1 to 4",
        "tasks": [
         "Thicken the formula step by step as its pin feathers open, dropping to 3 to 4 feeds a day."
        ]
       },
       {
        "when": "About weeks 5 to 7 (fully feathered)",
        "tasks": [
         "Move it to a sturdy cage with low perches and start offering soaked seed and soft food in a dish.",
         "Drop to 1 to 2 hand-feeds a day as it eats more on its own."
        ]
       },
       {
        "when": "About weeks 8 to 10",
        "tasks": [
         "Stop hand-feeding once it eats on its own and holds its weight; sulphur-crested cockatoos are usually weaned at about 16 weeks old.",
         "Move it to an outdoor flight aviary to build flying fitness, ideally with other young cockatoos."
        ]
       }
      ],
      "housing": [
       "Keep it in a small container lined with paper towel, like a nest, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat; lower the heat bit by bit as its feathers cover its body.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the lining whenever it is soiled and clean up droppings after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Feed Passwell Hand Rearing Food or Wombaroo Granivore Rearing Mix, the hand-rearing formula for parrots and cockatoos, mixed at 1 g of powder to 3 mL of water while it is in pin feathers, then thicker (1 g to 2.5 mL, then 1 g to 2 mL) as its feathers open.",
       "Give the amount in the feed calculator each day, split evenly across the feeds, which is up to about 10% of its body weight at each feed, stopping when the crop is comfortably full. The Wombaroo guide for sulphur-crested cockatoos starts at about 2 mL a feed at hatching and peaks at about four 40 mL feeds a day at 4 weeks old.",
       "Give 5 feeds a day, about 6 am, 10 am, 2 pm, 6 pm and 10 pm, then leave it about 6 hours overnight so the crop empties fully at least once a day.",
       "Feed it from a small spoon with the sides bent up, letting it pump and swallow at its own pace, and stop if food comes out of its nostrils; never squirt food into its open beak with a syringe, as it can inhale it.",
       "Mix each feed fresh with pre-boiled water at about 50°C, let it stand 2 minutes, feed it at 38 to 40°C (test it on your wrist) and throw out what is left.",
       "Wipe its beak and face clean with a warm damp cloth after each feed so formula does not dry on its feathers.",
       "It gets its fluid from the formula, so it needs no water dish until it starts eating on its own.",
       "Once it is fully feathered, offer soaked or sprouted seed, defrosted peas and corn mixed with Parrot Soft Food, and seeding grasses, gum nuts, sheoak and banksia cones in a shallow dish, and cut back hand-feeds as it eats more by itself."
      ],
      "activity": [
       "Handle it only for feeds, weighing and cleaning, quickly and gently, and do not talk to it or let visitors see it, as young parrots tame very easily.",
       "If another young sulphur-crested cockatoo is in care with an experienced bird carer, raising them together helps it grow up knowing its own kind.",
       "From the aviary stage, give it seeding grasses, gum nuts, sheoak and banksia cones and fresh branches to forage and chew."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Keep a daily record of its weight, feeds and progress; your authorisation requires records to be kept for 3 years."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Crop empty overnight",
       "Droppings look normal",
       "Nest clean and warm",
       "Feathers growing well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Passwell Hand Rearing Food or Granivore Rearing Mix",
       "weight_g": 350,
       "stage": "Nestling in pin feathers (eyes open)",
       "percent_body_weight_per_day": 50,
       "feeds_per_day": 5,
       "basis": "Wombaroo parrot hand-rearing table: up to 10% of body weight a feed, 5 feeds a day at pin-feather stage.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Eats seed and natural foods on its own and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy feathers with no signs of feather or beak disease",
        "Wary of people"
       ],
       "target_weight": "About 850 g for a sulphur-crested cockatoo",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Sulphur-crested cockatoos live in flocks, so release it where a local flock is feeding, with any cockatoos it was raised with."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Crop still full in the morning, or slow to empty between feeds",
        "Weight drops, or stays the same for two days",
        "Watery or oddly coloured droppings for more than a day",
        "Feathers that look pinched, curled or bloody, or a beak that looks overgrown, which can mean beak and feather disease"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Food bubbling from its nostrils, or struggling to breathe",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-sccockatoo-adult",
     "stage": "Adult",
     "weight": "about 850 g",
     "text": "Ready-made plan: an adult sulphur-crested cockatoo, about 850 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a cockatoo like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult sulphur-crested cockatoo",
      "case_number": "",
      "species": "Sulphur-crested cockatoo (Cacatua galerita)",
      "kind": "wildlife",
      "summary": "This adult sulphur-crested cockatoo, about 850 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating well, rebuild its flying fitness and return it to its flock where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a covered hospital cage while it settles."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to an outdoor flight aviary to rebuild flying fitness."
        ]
       }
      ],
      "housing": [
       "Keep it in a sturdy covered cage with natural branch perches, in a quiet, dim room at the temperature the app shows for adult birds.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Use an aviary with weathered or vinegar-washed wire, as new galvanised wire can poison parrots with zinc. Clean the floor and dishes daily.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Offer a parrot seed mix (not one heavy in sunflower or other oily seed) with natural foods such as seeding grasses, gum nuts, sheoak and banksia cones, plus defrosted peas and corn mixed with Parrot Soft Food; never avocado, bread or dairy.",
       "An adult sulphur-crested cockatoo eats about 66 g of food a day; weigh what you put in and what is left so you know it is eating.",
       "Put the food in shallow dishes on the floor and near a perch, and top it up every morning.",
       "Keep fresh water in a shallow dish at all times and change it every day.",
       "Once in the aviary, offer most of its food as natural seed heads, cones and branches so it is foraging for itself before release."
      ],
      "activity": [
       "Handle it as little and as quickly as possible, wrapped in a thick towel with your hand firmly behind its head, as cockatoos bite very hard; do not try to tame it.",
       "Give it fresh branches to chew every few days, and keep pets, children and noise well away from its cage."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds."
      ],
      "daily_checks": [
       "Food eaten, dish topped up",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 850,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating seed and natural foods; no measured milk or formula amount.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands well the length of the aviary",
        "Eating natural foods and holding its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 850 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Release it where a local flock of sulphur-crested cockatoos is feeding, as flocking birds settle best into an existing group."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Not flying properly once in the flight aviary",
        "Feathers that look pinched, curled or bloody, or a beak that looks overgrown, which can mean beak and feather disease"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  },
  {
   "id": "ytbc",
   "name": "Yellow-tailed black-cockatoo",
   "plans": [
    {
     "id": "lib-ytbc-nestling",
     "stage": "Nestling",
     "weight": "about 400 g",
     "text": "Ready-made plan: an orphaned yellow-tailed black-cockatoo nestling, about 400 g, with pin feathers coming through. Healthy, no injuries and no medicines. Write a standard plan another carer can follow for a nestling like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Orphaned yellow-tailed black-cockatoo nestling",
      "case_number": "",
      "species": "Yellow-tailed black-cockatoo (Zanda funerea)",
      "kind": "wildlife",
      "summary": "This orphaned yellow-tailed black-cockatoo nestling, about 400 g with pin feathers coming through, is healthy and ready to be hand-reared. The goal is to raise it to a strong, wild, self-feeding young bird and release it with a local flock where it was found.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "About weeks 1 to 4",
        "tasks": [
         "Thicken the formula step by step as its pin feathers open, dropping to 3 to 4 feeds a day."
        ]
       },
       {
        "when": "About weeks 5 to 7 (fully feathered)",
        "tasks": [
         "Move it to a sturdy cage with low perches and start offering soaked seed and soft food in a dish.",
         "Drop to 1 to 2 hand-feeds a day as it eats more on its own."
        ]
       },
       {
        "when": "About weeks 8 to 10",
        "tasks": [
         "Stop hand-feeding once it eats on its own and holds its weight; young black-cockatoos stay dependent for a long time, so expect weaning to take many weeks.",
         "Move it to an outdoor flight aviary to build flying fitness, ideally with other young black-cockatoos."
        ]
       }
      ],
      "housing": [
       "Keep it in a small container lined with paper towel, like a nest, inside a heated box at the temperature the app shows for its stage, with room to move away from the heat; lower the heat bit by bit as its feathers cover its body.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Change the lining whenever it is soiled and clean up droppings after each feed.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Feed Passwell Hand Rearing Food or Wombaroo Granivore Rearing Mix, the hand-rearing formula for parrots and cockatoos, mixed at 1 g of powder to 3 mL of water while it is in pin feathers, then thicker (1 g to 2.5 mL, then 1 g to 2 mL) as its feathers open.",
       "Give the amount in the feed calculator each day, split evenly across the feeds, which is up to about 10% of its body weight at each feed, stopping when the crop is comfortably full. There is no black-cockatoo chick chart, so this follows the general parrot hand-rearing guidance; check its progress with an experienced cockatoo carer.",
       "Give 5 feeds a day, about 6 am, 10 am, 2 pm, 6 pm and 10 pm, then leave it about 6 hours overnight so the crop empties fully at least once a day.",
       "Feed it from a small spoon with the sides bent up, letting it pump and swallow at its own pace, and stop if food comes out of its nostrils; never squirt food into its open beak with a syringe, as it can inhale it.",
       "Mix each feed fresh with pre-boiled water at about 50°C, let it stand 2 minutes, feed it at 38 to 40°C (test it on your wrist) and throw out what is left.",
       "Wipe its beak and face clean with a warm damp cloth after each feed so formula does not dry on its feathers.",
       "It gets its fluid from the formula, so it needs no water dish until it starts eating on its own.",
       "Once it is fully feathered, offer soaked or sprouted seed, defrosted peas and corn mixed with Parrot Soft Food, and banksia, hakea and casuarina cones, eucalypt seed and pine cones in a shallow dish, and cut back hand-feeds as it eats more by itself."
      ],
      "activity": [
       "Handle it only for feeds, weighing and cleaning, quickly and gently, and do not talk to it or let visitors see it, as young parrots tame very easily.",
       "If another young yellow-tailed black-cockatoo is in care with an experienced bird carer, raising them together helps it grow up knowing its own kind.",
       "From the aviary stage, give it banksia, hakea and casuarina cones, eucalypt seed and pine cones and fresh branches to forage and chew."
      ],
      "care": [
       "Weigh it every morning at the same time, before the first feed, and enter the weight so the feed calculator stays right.",
       "Keep a daily record of its weight, feeds and progress; your authorisation requires records to be kept for 3 years.",
       "Check it is a yellow-tailed black-cockatoo: if it could be a red-tailed or glossy black-cockatoo, which are threatened in Victoria, your authorisation requires you to tell the Conservation Regulator within 48 hours."
      ],
      "daily_checks": [
       "Morning weight recorded",
       "Crop empty overnight",
       "Droppings look normal",
       "Nest clean and warm",
       "Feathers growing well"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": true,
       "what": "Passwell Hand Rearing Food or Granivore Rearing Mix",
       "weight_g": 400,
       "stage": "Nestling in pin feathers (eyes open)",
       "percent_body_weight_per_day": 50,
       "feeds_per_day": 5,
       "basis": "Wombaroo parrot hand-rearing table: up to 10% of body weight a feed, 5 feeds a day at pin-feather stage.",
       "sure": false
      },
      "release": {
       "ready_when": [
        "Eats seed and natural foods on its own and holds its weight",
        "Flies strongly and lands well the length of the aviary",
        "Full, healthy feathers with no signs of feather or beak disease",
        "Wary of people"
       ],
       "target_weight": "About 750 g for a yellow-tailed black-cockatoo",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather, so it has the day to settle.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Yellow-tailed black-cockatoos travel in family groups and flocks, so release it where a local flock is feeding."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Crop still full in the morning, or slow to empty between feeds",
        "Weight drops, or stays the same for two days",
        "Watery or oddly coloured droppings for more than a day",
        "Feathers that look pinched, curled or bloody, or a beak that looks overgrown, which can mean beak and feather disease"
       ],
       "urgent": [
        "Cold, cannot hold its head up or has collapsed: give nothing by mouth on the way",
        "Food bubbling from its nostrils, or struggling to breathe",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Caught by a cat or dog: a vet the same day, even if no wound can be seen"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines",
       "wires-helping-chicks"
      ]
     }
    },
    {
     "id": "lib-ytbc-adult",
     "stage": "Adult",
     "weight": "about 750 g",
     "text": "Ready-made plan: an adult yellow-tailed black-cockatoo, about 750 g, in care and recovering, with no injuries needing treatment and no medicines. Write a standard plan another carer can follow for a cockatoo like this, from today until release. Use day and week numbers, not calendar dates.",
     "sheet": {
      "animal": "Adult yellow-tailed black-cockatoo",
      "case_number": "",
      "species": "Yellow-tailed black-cockatoo (Zanda funerea)",
      "kind": "wildlife",
      "summary": "This adult yellow-tailed black-cockatoo, about 750 g, is recovering in care with no injuries needing treatment. The goal is to keep it calm and eating well, rebuild its flying fitness and return it to its flock where it was found as soon as it is fit.",
      "photo_findings": [],
      "medications": [],
      "plan": [
       {
        "when": "Days 1 to 3",
        "tasks": [
         "Keep it in a covered hospital cage while it settles."
        ]
       },
       {
        "when": "Once eating well and moving normally",
        "tasks": [
         "Move it to an outdoor flight aviary to rebuild flying fitness."
        ]
       }
      ],
      "housing": [
       "Keep it in a sturdy covered cage with natural branch perches, in a quiet, dim room at the temperature the app shows for adult birds.",
       "Keep it in a quiet room on its own, in a separate air space from any pet birds, with its own dishes and cleaning gear, as serious diseases pass between wild and pet birds through the air.",
       "Use an aviary with weathered or vinegar-washed wire, as new galvanised wire can poison parrots with zinc. Clean the floor and dishes daily.",
       "Wear gloves, a surgical or N95 mask and eye protection when handling it or cleaning, and wash your hands with soap afterwards, as wild parrots in Victoria often carry psittacosis; disinfect dishes and cages with Virkon S at 2% left on for at least 10 minutes, as beak and feather disease survives ordinary cleaners."
      ],
      "feeding": [
       "Offer natural foods first, such as banksia, hakea and casuarina cones, eucalypt seed and pine cones, plus a parrot seed mix (not one heavy in sunflower or other oily seed); never avocado, bread or dairy.",
       "An adult black-cockatoo eats about 40 to 55 g of food a day; weigh what you put in and what is left so you know it is eating.",
       "Put the food in shallow dishes on the floor and near a perch, and top it up every morning.",
       "Keep fresh water in a shallow dish at all times and change it every day.",
       "Once in the aviary, offer most of its food as natural seed heads, cones and branches so it is foraging for itself before release."
      ],
      "activity": [
       "Handle it as little and as quickly as possible, wrapped in a thick towel with your hand firmly behind its head, as black-cockatoos bite very hard; do not try to tame it.",
       "Give it fresh branches to chew every few days, and keep pets, children and noise well away from its cage."
      ],
      "care": [
       "If you develop a fever, headache or cough, tell your doctor you work with wild birds.",
       "Check it is a yellow-tailed black-cockatoo: if it could be a red-tailed or glossy black-cockatoo, which are threatened in Victoria, your authorisation requires you to tell the Conservation Regulator within 48 hours."
      ],
      "daily_checks": [
       "Food eaten, dish topped up",
       "Fresh water given",
       "Perching steadily",
       "Droppings look normal",
       "Breathing quiet"
      ],
      "log_days": 14,
      "feed_calc": {
       "applies": false,
       "what": "",
       "weight_g": 750,
       "stage": "Adult",
       "percent_body_weight_per_day": null,
       "feeds_per_day": null,
       "basis": "Adult eating seed and natural foods; no measured milk or formula amount.",
       "sure": true
      },
      "release": {
       "ready_when": [
        "Flies strongly and lands well the length of the aviary",
        "Eating natural foods and holding its weight",
        "Feathers in good condition and needing no more care",
        "Alert and wary of people"
       ],
       "target_weight": "About 750 g, holding at or above its arrival weight",
       "how": [
        "Release it within 24 hours of it being ready.",
        "Choose a calm, mild morning, never extreme weather.",
        "Carry it in a lined, ventilated box, open it near trees and cover, and step well back.",
        "Release it where a local flock of yellow-tailed black-cockatoos is feeding, as they settle best into an existing group."
       ],
       "where": "Release it where it was found (recorded with GPS coordinates or a Melways reference), or if that spot is unsuitable, at the closest suitable place within its home range; Victorian rules do not allow release anywhere else."
      },
      "escalate": {
       "vet": [
        "Not eating, or losing weight two days running",
        "Watery or oddly coloured droppings for more than a day",
        "Not flying properly once in the flight aviary",
        "Feathers that look pinched, curled or bloody, or a beak that looks overgrown, which can mean beak and feather disease"
       ],
       "urgent": [
        "Fluffed up, sleepy on the floor or collapsed: give nothing by mouth on the way",
        "Struggling to breathe, or tail bobbing with each breath",
        "Tremors, a twisted neck or poor balance, which can be bird flu: also ring the Emergency Animal Disease Watch Hotline on 1800 675 888",
        "Bleeding or a new injury"
       ]
      },
      "rehydration": {
       "needed": false,
       "weight_g": null,
       "dehydration_pct": null,
       "steps": []
      },
      "species_group": "bird",
      "next_visit": "",
      "sources": [
       "vic-cop-welfare-wildlife-rehabilitation",
       "vic-release-requirements",
       "vic-rehabilitator-authorisation-conditions",
       "vic-shelter-foster-carer-authorisation",
       "vic-rehab-guidelines-part-a",
       "vic-h5-bird-flu-wildlife-rehabilitators",
       "wombaroo-native-birds-feeding-guidelines"
      ]
     }
    }
   ]
  }
 ]
};
