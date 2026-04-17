import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/home-page";
import { ToursPage } from "./pages/tours-page";
import { TourDetailPage } from "./pages/tour-detail-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/tours",
    Component: ToursPage,
  },
  {
    path: "/tours/:tourId",
    Component: TourDetailPage,
  },
]);
