// Normal ranges and housing temperatures for more groups, checked October 2026. Same rules as species-ranges.js:
// only figures read from the cited sources; anything unverified is left out.
export const EXTRA_RANGES = {
 "microbat": {
  "label": "Microbats (insectivorous bats)",
  "vitals": [
   [
    "Body temperature",
    "Normothermic about 36°C (Gould's and lesser long-eared bats); in torpor it can fall to 1.4-2.3°C"
   ],
   [
    "Heart rate",
    "Resting, awake: up to 803 bpm (Gould's long-eared bat at 5°C air); in deep torpor as low as about 8 bpm"
   ],
   [
    "Adult weight",
    "Little forest bat 3-6 g; southern forest bat 4-7 g; large forest bat 6-10 g; lesser long-eared bat 6-12 g; Gould's long-eared bat 9-13 g; Gould's wattled bat 10-20 g; southern bent-winged bat 11-18 g; eastern falsistrelle 16-28 g; white-striped free-tailed bat 30-40 g; yellow-bellied sheath-tailed bat up to 60 g"
   ]
  ],
  "warmth": [],
  "notes": [
   "Below about 25°C air temperature, long-eared bats usually stay awake only briefly and then enter torpor; a cold, slow bat may be torpid rather than dying.",
   "Microbats can gain about 50% in body weight before winter torpor.",
   "Australian bat lyssavirus has been found in microbats in Victoria; members of the public should not handle any bat.",
   "No verified source found for microbat breathing rates or recommended housing temperatures."
  ],
  "sources": [
   {
    "title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Ch 7 Microbats",
    "publisher": "DEECA (Victoria)",
    "date": "no date printed",
    "authors": "none named",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0028/671248/Part-B-Mammals-Chapter-7.pdf"
   },
   {
    "title": "Torpor, thermal biology, and energetics in Australian long-eared bats (Nyctophilus)",
    "publisher": "Journal of Comparative Physiology B 170(2):153-162",
    "date": "2000",
    "authors": "Geiser F, Brigham RM",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10791575/"
   },
   {
    "title": "Heart rate as a predictor of metabolic rate in heterothermic bats",
    "publisher": "Journal of Experimental Biology 217(9):1519-1524",
    "date": "2014",
    "authors": "Currie SE, Kortner G, Geiser F",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24436390/"
   },
   {
    "title": "Microbats fact sheet",
    "publisher": "Wildlife Victoria",
    "date": "no date printed",
    "authors": "none named",
    "url": "https://www.wildlifevictoria.org.au/learn/fact-sheets/microbats"
   }
  ]
 },
 "platypus": {
  "label": "Platypus",
  "vitals": [
   [
    "Body temperature",
    "About 32°C, both active in water and resting in the burrow"
   ],
   [
    "Adult weight",
    "Males 0.8-3.0 kg; females 0.6-1.7 kg (larger in colder, southern areas)"
   ]
  ],
  "warmth": [
   [
    "Adults: transport and intensive care air temperature",
    "15-25°C"
   ],
   [
    "Enclosure water",
    "Check daily; keep below 27°C"
   ],
   [
    "Danger",
    "Lethargic when water is above 29°C; air above 34°C is considered life-threatening"
   ]
  ],
  "notes": [
   "Platypuses overheat easily; never transport them in water.",
   "Adult males have venomous ankle spurs: lift by the end half of the tail, never support an adult male (or one of unknown sex) from below.",
   "May enter torpor in colder months in Victoria (late May to early September).",
   "No verified source found for platypus heart or breathing rates."
  ],
  "sources": [
   {
    "title": "Code of practice for injured, sick and orphaned monotremes",
    "publisher": "NSW Department of Climate Change, Energy, the Environment and Water",
    "date": "July 2025",
    "authors": "none named (NSW DCCEEW)",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/2025-08/code-of-practice-for-injured-sick-and-oprhaned-monotremes-250251_2.pdf"
   },
   {
    "title": "Platypus body temperature",
    "publisher": "Australian Platypus Conservancy",
    "date": "no date printed",
    "authors": "none named (cites Grant 1983; Grigg et al. 1992; Booth and Connolly 2008)",
    "url": "https://platypus.asn.au/platypus-body-temperature/"
   },
   {
    "title": "Platypus vital statistics",
    "publisher": "Australian Platypus Conservancy",
    "date": "no date printed",
    "authors": "none named (cites Van Dyck et al. 2013)",
    "url": "https://platypus.asn.au/platypus-vital-statistics/"
   },
   {
    "title": "Platypus venom and spurs",
    "publisher": "Australian Platypus Conservancy",
    "date": "no date printed",
    "authors": "none named",
    "url": "https://platypus.asn.au/platypus-venom-and-spurs/"
   }
  ]
 },
 "bandicoot": {
  "label": "Bandicoots",
  "vitals": [
   [
    "Adult weight",
    "Eastern barred bandicoot 750-800 g; southern brown bandicoot 400-1850 g; long-nosed bandicoot 750-1100 g"
   ]
  ],
  "warmth": [
   [
    "Adults in housing",
    "15-25°C (prone to overheating)"
   ],
   [
    "Intensive care adults",
    "about 20-23°C (narrow range)"
   ],
   [
    "Joeys (long-nosed, about 40 days)",
    "28-30°C"
   ],
   [
    "Transport",
    "ideally 18-25°C; avoid capture when air temperature is above 25°C unless urgent"
   ]
  ],
  "notes": [
   "No verified source found for bandicoot body temperature, heart rate or breathing rate."
  ],
  "sources": [
   {
    "title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Ch 1 Bandicoots",
    "publisher": "DEECA (Victoria)",
    "date": "no date printed",
    "authors": "none named",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0025/671263/Part-B-Mammals-Chapter1.pdf"
   }
  ]
 },
 "dasyurid": {
  "label": "Dasyurids (antechinus, dunnarts, phascogales, quolls)",
  "vitals": [
   [
    "Breathing",
    "Regular; may be quite rapid in the smaller species. Panting or open-mouth breathing is abnormal (distress or overheating)"
   ],
   [
    "Adult weight",
    "Agile antechinus: males 20-40 g, females 16-25 g; swamp antechinus: males 50-129 g, females 36-68 g; yellow-footed antechinus: males 26-79 g, females 21-52 g; fat-tailed dunnart 10-20 g; brush-tailed phascogale: males 175-311 g, females 106-212 g"
   ]
  ],
  "warmth": [
   [
    "Torpid juveniles on arrival",
    "warm for 1-2 hours at 25-28°C before feeding, then reassess"
   ],
   [
    "Ongoing",
    "heat source at one end of the enclosure; continue 25°C for 24 hours if needed"
   ],
   [
    "Transport",
    "avoid travelling when air temperature is above 25°C"
   ],
   [
    "Hand-rearing milk",
    "feed at about 36°C"
   ]
  ],
  "notes": [
   "Torpor is normal in antechinus, dunnarts and phascogales during cold weather; juveniles need other animals to keep warm.",
   "Juvenile phascogales struggle to hold body temperature and overheat quickly: watch for panting and wet forelimbs.",
   "No verified source found for dasyurid body temperature or heart rate, or for quoll weights."
  ],
  "sources": [
   {
    "title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Ch 2 Dasyurids",
    "publisher": "DEECA (Victoria)",
    "date": "no date printed",
    "authors": "none named",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0023/671243/Part-B-Mammals-Chapter-2.pdf"
   }
  ]
 },
 "magpie": {
  "label": "Australian magpie",
  "vitals": [],
  "warmth": [
   [
    "Fledglings, juveniles and adults",
    "28°C (general native bird figure)"
   ],
   [
    "Hatchlings, nestlings, branchlings",
    "28-32°C, warmer with fewer feathers"
   ],
   [
    "Head injury (head tilt, circling, uneven pupils)",
    "keep cooler, 21-23°C"
   ]
  ],
  "notes": [
   "No magpie-specific body temperature, heart rate, breathing rate or weight range was verified; figures are the general native bird ones."
  ],
  "sources": [
   {
    "title": "Initial treatment and care guidelines for rescued native birds",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "date": "December 2021",
    "authors": "Dr Kathryn Johnson, with Dr Jenny McLelland, Dr Tania Bishop, Dr Aditi Sriram",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/native-birds-initial-treatment-care-guidelines-210623.pdf"
   },
   {
    "title": "Code of Practice for injured, sick and orphaned native birds",
    "publisher": "NSW Department of Planning and Environment",
    "date": "2022",
    "authors": "none named (NSW DPE)",
    "url": "https://environment.nsw.gov.au/sites/default/files/native-birds-code-of-practice-220229.pdf"
   }
  ]
 },
 "lorikeet": {
  "label": "Lorikeets",
  "vitals": [
   [
    "Weight",
    "Rainbow lorikeet: 120-140 g in a feeding study of six captive birds (not a population range)"
   ]
  ],
  "warmth": [
   [
    "Fledglings, juveniles and adults",
    "28°C (general native bird figure)"
   ],
   [
    "Hatchlings, nestlings, branchlings",
    "28-32°C, warmer with fewer feathers"
   ],
   [
    "Head injury (head tilt, circling, uneven pupils)",
    "keep cooler, 21-23°C"
   ]
  ],
  "notes": [
   "Parrots must not be transported in cardboard boxes as they chew through them.",
   "No lorikeet-specific body temperature, heart rate or breathing rate was verified."
  ],
  "sources": [
   {
    "title": "Initial treatment and care guidelines for rescued native birds",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "date": "December 2021",
    "authors": "Dr Kathryn Johnson, with Dr Jenny McLelland, Dr Tania Bishop, Dr Aditi Sriram",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/native-birds-initial-treatment-care-guidelines-210623.pdf"
   },
   {
    "title": "Code of Practice for injured, sick and orphaned native birds",
    "publisher": "NSW Department of Planning and Environment",
    "date": "2022",
    "authors": "none named (NSW DPE)",
    "url": "https://environment.nsw.gov.au/sites/default/files/native-birds-code-of-practice-220229.pdf"
   },
   {
    "title": "Basic data on food intake, nutrient digestibility and energy requirements of lorikeets",
    "publisher": "Journal of Animal Physiology and Animal Nutrition 91(5-6):282-288",
    "date": "June 2007",
    "authors": "Wolf P, Habich AC, Burkle M, Kamphues J",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17516953/"
   }
  ]
 },
 "pigeon": {
  "label": "Pigeons and doves",
  "vitals": [],
  "warmth": [
   [
    "Fledglings, juveniles and adults",
    "28°C (general native bird figure)"
   ],
   [
    "Hatchlings, nestlings, branchlings",
    "28-32°C, warmer with fewer feathers"
   ],
   [
    "Head injury (head tilt, circling, uneven pupils)",
    "keep cooler, 21-23°C"
   ]
  ],
  "notes": [
   "No pigeon- or dove-specific vital signs or weight range were verified; figures are the general native bird ones."
  ],
  "sources": [
   {
    "title": "Initial treatment and care guidelines for rescued native birds",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "date": "December 2021",
    "authors": "Dr Kathryn Johnson, with Dr Jenny McLelland, Dr Tania Bishop, Dr Aditi Sriram",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/native-birds-initial-treatment-care-guidelines-210623.pdf"
   },
   {
    "title": "Code of Practice for injured, sick and orphaned native birds",
    "publisher": "NSW Department of Planning and Environment",
    "date": "2022",
    "authors": "none named (NSW DPE)",
    "url": "https://environment.nsw.gov.au/sites/default/files/native-birds-code-of-practice-220229.pdf"
   }
  ]
 },
 "frogmouth-owl": {
  "label": "Tawny frogmouth and owls",
  "vitals": [
   [
    "Tawny frogmouth body temperature",
    "Shallow torpor in winter (June-August) with core temperature as low as 29.1°C is normal; not seen in spring and summer"
   ],
   [
    "Tawny frogmouth weight",
    "381-556 g (free-ranging study birds)"
   ],
   [
    "Southern boobook weight",
    "females 195-370 g; males 176-321 g"
   ],
   [
    "Eastern barn owl weight",
    "females 258-470 g; males 250-418 g"
   ],
   [
    "Powerful owl weight",
    "females 1040-1465 g; males 995-2220 g"
   ]
  ],
  "warmth": [
   [
    "Owls unable to keep warm",
    "29°C (owls get agitated in high temperatures)"
   ],
   [
    "Tawny frogmouth (general bird figure)",
    "28°C for adults; head injury 21-23°C"
   ]
  ],
  "notes": [
   "Tawny frogmouths open their mouths as a threat display.",
   "No verified heart or breathing rates."
  ],
  "sources": [
   {
    "title": "Initial treatment and care guidelines for rescued birds of prey",
    "publisher": "NSW Department of Planning and Environment",
    "date": "February 2022",
    "authors": "Dr Aditi Sriram, with Dr Michael Pyne, Dr Gabrielle Tobias, Dr Jana Schader, Dr Beth Mott, Dr Tania Bishop",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf"
   },
   {
    "title": "Initial treatment and care guidelines for rescued native birds",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "date": "December 2021",
    "authors": "Dr Kathryn Johnson, with Dr Jenny McLelland, Dr Tania Bishop, Dr Aditi Sriram",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/native-birds-initial-treatment-care-guidelines-210623.pdf"
   },
   {
    "title": "Torpor in free-ranging tawny frogmouths (Podargus strigoides)",
    "publisher": "Physiological and Biochemical Zoology 74(6):789-797",
    "date": "2001",
    "authors": "Kortner G, Brigham RM, Geiser F",
    "url": "https://pubmed.ncbi.nlm.nih.gov/11731971/"
   }
  ]
 },
 "kookaburra": {
  "label": "Kookaburras",
  "vitals": [
   [
    "Body temperature",
    "Day and night body temperatures differ by about 2.6°C (laughing kookaburra)"
   ],
   [
    "Weight",
    "about 340 g (laughing kookaburras in a metabolic study)"
   ]
  ],
  "warmth": [
   [
    "Fledglings, juveniles and adults",
    "28°C (general native bird figure)"
   ],
   [
    "Hatchlings, nestlings, branchlings",
    "28-32°C, warmer with fewer feathers"
   ],
   [
    "Head injury (head tilt, circling, uneven pupils)",
    "keep cooler, 21-23°C"
   ]
  ],
  "notes": [
   "No kookaburra-specific heart or breathing rate verified; warmth figures are the general native bird ones."
  ],
  "sources": [
   {
    "title": "Initial treatment and care guidelines for rescued native birds",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "date": "December 2021",
    "authors": "Dr Kathryn Johnson, with Dr Jenny McLelland, Dr Tania Bishop, Dr Aditi Sriram",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/native-birds-initial-treatment-care-guidelines-210623.pdf"
   },
   {
    "title": "Code of Practice for injured, sick and orphaned native birds",
    "publisher": "NSW Department of Planning and Environment",
    "date": "2022",
    "authors": "none named (NSW DPE)",
    "url": "https://environment.nsw.gov.au/sites/default/files/native-birds-code-of-practice-220229.pdf"
   },
   {
    "title": "Thermoenergetics of pre-moulting and moulting kookaburras (Dacelo novaeguineae): they're laughing",
    "publisher": "Journal of Comparative Physiology B 173(3):223-230",
    "date": "April 2003",
    "authors": "Buttemer WA, Nicol SC, Sharman A",
    "url": "https://pubmed.ncbi.nlm.nih.gov/12743725/"
   }
  ]
 },
 "seabird": {
  "label": "Seabirds (short-tailed shearwater)",
  "vitals": [],
  "warmth": [
   [
    "Adults (general native bird figure)",
    "28°C"
   ]
  ],
  "notes": [
   "Seabirds need their substrate changed at least three times a day and should have salt-water pools; give salt supplements in long-term care if pools are fresh water.",
   "Shearwaters and prions migrating north should be released from a windy, elevated site.",
   "No shearwater-specific vital signs or weight range were verified."
  ],
  "sources": [
   {
    "title": "Code of Practice for injured, sick and orphaned native birds",
    "publisher": "NSW Department of Planning and Environment",
    "date": "2022",
    "authors": "none named (NSW DPE)",
    "url": "https://environment.nsw.gov.au/sites/default/files/native-birds-code-of-practice-220229.pdf"
   }
  ]
 },
 "penguin": {
  "label": "Little penguin",
  "vitals": [],
  "warmth": [
   [
    "Transport and intensive care",
    "26°C (poor thermoregulation out of water, overheat easily)"
   ]
  ],
  "notes": [
   "Moulting little penguins stay on land for an extended period; that alone is normal.",
   "A patch of oil the size of a thumbnail can kill a little penguin.",
   "No little penguin body temperature, heart rate, breathing rate or weight range was verified."
  ],
  "sources": [
   {
    "title": "Code of Practice for injured, sick and orphaned native birds",
    "publisher": "NSW Department of Planning and Environment",
    "date": "2022",
    "authors": "none named (NSW DPE)",
    "url": "https://environment.nsw.gov.au/sites/default/files/native-birds-code-of-practice-220229.pdf"
   },
   {
    "title": "Wildlife Response",
    "publisher": "Phillip Island Nature Parks",
    "date": "no date printed (checked 23 October 2026)",
    "authors": "none named",
    "url": "https://www.penguins.org.au/conservation/wildlife-response/"
   }
  ]
 },
 "sea-turtle": {
  "label": "Sea turtles",
  "reptile": true,
  "vitals": [
   [
    "Heart rate",
    "needs Doppler or ultrasound to assess (vet)"
   ],
   [
    "Breathing",
    "a forced exhale; rate varies with activity and temperature"
   ]
  ],
  "warmth": [
   [
    "Tank water",
    "23-26°C"
   ],
   [
    "Cold-stunned turtles",
    "start no more than 3°C above the sea temperature where found, raise by no more than 3°C a day to 23-26°C"
   ],
   [
    "Hatchlings in transport",
    "23-27°C on moist sand, never in water"
   ]
  ],
  "notes": [
   "After the first 24 hours turtles can move into warm sea water, starting with short supervised periods in shallow water to check buoyancy, swimming and strength.",
   "No verified weight ranges."
  ],
  "sources": [
   {
    "title": "Guidelines for the initial treatment and care of rescued sea turtles",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "date": "2021",
    "authors": "Duane March, with Dr Larry Vogelnest, Dr David Blyde, Dr Robert Jones and others",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/rescued-sea-turtles-treatment-care-guidelines-210143.pdf"
   }
  ]
 },
 "frog": {
  "label": "Frogs",
  "reptile": true,
  "vitals": [
   [
    "Adult length",
    "Eastern common froglet 18-30 mm; southern brown tree frog 30-60 mm; Peron's tree frog 45-70 mm; green tree frog up to 110 mm; white-lipped green tree frog up to 135 mm"
   ]
  ],
  "warmth": [
   [
    "Victorian frogs",
    "17-23°C; sick frogs at the higher end; humidity 30-60%"
   ],
   [
    "Displaced tropical frogs (short term)",
    "25-28°C air and water; humidity 60-80%"
   ],
   [
    "Transport",
    "25°C or less"
   ],
   [
    "Release",
    "when air is 15-25°C; not below 15°C"
   ]
  ],
  "notes": [
   "Use a fresh pair of gloves for each frog; house frogs individually; return every frog to where it was found (chytrid control).",
   "No verified heart or breathing rates."
  ],
  "sources": [
   {
    "title": "Victorian Wildlife Rehabilitation Guidelines, Part B Reptiles and Amphibians, Ch 4 Frogs",
    "publisher": "DEECA (Victoria)",
    "date": "no date printed",
    "authors": "none named",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0026/671255/Part-B-Reptiles-Amphibians-Chapter-4.pdf"
   }
  ]
 },
 "goanna": {
  "label": "Goannas (lace monitor)",
  "reptile": true,
  "vitals": [
   [
    "Adult size",
    "up to 20 kg; 100-200 cm long"
   ]
  ],
  "warmth": [
   [
    "Preferred body temperature",
    "NSW: 34-36°C; Victoria: 22-28°C (the two guidelines differ)"
   ],
   [
    "Basking spot",
    "NSW: 45-55°C; Victoria: 45°C"
   ]
  ],
  "notes": [
   "The NSW and Victorian guidelines give very different preferred temperature zones for the lace monitor; provide a wide gradient so the animal can choose, and check with a reptile vet."
  ],
  "sources": [
   {
    "title": "Initial treatment and care guidelines for rescued reptiles",
    "publisher": "NSW Department of Planning and Environment",
    "date": "February 2022",
    "authors": "Dr Shane Simpson, with Dr Andrea Reiss, Dr Rebecca Robey, Dr Aditi Sriram",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/reptiles-initial-treatment-care-guidelines-210566.pdf"
   },
   {
    "title": "Victorian Wildlife Rehabilitation Guidelines, Part B Reptiles and Amphibians, Ch 1 Lizards",
    "publisher": "DEECA (Victoria)",
    "date": "no date printed",
    "authors": "none named",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0026/671264/Part-B-Reptiles-Amphibians-Chapter1.pdf"
   }
  ]
 },
 "venomous-snake": {
  "label": "Venomous snakes (elapids)",
  "reptile": true,
  "vitals": [
   [
    "Adult length",
    "Eastern brown and red-bellied black snake 150-250 cm; tiger snake snout-vent 75-85 cm"
   ]
  ],
  "warmth": [
   [
    "Eastern brown snake",
    "Vic: preferred 35°C, basking 32-35°C, gradient 25-35°C summer and 25-30°C winter; NSW: preferred 29-32°C, basking 33-35°C"
   ],
   [
    "Red-bellied black snake",
    "Vic: preferred 31°C, basking 30-33°C, gradient 25-30°C; NSW: preferred 28-31°C, basking 32-34°C"
   ],
   [
    "Tiger snake",
    "Vic: preferred 28-30°C, basking 30-33°C, gradient 25-30°C"
   ],
   [
    "Copperheads",
    "Vic: preferred 28-30°C, basking 30°C, gradient 25-30°C"
   ],
   [
    "Eastern small-eyed snake",
    "Vic: preferred 18-23°C, basking 28°C"
   ],
   [
    "Humidity (all, Vic)",
    "40-80%"
   ]
  ],
  "notes": [
   "Victoria: heat pad under a third of the enclosure floor including the hide, no heat lamps overnight, UV 1-4 hours a day.",
   "Heart rate is rarely useful in reptiles and breathing can be held for long periods; watch effort and open-mouth breathing instead."
  ],
  "sources": [
   {
    "title": "Victorian Wildlife Rehabilitation Guidelines, Part B Reptiles and Amphibians, Ch 2 Snakes",
    "publisher": "DEECA (Victoria)",
    "date": "no date printed",
    "authors": "none named",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0024/671253/Part-B-Reptiles-Amphibians-Chapter-2.pdf"
   },
   {
    "title": "Initial treatment and care guidelines for rescued reptiles",
    "publisher": "NSW Department of Planning and Environment",
    "date": "February 2022",
    "authors": "Dr Shane Simpson, with Dr Andrea Reiss, Dr Rebecca Robey, Dr Aditi Sriram",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/reptiles-initial-treatment-care-guidelines-210566.pdf"
   }
  ]
 }
};
