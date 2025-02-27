import AppErrorBoundary from "./AppErrorBoundary";
import { DASHBOARD, ENTRY, FIXED, FLEX, PROFILE, TERMS } from "constants/urls";
import AuthRoutes from "modules/auth/AuthRoutes";
import DashboardRoutes from "modules/dashboard/DashboardRoutes";
import FixedRoutes from "modules/fixed/FixedRoutes";
import FlexRoutes from "modules/flex/FlexRoutes";
import LandingPageRoutes from "modules/landingPage/LandingPageRoutes";
import TermsPageRoutes from "modules/termsAndConditions/TermsPageRoute";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: ENTRY,
    lazy: () => import("./App"),
    ErrorBoundary: AppErrorBoundary,
    children: [
      {
        lazy: () => import("./AppPublic"),
        children: [
          {
            lazy: () => import("./modules/auth/Auth"),
            children: AuthRoutes,
          },
          {
            lazy: () => import("./modules/landingPage/index"),
            children: LandingPageRoutes,
          },
          {
            path: TERMS,
            lazy: () => import("./modules/termsAndConditions/index"),
            children: TermsPageRoutes,
          },
        ],
      },
      {
        lazy: () => import("./AppProtected"),
        children: [
          {
            path: DASHBOARD,
            lazy: () => import("modules/dashboard/Dashboard"),
            children: DashboardRoutes,
          },
          {
            path: FLEX,
            lazy: () => import("modules/flex/Flex"),
            children: FlexRoutes,
          },
          {
            path: FIXED,
            lazy: () => import("modules/fixed/Fixed"),
            children: FixedRoutes,
          },
          {
            path: PROFILE,
            lazy: () => import("modules/profile/Profile"),
          },
        ],
      },
    ],
  },
]);

export default router;
