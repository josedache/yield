import {
  Button,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import CurrencyTypography from "components/CurrencyTypography";
import useToggle from "hooks/useToggle";
import { format } from "date-fns";
import { savingsApi } from "apis/savings-api";
import LoadingContent from "components/LoadingContent";

export default function FixedPlanDetails(props: DrawerProps) {
  const { onClose, ...rest } = props;
  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle();

  const getSavingsQuery = savingsApi.useGetSavingsQuery({
    params: { savingsId: 552 },
  });

  const details = [
    {
      title: "Creation Date",
      value: getSavingsQuery?.data?.data?.submitted_date
        ? format(getSavingsQuery?.data?.data?.submitted_date, "PP")
        : "N/A",
    },
    {
      title: "Maturity Date",
      value: getSavingsQuery?.data?.data?.submitted_date
        ? format(getSavingsQuery?.data?.data?.submitted_date, "PP")
        : "N/A",
    },
    { title: "Duration", value: "6 months" },
    { title: "Accrued Interest", value: "+₦3,782.15" },
    { title: "Estimated Interest", value: "₦20,00.00" },
  ];

  const transactions = [
    {
      id: 1,
      description: "Withdrawal to Bank Account",
      amount: 50000,
      flow: "outflow",
    },
    {
      id: 2,
      description: "Wallet Interest for July",
      amount: 500,
      flow: "percentage",
    },
    { id: 3, description: "Wallet Funding", amount: 50000, flow: "inflow" },
    {
      id: 4,
      description: "Withdrawal to Bank Account",
      amount: 50000,
      flow: "outflow",
    },
    {
      id: 5,
      description: "Wallet Interest for July",
      amount: 500,
      flow: "percentage",
    },
    { id: 6, description: "Wallet Funding", amount: 50000, flow: "inflow" },
  ];
  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          borderRadius: "1.5rem 0 0 1.5rem",
          width: "100%",
          maxWidth: 500,
        },
      }}
      onClose={onClose}
      anchor="right"
      {...rest}
    >
      <LoadingContent
        loading={getSavingsQuery?.isLoading}
        error={getSavingsQuery?.isError}
        onRetry={getSavingsQuery?.refetch}
      >
        <div className="py-6">
          <div className="flex justify-between gap-2 items-center px-6">
            <Typography variant="h6">
              {getSavingsQuery?.data?.data?.plan_name}
            </Typography>

            <IconButton onClick={onClose}>
              <Iconify icon="material-symbols:close" />
            </IconButton>
          </div>

          <div className="w-full md:w-[70%] mt-6 px-6">
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Amount
            </Typography>
            <div className="flex items-center mt-1">
              <CurrencyTypography
                variant="h4"
                className="font-bold"
                blur={isWalletBalanceVisible}
              >
                {getSavingsQuery?.data?.data?.amount}
              </CurrencyTypography>
              <IconButton onClick={toggleWalletBalanceVisible}>
                <Iconify
                  icon={
                    isWalletBalanceVisible
                      ? "cuida:visibility-off-outline"
                      : "cuida:visibility-on-outline"
                  }
                />
              </IconButton>
            </div>

            <Typography variant="body2" color="primary" className="mt-1">
              +₦3,782.15
            </Typography>
          </div>

          <div className="flex gap-4 mt-4 px-6">
            <Button
              variant="soft"
              startIcon={
                <Iconify icon="mynaui:plus-solid" width="1rem" height="1rem" />
              }
              fullWidth
            >
              Liquidate Yield
            </Button>
            <Button
              variant="soft"
              startIcon={
                <Iconify
                  icon="fluent:edit-20-regular"
                  width="1rem"
                  height="1rem"
                />
              }
              fullWidth
            >
              Edit Name
            </Button>
          </div>

          <div className="mt-6">
            <Typography className="font-semibold px-6">Details</Typography>
            <Divider className="mt-2" />
            <div className="px-6 mt-4 grid grid-cols-1 gap-6  mb-8">
              {details.map(({ title, value }) => (
                <div className="flex justify-between">
                  <Typography className="text-neutral-600">{title}</Typography>
                  <Typography className="font-semibold text-neutral-900">
                    {value}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="px-6 flex justify-between">
              <Typography className="font-semibold">Transactions</Typography>
              <Link className="font-semibold">View All</Link>
            </div>
            <Divider className="mt-2" />
            <div className="px-6 mt-4 grid grid-cols-1 gap-6  mb-8">
              {transactions?.map((transaction) => {
                const config = {
                  inflow: {
                    color: "success",
                    sign: "+",
                    icon: "ic:twotone-plus",
                  },
                  outflow: {
                    color: "error",
                    sign: "-",
                    icon: "ic:baseline-minus",
                  },
                  percentage: {
                    color: "success",
                    sign: "+",
                    icon: "ic:sharp-percent",
                  },
                }[transaction?.flow];
                return (
                  <div
                    key={transaction?.id}
                    className="flex items-center gap-4"
                  >
                    <IconButton variant="soft" color={config?.color as any}>
                      <Iconify icon={config?.icon} />
                    </IconButton>
                    <div>
                      <Typography variant="body1" gutterBottom>
                        {transaction?.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {format(new Date(), "dd MMM, yyyy")}
                      </Typography>
                    </div>
                    <div className="flex-1" />
                    <Typography>
                      {config?.sign}
                      <CurrencyTypography component="span">
                        {transaction?.amount}
                      </CurrencyTypography>
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </LoadingContent>
    </Drawer>
  );
}
