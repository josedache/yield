import AppErrorBoundary from "./AppErrorBoundary";
import { DASHBOARD, ENTRY, YIELD } from "constants/urls";
import AuthRoutes from "modules/auth/AuthRoutes";
import YieldRoutes from "modules/yield/YieldRoutes";
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
            index: true,
            lazy: () => import("modules/dashboard/Dashboard"),
          },
          {
            path: DASHBOARD,
            lazy: () => import("modules/dashboard/Dashboard"),
          },
          {
            path: YIELD,
            lazy: () => import("modules/yield/Yield"),
            children: YieldRoutes,
          },
        ],
      },
    ],
  },
]);

export default router;
