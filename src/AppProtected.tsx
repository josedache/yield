/* eslint-disable react-refresh/only-export-components */
import store from "configs/store";
import AppProtectedHeader from "./AppProtectedHeader";
import AppProtectedDrawer from "./AppProtectedDrawer";
import { Outlet, redirect } from "react-router-dom";
import { SIGNIN } from "constants/urls";
import { Container } from "@mui/material";
import { userApi } from "apis/user-api";
import LoadingContent from "components/LoadingContent";

function AppProtected() {
  const userClientKycQueryResult = userApi.useGetUserClientKycQuery(undefined);

  return (
    <LoadingContent
      loading={userClientKycQueryResult.isLoading}
      error={userClientKycQueryResult.isError}
      onRetry={userClientKycQueryResult.refetch}
    >
      {() => (
        <>
          <AppProtectedDrawer />
          <AppProtectedHeader />
          <div className="lg:ml-[270px]">
            <Container className="p-4 md:p-8">{<Outlet />}</Container>
          </div>
        </>
      )}
    </LoadingContent>
  );
}

export default AppProtected;

export const Component = AppProtected;

export function loader() {
  const { authUser } = store.getState().global;

  if (!authUser?.isAuthenticated) {
    return redirect(SIGNIN);
  }

  return null;
}
