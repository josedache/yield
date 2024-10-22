import { ReactNode, useState } from "react";
import PortalContext, { IPortalContextValue } from "./PortalContext";

export function PortalProvider(props: { children: ReactNode }) {
  const [gates, setGates] = useState<IPortalContextValue["gates"]>(() => ({}));

  const teleport: IPortalContextValue["teleport"] = (name, element) => {
    setGates((p) => ({ ...p, [name]: element }));
  };

  const close: IPortalContextValue["close"] = (name) => {
    setGates((p) => {
      const previous = { ...p };
      delete previous[name];
      return previous;
    });
  };

  return (
    <PortalContext.Provider value={{ gates, teleport, close }}>
      {props.children}
    </PortalContext.Provider>
  );
}

export default PortalProvider;
