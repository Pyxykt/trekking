export const ROUTES = {
  home: "/",
  treks: "/treks",
  philosophy: "/philosophy",
  guides: "/guides",
  journal: "/journal",
  testimonials: "/testimonials",
  contact: "/contact",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export const NAV_LINKS = [
  { label: "treks", path: ROUTES.treks },
  { label: "Philosophy", path: ROUTES.philosophy },
  { label: "Guides", path: ROUTES.guides },
  { label: "Journal", path: ROUTES.journal },
  { label: "Testimonials", path: ROUTES.testimonials },
  { label: "Contact", path: ROUTES.contact },
] as const;
