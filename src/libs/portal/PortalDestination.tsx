import { usePortal } from "./usePortal";

export function PortalDestination({ gate }: IPortalDestination) {
  const { gates } = usePortal();

  return <>{gates[gate]}</>;
}

export default PortalDestination;

export interface IPortalDestination {
  gate: string;
}
