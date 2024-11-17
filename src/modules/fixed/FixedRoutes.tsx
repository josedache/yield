import {} from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    index: true,
    lazy: () => import("modules/fixed/pages/Fixed"),
  },
] as RouteObject[];
