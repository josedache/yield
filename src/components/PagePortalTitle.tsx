import { Typography } from "@mui/material";
import { PAGE_TITLE } from "constants/portal";
import PortalGate from "libs/portal/PortalGate";

function PagePortalTitle(props: any) {
  return (
    <PortalGate name={PAGE_TITLE}>
      <Typography variant="h5" className="font-semibold">{props.children}</Typography>
    </PortalGate>
  );
}

export default PagePortalTitle;
