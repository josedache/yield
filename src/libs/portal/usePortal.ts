import { useContext } from "react";
import PortalContext from "./PortalContext";

export function usePortal() {
  return useContext(PortalContext);
}

export default usePortal;
