import { createContext, ReactNode } from "react";

export interface IPortalContextValue {
  gates: { [key: string]: ReactNode };
  teleport: (name: string, element: ReactNode) => void;
  close: (name: string) => void;
}

export const PortalContext = createContext<IPortalContextValue>(null!);

export default PortalContext;
