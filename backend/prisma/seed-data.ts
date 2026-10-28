// Demo content for prisma/seed.ts.
// Users are referenced by their `handle` in posts and comments.

// Every demo account uses this email domain, which is how seed:clear finds them.
export const DEMO_EMAIL_DOMAIN = "seed.sway-demo.com";

export type SeedUser = {
  handle: string;
  name: string;
  intro: string;
};

export type SeedPost = {
  author: string;
  title: string;
  content: string;
  daysAgo: number;
  comments: [author: string, text: string][];
  images?: string[];
};

// Free Unsplash photos (unsplash.com/license), loaded at a feed-friendly size.
function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;
}

export const seedUsers: SeedUser[] = [
  {
    handle: "maya",
    name: "Maya Chen",
    intro: "front end dev 📷 shooting film badly since 2023",
  },
  {
    handle: "omar",
    name: "Omar Haddad",
    intro: "backend at a startup you haven't heard of. coffee snob, recovering",
  },
  {
    handle: "priya",
    name: "Priya Raman",
    intro: "designer. i will notice your 1px misalignment",
  },
  {
    handle: "lucas",
    name: "Lucas Moreau",
    intro: "mtl → toronto. bikes, bread, complaining about the TTC",
  },
  {
    handle: "sofia",
    name: "Sofia Alvarez",
    intro: "cs @ uoft, 3rd year. probably procrastinating rn",
  },
  {
    handle: "daniel",
    name: "Daniel Okafor",
    intro: "PM. thursday night hoops. yes i make spreadsheets for fun",
  },
  {
    handle: "hana",
    name: "Hana Kim",
    intro: "data analyst | 24 plants and counting 🌱",
  },
  {
    handle: "ethan",
    name: "Ethan Brooks",
    intro: "making a tiny farming game in my spare time",
  },
  {
    handle: "aisha",
    name: "Aisha Rahman",
    intro: "nurse 🩺 running my first half in the spring",
  },
  {
    handle: "noah",
    name: "Noah Fischer",
    intro: "beats, synths, too many cables",
  },
  {
    handle: "lena",
    name: "Lena Petrova",
    intro: "devops. hiking. reading 3 books at once and finishing none",
  },
  {
    handle: "kenji",
    name: "Kenji Watanabe",
    intro: "ios dev. i rate every ramen place i go to, ask me",
  },
];

