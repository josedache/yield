import { PortalProvider as Provider } from "libs/portal";
import { ReactNode } from "react";

/**
 *
 * @param {PortalProviderProps} props
 * @returns
 */
export function PortalProvider(props: PortalProviderProps) {
  const { children } = props;

  return <Provider>{children}</Provider>;
}

export default PortalProvider;

export type PortalProviderProps = { children: ReactNode };
