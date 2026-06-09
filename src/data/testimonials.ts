export const TESTIMONIALS = [
  {
    name: "Mira Castellanos",
    origin: "Barcelona, Spain",
    trek: "Annapurna Circuit",
    initials: "MC",
    rating: 5,
    year: "2024",
    quote:
      "They treated the mountains with the same reverence we did. Every logistical detail was invisible — all we saw was the route.",
  },
  {
    name: "James Thornton",
    origin: "Edinburgh, Scotland",
    trek: "Patagonia W Trek",
    initials: "JT",
    rating: 5,
    year: "2024",
    quote:
      "I've trekked with seven companies. Summit & Wild is the only one where the guides felt like they genuinely loved the place they were showing you.",
  },
  {
    name: "Priya Nair",
    origin: "Bengaluru, India",
    trek: "Haute Route",
    initials: "PN",
    rating: 5,
    year: "2023",
    quote:
      "Three months later I'm still thinking about waking up on day six to see the Matterhorn appear through cloud. Worth every rupee.",
  },
  {
    name: "Sofia Lindström",
    origin: "Stockholm, Sweden",
    trek: "Laugavegur Trail",
    initials: "SL",
    rating: 5,
    year: "2023",
    quote:
      "The Iceland trek felt like walking through another planet. Our guide knew every fumarole, every colour shift in the rhyolite — pure magic.",
  },
  {
    name: "Daniel Okonkwo",
    origin: "Lagos, Nigeria",
    trek: "Annapurna Circuit",
    initials: "DO",
    rating: 5,
    year: "2022",
    quote:
      "Small group meant real conversations at altitude. By Thorong La we weren't strangers anymore — we were a crew that had earned the pass together.",
  },
  {
    name: "Elena Vasquez",
    origin: "Buenos Aires, Argentina",
    trek: "Patagonia W Trek",
    initials: "EV",
    rating: 5,
    year: "2022",
    quote:
      "Wind, granite, and silence. They didn't rush a single day. When the towers lit up at dawn, half our group was quietly crying.",
  },
] as const;

export const FEATURED_TESTIMONIAL = TESTIMONIALS[1];

export const TESTIMONIAL_STATS = [
  { end: 98, suffix: "%", label: "Would Recommend" },
  { end: 4.9, suffix: "", label: "Average Rating", decimals: 1 },
  { end: 1200, suffix: "+", label: "Guest Reviews" },
] as const;
