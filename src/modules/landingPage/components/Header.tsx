import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logo from "components/Logo";
import { Link } from "react-router-dom";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [{ href: "/signin", displayText: "Sign In" }];

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6" component="div" className="px-5 py-3">
        <Logo variant="3" />
      </Typography>

      <List className=" w-full px-2 mt-2">
        {navItems.map((item) => (
          <ListItem key={item.displayText} disablePadding>
            <div className="text-primary-main border w-full rounded-md border-primary-main font-semibold text-center text-sm hover:bg-primary-main hover:text-white mb-2">
              <ListItemText primary={item.displayText} />
            </div>
          </ListItem>
        ))}

        <Button fullWidth size="small">
          Get Started
        </Button>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
      <Box
        sx={{ display: "flex" }}
        className="bg-white max-h-20 mx-auto max-w-7xl"
      >
        <CssBaseline />
        <AppBar
          elevation={0}
          component="nav"
          className="bg-white lg:px-14 xl:px-28"
        >
          <Toolbar>
            <Typography variant="h6" component="div">
              <Logo variant="3" />
            </Typography>

            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="block sm:hidden ml-auto"
            >
              <MenuIcon />
            </IconButton>

            <Box className="hidden sm:flex items-center ml-auto gap-4">
              <div className="flex">
                {navItems.map((item) => (
                  <Link
                    to={item.href}
                    key={item.displayText}
                    className="text-primary-main font-semibold text-base"
                  >
                    {item.displayText}
                  </Link>
                ))}
              </div>

              <Button className="bg-primary-main text-white rounded-md px-5 py-2 text-base font-medium">
                Get Started
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
  );
}
