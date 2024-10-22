import { useCallback } from "react";
import { logout as logoutAction } from "configs/store-actions";
import useStoreDispatch from "./useStoreDispatch";
// import CoreTwoFactorApi from "apis/CoreTwoFactorApi";

function useLogout() {
  const dispatch = useStoreDispatch();

  // const [logoutTwoFactorMutation, logoutTwoFactorMutationResult] =
  //   CoreTwoFactorApi.useLogoutTwoFactorMutation();

  const logout = useCallback(
    function logout() {
      const res = dispatch(logoutAction());
      window.location.reload();
      return res;
    },
    [dispatch]
  );

  return { logout };
}

export default useLogout;
