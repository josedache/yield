import { useEffect } from "react";
import { usePortal } from "./usePortal";
import useDataRef from "hooks/useDataRef";

export function PortalGate(props: IPortalGateProps) {
  const { name, children } = props;
  const portal = usePortal();

  const dataRef = useDataRef({ portal });

  useEffect(() => {
    if (children) {
      dataRef.current.portal.teleport(name, children);
    } else {
      dataRef.current.portal.close(name);
    }
  }, [name, children, dataRef]);

  return null;
}

export default PortalGate;

export interface IPortalGateProps {
  name?: string;
  //   teleport: boolean;
  children?: JSX.Element;
}
