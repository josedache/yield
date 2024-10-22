/* eslint-disable react-refresh/only-export-components */
import store from "configs/store";
import AppProtectedHeader from "./AppProtectedHeader";
import AppProtectedDrawer from "./AppProtectedDrawer";
import { Outlet, redirect } from "react-router-dom";
import { SIGNIN } from "constants/urls";
import { Container } from "@mui/material";

function AppProtected() {
  return (
    <>
      <AppProtectedDrawer />
      <AppProtectedHeader />
      <div className="lg:ml-[270px]">
        <Container className="p-4 md:p-8">{<Outlet />}</Container>
      </div>
    </>
  );
}

export default AppProtected;

export const Component = AppProtected;

export function loader() {
  const { authUser } = store.getState().global;

  if (!authUser) {
    return redirect(SIGNIN);
  }

  return null;
}
