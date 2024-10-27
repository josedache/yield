import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  CardActionArea,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import CurrencyTypography from "components/CurrencyTypography";
import useToggle from "hooks/useToggle";
import DashboardEmptyActivitySvg from "assets/svgs/dashboard-empty-activity.svg?react";
import { Navigate } from "react-router-dom";
import { DASHBOARD_KYC } from "constants/urls";
import useAuthUser from "hooks/useAuthUser";
import { walletApi } from "apis/wallet-api";
import LoadingContent from "components/LoadingContent";
import { savingsApi } from "apis/savings-api";
import { useMemo } from "react";

function DashboardMain() {
  const authUser = useAuthUser();

  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle();
  const [isFixedYieldVisible, toggleFixedYieldVisible] = useToggle();
  const [isFlexYieldVisible, toggleFlexYieldVisible] = useToggle();

  const walletQueryResult = walletApi.useGetWalletQuery(undefined);

  const wallet = walletQueryResult.data?.data;

  const flexSavingsAccountsQueryResult = savingsApi.useGetSavingsAccountsQuery(
    useMemo(() => ({ params: { type: "recurring_deposit" } }), [])
  );

  const flexSavingsAccounts = flexSavingsAccountsQueryResult.data?.data;

  const listFlexSavingsAccount =
    flexSavingsAccountsQueryResult.data?.data?.savingsAccounts?.[0];

  const flexSavingsAccountQueryResult = savingsApi.useGetSavingsAccountQuery(
    useMemo(
      () => ({
        params: {
          savingType: "recurring_deposit",
          savingsId: listFlexSavingsAccount?.id,
        },
      }),
      [listFlexSavingsAccount?.id]
    ),
    { skip: !listFlexSavingsAccount?.id }
  );

  const flexSavingsAccount = flexSavingsAccountQueryResult.data?.data;

  const fixedSavingsAccountsQueryResult = savingsApi.useGetSavingsAccountsQuery(
    useMemo(() => ({ params: { type: "fixed_deposit" } }), [])
  );

  const fixedSavingsAccounts = fixedSavingsAccountsQueryResult.data?.data;

  const listFixedSavingsAccount =
    flexSavingsAccountsQueryResult.data?.data?.savingsAccounts?.[0];

  const fixedSavingsAccountQueryResult = savingsApi.useGetSavingsAccountQuery(
    useMemo(
      () => ({
        params: {
          savingType: "fixed_deposit",
          savingsId: listFixedSavingsAccount?.id,
        },
      }),
      [listFixedSavingsAccount?.id]
    ),
    { skip: !listFixedSavingsAccount?.id }
  );

  const fixedSavingsAccount = fixedSavingsAccountQueryResult.data?.data;

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

  const isBasicInformationCompleted =
    authUser?.firstname &&
    authUser?.lastname &&
    authUser?.bvn &&
    authUser?.mobileNo &&
    authUser?.email;

  const isIdentificationCompleted = authUser?.nin;

  const isAccountDetailsCompleted =
    authUser?.bank_details?.accountnumber &&
    authUser?.bank_details?.accountname;

  if (
    !(
      isBasicInformationCompleted &&
      isIdentificationCompleted &&
      isAccountDetailsCompleted
    )
  ) {
    return <Navigate to={DASHBOARD_KYC} replace />;
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
                  Wallet
                </Typography>
                <LoadingContent
                  loading={walletQueryResult.isLoading}
                  error={walletQueryResult.isError}
                  onRetry={walletQueryResult.refetch}
                  renderLoading={() => (
                    <Skeleton variant="rectangular" className="h-2"></Skeleton>
                  )}
                >
                  {() => (
                    <div className="flex items-center">
                      <CurrencyTypography
                        variant="h3"
                        className="font-bold"
                        blur={isWalletBalanceVisible}
                      >
                        {wallet?.balance}
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
                  )}
                </LoadingContent>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2 w-full md:w-[25%]">
                <Button fullWidth>Fund Wallet</Button>
                {wallet?.balance ? (
                  <Button fullWidth variant="outlined">
                    Withdraw
                  </Button>
                ) : null}
              </div>
            </Paper>

            {[
              {
                icon: "material-symbols-light:lock-outline",
                iconClassName: "bg-[#5EB1BF] text-white",
                label: "Fixed Yield",
                value: fixedSavingsAccounts?.totalAvailableBalance ?? 0,
                interestRate: `${fixedSavingsAccount?.interest_rate}% P.A.`,
                isValueVisible: isFixedYieldVisible,
                onValueVisibilityClick: toggleFixedYieldVisible,
              },
              {
                icon: "icon-park-outline:target",
                iconClassName: "bg-[#4920AA] text-white",
                label: "Flex Yield",
                value: flexSavingsAccounts?.totalAvailableBalance ?? 0,
                interestRate: `${flexSavingsAccount?.interest_rate}% P.A.`,
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
