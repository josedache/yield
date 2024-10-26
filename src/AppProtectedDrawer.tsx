import {
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import clsx from "clsx";
import Logo from "components/Logo";
import {
  DASHBOARD,
  FLEX,
  PROFILE,
  SETTINGS,
  SUPPORT,
  YIELD,
} from "constants/urls";
import MediaBreakpoint from "enums/MediaBreakpoint";
import useSideNavigation from "hooks/useSideNavigation";
import { NavLink, NavLinkProps } from "react-router-dom";
import { Icon as Iconify } from "@iconify-icon/react";
import useLogout from "hooks/useLogout";

function AppProtectedDrawer() {
  const islg = useMediaQuery(MediaBreakpoint.LG);

  const { logout } = useLogout();

  const sideNavigation = useSideNavigation();

  const NAV_LINKS = [
    {
      children: [
        {
          icon: "hugeicons:dashboard-square-02",
          children: "Dashboard",
          to: DASHBOARD,
        },
        {
          icon: "ph:plant",
          children: "Yield",
          to: FLEX,
        },
        {
          icon: "iconoir:profile-circle",
          children: "Profile",
          to: PROFILE,
        },
      ],
    },
    {
      children: [
        {
          icon: "ep:chat-dot-round",
          children: "Support",
          to: SUPPORT,
        },
        {
          icon: "la:cog",
          children: "Settings",
          to: SETTINGS,
        },
        {
          icon: "ion:power-outline",
          children: "Logout",
          onClick: logout,
        },
      ],
    },
  ] as { children: ({ icon?: string } & NavLinkProps)[] }[];

  return (
    <>
      <Drawer
        open={sideNavigation.isOpen}
        variant={islg ? "permanent" : "temporary"}
        PaperProps={{
          rounded: "default",
          className: clsx(
            "flex flex-col border-r-0 w-[270px] bg-primary-darker text-primary-contrastText",
            islg ? "" : "bg-none"
          ),
        }}
        onClose={() => sideNavigation.toggle()}
      >
        <Toolbar className="flex items-center justify-between mt-6">
          <Logo variant="1" />
          {!islg && (
            <IconButton color="inherit" onClick={() => sideNavigation.toggle()}>
              <Icon>chevron_left</Icon>
            </IconButton>
          )}
        </Toolbar>
        <List className="p-4 md:p-6 flex-1 min-h-0 overflow-y-auto space-y-1">
          {NAV_LINKS.map(({ children }, index) => {
            return (
              <>
                {index ? <Divider className="bg-white" /> : null}
                {children.map(({ icon, children, ...linkProps }, index) => {
                  return (
                    <NavLink
                      key={index}
                      className={({ isActive, ...restRenderProps }) =>
                        clsx(
                          "flex items-center justify-start text-left gap-2 px-2 py-2 rounded-xl no-underline",
                          isActive ? "bg-grey-4 text-grey-11" : "text-grey-9",
                          typeof linkProps?.className === "function"
                            ? linkProps?.className?.({
                                isActive,
                                ...restRenderProps,
                              })
                            : linkProps?.className
                        )
                      }
                      {...linkProps}
                    >
                      {(renderProps) => (
                        <>
                          <div
                            className={clsx(
                              "rounded-xl flex justify-center items-center w-11 h-11",
                              renderProps.isActive ? "bg-grey-7" : "bg-grey-3"
                            )}
                          >
                            <Iconify className="text-2xl" icon={icon} />
                          </div>
                          <Typography component="span" className="font-medium">
                            {typeof children === "function"
                              ? children(renderProps)
                              : children}
                          </Typography>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </>
            );
          })}
        </List>
        {/* <div className="p-4 md:px-8">
        <ButtonBase
          variant="text"
          color="error"
          className="text-left gap-2 px-4 py-3 rounded-xl"
          onClick={() => logout()}
        >
          <Icon>logout</Icon>
          <div>
            <Typography>Logout</Typography>
            <Typography variant="body2">23481370002223</Typography>
          </div>
        </ButtonBase>
      </div> */}
      </Drawer>
    </>
  );
}

export default AppProtectedDrawer;
