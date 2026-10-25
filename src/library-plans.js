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
  }
 ]
};
