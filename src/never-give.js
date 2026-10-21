// "Never give / never do" warnings for wildlife in care. Every entry comes from a checked source.
// The app never recommends a drug or dose; it only picks which of these warnings apply, and shows them word for word.
export const NEVER_GIVE_FOOTER = 'Always check with a vet.';

const RAW = [
  {
    "species": "all",
    "warning": "Never give pain relief, anti-inflammatories, antibiotics or other medicines without a vet's guidance, especially to a dehydrated or shocked animal.",
    "why": "They can have severe side effects, particularly in dehydrated or shocked animals.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 6: Macropods",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0027/671247/Part-B-Mammals-Chapter-6.pdf"
  },
  {
    "species": "macropod",
    "warning": "Never give a joey cow's milk; use a low-lactose formula made for macropods.",
    "why": "The wrong milk causes diarrhoea in joeys.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 6: Macropods",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0027/671247/Part-B-Mammals-Chapter-6.pdf"
  },
  {
    "species": "macropod",
    "warning": "Never mix oral rehydration fluids into a joey's milk; give them between milk feeds.",
    "why": "Mixing them changes how digestible the milk is.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 6: Macropods",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0027/671247/Part-B-Mammals-Chapter-6.pdf"
  },
  {
    "species": "macropod",
    "warning": "Never feed cattle pellets to kangaroos or wallabies.",
    "why": "They may contain coccidiostats, which are fatal to macropods.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 6: Macropods",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0027/671247/Part-B-Mammals-Chapter-6.pdf"
  },
  {
    "species": "macropod",
    "warning": "Never chase a kangaroo, tie its legs, or hand-restrain a conscious one over about 10 kg.",
    "why": "Stress and exertion bring on capture myopathy, which can kill.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 6: Macropods",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0027/671247/Part-B-Mammals-Chapter-6.pdf"
  },
  {
    "species": "macropod",
    "warning": "Never pull a joey out of the pouch by its tail or legs alone.",
    "why": "It can injure the joey; ease it out back first.",
    "source_title": "Guidelines for the initial treatment and care of rescued macropods",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "scope": "au",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/rescued-macropods-treatment-care-guidelines-210038.pdf"
  },
  {
    "species": "macropod",
    "warning": "Never feed a cold joey until it has been warmed and rehydrated.",
    "why": "Joeys must be stabilised before feeding starts.",
    "source_title": "Guidelines for the initial treatment and care of rescued macropods",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "scope": "au",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/rescued-macropods-treatment-care-guidelines-210038.pdf"
  },
  {
    "species": "macropod",
    "warning": "Never force fluids into a joey that won't drink.",
    "why": "It adds stress and raises the risk of aspiration.",
    "source_title": "Guidelines for the initial treatment and care of rescued macropods",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "scope": "au",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/rescued-macropods-treatment-care-guidelines-210038.pdf"
  },
  {
    "species": "koala",
    "warning": "Never hold a wild koala around the chest.",
    "why": "It can fracture ribs and gets the handler injured.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 5: Koalas",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0026/671246/Part-B-Mammals-Chapter-5.pdf"
  },
  {
    "species": "koala",
    "warning": "Never give a koala antibiotics unless a koala-experienced vet prescribes them.",
    "why": "Some antibiotics have caused fatal gut upsets by killing the bacteria koalas need to digest leaf.",
    "source_title": "Clinical comparison of five anti-chlamydial antibiotics in koalas",
    "publisher": "PLOS ONE",
    "scope": "au",
    "url": "https://doi.org/10.1371/journal.pone.0236758"
  },
  {
    "species": "koala",
    "warning": "Never hand-raise a koala joey on its own; raise it in a pair or with adult koalas.",
    "why": "Koala joeys imprint on people very readily.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 5: Koalas",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0026/671246/Part-B-Mammals-Chapter-5.pdf"
  },
  {
    "species": "koala",
    "warning": "Never hold a koala's head fixed while giving oral fluids.",
    "why": "It can stop it swallowing and make it more likely to inhale fluid.",
    "source_title": "Guidelines for the initial treatment and care of rescued koalas",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "scope": "au",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/treatment-care-rescued-koalas-guidelines-200202.pdf"
  },
  {
    "species": "wombat",
    "warning": "Never feed medicated pellets, such as cattle or chicken pellets, to wombats.",
    "why": "They may contain coccidiostats that can be fatal to wombats.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 10: Wombats",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0022/671251/Part-B-Mammals-Chapter-10.pdf"
  },
  {
    "species": "wombat",
    "warning": "Never feed wombats bread, cereal biscuits or muesli mixes.",
    "why": "They cause gum infections and bloat, and lack fibre.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 10: Wombats",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0022/671251/Part-B-Mammals-Chapter-10.pdf"
  },
  {
    "species": "wombat",
    "warning": "Never feed carrots to hand-reared wombats.",
    "why": "Carrots are used as rabbit bait, so it teaches them a dangerous food is safe.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 10: Wombats",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0022/671251/Part-B-Mammals-Chapter-10.pdf"
  },
  {
    "species": "wombat",
    "warning": "Never put a heat pad, heat pack or hot water bottle directly against a joey's skin.",
    "why": "It causes burns, especially in unfurred joeys.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 10: Wombats",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0022/671251/Part-B-Mammals-Chapter-10.pdf"
  },
  {
    "species": "possum",
    "warning": "Never give possum joeys cow's milk; use a possum formula.",
    "why": "The wrong milk causes diarrhoea.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 9: Possums and Gliders",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0021/671250/Part-B-Mammals-Chapter-9.pdf"
  },
  {
    "species": "possum",
    "warning": "Never feed fruit or vegetables to ringtail possums; give browse and the odd native flower.",
    "why": "Ringtails need a browse diet, and fruit can upset their gut bacteria.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 9: Possums and Gliders",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0021/671250/Part-B-Mammals-Chapter-9.pdf"
  },
  {
    "species": "possum",
    "warning": "Never give possums or gliders any medication without checking with a vet first.",
    "why": "As hindgut fermenters they can react badly to some medicines.",
    "source_title": "Initial treatment and care guidelines for rescued possums and gliders",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "scope": "au",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/rescued-possums-gliders-treatment-care-guidelines-210312.pdf"
  },
  {
    "species": "possum",
    "warning": "Never give a cold possum or glider food or fluids until it has been warmed to normal temperature.",
    "why": "Warming comes first; warm gradually over two to three hours.",
    "source_title": "Initial treatment and care guidelines for rescued possums and gliders",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "scope": "au",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/rescued-possums-gliders-treatment-care-guidelines-210312.pdf"
  },
  {
    "species": "echidna",
    "warning": "Never try to uncurl an echidna.",
    "why": "It can worsen injuries and is extremely stressful.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 3: Echidnas",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0024/671244/Part-B-Mammals-Chapter-3.pdf"
  },
  {
    "species": "echidna",
    "warning": "Never let an echidna's enclosure get above about 25°C.",
    "why": "Echidnas can't pant or sweat, so they overheat easily.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 3: Echidnas",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0024/671244/Part-B-Mammals-Chapter-3.pdf"
  },
  {
    "species": "echidna",
    "warning": "Don't raise a puggle on anything but an echidna-specific milk.",
    "why": "Echidna milk is very high in fat and low in lactose; other milks fall short.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 3: Echidnas",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0024/671244/Part-B-Mammals-Chapter-3.pdf"
  },
  {
    "species": "bat",
    "warning": "Never handle any bat unless you're rabies-vaccinated and wearing proper protective gear.",
    "why": "Treat every bat as a possible lyssavirus carrier, which can be fatal to people.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 4: Flying Foxes",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0025/671245/Part-B-Mammals-Chapter-4.pdf"
  },
  {
    "species": "bat",
    "warning": "Never wrap a flying-fox that has come in from a heat event.",
    "why": "Wrapped flying-foxes can die of heat stress within minutes.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 4: Flying Foxes",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0025/671245/Part-B-Mammals-Chapter-4.pdf"
  },
  {
    "species": "bat",
    "warning": "Never cut a flying-fox's wing membrane to free it from wire or netting.",
    "why": "Unwind the wire or cut the netting instead.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 4: Flying Foxes",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0025/671245/Part-B-Mammals-Chapter-4.pdf"
  },
  {
    "species": "bat",
    "warning": "Never give oral fluids to a weak or compromised flying-fox, however thirsty it looks.",
    "why": "It may inhale the fluid.",
    "source_title": "Initial treatment and care guidelines for rescued flying-foxes",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "scope": "au",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/flying-foxes-initial-treatment-care-guidelines-210417.pdf"
  },
  {
    "species": "bat",
    "warning": "Never let a starved juvenile flying-fox eat freely in its first days; start with small, frequent feeds.",
    "why": "Refeeding syndrome can cause a fatal shift in electrolytes and fluids.",
    "source_title": "Initial treatment and care guidelines for rescued flying-foxes",
    "publisher": "NSW Department of Planning, Industry and Environment",
    "scope": "au",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/flying-foxes-initial-treatment-care-guidelines-210417.pdf"
  },
  {
    "species": "bat",
    "warning": "Never feed a microbat until it's warm and rehydrated.",
    "why": "Food comes only after rehydration, and bats take fluids better once warm.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 7: Microbats",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0028/671248/Part-B-Mammals-Chapter-7.pdf"
  },
  {
    "species": "bat",
    "warning": "Never overfeed a microbat pup.",
    "why": "Pups don't stop when full, and bloat is a common cause of death.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Chapter 7: Microbats",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0028/671248/Part-B-Mammals-Chapter-7.pdf"
  },
  {
    "species": "bird",
    "warning": "Never syringe-feed into an open beak as your routine way of feeding a bird.",
    "why": "Birds easily inhale food this way.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Birds, Chapter 1: General birds",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0025/671236/Part-B-Birds-Chapter-1.pdf"
  },
  {
    "species": "bird",
    "warning": "Never use a rubber feeding tube on a parrot.",
    "why": "Parrots can bite through it.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Birds, Chapter 1: General birds",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0025/671236/Part-B-Birds-Chapter-1.pdf"
  },
  {
    "species": "bird",
    "warning": "Never house wild birds in the same room or air space as pet birds.",
    "why": "Serious diseases pass between them through the air.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part A: General Information",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0029/668117/Victorian-Wildlife-Rehabilitation-Guidelines-Part-A-General-Information.pdf"
  },
  {
    "species": "bird",
    "warning": "Never feed feral pigeons to raptors.",
    "why": "Pigeons carry a herpesvirus that can kill raptors.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Birds, Chapter 2: Raptors",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0026/671237/Part-B-Birds-Chapter-2.pdf"
  },
  {
    "species": "seabird",
    "warning": "Never use oil-based ointments or creams on seabirds or waterbirds.",
    "why": "They ruin waterproofing, and the bird can't be released until it returns.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Birds, Chapter 3: Waterbirds and marine birds",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0028/671239/Part-B-Birds-Chapter-3.pdf"
  },
  {
    "species": "seabird",
    "warning": "Never hold a gannet's beak fully shut, or restrain a pelican's beak without a finger between the bills.",
    "why": "Otherwise they can't breathe properly.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Birds, Chapter 3: Waterbirds and marine birds",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0028/671239/Part-B-Birds-Chapter-3.pdf"
  },
  {
    "species": "reptile",
    "warning": "Never pick up or restrain a lizard by its tail.",
    "why": "Blue-tongues and skinks can drop it, and others can suffer spinal damage.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Reptiles and Amphibians, Chapter 1: Lizards",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0026/671264/Part-B-Reptiles-Amphibians-Chapter1.pdf"
  },
  {
    "species": "reptile",
    "warning": "Never let a sick or injured lizard go into brumation.",
    "why": "It can't heal outside its preferred temperature range.",
    "source_title": "Victorian Wildlife Rehabilitation Guidelines, Part B Reptiles and Amphibians, Chapter 1: Lizards",
    "publisher": "Department of Energy, Environment and Climate Action (DEECA), Victoria",
    "scope": "vic",
    "url": "https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0026/671264/Part-B-Reptiles-Amphibians-Chapter1.pdf"
  },
  {
    "species": "reptile",
    "warning": "Never offer food to a reptile until it's warmed to its preferred temperature.",
    "why": "Reptiles depend on outside warmth to process food.",
    "source_title": "Initial treatment and care guidelines for rescued reptiles",
    "publisher": "NSW Department of Planning and Environment",
    "scope": "au",
    "url": "https://www.environment.nsw.gov.au/sites/default/files/reptiles-initial-treatment-care-guidelines-210566.pdf"
  }
];

export const NEVER_GIVE = RAW.map((w, i) => ({ id: `ng-${i + 1}`, ...w }));
const byId = new Map(NEVER_GIVE.map((w) => [w.id, w]));
export const NEVER_GIVE_IDS = () => new Set(byId.keys());
export const lookupNeverGive = (id) => byId.get(id) || null;

/** Compact list for prompts: id | species | warning. */
export function neverGiveForPrompt() {
  return NEVER_GIVE.map((w) => `${w.id} | ${w.species} | ${w.warning}`).join('\n');
}
