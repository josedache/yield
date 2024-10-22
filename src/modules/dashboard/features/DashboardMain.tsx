import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import clsx from "clsx";
import CurrencyTypography from "components/CurrencyTypography";
import useToggle from "hooks/useToggle";
import DashboardEmptyActivitySvg from "assets/svgs/dashboard-empty-activity.svg?react";

function DashboardMain() {
  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle();
  const [isFixedYieldVisible, toggleFixedYieldVisible] = useToggle();
  const [isFlexYieldVisible, toggleFlexYieldVisible] = useToggle();

  return (
    <div className="space-y-8">
      <Typography variant="h5">Dashboard</Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Paper className="p-4 md:p-8 space-y-8">
          <div>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Yield Wallet Balance
            </Typography>
            <div className="flex items-center">
              <CurrencyTypography
                variant="h4"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button>Fund Wallet</Button>
            <Button variant="outlined">Withdraw</Button>
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
          ({
            icon,
            iconClassName,
            label,
            value,
            interestRate,
            isValueVisible,
            onValueVisibilityClick,
          }) => {
            return (
              <Paper className="p-4 md:p-6 space-y-6">
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

                <div className="flex items-center">
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

                <Typography className="flex items-center gap-2">
                  Interest Rate
                  <span className="w-2 h-2 bg-text-secondary rounded-full"></span>
                  <span className="text-primary-main">{interestRate}</span>
                </Typography>
              </Paper>
            );
          }
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        <div className="sm:col-span-2">
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
    </div>
  );
}

export default DashboardMain;
