import { FAQ } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  { index: true, lazy: () => import("modules/landingPage/pages/LandingPage") },
  { path: FAQ, lazy: () => import("modules/landingPage/pages/FAQPage") },
] as RouteObject[];
