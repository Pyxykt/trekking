export const ROUTES = {
  home: "/",
  expeditions: "/expeditions",
  philosophy: "/philosophy",
  guides: "/guides",
  journal: "/journal",
  testimonials: "/testimonials",
  contact: "/contact",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export const NAV_LINKS = [
  { label: "Expeditions", path: ROUTES.expeditions },
  { label: "Philosophy", path: ROUTES.philosophy },
  { label: "Guides", path: ROUTES.guides },
  { label: "Journal", path: ROUTES.journal },
  { label: "Testimonials", path: ROUTES.testimonials },
  { label: "Contact", path: ROUTES.contact },
] as const;
