import { TERMS } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: TERMS,
    lazy: () => import("modules/termsAndConditions/index"),
  },
] as RouteObject[];
