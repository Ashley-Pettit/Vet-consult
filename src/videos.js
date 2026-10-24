// One checked video per species group, from reputable wildlife organisations (verified October 2026 with
// YouTube's own data: title, channel and that it can be embedded). Shown in care plans, loaded only when tapped.
// Care videos per animal, picked and checked October 2026 (YouTube oEmbed confirms each title and channel).
// young: only shown when the plan is about a young animal. Animals with no good care video have none.
export const VIDEOS = {
  'freshwater-turtle': {"id": "8e07wMZh-xY", "title": "How to safely pick up a turtle off the road", "channel": "1 Million Turtles (Western Sydney University)", "date": "2022"},
  'python': {"id": "ipO6DrnsmpE", "title": "What to do if you come across a snake", "channel": "Zoos Victoria", "date": "2023"},
  'goanna': {"id": "Fe2Ey0iveKk", "title": "Learn about the lace monitor", "channel": "Cooberrie Park Wildlife Sanctuary", "date": "2024"},
  'dragon': {"id": "POE6PMLML8A", "title": "Dragon returns to its den: treatment and release", "channel": "RSPCA Queensland", "date": "2022"},
  'platypus': {"id": "z8-WuGeG85g", "title": "How you can help keep the platypus healthy and safe", "channel": "Nillumbik Shire Council", "date": "2026"},
  'brushtail': {"id": "8wc59T3zYMg", "title": "Common brushtail possum pouch rescue", "channel": "Save Our Wildlife Foundation", "date": "2024", "warning": "Shows a mother possum that has died. Removing a joey from the teat is for trained, licensed carers only.", "young": true},
  'koala': {"id": "K-fjzFdSw7U", "title": "Getting help for sick koalas", "channel": "Queensland Government", "date": "2024"},
  'macropod': {"id": "O4cc4_gQW28", "title": "Wallaby joey rescue: how to check a marsupial's pouch", "channel": "Wannon Creek Wildlife", "date": "2023", "warning": "Shows a mother wallaby that has died."},
  'wombat': {"id": "NuebDLqwhaY", "title": "Please stop and check the pouch", "channel": "Badgerys Creek Wildlife Sanctuary", "date": "2022", "warning": "Shows a mother wombat that has died."},
  'ringtail': {"id": "lQGTbcpLhv8", "title": "How to build a ringtail possum drey", "channel": "Warriors 4 Wildlife", "date": "2023"},
  'glider': {"id": "bk8npJVsnVs", "title": "Rescue of a greater glider", "channel": "Toowoomba Koala & Wildlife Rescue", "date": "2024"},
  'flyingfox': {"id": "zpDsh-3YXIY", "title": "International Bat Appreciation Day", "channel": "Wildlife Victoria", "date": "2026", "warning": "Never touch a bat. Only trained, vaccinated people handle bats."},
  'microbat': {"id": "TYkpQIpHBjs", "title": "Building a bat box for microbats", "channel": "Conservation Volunteers Australia", "date": "2024", "warning": "Never touch a bat. Only trained, vaccinated people handle bats."},
  'echidna': {"id": "FuEWBCiMRXY", "title": "Echidna handling", "channel": "Bonorong Wildlife Sanctuary", "date": "", "warning": "The second half shows anaesthesia and an X-ray."},
  'bandicoot': {"id": "myh2-pBSmKs", "title": "How to make a bandicoot-friendly backyard", "channel": "Royal Botanic Gardens Victoria", "date": "2024"},
  'babybird': {"id": "1LhekQU1zOU", "title": "DIY baby bird makeshift nest", "channel": "Western Australian Seabird Rescue", "date": "2023", "young": true},
  'bird': {"id": "z_lhjr3sb-0", "title": "How to rescue an orphaned or injured bird", "channel": "Wildlife Rescue Association of BC (Canada)", "date": "2024", "warning": "A Canadian video: in Australia, call the number in this plan."},
  'lorikeet': {"id": "bg0F486rjWU", "title": "Lorikeet paralysis syndrome", "channel": "RSPCA QLD", "date": "2023"},
  'magpie': {"id": "ZR3FIE1J2FU", "title": "Magpies - should you feed them?", "channel": "WA Wildlife", "date": "2021"},
  'pigeon': {"id": "hbyTI8JVSlU", "title": "Rescuing an injured pigeon: avian vet exam and treatment", "channel": "Bird Vet Melbourne", "date": "2023"},
  'frogmouth-owl': {"id": "k87V8EHCOMM", "title": "Tawny frogmouths in care", "channel": "WIRES", "date": "2018"},
  'raptor': {"id": "J913FAea7C8", "title": "How to catch an injured raptor", "channel": "Carolina Raptor Center (USA)", "date": "2018", "warning": "An American video: in Australia, call the number in this plan, not the US numbers. Wear thick gloves: talons cause the injuries."},
  'waterbird': {"id": "Hh_P-EeiYM8", "title": "How to help ducklings", "channel": "Wildlife Victoria", "date": "2019", "young": true},
  'seabird': {"id": "HrYvOSmYEPM", "title": "How to rescue a grounded seabird", "channel": "Save Our Shearwaters (Hawaii)", "date": "2025", "warning": "A Hawaiian video: in Australia, call the number in this plan."},
  'skink': {"id": "M3UwR_x18ZQ", "title": "Baby blue-tongue lizards at Australia Zoo Wildlife Hospital", "channel": "Australia Zoo", "date": "2026", "young": true},
  'venomous-snake': {"id": "ipO6DrnsmpE", "title": "What to do if you come across a snake", "channel": "Zoos Victoria", "date": "2023"},
  'sea-turtle': {"id": "njdXxSdP_Us", "title": "I found a sea turtle stranded on the beach. What do I do?", "channel": "Sea Turtle Preservation Society (USA)", "date": "2024", "warning": "An American video: in Australia, call the number in this plan, not the US numbers."},
  'frog': {"id": "M0HY-X6n688", "title": "How to build your own frog hotel", "channel": "Currumbin Wildlife Sanctuary", "date": "2024"},
  'pigeon-young': {"id": "nuVsaqD17sY", "title": "How to safely feed a squeaker (baby pigeon)", "channel": "Palomacy Pigeon & Dove Adoptions (USA)", "date": "2022", "young": true, "warning": "An American rescue group. Ask your vet or carer before hand-feeding."},
  'parrot': {"id": "8bZLTfbFrb4", "title": "Sulphur-crested cockatoo entangled in a tree", "channel": "Wildlife Victoria", "date": "2026"},
  'black-cockatoo': {"id": "szjwVRQ9XJQ", "title": "Join us on a cockatoo care round", "channel": "Perth Zoo", "date": "2024"},
  'pelican': {"id": "YRZ3_ZefoeY", "title": "What to do if you hook a pelican", "channel": "Skyway Team Bird Rescue (USA)", "date": "2025", "warning": "An American video: in Australia, call the number in this plan, not the US numbers."},
  'penguin': {"id": "XrVFmjszL9s", "title": "Little penguin rehabilitation in the wildlife clinic", "channel": "Phillip Island Nature Parks", "date": "2021"},
  'shorebird': {"id": "HDpdRtnFjSg", "title": "Protecting our local hooded plovers", "channel": "City of Greater Geelong", "date": "2025"},
  'curlew': {"id": "Bqx7LeIMlAg", "title": "Living with bush stone-curlews", "channel": "Tweed Shire Council", "date": "2021"},
  'cassowary': {"id": "eb6vhKctFZ4", "title": "Be cass-o-wary: staying safe around cassowaries", "channel": "Cassowary Coast Regional Council", "date": "2022"},
  'general': {"id": "PVqgAgfDFyk", "title": "How to contain an injured bird or small animal", "channel": "Wildlife Victoria", "date": "2019"},
};

