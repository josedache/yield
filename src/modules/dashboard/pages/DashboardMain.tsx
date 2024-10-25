import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  CardActionArea,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import CurrencyTypography from "components/CurrencyTypography";
import useToggle from "hooks/useToggle";
import DashboardEmptyActivitySvg from "assets/svgs/dashboard-empty-activity.svg?react";
import { Navigate } from "react-router-dom";
import { DASHBOARD_KYC } from "constants/urls";
import useAuthUser from "hooks/useAuthUser";

function DashboardMain() {
  const authUser = useAuthUser();

  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle();
  const [isFixedYieldVisible, toggleFixedYieldVisible] = useToggle();
  const [isFlexYieldVisible, toggleFlexYieldVisible] = useToggle();

  const quickAccess = [
    {
      icon: "solar:lock-outline",
      label: "Create a fixed yield plan",
      description: "Lock in some money and earn interest now.",
      border: "border-[#5EB1BF]",
      textColor: "text-[#5EB1BF]",
    },
    {
      icon: "solar:card-outline",
      label: "Fund your flex wallet",
      description: "Save now and withdraw at any time.",
      border: "border-[#4920AA96]",
      textColor: "text-[#4920AA96]",
    },
  ];
  if (!authUser?.kycLevel) {
    return <Navigate to={DASHBOARD_KYC} />;
  }

  return (
    <div className="space-y-8">
      <Typography variant="h5">Dashboard</Typography>

      <div className="flex gap-8 flex-col md:flex-row">
        <div className="w-full md:w-[75%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Paper className="p-4 md:p-8 flex flex-col md:flex-row gap-2 md:col-span-2">
              <div className="md:w-[75%] w-full">
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Yield Wallet
                </Typography>
                <div className="flex items-center">
                  <CurrencyTypography
                    variant="h3"
                    className="font-bold"
                    blur={isWalletBalanceVisible}
                  >
                    10950
                  </CurrencyTypography>
                  <IconButton onClick={toggleWalletBalanceVisible}>
                    <Icon
                      icon={
                        isWalletBalanceVisible
                          ? "cuida:visibility-off-outline"
                          : "cuida:visibility-on-outline"
                      }
                    />
                  </IconButton>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2 w-full md:w-[25%]">
                <Button fullWidth>Fund Wallet</Button>
                <Button fullWidth variant="outlined">
                  Withdraw
                </Button>
              </div>
            </Paper>

            {[
              {
                icon: "material-symbols-light:lock-outline",
                iconClassName: "bg-[#5EB1BF] text-white",
                label: "Fixed Yield",
                value: 0,
                interestRate: "15 - 20% P.A",
                isValueVisible: isFixedYieldVisible,
                onValueVisibilityClick: toggleFixedYieldVisible,
              },
              {
                icon: "icon-park-outline:target",
                iconClassName: "bg-[#4920AA] text-white",
                label: "Flex Yield",
                value: 0,
                interestRate: "14% P.A.",
                isValueVisible: isFlexYieldVisible,
                onValueVisibilityClick: toggleFlexYieldVisible,
              },
            ].map(
              (
                {
                  icon,
                  iconClassName,
                  label,
                  value,
                  interestRate,
                  isValueVisible,
                  onValueVisibilityClick,
                },
                id
              ) => {
                return (
                  <Paper
                    className={clsx(
                      id === 0 ? "border-[#5EB1BF80]" : "border-[#4920AA4D]",
                      "p-4 md:p-6 w-full"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={clsx(
                          "rounded-lg w-10 h-10 flex items-center justify-center",
                          iconClassName
                        )}
                      >
                        <Icon fontSize={22} icon={icon} />
                      </div>
                      <Typography>{label}</Typography>
                    </div>

                    <div className="flex items-center my-8">
                      <CurrencyTypography
                        variant="h5"
                        className="font-bold"
                        blur={isValueVisible}
                      >
                        {value}
                      </CurrencyTypography>
                      <IconButton onClick={onValueVisibilityClick}>
                        <Icon
                          icon={
                            isValueVisible
                              ? "cuida:visibility-off-outline"
                              : "cuida:visibility-on-outline"
                          }
                        />
                      </IconButton>
                    </div>
                    <Divider />
                    <div className="mt-2 flex justify-between gap-2 items-center">
                      <Typography className="flex items-center gap-2">
                        Interest Rate
                      </Typography>

                      <Typography color="primary">{interestRate}</Typography>
                    </div>
                  </Paper>
                );
              }
            )}
          </div>

          <div className="mt-8">
            <Typography variant="h5" gutterBottom>
              Recent Activities
            </Typography>
            <Paper className="p-4 md:p-8">
              <div className="flex flex-col justify-center items-center gap-y-8 my-8">
                <DashboardEmptyActivitySvg />
                <div>
                  <Typography variant="h6" className="text-center" gutterBottom>
                    No Activities
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    className="text-center"
                  >
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  </Typography>
                </div>
              </div>
            </Paper>
          </div>
        </div>

        <div className="w-full md:w-[35%]">
          <Typography variant="h6">Dashboard</Typography>
          <div className="space-y-4 mt-5">
            {quickAccess.map(
              ({ icon, textColor, border, label, description }) => (
                <Paper className={(clsx(border), "w-full")}>
                  <CardActionArea className="flex justify-start px-3 py-4  gap-2">
                    <div className="p-2">
                      <Icon
                        className={clsx(textColor, "text-2xl")}
                        icon={icon}
                      />
                    </div>
                    <div>
                      <Typography className="font-semibold text-neutral-900">
                        {label}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {description}
                      </Typography>
                    </div>
                  </CardActionArea>
                </Paper>
              )
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export const Component = DashboardMain;

export default DashboardMain;
