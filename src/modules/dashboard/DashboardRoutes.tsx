import { DASHBOARD_KYC } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    index: true,
    lazy: () => import("modules/dashboard/pages/DashboardMain"),
  },
  {
    path: DASHBOARD_KYC,
    lazy: () => import("modules/dashboard/pages/DashboardKyc"),
  },
] as RouteObject[];
