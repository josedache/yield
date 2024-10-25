import AppErrorBoundary from "./AppErrorBoundary";
import { DASHBOARD, ENTRY, FLEX, YIELD_FLEX } from "constants/urls";
import AuthRoutes from "modules/auth/AuthRoutes";
import DashboardRoutes from "modules/dashboard/DashboardRoutes";
import FlexRoutes from "modules/flex/FlexRoutes";
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
            lazy: () => import("./AppPublic"),
            children: [
              {
                lazy: () => import("./modules/auth/Auth"),
                children: AuthRoutes,
              },
            ],
          },
          {
            lazy: () => import("./modules/auth/Auth"),
            children: AuthRoutes,
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
        ],
      },
    ],
  },
]);

export default router;
