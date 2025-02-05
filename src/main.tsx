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
import {
  SENTRY_DSN_TOKEN,
  SENTRY_PROPAGATION_TARGETS_URLS,
} from "constants/env";
import { initMixpanel } from "configs/mixpanel";


Sentry.init({
  dsn: SENTRY_DSN_TOKEN,
  release: "Yield",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", ...SENTRY_PROPAGATION_TARGETS_URLS],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

initMixpanel()

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
