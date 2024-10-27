import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import usePopover from "hooks/usePopover";
import FixedPlanDetails from "./FixedPlanDetails";
import useToggle from "hooks/useToggle";

export default function FixedPlanListActionMenu({ info: any }) {
  const popover = usePopover();
  const [isPlanDetails, togglePlanDetails] = useToggle();
  // zondicons:view-show
  const actions = [
    { name: "View", icon: "", onClick: togglePlanDetails },
    // { name: "Edit", icon: "eva:edit-2-fill" },
    // { name: "Delete", icon: "ic:baseline-delete" },
  ];

  return (
    <div>
      <IconButton onClick={popover.togglePopover}>
        <Iconify className="text-3xl text-grey-9" icon="lsicon:more-outline" />
      </IconButton>

      <Menu
        // elevation={0}
        open={popover.isOpen}
        anchorEl={popover.anchorEl}
        onClick={popover.togglePopover}
      >
        {actions.map(({ name, icon, ...rest }) => (
          <MenuItem className="flex gap-2" key={name} {...rest}>
            <Iconify className="text-lg text-text-secondary ml-2" icon={icon} />{" "}
            <Typography
              component="span"
              className="font-semibold text-text-secondary"
            >
              {name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      {isPlanDetails && (
        <FixedPlanDetails onClose={togglePlanDetails} open={isPlanDetails} />
      )}
    </div>
  );
}
