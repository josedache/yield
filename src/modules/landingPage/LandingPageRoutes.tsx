import {  LANDING, FAQ } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  { path: LANDING,
    lazy: () => import("modules/landingPage/pages/LandingPage"),
  },
  { path: FAQ,
    lazy: () => import("modules/landingPage/pages/FAQPage"),
  },
] as RouteObject[];