export const seedPosts: SeedPost[] = [
  {
    author: "sofia",
    title: "it's 2am",
    content:
      "and i just found out the assignment is due at 9am not 11:59pm. see you all on the other side",
    daysAgo: 0,
    comments: [
      ["omar", "godspeed"],
      ["daniel", "the classic 9am deadline ambush"],
      ["sofia", "submitted at 8:57. never again (i will do this again)"],
    ],
  },
  {
    author: "maya",
    title: "got my film scans back!!",
    images: [
      unsplash("1720144504914-37656384a6cd"),
      unsplash("1651497706421-1717ba1de16f"),
      unsplash("1526417501781-5e7e587b7686"),
    ],
    content:
      "shot a roll at the distillery district a few weeks ago. like half of them are blurry but the other half?? i'm obsessed. why does film just look better",
    daysAgo: 1,
    comments: [
      ["priya", "post the blurry ones too i bet they're good"],
      ["lucas", "what film stock?"],
      ["maya", "@lucas portra 400! it was $25 a roll i almost cried"],
    ],
  },
  {
    author: "lucas",
    title: "TTC moment",
    content:
      "line 1 stopped for 20 min at bloor because of 'a person at track level'. turned out to be a raccoon. this city man",
    daysAgo: 1,
    comments: [
      ["hana", "the raccoons run this city we just live here"],
      ["aisha", "honestly respect to the raccoon"],
    ],
  },
  {
    author: "omar",
    title: "we merged our microservices back into one app",
    content:
      "took most of the week. deploys went from 25 min to 6, and i can actually follow a request through the logs now. nobody misses the old setup. not saying microservices are bad, we just had 3 devs and 7 services which was insane in hindsight",
    daysAgo: 2,
    comments: [
      ["lena", "3 devs 7 services 💀"],
      ["daniel", "sending this to my eng lead lol"],
      [
        "sofia",
        "wait so i shouldn't split my todo app into microservices for my resume",
      ],
      ["omar", "@sofia please don't"],
    ],
  },
  {
    author: "hana",
    title: "ok i have a problem",
    images: [unsplash("1714691160168-345fae81b682")],
    content:
      "went in for potting soil. left with soil and a variegated monstera. plant 24. my partner just looked at me and walked away",
    daysAgo: 2,
    comments: [
      ["aisha", "24 is fine. 25 is when we stage an intervention"],
      ["maya", "where did you get it?? asking for me"],
      ["hana", "@maya little shop on dundas west, they restock on fridays"],
    ],
  },
  {
    author: "kenji",
    title: "ramen #37 — spicy miso",
    images: [unsplash("1569718212165-3a8278d5f624")],
    content:
      "8.5/10. broth was rich, noodles had a good chew, chili oil actually had flavour and wasn't just pain. egg was overcooked tho (-0.5). went at 6pm on a tuesday and still waited 25 min",
    daysAgo: 3,
    comments: [
      ["omar", "what's #1 so far"],
      ["kenji", "still a tonkotsu place near spadina. nothing's come close"],
      ["lucas", "you need to make a map of these"],
    ],
  },
  {
    author: "ethan",
    title: "devlog: crops can die now",
    content:
      "forget to water for 3 days and they wither. two playtesters already messaged me angry about it which i think means it's working??",
    daysAgo: 3,
    comments: [
      ["noah", "i'll make a sad little wilting sound for it"],
      ["ethan", "@noah YES please"],
    ],
  },
  {
    author: "daniel",
    title: "anyone else's wifi terrible today",
    content: "rogers is down again or is it just me",
    daysAgo: 4,
    comments: [
      ["lena", "not just you, whole building is out"],
      ["kenji", "tethering off my phone like it's 2012"],
    ],
  },
  {
    author: "sofia",
    title: "shipped my first full stack project 🎉",
    content:
      "it's a study group finder for my school. react + express + postgres. auth took me longer than literally everything else combined, cookies just would not send cross origin for 2 days. but it's live and 14 people signed up!!",
    daysAgo: 5,
    comments: [
      ["omar", "auth always takes the longest, congrats!!"],
      ["daniel", "14 real users is more than most side projects ever get"],
      ["priya", "send the link i want to see"],
    ],
  },
  {
    author: "aisha",
    title: "ran 10k without stopping",
    content:
      "6 weeks ago i couldn't run for 5 minutes. today i did 10k. slow as heck but i didn't walk once. half marathon training starts monday 😤",
    daysAgo: 5,
    comments: [
      ["lucas", "that's huge"],
      ["hana", "so proud of you!!"],
      ["lena", "slow is still faster than everyone on the couch"],
    ],
  },
  {
    author: "priya",
    title: "placeholder text is not a label",
    content:
      "reviewed a form today where the only labels were light grey placeholders. looks clean, fails contrast, and disappears the second you start typing. please just use a real label",
    daysAgo: 6,
    comments: [
      ["maya", "...going to go fix my login page"],
      ["sofia", "wait is this why my prof took marks off"],
    ],
  },
  {
    author: "noah",
    title: "made a beat out of kitchen sounds",
    content:
      "pots for drums, wine glass for the melody, fridge hum as the bass. it's dumb and i love it. might put it on soundcloud",
    daysAgo: 7,
    comments: [
      ["hana", "the fridge finally pulling its weight"],
      ["ethan", "this would be perfect for a cooking level in my game"],
    ],
  },
  {
    author: "lucas",
    title: "sourdough attempt 6",
    images: [
      unsplash("1590301157172-7ba48dd1c2b2"),
      unsplash("1767065888377-e5ffb4e39645"),
    ],
    content:
      "IT ROSE. crumb's still a bit tight but it tastes like actual bread and not a hockey puck. starter's name is gerald btw",
    daysAgo: 8,
    comments: [
      ["aisha", "gerald 🫡"],
      ["kenji", "try a longer cold proof overnight, game changer"],
      ["lucas", "@kenji will try next weekend!"],
    ],
  },
  {
    author: "maya",
    title: "css grid finally clicked",
    content:
      "i've been faking everything with flexbox for like 3 years. spent sunday building a photo gallery with grid-template-areas and it's actually so nice?? why did nobody make me learn this sooner",
    daysAgo: 9,
    comments: [
      ["priya", "grid-template-areas is so underrated"],
      ["sofia", "any tutorial you'd recommend?"],
    ],
  },
  {
    author: "lena",
    title: "bruce peninsula this weekend",
    images: [
      unsplash("1662774226033-7707fdd75f3e"),
      unsplash("1598559395580-218189d23004"),
    ],
    content:
      "grotto was PACKED but if you keep going past it the trail gets quiet and the water is this unreal blue. book parking way ahead, it was sold out when we got there at 10",
    daysAgo: 10,
    comments: [
      ["maya", "one of my fav places in ontario"],
      ["priya", "saving this for next summer"],
    ],
  },
  {
    author: "kenji",
    title: "shipped dark mode",
    content:
      "2 weeks. 90% of it was hunting down hardcoded colours in old components. if you're starting a new app please use design tokens from day one, future you will thank you",
    daysAgo: 11,
    comments: [["priya", "the hunt for #ffffff is a rite of passage"]],
  },
  {
    author: "daniel",
    title: "cancelled our weekly status meeting",
    content:
      "replaced it with a shared doc everyone updates by monday noon. same info, an hour back for 8 people. it's been a month and no one has asked to bring it back",
    daysAgo: 12,
    comments: [
      ["omar", "can you come work at my company"],
      ["lena", "async updates are the way"],
    ],
  },
  {
    author: "hana",
    title: "tea rec",
    content:
      "roasted barley tea. no caffeine, kinda nutty, good hot or iced. i've been drinking it every night instead of a 9pm coffee",
    daysAgo: 13,
    comments: [
      ["kenji", "mugicha!! my grandma always had a jug in the fridge"],
    ],
  },
  {
    author: "omar",
    title: "rust week 2",
    content:
      "every time i think i get lifetimes the compiler politely lets me know i do not. the error messages are genuinely helpful though, i'll give it that",
    daysAgo: 15,
    comments: [
      ["ethan", "it clicks around week 4 i promise"],
      ["lena", "strictest code reviewer you'll ever have"],
    ],
  },
  {
    author: "ethan",
    title: "4 hours on a 16x16 chicken",
    content: "it still looks like a potato with legs. pixel art is humbling",
    daysAgo: 16,
    comments: [
      ["noah", "potato chicken is a valid art style"],
      ["sofia", "i would play a whole game about potato chickens"],
    ],
  },
  {
    author: "aisha",
    title: "night shift banana bread",
    images: [unsplash("1632931057819-4eefffa8e007")],
    content:
      "made a double batch for my unit. gone in 20 minutes. next time it's 3 loaves",
    daysAgo: 18,
    comments: [
      ["lucas", "recipe pls"],
      [
        "aisha",
        "@lucas it's literally the one on the back of the flour bag lol, i just add chocolate chips",
      ],
    ],
  },
  {
    author: "noah",
    title: "bought my first modular synth",
    images: [unsplash("1695407773614-db4e06307ee8")],
    content:
      "tiny starter case. i already see why people call it a money pit, every patch cable opens up a new rabbit hole",
    daysAgo: 20,
    comments: [["ethan", "your wallet will never recover. welcome"]],
  },
  {
    author: "sofia",
    title: "anyone want to study algorithms together",
    content:
      "midterm in 2 weeks and dynamic programming still feels like witchcraft. thinking robarts library weekday evenings",
    daysAgo: 22,
    comments: [
      ["daniel", "draw the table first. helps more than you'd think"],
      [
        "omar",
        "write the recursive version, then memoize it. that's the trick",
      ],
    ],
  },
  {
    author: "lucas",
    title: "bloor bike lane",
    content:
      "rode the new section today. not perfect but sooo much better than dodging cars. more of this please",
    daysAgo: 24,
    comments: [
      ["lena", "it's my commute now, love it"],
      ["aisha", "ok i might actually start biking to work"],
    ],
  },
  {
    author: "priya",
    title: "100 days of sketching",
    images: [unsplash("1593472807861-5bb884af28f6")],
    content:
      "drew something every day for 100 days. it's mostly coffee cups and people on the subway lol but my lines are way more confident now",
    daysAgo: 27,
    comments: [
      ["maya", "100 days straight is wild"],
      ["hana", "subway sketches are the best sketches"],
    ],
  },
  {
    author: "lena",
    title: "just finished project hail mary",
    content:
      "stayed up till 3 to finish it. no regrets. if you liked the martian read this immediately",
    daysAgo: 30,
    comments: [
      ["omar", "rocky is the best character i've read all year"],
      ["sofia", "adding it to my winter break list"],
    ],
  },
  {
    author: "maya",
    title: "best dumplings in scarborough?",
    content:
      "need recs. going this weekend with friends, budget friendly preferred",
    daysAgo: 32,
    comments: [
      [
        "kenji",
        "the place in the plaza at sheppard and midland, get the pork & chive",
      ],
      ["hana", "seconding kenji, also cash only so bring cash"],
    ],
  },
  {
    author: "daniel",
    title: "thursday pickup is back",
    content:
      "community centre, 7pm. all skill levels. i'm proof you don't have to be good to have fun",
    daysAgo: 36,
    comments: [["kenji", "i'll come if you need someone to miss free throws"]],
  },
  {
    author: "noah",
    title: "monday",
    content: "that's it that's the post",
    daysAgo: 38,
    comments: [],
  },
  {
    author: "hana",
    title: "first post!",
    content:
      "hi everyone 👋 mostly here to post plants and occasionally complain about excel",
    daysAgo: 42,
    comments: [
      ["aisha", "welcome!!"],
      ["priya", "plant content is the best content"],
    ],
  },
];
