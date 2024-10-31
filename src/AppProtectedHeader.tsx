import {
  AppBar,
  AppBarProps,
  Avatar,
  Icon,
  IconButton,
  Popover,
  Toolbar,
  Typography,
  // useMediaQuery,
} from "@mui/material";
// import MediaBreakpoint from "enums/MediaBreakpoint";
import usePopover from "hooks/usePopover";
import useSideNavigation from "hooks/useSideNavigation";
import { Icon as Iconify } from "@iconify/react";
import clsx from "clsx";
import useAuthUser from "hooks/useAuthUser";

function AppProtectedHeader(props: AppBarProps) {
  const { ...restProps } = props;

  const authUser = useAuthUser();

  const infoPopover = usePopover();

  const sideNavigation = useSideNavigation();

  // const islg = useMediaQuery(MediaBreakpoint.LG);

  return (
    <>
      <AppBar
        elevation={0}
        position="sticky"
        color="inherit"
        className={clsx(
          "w-full lg:w-[calc(100%-270px)] lg:ml-[270px] bg-white rounded-none border-b border-gray-200"
        )}
        {...restProps}
      >
        <Toolbar disableGutters>
          <div className="flex items-center justify-center gap-2 px-8 w-full">
            <IconButton
              className="lg:hidden"
              color="inherit"
              onClick={() => sideNavigation.toggle()}
            >
              <Icon>
                <Iconify icon="material-symbols:menu" />
              </Icon>
            </IconButton>
            <Typography>
              Hello, <b>{authUser?.firstname}</b>
            </Typography>
            <div className="flex-1" />

            <div className=" border rounded-full w-10 h-10 border-neutral-100 ">
              <IconButton color="inherit" className="" disabled>
                {/* <Badge badgeContent={7} color="error"> */}
                <Iconify className="MuiIcon-root" icon="mdi:bell-outline" />
                {/* </Badge> */}
              </IconButton>
            </div>

            <Avatar src={authUser?.avatar}>
              {authUser?.firstname?.[0]}
              {authUser?.lastname?.[0]}
            </Avatar>
            <Popover
              open={infoPopover.isOpen}
              anchorEl={infoPopover.anchorEl}
              onClose={infoPopover.togglePopover}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              className="p-2"
            ></Popover>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default AppProtectedHeader;
