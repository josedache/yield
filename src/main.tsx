import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import router from "./router";
import "slick-carousel/slick/slick.css";
import { PortalProvider } from "libs/portal";
import "slick-carousel/slick/slick-theme.css";
import MuiThemeProvider from "providers/MuiThemeProvider";
import MuiDatePickerProvider from "providers/MuiDatePickerProvider";
import MuiSnackbarProvider from "providers/MuiSnackbarProvider";
import ReduxStoreProvider from "providers/ReduxStoreProvider";
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://94b24310bc649060f4f2ece29182e797@o4504095760711680.ingest.sentry.io/4506076965699584",
  // Alternatively, use `process.env.npm_package_version` for a dynamic release version
  release: "my-project-name@2.3.12",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost",  /^https:\/\/40\.113\.169\.208:9010\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxStoreProvider>
      <MuiThemeProvider>
        <MuiDatePickerProvider>
          <MuiSnackbarProvider>
            <PortalProvider>
              <RouterProvider router={router} />
            </PortalProvider>
          </MuiSnackbarProvider>
        </MuiDatePickerProvider>
      </MuiThemeProvider>
    </ReduxStoreProvider>
  </React.StrictMode>
);
