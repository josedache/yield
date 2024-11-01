import {
  Dialog,
  DialogContent,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  Link as MuiLink,
  ListItemButton,
  Collapse,
} from "@mui/material";
import clsx from "clsx";
import Logo from "components/Logo";
import { DASHBOARD, FIXED, FLEX, PROFILE } from "constants/urls";
import MediaBreakpoint from "enums/MediaBreakpoint";
import useSideNavigation from "hooks/useSideNavigation";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Icon as Iconify } from "@iconify/react";
import useLogout from "hooks/useLogout";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import useToggle from "hooks/useToggle";
import { useMemo } from "react";

function AppProtectedDrawer() {
  const islg = useMediaQuery(MediaBreakpoint.LG);

  const { logout } = useLogout();

  const sideNavigation = useSideNavigation();

  const [isSupport, toggleSupport] = useToggle();

  const NAV_LINKS = [
    {
      links: [
        {
          icon: "hugeicons:dashboard-square-02",
          label: "Dashboard",
          to: DASHBOARD,
        },
        {
          icon: "ph:plant",
          label: "Yield",
          links: [
            {
              label: "Fixed Yield",
              to: FIXED,
            },
            {
              label: "Flex Yield",
              to: FLEX,
            },
          ],
        },
        {
          icon: "iconoir:profile-circle",
          label: "Profile",
          to: PROFILE,
        },
      ],
    },
    {
      links: [
        {
          icon: "ep:chat-dot-round",
          label: "Support",
          onClick: toggleSupport,
        },
        // {
        //   icon: "la:cog",
        //   label: "Settings",
        //   to: SETTINGS,
        // },
        {
          icon: "ion:power-outline",
          label: "Logout",
          onClick: logout,
        },
      ],
    },
  ];

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
        <List className="p-4 md:p-6 flex-1 min-h-0 overflow-y-auto space-y-3">
          {NAV_LINKS.map(({ links }, index) => {
            return (
              <>
                {index ? <Divider className="bg-white" /> : null}
                {links.map((item, index) => {
                  return <AppProtectedDrawerItem key={index} item={item} />;
                })}
              </>
            );
          })}
        </List>
      </Drawer>

      <Dialog open={isSupport} maxWidth="xs" fullWidth>
        <DialogTitleXCloseButton
          onClose={toggleSupport}
          className="text-center"
        >
          Customer Support
        </DialogTitleXCloseButton>
        <DialogContent>
          <div className="space-y-4 w-full max-w-lg mx-auto">
            {[
              {
                label: "Email Address",
                icon: "lucide:mail",
                href: "mailto:contact@creditdirect.ng",
                hrefText: "contact@creditdirect.ng",
              },
              {
                label: "Support Line 1",
                icon: "lucide:phone",
                href: "tel:02014482225",
                hrefText: "02014482225",
              },
              {
                label: "Support Line 2",
                icon: "lucide:phone",
                href: "tel:02017005120",
                hrefText: "02017005120",
              },
            ].map(({ icon, label, href, hrefText }) => {
              return (
                <Paper key={label} className="flex items-center gap-4 p-4">
                  <Iconify className="text-lg" icon={icon} />
                  <div>
                    <Typography variant="body2" color="textSecondary">
                      {label}
                    </Typography>
                    <MuiLink color="info" href={href}>
                      {hrefText}
                    </MuiLink>
                  </div>
                </Paper>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AppProtectedDrawer;

function AppProtectedDrawerItem(props: any) {
  const item = props.item;
  const { label, to, links, icon, onClick } = item;

  const isGroup = !!links;

  const location = useLocation();

  const match = useMemo(() => {
    let result = null;
    const _links = isGroup ? links : [item];
    for (const link of _links) {
      result = matchPath({ path: link.to + "/*" }, location.pathname);
      if (result) {
        if (link?.toMatchExclude?.includes(result?.pathname)) {
          result = null;
        }
        break;
      }
    }
    return result;
  }, [isGroup, links, location.pathname, item]);

  const [isSubMenu, toggleSubMenu] = useToggle();

  return (
    <>
      <ListItemButton
        className={clsx(
          "rounded-lg flex gap-2 py-3 mb-2",
          !!match && "bg-[#285036] text-primary-contrastText"
        )}
        {...(isGroup
          ? { onClick: toggleSubMenu }
          : onClick
          ? { onClick }
          : { component: Link, to })}
      >
        <Iconify icon={icon} className="text-2xl" />
        <Typography className="font-medium flex-1">{label}</Typography>
        {isGroup && (
          <Iconify
            className="text-2xl"
            icon={isSubMenu ? "mingcute:up-line" : "mingcute:down-line"}
          />
        )}
      </ListItemButton>
      {isGroup && (
        <Collapse in={isSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {links?.map(({ label, to, toMatchExclude, ...rest }, index) => (
              <ListItemButton
                key={index}
                selected={
                  match?.pathnameBase === to &&
                  !toMatchExclude?.includes(match?.pathname)
                }
                className={clsx(
                  "pl-12 rounded-lg py-3 mb-2",
                  match?.pathnameBase === to &&
                    !toMatchExclude?.includes(match?.pathname) &&
                    "bg-[#285036] text-primary-contrastText"
                )}
                component={Link}
                to={to}
                {...rest}
              >
                <Typography className="font-medium">{label}</Typography>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
