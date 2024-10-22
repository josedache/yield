import { useStoreSelector } from "./useStoreSelector.ts";

function useAuthUser() {
  return useStoreSelector((state) => state.global.authUser);
}

export default useAuthUser;
