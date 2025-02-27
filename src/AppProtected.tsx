/* eslint-disable react-refresh/only-export-components */
import store from "configs/store";
import AppProtectedHeader from "./AppProtectedHeader";
import AppProtectedDrawer from "./AppProtectedDrawer";
import { Navigate, Outlet, redirect, useMatch } from "react-router-dom";
import { DASHBOARD_KYC, ENTRY } from "constants/urls";
import { Container } from "@mui/material";
import { userApi } from "apis/user-api";
import LoadingContent from "components/LoadingContent";
import useAuthUser from "hooks/useAuthUser";
import AuthRefreshTokenDialog from "modules/auth/features/AuthRefreshTokenDialog";
import { useEffect } from "react";
import { differenceInSeconds } from "date-fns";
import useToggle from "hooks/useToggle";
import useLogout from "hooks/useLogout";

function AppProtected() {
  const { logout } = useLogout();

  const userClientKycQueryResult = userApi.useGetUserClientKycQuery(undefined);
  const userSelfieFileQueryResult =
    userApi.useGetUserSelfieFileQuery(undefined);

  const [
    isRefreshTokenDialog,
    toggleRefreshTokenDialog,
    setRefreshTokenDialog,
  ] = useToggle();

  const authUser = useAuthUser();

  const isKycCompleted =
    authUser?.kyc_validation?.basic &&
    authUser?.kyc_validation?.nin &&
    authUser?.kyc_validation?.bank;

  useEffect(() => {
    const timer = setInterval(() => {
      if (authUser?.expiresIn) {
        const differenceInExpiration = differenceInSeconds(
          new Date(authUser?.expiresIn),
          new Date()
        );

        if (differenceInExpiration <= 30) {
          setRefreshTokenDialog(true);
        }

        if (differenceInExpiration <= 0) {
          logout();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  const dashboardKycMatch = useMatch({ path: DASHBOARD_KYC, end: true });

  return (
    <LoadingContent
      loading={
        userClientKycQueryResult.isLoading ||
        userSelfieFileQueryResult.isLoading
      }
      error={userClientKycQueryResult.isError}
      onRetry={() => {
        if (userClientKycQueryResult.isError) {
          userClientKycQueryResult.refetch();
        }

        // if (userClientKycQueryResult.isError) {
        //   userClientKycQueryResult.refetch();
        // }
      }}
    >
      {() => (
        <>
          <AppProtectedDrawer />
          <AppProtectedHeader />
          <div className="lg:ml-[270px]">
            <Container className="p-4 md:p-8">{<Outlet />}</Container>
          </div>
          {isRefreshTokenDialog && (
            <AuthRefreshTokenDialog
              open={isRefreshTokenDialog}
              onClose={toggleRefreshTokenDialog}
            />
          )}
          {!isKycCompleted && !dashboardKycMatch ? (
            <Navigate to={DASHBOARD_KYC} />
          ) : null}
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
    return redirect(ENTRY);
  }

  return null;
}
