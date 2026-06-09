import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/layout/RootLayout";
import { HomePage } from "../pages/HomePage";
import { ExpeditionsPage } from "../pages/ExpeditionsPage";
import { PhilosophyPage } from "../pages/PhilosophyPage";
import { TestimonialsPage } from "../pages/TestimonialsPage";
import { PlaceholderPage } from "../pages/PlaceholderPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ROUTES } from "../constants/navigation";

const page = (route: string) => route.replace(/^\//, "");

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: page(ROUTES.expeditions), element: <ExpeditionsPage /> },
      { path: page(ROUTES.philosophy), element: <PhilosophyPage /> },
      { path: page(ROUTES.testimonials), element: <TestimonialsPage /> },
      {
        path: page(ROUTES.guides),
        element: (
          <PlaceholderPage
            eyebrow="OUR GUIDES"
            title="The people who know the land"
            description="Profiles of our lead guides are coming soon. Every expedition is led by someone who has walked the route for years."
          />
        ),
      },
      {
        path: page(ROUTES.journal),
        element: (
          <PlaceholderPage
            eyebrow="FIELD JOURNAL"
            title="Stories from the trail"
            description="Dispatches, photography, and notes from recent expeditions. The journal launches this season."
          />
        ),
      },
      {
        path: page(ROUTES.contact),
        element: (
          <PlaceholderPage
            eyebrow="GET IN TOUCH"
            title="Apply for a place"
            description="Tell us about yourself and the route that interests you. We review every application personally."
          />
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
