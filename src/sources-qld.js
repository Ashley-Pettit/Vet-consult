// Queensland reference library for carer plans (checked for the RSPCA Queensland edition, October 2026).
// RSPCA Queensland first, then Queensland Government, then national (scope "au") where Queensland has none.
// Dose figures are deliberately left out: plans record doses only as the vet gave them.
export const QLD_SOURCES = [
  {
    "id": "qld-cop-protected-animals-care",
    "title": "Code of Practice: Care of sick, injured or orphaned protected animals in Queensland (care standards)",
    "publisher": "Queensland Government (DETSI)",
    "scope": "qld",
    "url": "https://www.detsi.qld.gov.au/_global/policy-register/policy-register-pdf?getdoc=1972&name=cp-wl-rehab.pdf",
    "points": [
      "A non-licensed rescuer must hand the animal over within 72 hours of taking it into care.",
      "Critically or seriously injured animals must not be held without vet care where it is reasonably accessible; do not hold them overnight untreated where 24-hour vet care exists.",
      "During transport, unfurred joeys and bird or monotreme hatchlings should be kept at 31–34°C; most other animals at 25–27°C.",
      "Minimise handling, stress and exposure; monitor body temperature when rescuing in conditions above 24°C. Never transport animals in an unventilated boot.",
      "Remove faeces and uneaten food daily, clean food and water containers daily with non-toxic disinfectant, and quarantine animals showing signs of infection.",
      "Bat carers must be vaccinated against Australian bat lyssavirus and keep vaccinations current; only vaccinated people may handle any bat species.",
      "Know each species' diet or seek expert advice; weigh animals at least weekly; animals not feeding must be assessed by a vet or experienced person.",
      "Keep incompatible species apart and out of sight of each other; keep a register including exact rescue location, treatments, weights and outcome."
    ]
  },
  {
    "id": "qld-cop-protected-animals-release",
    "title": "Code of Practice: Care of sick, injured or orphaned protected animals in Queensland (release standards)",
    "publisher": "Queensland Government (DETSI)",
    "scope": "qld",
    "url": "https://www.detsi.qld.gov.au/_global/policy-register/policy-register-pdf?getdoc=1972&name=cp-wl-rehab.pdf",
    "points": [
      "A wildlife vet or experienced rehabilitator must assess the animal as physically and behaviourally fit before release.",
      "Fitness includes healed injuries, normal weight for age and species, finding natural food, avoiding predators and pets, and not being humanised.",
      "Release at the rescue location if it has suitable habitat, shelter, water and food, and is free of hazards such as roadsides or imminent clearing.",
      "If the rescue site is unsuitable, release as close to it as possible, considering the species' home range. No national park release without approval.",
      "Release during the species' normal activity period (day, night or dusk), never in weather likely to cause significant hardship.",
      "Soft release (supplementary food, shelter, water at the site) is preferred for most species; hard release suits only short-term rehabilitation.",
      "Inexperienced carers should seek advice before soft-releasing bats, gliders or macropods. Reptiles are best released in spring and summer.",
      "Migratory species should be released one month before their usual departure period; repeated failed releases require euthanasia."
    ]
  },
  {
    "id": "qld-gov-rehab-permits",
    "title": "Rehabilitation of sick, injured and orphaned animals",
    "publisher": "Queensland Government",
    "scope": "qld",
    "url": "https://www.qld.gov.au/environment/plants-animals/wildlife/injured-and-orphaned-wildlife/rehabilitation-of-sick-injured-and-orphaned-animals",
    "points": [
      "Unlicensed people may rescue sick, injured or orphaned native animals in emergencies, then should pass them to a rehabilitation permit holder immediately.",
      "If immediate handover is impractical, arrangements must be made within 72 hours for the animal to reach a licensed carer.",
      "1300 ANIMAL (1300 264 625) handles sick, injured or orphaned wildlife, 7am to 7pm, 365 days a year.",
      "Marine strandings (turtles, dolphins, dugongs, whales) go to 1300 130 372, option 1.",
      "Do not touch sick or dead wild birds; report suspected bird flu immediately to the Emergency Animal Disease Hotline, 1800 675 888."
    ]
  },
  {
    "id": "qld-des-rescue-and-rehabilitation",
    "title": "Rescue and rehabilitation (wildlife permits)",
    "publisher": "Queensland Department of Environment",
    "scope": "qld",
    "url": "https://environment.des.qld.gov.au/licences-permits/plants-animals/rehabilitation/rescue-and-rehabilitation",
    "points": [
      "No permit is needed to rescue protected native animals, but a rehabilitation permit is needed to look after and rehabilitate them.",
      "Group members may care for animals under a group permit only if authorised on the required form, carried at all times.",
      "Permit holders must keep animals in ways that support release, for example not keeping them with domestic cats or dogs.",
      "Koalas, echidnas, platypuses, raptors and reptiles require carers with extensive experience to obtain a permit.",
      "Anyone keeping a protected animal must notify a conservation officer within 72 hours, unless it was handed to a vet or licensed carer.",
      "Carers must release animals once they can live in their natural habitat."
    ]
  },
  {
    "id": "qld-gov-helping-injured-wildlife",
    "title": "Helping sick, injured or orphaned wildlife",
    "publisher": "Queensland Government",
    "scope": "qld",
    "url": "https://www.qld.gov.au/environment/plants-animals/wildlife/injured",
    "points": [
      "Call 1300 ANIMAL (1300 264 625), 7am to 7pm; the operator may give first aid advice, send a carer, or ask you to transport the animal.",
      "After hours, use the RSPCA Hotline website to find the nearest wildlife rescue organisation.",
      "Record exactly where the animal was found so it can be returned there after treatment.",
      "Any contact with a dog or cat, even a small scratch, needs veterinary assessment; animals that look uninjured may have internal injuries.",
      "By law, finders must hand wildlife to a licensed carer or vet within 72 hours; fines apply."
    ]
  },
  {
    "id": "qld-detsi-what-to-do-found-wildlife",
    "title": "What to do if you find sick, orphaned, or injured wildlife in Queensland",
    "publisher": "Queensland Government (DETSI)",
    "scope": "qld",
    "url": "https://www.detsi.qld.gov.au/our-department/news-media/down-to-earth/what-to-do-if-you-find-sick-orphaned-or-injured-wildlife-in-queensland",
    "points": [
      "Keep a safe distance and call 1300 ANIMAL (1300 264 625) immediately for specialist advice.",
      "Do not touch or pick up the animal unless the operator advises; if moved, place it somewhere safe and quiet.",
      "Limit exposure to people, pets and loud noise, and watch for traffic at roadside rescues.",
      "Never handle adult koalas, kangaroos, snakes, bats or cassowaries; handle echidnas only on expert instruction.",
      "Wildlife are not pets; non-licensed finders must surrender them to a licensed carer or vet within 72 hours."
    ]
  },
  {
    "id": "qld-health-bats-abvl",
    "title": "Bats: protecting yourself against Australian bat lyssavirus",
    "publisher": "Queensland Health",
    "scope": "qld",
    "url": "https://www.health.qld.gov.au/__data/assets/pdf_file/0031/1481395/bats-protecting-yourself-against-abvl-factsheets.pdf",
    "points": [
      "Only trained and vaccinated people should ever touch bats.",
      "After a bite or scratch, gently wash the wound for at least 15 minutes with soap and running water; do not scrub.",
      "Then apply an antiseptic containing povidone-iodine or alcohol (ethanol).",
      "If bat saliva gets in eyes, nose or mouth, flush thoroughly with water.",
      "Seek urgent medical assessment and post-exposure management as soon as possible after any exposure.",
      "Report injured or sick bats to the RSPCA on 1300 ANIMAL (1300 264 625) or a local bat care group."
    ]
  },
  {
    "id": "qld-business-ablv",
    "title": "Australian bat lyssavirus",
    "publisher": "Business Queensland (Biosecurity)",
    "scope": "qld",
    "url": "https://www.business.qld.gov.au/industries/farms-fishing-forestry/agriculture/biosecurity/animals/diseases/guide/australian-bat-lyssavirus",
    "points": [
      "ABLV is related to rabies and causes fatal brain infection; it is found in all four Australian flying-fox species and yellow-bellied sheathtail bats.",
      "Only rabies-vaccinated, trained people wearing protective equipment should rescue or examine bats.",
      "Wildlife carers and others with bat contact should seek medical advice about pre-exposure rabies vaccination.",
      "Spread is mainly via bites, scratches, or saliva into wounds or mucous membranes.",
      "If a pet may have been bitten or scratched by a bat, contact a vet promptly.",
      "Report suspected ABLV in an animal to Biosecurity Queensland on 13 25 23 or the Emergency Animal Disease Hotline, 1800 675 888."
    ]
  },
  {
    "id": "rspca-qld-wildlife-hospital",
    "title": "Wildlife Hospital",
    "publisher": "RSPCA Queensland",
    "scope": "qld",
    "url": "https://www.rspcaqld.org.au/what-we-do/care-for-animals/wildlife-hospital",
    "points": [
      "The Wacol Wildlife Hospital is open 24/7 with vets on site; the Eumundi Rehabilitation Centre is open 7am to 5pm.",
      "Take injured wildlife to the nearest vet, call a local wildlife carer, or call 1300 ANIMAL (1300 264 625).",
      "Only permitted wildlife carers may keep wildlife at their property; carers must hold or be endorsed under a rehabilitation permit and follow the Code.",
      "Do not touch flying-foxes; seek medical attention immediately after any bite or scratch.",
      "Animals that cannot be released, such as those with incurable conditions, are euthanised in line with Queensland regulations.",
      "Stranded marine animals should be reported on 1300 130 372."
    ]
  },
  {
    "id": "wildcare-australia-rescue-info",
    "title": "Rescue information",
    "publisher": "Wildcare Australia (South-east Queensland)",
    "scope": "qld",
    "url": "https://wildcare.org.au/rescue-information/",
    "points": [
      "Wildcare Hotline 07 5527 2444 runs 24 hours, 7 days, covering Gold Coast, Logan, Ipswich, Scenic Rim and Brisbane regions.",
      "If safe, cover the animal including its head with a towel, lift gently, and place in a ventilated, towel-lined box.",
      "Transport in the car cabin, never the boot, and keep the animal somewhere warm, dark and quiet; stress can kill quickly.",
      "Do not offer any food or water; feeding an animal in shock can be fatal.",
      "Check pouches of injured kangaroos, wallabies, possums, koalas and wombats; never pull a joey off the teat.",
      "Do not handle adult kangaroos, wallabies or koalas, snakes, or bats; local vets generally do not accept bats or snakes."
    ]
  },
  {
    "id": "rspca-qld-foster",
    "title": "Foster care",
    "publisher": "RSPCA Queensland",
    "scope": "qld",
    "url": "https://www.rspcaqld.org.au/foster",
    "points": [
      "Foster animals include litters, mothers with young, orphaned neonates, post-surgery pets and animals not coping with shelter life.",
      "RSPCA supplies food, bedding, a travel crate, vet care, toys, leads and collars.",
      "Carers transport foster animals to RSPCA facilities for routine and emergency vet visits and must live within one hour's drive.",
      "Foster animals must not be boarded externally, taken on holiday, or left with people who are not RSPCA carers.",
      "Give foster animals attention before and after work; secure fencing is required, at least 4 ft for puppies and small breeds.",
      "For a seriously injured or trapped animal, call 1300 264 625."
    ]
  },
  {
    "id": "awlq-foster-carer-manual",
    "title": "Foster Program carer manual",
    "publisher": "Animal Welfare League Queensland",
    "scope": "qld",
    "url": "https://reference.awlqld.com.au/wp-content/uploads/2022/09/2022_AWLQ_FosterCarerManual_FINAL.pdf",
    "points": [
      "Never feed foster cats or kittens milk, including cat milk; kittens should have dry food and water at all times.",
      "Puppies get 3–4 meals daily depending on age and should be let out to toilet at least every two hours.",
      "Give only vet-prescribed medicines, finish the full course, never stop early, and do not re-dose if a cat spits out liquid medication.",
      "Parvovirus has no cure and survives in the environment for months or years; isolate cats with cat flu from all other cats.",
      "Clean with disinfectant and hot water; use bleach for contagious disease and let it dry fully before animals walk on it.",
      "Get a vet check for discharge, coughing or laboured breathing, vomiting, diarrhoea, straining, bleeding, lethargy, paralysis or not eating.",
      "Normal cat temperature is 37.7–39.1°C; skin staying tented on a pinch test means severe dehydration needing a vet.",
      "Weigh young kittens about every 3–4 days; use newspaper or recycled woodchip litter, not clay or crystal."
    ]
  },
  {
    "id": "rspca-act-kitten-foster-manual",
    "title": "Kitten Foster Care Manual",
    "publisher": "RSPCA ACT",
    "scope": "au",
    "url": "https://rspca-act.org.au/sites/default/files/2024-07/RSPCA%20ACT%20Kitten%20Foster%20Care%20Manual%20v.2023.pdf",
    "points": [
      "Bottle-feed neonatal kittens kitten formula every 2–3 hours from birth to 2 weeks; cow's milk causes diarrhoea and must not be fed.",
      "Orphan kittens must be stimulated to toilet; litter training starts around 3 weeks, with one tray per two kittens.",
      "Weigh kittens daily at the same time; expect gains of 10–15 g a day and contact the clinic if no gain in 48 hours.",
      "Give only vet-prescribed medications and record every dose; wash hands after handling kittens.",
      "Socialise with two to three 20-minute sessions daily; kittens need at least 800 g before desexing.",
      "Emergency: kitten weak or cannot be roused, breathing difficulty, any bleeding or trauma, vomiting over 12 hours, or ongoing weight loss.",
      "Disinfect rooms between litters with bleach diluted 1 part to 32 parts cold water."
    ]
  },
  {
    "id": "rspca-nsw-foster-care-manual",
    "title": "Foster Care Manual",
    "publisher": "RSPCA NSW",
    "scope": "au",
    "url": "https://rspcansw.org.au/wp-content/uploads/2020/06/Foster-Care-Manual-RSPCA101_19_compressed.pdf",
    "points": [
      "Low body temperature is the number one danger to newborn puppies; keep them warm.",
      "Neonatal puppies 0–2 weeks need 6 feeds in 24 hours, every 2–4 hours; warm formula to about 35–37°C.",
      "Bottle-feed puppies lying on their stomach and never squeeze the bottle to force formula.",
      "Without a mother, rub the genital area and anus with a warm cloth before and after feeds; start house training at 4 weeks.",
      "Puppies under 16 weeks get three meals daily; unvaccinated puppies should socialise only at home or in the backyard.",
      "Remove faeces and soiled pads at least twice daily; clean bowls daily with hot soapy water.",
      "Urgent: breathing difficulty, any bleeding, trauma, repeated vomiting, diarrhoea over 24–36 hours, or not eating for over a day.",
      "Fading puppies may not survive 48 hours; contact the coordinator or vet straight away."
    ]
  },
  {
    "id": "ava-vetvoice-post-surgery",
    "title": "Post-surgery care for your pet",
    "publisher": "Australian Veterinary Association (Vet Voice)",
    "scope": "au",
    "url": "https://www.vetvoice.com.au/ec/pet-ownership/post-surgery-care-for-your-pet/",
    "points": [
      "Check the wound daily for redness, discharge, swelling or opening, and keep it clean and dry.",
      "Stop the pet licking the wound; use an Elizabethan collar (cone) if needed.",
      "Keep the pet quiet and confined for 10–14 days; pets with belly wounds such as desexing should not run or jump.",
      "Pets may be sleepy or wobbly for 12–24 hours; offer water first, then small meals if the vet approves.",
      "Give pain relief exactly as labelled; signs of pain include hunching, reluctance to move or eat, and avoiding touch.",
      "Phone the vet promptly for significant pain, wound problems or general unwellness."
    ]
  },
  {
    "id": "usyd-vet-emergency-signs",
    "title": "Signs and symptoms FAQs (emergency)",
    "publisher": "University of Sydney Veterinary Teaching Hospitals",
    "scope": "au",
    "url": "https://www.sydney.edu.au/vet-hospital/emergency/signs-and-symptoms-faqs.html",
    "points": [
      "Seek urgent vet care for difficulty breathing or collapse, including pale gums or laboured breathing.",
      "Severe trauma or bleeding, or blood in vomit, diarrhoea or urine, is an emergency.",
      "Seizures, sudden weakness or paralysis need immediate veterinary attention.",
      "Straining to urinate while producing nothing, or only drops, is urgent.",
      "Suspected poisoning (e.g. chocolate, grapes, xylitol, rat bait, human medicines) needs immediate vet contact.",
      "Persistent vomiting or diarrhoea is urgent."
    ]
  },
  {
    "id": "nsw-code-flying-foxes",
    "title": "Code of Practice for Injured, Sick and Orphaned Flying-Foxes",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "scope": "au",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/code-practice-injured-sick-orphaned-flying-foxes-210416.pdf",
    "points": [
      "Only vaccinated handlers may rescue, handle or release flying-foxes.",
      "Wear a mask and puncture-resistant gloves; change gloves between animals to prevent disease spread.",
      "Orphans need about 28°C, adults 25–27°C, and premature or very ill animals 29–31°C.",
      "Feed orphans stage-appropriate milk formula with sterilised bottles and teats; adults get fruit plus a protein supplement daily.",
      "Do not release until forearm reaches 140 mm and weight 400 g; release near an occupied camp closest to where found.",
      "Release hand-reared animals with other flying-foxes and post-release support; avoid extreme heat and storms."
    ]
  },
  {
    "id": "nsw-code-macropods",
    "title": "Code of Practice for injured, sick and orphaned macropods",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "scope": "au",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/code-practice-injured-sick-orphaned-macropods-20210203.pdf",
    "points": [
      "Stress can cause injury or capture myopathy; never tie legs or use hessian or plastic bags in capture.",
      "Transport temperatures: about 32°C for unfurred joeys, 30°C lightly furred, 28°C fully furred.",
      "Hand-reared joeys need lactose-free, species-appropriate formula; sterilise feeding equipment before every feed for pinkies.",
      "Base diets on natural grasses, hay and native shrubs; do not feed carrots and avoid dog biscuits.",
      "Rescued macropods must be assessed by a vet or experienced rehabilitator within 24 hours.",
      "Release at the rescue site if suitable; if the find location is unknown, do not release.",
      "Release hand-reared social species near or into a mob; soft release is preferred; avoid extreme heat and storms."
    ]
  },
  {
    "id": "nsw-code-native-birds",
    "title": "Code of Practice for injured, sick and orphaned native birds",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "scope": "au",
    "url": "https://environment.nsw.gov.au/sites/default/files/native-birds-code-of-practice-220229.pdf",
    "points": [
      "Before assessment, rest a stable bird in a warm, dark, quiet place for 30 minutes.",
      "Transport hatchlings and nestlings at 28–32°C, using the higher end for unfeathered young.",
      "Nestlings must not have water dishes; provide fluids through a balanced, species-appropriate diet that mimics wild food.",
      "Take any bird suspected of a cat or dog attack to a vet immediately.",
      "Reduce psittacosis risk with mask, gloves and gown, and wash hands before and after each bird.",
      "Release at the find location if suitable, otherwise the nearest suitable site; some birds move less than one kilometre.",
      "Release most day-active birds about one hour after dawn; nocturnal birds about one hour after dark."
    ]
  },
  {
    "id": "nsw-code-reptiles",
    "title": "Code of Practice for injured and sick reptiles and amphibians",
    "publisher": "NSW Department of Climate Change, Energy, the Environment and Water",
    "scope": "au",
    "url": "https://environment.nsw.gov.au/sites/default/files/code-of-practice-for-injured-and-sick-reptiles-and-amphibians-240286.pdf",
    "points": [
      "Provide warmth on admission and a thermal gradient so reptiles can thermoregulate; thermostat-control electric heat.",
      "Diurnal reptiles need UV or natural light with no glass between the source and the animal.",
      "Feed only when the reptile is within its preferred temperature zone; refeed thin animals slowly at one-third daily energy needs.",
      "Reduce salmonella risk: wash hands after handling and never kiss reptiles or carry them inside clothing.",
      "Major trauma such as dog attack, vehicle strike or burns needs veterinary assessment within 24 hours.",
      "Release at the find site; if unsuitable, stay within set distances, e.g. 20 m for small skinks, 2 km for large venomous snakes.",
      "Do not release during storms or cold snaps below 10°C at night; release diurnal species mid-morning."
    ]
  },
  {
    "id": "qld-birdflu-wildlife-rehabilitators",
    "title": "H5 bird flu: information for wildlife rehabilitators",
    "publisher": "Queensland Government",
    "scope": "qld",
    "unbaked": true,
    "url": "https://www.qld.gov.au/initiative/birdflu/wildlife-rehabilitators",
    "points": [
      "H5 bird flu is nationally notifiable: anyone who suspects it has a legal duty to report it straight away to the Emergency Animal Disease Hotline, 1800 675 888.",
      "It spreads in droppings and breathing secretions, and on contaminated clothing, footwear and equipment, so keep possible cases away from other animals in care.",
      "Carers are not obliged to take in a suspected case; infected birds have a low chance of recovery.",
      "Follow the Wildlife Health Australia toolkit for rehabilitators on protective equipment, quarantine and cleaning."
    ]
  },
  {
    "id": "qld-avian-influenza-signs",
    "title": "Avian influenza (bird flu): signs and control",
    "publisher": "Business Queensland (Biosecurity Queensland)",
    "scope": "qld",
    "unbaked": true,
    "url": "https://www.business.qld.gov.au/industries/farms-fishing-forestry/agriculture/alerts/avian-influenza/signs-control",
    "points": [
      "Signs in birds: sudden death, often within 24 hours; poor coordination, tremors and swimming in circles; depression, ruffled feathers, breathing trouble and diarrhoea.",
      "5 or more sick or dead wild birds in one place should be reported for investigation.",
      "Report to Biosecurity Queensland on 13 25 23 in business hours, or the Emergency Animal Disease Hotline, 1800 675 888, any time.",
      "Head injury and poisoning can cause the same nervous signs, so report first and let testing decide.",
      "Avian influenza is restricted and prohibited matter under the Biosecurity Act 2014."
    ]
  },
  {
    "id": "qld-h5-current-situation",
    "title": "Current situation: H5 bird flu",
    "publisher": "Business Queensland (Biosecurity Queensland)",
    "scope": "qld",
    "unbaked": true,
    "url": "https://www.business.qld.gov.au/industries/farms-fishing-forestry/agriculture/alerts/avian-influenza/current-situation",
    "points": [
      "H5 bird flu has been confirmed in wild birds in Queensland, first in a petrel on Moreton Island in July 2026; check this page for the latest detections.",
      "Wild bird carers avoid contact with domestic birds, especially commercial poultry, for 48 hours before and after handling wild birds.",
      "There is no known treatment for bird flu in wild birds, and affected animals are unlikely to survive.",
      "Anyone who suspects bird flu has a legal duty to report it immediately: 1800 675 888."
    ]
  }
];
