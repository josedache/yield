import { useCallback } from "react";
import { logout as logoutAction } from "configs/store-actions";
import useStoreDispatch from "./useStoreDispatch";
import { userApi } from "apis/user-api";

function useLogout() {
  const dispatch = useStoreDispatch();

  const [logoutUserMutation, logoutUserMutationResult] =
    userApi.useLogoutUserMutation();

  const logout = useCallback(
    function logout() {
      const res = dispatch(logoutAction());
      window.location.reload();
      return res;
    },
    [dispatch]
  );

  return { logout, logoutUserMutation, logoutUserMutationResult };
}

export default useLogout;
