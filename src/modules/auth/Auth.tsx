import { Outlet } from "react-router-dom";
import "./Auth.css";
import Logo from "components/Logo";
import { Icon, IconButton, Typography } from "@mui/material";

function Auth() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:p-4 h-full">
      <div className="hidden lg:flex flex-col p-6 h-full  text-primary-contrastText bg-cover bg-[url('assets/imgs/yield-auth-background.png')] bg-no-repeat object-fill">
        <Logo className="mb-8" />
        <div className="flex-1" />
        <div className="space-y-8 max-w-md">
          <div>
            <Typography variant="h4" className="font-semibold" gutterBottom>
              High Returns
            </Typography>
            <Typography variant="h6" className="italic font-normal leading-5">
              Maximize your funds with higher interest rates, allowing your
              money to grow significantly over time.
            </Typography>
          </div>
          <IconButton
            variant="soft"
            color="inherit"
            className="text-white px-3 rounded-3xl"
          >
            <Icon>arrow_forward</Icon>
          </IconButton>
        </div>
      </div>
      <div className="h-full p-5 py-[56px] bg-cover  bg-[url('assets/imgs/yield-auth-background.png')] lg:bg-none bg-no-repeat">
        <Logo className="mb-4 lg:hidden block" />

        <Outlet />
      </div>
    </div>
  );
}

export default Auth;

export const Component = Auth;
