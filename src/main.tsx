import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import MuiThemeProvider from "providers/MuiThemeProvider";
import MuiDatePickerProvider from "providers/MuiDatePickerProvider";
import MuiSnackbarProvider from "providers/MuiSnackbarProvider";
import ReduxStoreProvider from "providers/ReduxStoreProvider";
import router from "./router";
import { PortalProvider } from "libs/portal";

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