// Care plans show a video about CARING for the animal (feeding, housing, warmth, handling), picked October 2026 from
// Australian wildlife groups, hospitals and licensed carers, and checked with YouTube's oEmbed (title, channel, embeddable).
// "-young" videos are only for joeys, chicks and other young; an animal with no good care video gets none rather
// than a rescue video. The rescue videos above stay for the MOP plan, where someone is waiting for a rescuer.
export const CARE_VIDEOS = {
  "koala": {"id": "W6nGpjHsx90", "title": "Providing quality food for koalas in care", "channel": "Queensland Environment", "date": "2025"},
  "koala-young": {"id": "R5N0LoXGEnY", "title": "Caring for koala joeys at Ipswich Koala Protection Society", "channel": "WWF-Australia", "date": "2021"},
  "macropod-young": {"id": "inYW6jisj_4", "title": "Raising a kangaroo joey: from bottle feeds to the mob", "channel": "Australia Zoo", "date": "2022"},
  "wombat-young": {"id": "Cz_N4LX8FkE", "title": "How to give a wombat joey a bottle", "channel": "Sleepy Burrows Wombat Sanctuary", "date": "2017"},
  "ringtail": {"id": "3AAfzvOvAmM", "title": "How to build a ringtail possum drey", "channel": "WIRES", "date": "2021"},
  "ringtail-young": {"id": "5vKL2bjUEQ0", "title": "Ringtail possum joeys in care: twins Jack and Jill", "channel": "Megabattie (licensed wildlife carer)", "date": "2022"},
  "brushtail-young": {"id": "fp6pxWYgwI4", "title": "Brushtail possum joeys in care: feeding and care", "channel": "Megabattie (licensed wildlife carer)", "date": "2023"},
  "glider": {"id": "mb8TI-LuoAM", "title": "Feeding an injured sugar glider", "channel": "Rayya The Vet", "date": "2013"},
  "echidna": {"id": "LgpQdHOboB8", "title": "Echidna care, with NQ Wildlife Care’s echidna coordinator", "channel": "NQ Wildlife Care", "date": "2023"},
  "echidna-young": {"id": "wvlBuq2kg2k", "title": "Feeding an echidna puggle", "channel": "NQ Wildlife Care", "date": "2023"},
  "flyingfox": {"id": "GMVCZ52-G0Y", "title": "A young flying-fox in care: the first days", "channel": "Megabattie (licensed wildlife carer)", "date": "2020", "warning": "Never touch a bat. Only trained, vaccinated people handle bats."},
  "flyingfox-young": {"id": "34o4w-kwejY", "title": "Caring for an orphan flying-fox pup", "channel": "Megabattie (licensed wildlife carer)", "date": "2020", "warning": "The pup was found on her mother, who had died. Never touch a bat. Only trained, vaccinated people handle bats."},
  "microbat": {"id": "hGnsJNAe6E8", "title": "A microbat in care", "channel": "Megabattie (licensed wildlife carer)", "date": "2022", "warning": "Never touch a bat. Only trained, vaccinated people handle bats."},
  "bandicoot-young": {"id": "FmJP_m1GZWE", "title": "A baby bandicoot in care", "channel": "Megabattie (licensed wildlife carer)", "date": "2019"},
  "babybird": {"id": "K9FETK07HvQ", "title": "How to help a baby bird", "channel": "Wildlife Victoria", "date": "2019"},
  "frogmouth-owl": {"id": "k87V8EHCOMM", "title": "Tawny frogmouths in care", "channel": "WIRES", "date": "2018"},
  "raptor": {"id": "609kgWiTArQ", "title": "A white-bellied sea eagle in rehabilitation", "channel": "Perth Wildlife Hospital", "date": "2026", "warning": "Wear thick gloves near any bird of prey: the talons cause the injuries."},
  "penguin": {"id": "XrVFmjszL9s", "title": "Little penguin rehabilitation in the wildlife clinic", "channel": "Phillip Island Nature Parks", "date": "2021"},
  "lorikeet": {"id": "bg0F486rjWU", "title": "Lorikeet paralysis syndrome", "channel": "RSPCA QLD", "date": "2023"},
  "pigeon": {"id": "hbyTI8JVSlU", "title": "Rescuing an injured pigeon: avian vet exam and treatment", "channel": "Bird Vet Melbourne", "date": "2023"},
  "pigeon-young": {"id": "nuVsaqD17sY", "title": "How to safely feed a squeaker (baby pigeon)", "channel": "Palomacy Pigeon & Dove Adoptions (USA)", "date": "2022", "warning": "An American rescue group. Ask your vet or carer before hand-feeding."},
  "black-cockatoo": {"id": "szjwVRQ9XJQ", "title": "Join us on a cockatoo care round", "channel": "Perth Zoo", "date": "2024"},
  "skink": {"id": "FeaiB0L78Dg", "title": "Blue-tongue lizard care, with a reptile vet", "channel": "Sugarland Animal Hospital (Bundaberg)", "date": "2020"},
  "skink-young": {"id": "M3UwR_x18ZQ", "title": "Baby blue-tongue lizards at Australia Zoo Wildlife Hospital", "channel": "Australia Zoo", "date": "2026"},
  "dragon": {"id": "POE6PMLML8A", "title": "Dragon returns to its den: treatment and release", "channel": "RSPCA Queensland", "date": "2022"},
  "sea-turtle": {"id": "8bSR0xS06Ik", "title": "Rehabilitating a stranded loggerhead turtle", "channel": "Australia Zoo Wildlife Warriors", "date": "2023"},
};

