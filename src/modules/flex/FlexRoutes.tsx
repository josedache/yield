import {} from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    index: true,
    lazy: () => import("modules/flex/pages/Flex"),
  },
] as RouteObject[];
