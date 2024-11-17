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