// Videos about the animal's particular condition (mange, chlamydia, netting, a window strike...), checked October 2026.
// When the plan mentions the condition for one of these animals, this video beats the general species one.
const CONDITION_VIDEOS = [
 {
  "groups": [
   "wombat"
  ],
  "words": [
   "mange",
   "sarcoptic",
   "scabs",
   "crusting",
   "crusty",
   "hair loss",
   "fur loss"
  ],
  "video": {
   "id": "_k6mRUXrmCg",
   "title": "WIRES Community Mange Treatment Program for wombats",
   "channel": "WIRES",
   "date": "2022",
   "condition": "Sarcoptic mange",
   "warning": "NSW program; Victorian and Queensland viewers need their local mange group or wildlife service for treatment kits and permits."
  },
  "care": true
 },
 {
  "groups": [
   "wombat"
  ],
  "words": [
   "pouch",
   "dead mother",
   "mother was hit",
   "mum was hit",
   "mum hit",
   "mother hit",
   "pulled from the pouch",
   "from the pouch"
  ],
  "video": {
   "id": "LUcWXCp-N5E",
   "title": "Wombat master class: how to check a pouch",
   "channel": "Wombat Rescue",
   "date": "2022",
   "condition": "Car strike / pouch check",
   "warning": "Distressing footage of a dead wombat and cutting the pouch. Only cut a pouch when the mother is certainly dead; never pull a joey off the teat."
  }
 },
 {
  "groups": [
   "koala"
  ],
  "words": [
   "chlamydia",
   "conjunctivitis",
   "sore eyes",
   "crusty eyes",
   "wet bottom",
   "dirty bottom",
   "wet bum",
   "cystitis"
  ],
  "video": {
   "id": "zjJJ3rpohU4",
   "title": "How to recognise if a koala is sick and needs to be rescued",
   "channel": "Friends of the Koala",
   "date": "2023",
   "condition": "Chlamydia (eye or wet bottom)",
   "warning": "Northern Rivers NSW group; the phone number shown is theirs. In Qld call 1300 ANIMAL, in Victoria call Wildlife Victoria."
  }
 },
 {
  "groups": [
   "koala"
  ],
  "words": [
   "dehydrat",
   "heatwave",
   "heat wave",
   "heat stress",
   "drinking",
   "drought"
  ],
  "video": {
   "id": "siWnhV4Ybp4",
   "title": "Koala Hospital Wildlife Drinking Stations Project",
   "channel": "Koala Hospital Port Macquarie",
   "date": "2020",
   "condition": "Dehydration / heatwave drinking water",
   "warning": "Do not squirt water from a bottle into a koala's mouth (it can inhale it); offer a bowl and call a rescuer. Just over 5 years old."
  }
 },
 {
  "groups": [
   "macropod"
  ],
  "words": [
   "pouch",
   "dead mother",
   "mother was hit",
   "mum was hit",
   "mum hit",
   "mother hit",
   "from the pouch",
   "pouch young"
  ],
  "video": {
   "id": "O4cc4_gQW28",
   "title": "Wallaby joey rescue: how to check a marsupial's pouch",
   "channel": "Wannon Creek Wildlife",
   "date": "2023",
   "condition": "Pouch young after mother hit by car",
   "warning": "Footage of a dead wallaby. Keep the joey warm, dark and quiet; do not feed it, and never pull a joey off the teat."
  }
 },
 {
  "groups": [
   "brushtail"
  ],
  "words": [
   "dead mother",
   "mother was hit",
   "mum was hit",
   "mum hit",
   "mother hit",
   "from the pouch",
   "pouch young",
   "in the pouch"
  ],
  "video": {
   "id": "jwyh9L0ILZw",
   "title": "Removing a possum joey from a pouch",
   "channel": "WildlifeVictoria",
   "date": "2019",
   "condition": "Orphaned joey (mother dead)",
   "warning": "Warning: dead possum and pouch being cut."
  }
 },
 {
  "groups": [
   "brushtail",
   "ringtail"
  ],
  "words": [
   "in the roof",
   "roof cavity",
   "in the ceiling",
   "ceiling"
  ],
  "video": {
   "id": "QmKd6RVfiuY",
   "title": "Living with possums: Possums in your roof",
   "channel": "Green Adelaide",
   "date": "2023",
   "condition": "Possum in the roof",
   "warning": "South Australian rules; in Vic and Qld check local rules on trapping before using a cage trap."
  }
 },
 {
  "groups": [
   "flyingfox"
  ],
  "words": [
   "netting",
   "net ",
   "tangled in net",
   "caught in net",
   "fruit tree net"
  ],
  "video": {
   "id": "y4KtaMn0wag",
   "title": "Rescuing a flying-fox stuck under fruit netting",
   "channel": "Megabattie",
   "date": "2022",
   "condition": "Caught in fruit-tree netting",
   "warning": "Never touch a bat yourself (Australian bat lyssavirus); only vaccinated, trained rescuers should handle them."
  }
 },
 {
  "groups": [
   "flyingfox"
  ],
  "words": [
   "orphan",
   "pup",
   "creche",
   "crèche"
  ],
  "video": {
   "id": "LzT5ZWZuX8w",
   "title": "Baby flying-foxes goes to creche: Dilly, Wally, Sequoia and Azure",
   "channel": "Megabattie",
   "date": "2021",
   "condition": "Orphaned pups (creche)",
   "warning": "Carer-level content. The public must not handle bats (lyssavirus risk)."
  }
 },
 {
  "groups": [
   "microbat"
  ],
  "words": [
   "on the ground",
   "during the day",
   "in the day",
   "daytime",
   "middle of the day",
   "carport"
  ],
  "video": {
   "id": "ePA0v8YK-v8",
   "title": "Rescuing Flinda: microbat found on the ground",
   "channel": "Megabattie",
   "date": "2025",
   "condition": "Found on the ground in the day",
   "warning": "Do not touch bats bare-handed (lyssavirus). Cover with a box or cloth and call a rescuer."
  }
 },
 {
  "groups": [
   "bird",
   "passerine",
   "magpie",
   "parrot",
   "black-cockatoo",
   "lorikeet",
   "pigeon",
   "frogmouth-owl",
   "raptor",
   "kookaburra",
   "waterbird",
   "seabird",
   "penguin",
   "shorebird",
   "lapwing",
   "curlew",
   "ibis",
   "pelican",
   "cuckoo"
  ],
  "words": [
   "window",
   "concuss",
   "stunned",
   "dazed",
   "head injury",
   "head trauma"
  ],
  "video": {
   "id": "PVqgAgfDFyk",
   "title": "How to contain an injured bird or small animal",
   "channel": "WildlifeVictoria",
   "date": "2019",
   "condition": "Window strike / concussion",
   "warning": "Do not give food or water."
  }
 },
 {
  "groups": [
   "bird",
   "passerine",
   "magpie",
   "parrot",
   "black-cockatoo",
   "lorikeet",
   "pigeon",
   "frogmouth-owl",
   "raptor",
   "kookaburra",
   "waterbird",
   "seabird",
   "penguin",
   "shorebird",
   "lapwing",
   "curlew",
   "ibis",
   "cuckoo"
  ],
  "words": [
   "fishing line",
   "fish hook",
   "fishing hook",
   "hooked",
   "hook in",
   "tangled in line",
   "entangled in line"
  ],
  "video": {
   "id": "u6GnjATo7j8",
   "title": "What to do if you hook a bird while fishing",
   "channel": "Recfishwest",
   "date": "2025",
   "condition": "Fishing line and hook entanglement",
   "warning": "Western Australian: the Wildcare Helpline number is for WA. Use 1300 ANIMAL (Qld) or Wildlife Victoria. If the hook is swallowed, cut the line and leave it for a vet."
  }
 },
 {
  "groups": [
   "bird",
   "passerine",
   "magpie",
   "pigeon",
   "lorikeet",
   "parrot",
   "frogmouth-owl",
   "kookaburra",
   "cuckoo"
  ],
  "words": [
   "fell out of the nest",
   "fell from the nest",
   "fallen from the nest",
   "fallen nestling",
   "fell out of its nest",
   "nest blown",
   "renest",
   "makeshift nest",
   "nestling"
  ],
  "video": {
   "id": "1LhekQU1zOU",
   "title": "DIY baby bird makeshift nest",
   "channel": "Western Australian Seabird Rescue",
   "date": "2023",
   "condition": "Fallen nestling vs fledgling (renesting)",
   "warning": "WA group, so the phone number is for WA. Fledgling advice is brief; a feathered, hopping fledgling on the ground is usually fine and should be left with its parents."
  }
 },
 {
  "groups": [
   "parrot",
   "black-cockatoo",
   "bird"
  ],
  "words": [
   "beak and feather",
   "pbfd",
   "circovirus",
   "psittacine beak"
  ],
  "video": {
   "id": "E1fYUCYJ8cs",
   "title": "Treating beak and feather disease",
   "channel": "Bird Vet Melbourne",
   "date": "2023",
   "condition": "Psittacine beak and feather disease",
   "warning": "Keep infected birds away from other parrots."
  },
  "care": true
 },
 {
  "groups": [
   "waterbird"
  ],
  "words": [
   "pool",
   "swimming pool"
  ],
  "video": {
   "id": "DHUzEaY8_kU",
   "title": "Ducks in your pool? Here's what to do",
   "channel": "Ducks Unlimited Canada",
   "date": "",
   "condition": "Duck or ducklings on a pool",
   "warning": "A Canadian video. In Australia, give ducklings a ramp or float to climb out and call a rescuer if the mother has gone."
  }
 },
 {
  "groups": [
   "freshwater-turtle"
  ],
  "words": [
   "crossing the road",
   "crossing a road",
   "on the road",
   "nesting",
   "laying eggs",
   "gravid"
  ],
  "video": {
   "id": "8e07wMZh-xY",
   "title": "1 Million Turtles - How to safely pick up a turtle off the road",
   "channel": "Ricky Spencer",
   "date": "2022",
   "condition": "Crossing roads in nesting season",
   "warning": "Move it in the direction it was heading and only when safe to stop."
  }
 },
 {
  "groups": [
   "venomous-snake",
   "python"
  ],
  "words": [
   "in the house",
   "inside the house",
   "in the yard",
   "backyard",
   "back yard",
   "in the garden",
   "under the house",
   "laundry",
   "garage"
  ],
  "video": {
   "id": "4uDnkuv2YB8",
   "title": "Spotted a snake in your garden?",
   "channel": "WIRES",
   "date": "2025",
   "condition": "Snake in the house or backyard",
   "warning": "NSW phone number; in Qld call a licensed snake catcher or 1300 ANIMAL, in Victoria a licensed snake catcher or Wildlife Victoria."
  }
 },
 {
  "groups": [
   "frog"
  ],
  "words": [
   "chytrid",
   "skin patches",
   "dark skin",
   "skin shedding",
   "sloughing",
   "lethargic"
  ],
  "video": {
   "id": "ogQyEsP8xkA",
   "title": "New tool saving native frogs (chytrid)",
   "channel": "Gardening Australia",
   "date": "2025",
   "condition": "Chytrid fungus",
   "warning": "Use gloves and wash hands between frogs; never move frogs between ponds."
  }
 },
 {
  "groups": [
   "seal"
  ],
  "words": [
   "beach",
   "sand",
   "resting",
   "hauled out"
  ],
  "video": {
   "id": "U2p31Sj40qk",
   "title": "What to do if you see a seal on the beach",
   "channel": "ifaw (IFAW)",
   "date": "2025",
   "condition": "Seal resting on a beach",
   "warning": "An American video. In Victoria the rule is 30 metres (50 metres with a dog); report a sick seal to Wildlife Victoria or the DEECA Whale and Dolphin Emergency Hotline."
  }
 },
 {
  "groups": [
   "seabird"
  ],
  "words": [
   "shearwater",
   "muttonbird",
   "mutton bird",
   "grounded"
  ],
  "video": {
   "id": "mIp3jUGQolc",
   "title": "Short-tailed shearwaters rescue efforts on Phillip Island",
   "channel": "Phillip Island Nature Parks",
   "date": "2022",
   "condition": "Grounded shearwaters (Phillip Island)"
  }
 }
];

