import {
  Chip,
  Drawer,
  DrawerProps,
  IconButton,
  Typography,
} from "@mui/material";
import useToggle from "hooks/useToggle";
import { ReactNode } from "react";
import { SavingsWalletPosting } from "src/types/savings-api";
import { Icon as Iconify } from "@iconify-icon/react";
import CurrencyTypography from "components/CurrencyTypography";

function DashboardWalletInterestPosting(
  props: DashboardWalletInterestPostingProps
) {
  const { posting, children, onClose, ...restProps } = props;

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle(false);

  function handleClose(e?: any, reason?: any) {
    onClose?.(e, reason);
    setOpen(false);
  }

  return (
    <>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: "12px 0 0 12px",
            width: "100%",
            maxWidth: 445,
          },
        }}
        anchor="right"
        open={isOpen}
        {...restProps}
      >
        <div className="p-4">
          <div className="flex items-center justify-between gap-1 mb-4">
            <div className="flex items-center gap-2">
              <Typography variant="h6" className="font-semibold">
                Total Interest Details
              </Typography>
              <Chip
                label="10% P.A."
                className="bg-[#4920AA1A] text-[#4920AA]"
                size="small"
              />
            </div>
            <IconButton
              variant="contained"
              className="bg-neutral-100"
              onClick={handleClose as any}
            >
              <Iconify icon="material-symbols:close" />
            </IconButton>
          </div>

          <div>
            <Typography variant="body2" className="text-neutral-500">
              Interest in 20 days
            </Typography>
            <div className="flex items-center mt-1">
              <CurrencyTypography
                variant="h4"
                className="font-bold"
                blur={isWalletBalanceVisible}
                color="success"
              >
                {posting?.[0]?.total_interest}
              </CurrencyTypography>
              <IconButton onClick={toggleWalletBalanceVisible}>
                <Iconify
                  icon={
                    !isWalletBalanceVisible
                      ? "cuida:visibility-off-outline"
                      : "cuida:visibility-on-outline"
                  }
                />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="divide-y">
          <Typography className="p-4 py-2 font-bold">Daily Interest</Typography>

          <div className="p-4 space-y-4">
            {posting?.map((item) => (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Typography>Date</Typography>
                  <Typography className="text-text-secondary">
                    {item.date}
                  </Typography>
                </div>
                <div>
                  <Typography>Interest</Typography>
                  <CurrencyTypography className="text-success-main">
                    {item.daily_interest}
                  </CurrencyTypography>
                </div>
                <div>
                  <Typography>Balance</Typography>
                  <CurrencyTypography className="text-text-secondary">
                    {item.balance}
                  </CurrencyTypography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>

      {typeof children === "function"
        ? children({ isOpen, toggleOpen, setOpen })
        : children}
    </>
  );
}

export default DashboardWalletInterestPosting;

export type DashboardWalletInterestPostingProps = {
  posting: SavingsWalletPosting[];
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
} & Omit<DrawerProps, "children">;
