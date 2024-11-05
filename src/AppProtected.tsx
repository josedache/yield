/* eslint-disable react-refresh/only-export-components */
import store from "configs/store";
import AppProtectedHeader from "./AppProtectedHeader";
import AppProtectedDrawer from "./AppProtectedDrawer";
import { matchPath, Outlet, redirect } from "react-router-dom";
import { DASHBOARD_KYC, SIGNIN } from "constants/urls";
import { Container } from "@mui/material";
import { userApi } from "apis/user-api";
import LoadingContent from "components/LoadingContent";

function AppProtected() {
  const userClientKycQueryResult = userApi.useGetUserClientKycQuery(undefined);
  const userSelfieFileQueryResult =
    userApi.useGetUserSelfieFileQuery(undefined);

  return (
    <LoadingContent
      loading={
        userClientKycQueryResult.isLoading ||
        userSelfieFileQueryResult.isLoading
      }
      error={
        userClientKycQueryResult.isError || userClientKycQueryResult.isError
      }
      onRetry={() => {
        if (userClientKycQueryResult.isError) {
          userClientKycQueryResult.refetch();
        }

        if (userClientKycQueryResult.isError) {
          userClientKycQueryResult.refetch();
        }
      }}
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

  // const isKycCompleted =
  //   authUser?.kyc_validation?.basic &&
  //   authUser?.kyc_validation?.nin &&
  //   authUser?.kyc_validation?.bank;

  //   console.log(matchPath({ path: DASHBOARD_KYC, end: true }, window.location.pathname))

  // if (
  //   !isKycCompleted &&
  //   !matchPath({ path: DASHBOARD_KYC, end: true }, window.location.pathname)
  // ) {
  //   return redirect(DASHBOARD_KYC);
  // }

  return null;
}