const hasWord = (text, w) => new RegExp(`(^|[^a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(text);
/** The condition video for these animals and words, or null. */
export function conditionVideo(keys, context = '', { care = false } = {}) {
  const t = String(context).toLowerCase();
  const hit = CONDITION_VIDEOS.find((c) => (!care || c.care) && c.groups.some((g) => keys.includes(g)) && c.words.some((w) => hasWord(t, w)));
  return hit ? hit.video : null;
}

const YOUNG = /\b(chick|chicks|nestling|nestlings|fledgling|fledglings|hatchling|branchling|baby|babies|duckling|ducklings|cygnet|juvenile|orphan|orphaned|joey|joeys|pinky|pinkie|puggle|pup)\b/i;
// Species groups used elsewhere in the app (species-ranges.js and species-vet.js) to video keys.
const ALIAS = { bluetongue: 'skink', turtle: 'freshwater-turtle', passerine: 'bird', kookaburra: 'bird', lapwing: 'shorebird', cuckoo: 'bird', ibis: 'bird', 'brush-turkey': null };
// The containment video is about birds and small animals, so it only stands in for those.
const SMALL = new Set(['bird', 'ringtail', 'brushtail', 'glider', 'bandicoot', 'dasyurid', 'general', 'passerine', 'magpie', 'pigeon', 'lorikeet', 'parrot', 'frogmouth-owl', 'kookaburra', 'shorebird', 'black-cockatoo', 'lapwing', 'curlew', 'cuckoo']);

const BIRDS = new Set(['bird', 'passerine', 'magpie', 'pigeon', 'lorikeet', 'parrot', 'frogmouth-owl', 'kookaburra', 'black-cockatoo', 'cuckoo', 'ibis']);

function pick(key, context) {
  const k = key in ALIAS ? ALIAS[key] : key;
  if (!k) return null;
  const young = YOUNG.test(context);
  // A species' own baby video first, then the general baby-bird one.
  if (young && VIDEOS[k + '-young']) return VIDEOS[k + '-young'];
  if (young && VIDEOS[k] && VIDEOS[k].young) return VIDEOS[k];
  if (young && BIRDS.has(key)) return VIDEOS.babybird;
  const v = VIDEOS[k];
  if (!v || (v.young && !YOUNG.test(context))) return null;
  return v;
}

/** The care video for a species group, refined by the plan's own words (a lorikeet gets the lorikeet video). */
export const videoFor = (group, context = '', tags = []) => {
  let keys = [...tags, group].filter(Boolean);
  // A named species beats its class: a brush-turkey chick never gets the general baby-bird (renesting) video.
  if (keys.some((k) => k !== 'bird' && k !== 'reptile')) keys = keys.filter((k) => k !== 'bird' && k !== 'reptile');
  const byCondition = conditionVideo(keys, context);
  if (byCondition) return byCondition;
  for (const key of keys) {
    const v = pick(key, context);
    if (v) return v;
  }
  // Fall back to the containment video only when every animal named is a bird or small animal.
  const named = [...tags, group].filter((g) => g && g !== 'reptile');
  return named.length && named.every((g) => SMALL.has(g)) ? VIDEOS.general : null;
};

/** The care video for a care plan: how to look after this animal (a joey's or chick's own video when it's young), or none. */
export const careVideoFor = (group, context = '', tags = []) => {
  let keys = [...tags, group].filter(Boolean);
  if (keys.some((k) => k !== 'bird' && k !== 'reptile')) keys = keys.filter((k) => k !== 'bird' && k !== 'reptile');
  const byCondition = conditionVideo(keys, context, { care: true });
  if (byCondition) return byCondition;
  const young = YOUNG.test(context);
  for (const key of keys) {
    const k = key in ALIAS ? ALIAS[key] : key;
    if (!k) continue;
    if (young && CARE_VIDEOS[k + '-young']) return CARE_VIDEOS[k + '-young'];
    if (CARE_VIDEOS[k]) return CARE_VIDEOS[k];
    if (young && BIRDS.has(key)) return CARE_VIDEOS.babybird;
  }
  return null;
};

/** The video for the animals detected in a document's text, or none. */
export function videoForTags(tags = [], context = '') {
  return tags.length ? videoFor('', context, tags) : null;
}

export const watchUrl = (v) => `https://www.youtube.com/watch?v=${v.id}`;
export const embedUrl = (v) => `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&autoplay=1`;
export const thumbUrl = (v) => `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
