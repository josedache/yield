import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  CardActionArea,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Typography,
  Link as MuiLink,
  Card,
} from "@mui/material";
import clsx from "clsx";
import CurrencyTypography from "components/CurrencyTypography";
import useToggle from "hooks/useToggle";
import DashboardEmptyActivitySvg from "assets/svgs/dashboard-empty-activity.svg?react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { DASHBOARD_KYC, FIXED, FLEX } from "constants/urls";
import useAuthUser from "hooks/useAuthUser";
import { walletApi } from "apis/wallet-api";
import LoadingContent from "components/LoadingContent";
import { savingsApi } from "apis/savings-api";
import { useMemo, useRef } from "react";
import { Icon as Iconify } from "@iconify/react";
import WalletFund from "modules/wallet/features/WalletFund";
import DashboardWithdrawalAccountCard from "../features/DashboardWithdrawalaccountCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  TRANSACTION_TYPE_ID_TO_COLOR,
  TRANSACTION_TYPE_ID_TO_ICON,
  TRANSACTION_TYPE_ID_TO_SIGN,
  TRANSACTION_TYPE_ID_TO_TITLE,
} from "constants/transactions";
import * as dfns from "date-fns";
import { FlexUrlDialog } from "modules/flex/enums/FlexUrlDialog";
import { FixedUrlDialog } from "modules/fixed/enums/FixedUrlDialog";
import { FLEX_PRODUCT_ID } from "constants/env";
import WalletTransfer from "modules/wallet/features/WalletTransfer";

function DashboardMain() {
  const authUser = useAuthUser();
  const navigate = useNavigate();

  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle();
  const [isFixedYieldVisible, toggleFixedYieldVisible] = useToggle();
  const [isFlexYieldVisible, toggleFlexYieldVisible] = useToggle();

  const recentActivitiesParentRef = useRef(null);

  const walletQueryResult = walletApi.useGetWalletQuery(undefined);

  const wallet = walletQueryResult.data?.data;

  const flexSavingsAccountsQueryResult = savingsApi.useGetSavingsAccountsQuery(
    useMemo(() => ({ params: { type: "recurring_deposit" } }), [])
  );

  const flexSavingsAccounts = flexSavingsAccountsQueryResult.data?.data;

  const flexSavingsProductQueryResult =
    savingsApi.useGetSavingsProductInformationQuery(
      useMemo(() => ({ params: { productId: FLEX_PRODUCT_ID } }), [])
    );

  const flexSavingsProduct = flexSavingsProductQueryResult.data?.data;

  const fixedSavingsAccountsQueryResult = savingsApi.useGetSavingsAccountsQuery(
    useMemo(() => ({ params: { type: "fixed_deposit" } }), [])
  );

  const fixedSavingsAccounts = fixedSavingsAccountsQueryResult.data?.data;

  const savingsRecentActivitiesQueryResult =
    savingsApi.useGetSavingsRecentActivitiesQuery(
      useMemo(() => ({ params: { type: "recurring_deposit" } }), [])
    );

  const savingsRecentActivities = savingsRecentActivitiesQueryResult.data?.data;

  const virtualizer = useVirtualizer({
    count: savingsRecentActivities?.length,
    getScrollElement: () => recentActivitiesParentRef.current,
    estimateSize: () => 56,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const quickAccess = [
    {
      icon: "solar:lock-outline",
      label: "Create a Fixed Yield plan",
      description: "Lock in some money and start earning interest",
      border: "border-[#5EB1BF]",
      textColor: "text-[#5EB1BF]",
      onClick: () =>
        navigate(FIXED.concat("?dialog=", FixedUrlDialog.CREATE_PLAN)),
    },
    {
      icon: "solar:card-outline",
      label: "Fund your flex wallet",
      description: "Add money and withdraw at any time.",
      border: "border-[#4920AA96]",
      textColor: "text-[#4920AA96]",
      onClick: () => navigate(FLEX.concat("?dialog=", FlexUrlDialog.FUND)),
    },
  ];

  const isBasicInformationCompleted = authUser?.kyc_validation?.basic;
  const isIdentificationCompleted = authUser?.kyc_validation?.nin;
  const isAccountDetailsCompleted = authUser?.kyc_validation?.bank;

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
      <div className="flex items-center flex-wrap gap-2">
        <Typography variant="h5">Dashboard</Typography>
        <div className="flex-1" />
        <Paper
          variant="outlined"
          className="flex items-center gap-2 p-2 bg-[#5EB1BF1A] border-[#5EB1BFB2]"
        >
          <Iconify
            icon="icon-park-outline:send-one"
            className="text-lg text-[#5EB1BF]"
          />
          <Typography>
            <span className="text-text-secondary">{wallet?.bank}:</span>
            {"  "}
            <WalletFund>
              {({ toggleOpen }) => (
                <MuiLink
                  color="textPrimary"
                  className="font-semibold cursor-pointer"
                  component="span"
                  onClick={toggleOpen}
                >
                  {wallet?.account_number}
                </MuiLink>
              )}
            </WalletFund>
          </Typography>
        </Paper>
      </div>

      <div className="flex gap-8 flex-col md:flex-row">
        <div className="w-full md:w-[75%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Paper className="p-4 md:p-8 flex flex-col md:flex-row gap-2 md:col-span-2">
              <div className="md:w-[75%] w-full">
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Wallet
                </Typography>
                <LoadingContent
                  loading={
                    walletQueryResult.isLoading || walletQueryResult.isFetching
                  }
                  error={walletQueryResult.isError}
                  onRetry={walletQueryResult.refetch}
                  className="w-full max-w-48"
                  renderError={() => (
                    <div className="flex items-center gap-2">
                      <Typography className="font-semibold">
                        Something went wrong
                      </Typography>
                      <IconButton>
                        <Iconify icon="mdi:reload" />
                      </IconButton>
                    </div>
                  )}
                  renderLoading={() => (
                    <Skeleton
                      variant="rectangular"
                      height={32}
                      width="100%"
                      className="rounded-lg"
                    />
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
                            !isWalletBalanceVisible
                              ? "cuida:visibility-off-outline"
                              : "cuida:visibility-on-outline"
                          }
                        />
                      </IconButton>
                    </div>
                  )}
                </LoadingContent>

                <LoadingContent
                  loading={
                    walletQueryResult.isLoading || walletQueryResult.isFetching
                  }
                  error={walletQueryResult.isError}
                  onRetry={walletQueryResult.refetch}
                  className="w-full max-w-48 mt-1"
                  renderError={() => (
                    <div className="flex items-center gap-2">
                      <Typography className="font-semibold">
                        Something went wrong
                      </Typography>
                      <IconButton>
                        <Iconify icon="mdi:reload" />
                      </IconButton>
                    </div>
                  )}
                  renderLoading={() => (
                    <Skeleton
                      variant="rectangular"
                      height={20}
                      width="100%"
                      className="rounded-lg"
                    />
                  )}
                >
                  {() => (
                    <div className="flex items-center mt-1 text-gray-500">
                      <Typography variant="caption" className="mr-1">
                        Available Balance:
                      </Typography>
                      <CurrencyTypography
                        variant="caption"
                        blur={isWalletBalanceVisible}
                      >
                        {wallet?.available_balance}
                      </CurrencyTypography>
                    </div>
                  )}
                </LoadingContent>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2 w-full md:w-[25%]">
                <WalletFund>
                  {({ toggleOpen }) => (
                    <Button onClick={toggleOpen} fullWidth>
                      Fund Wallet
                    </Button>
                  )}
                </WalletFund>

                <WalletTransfer>
                  {({ toggleOpen }) => (
                    <Button
                      onClick={wallet?.balance ? toggleOpen : undefined}
                      disabled={!wallet?.balance}
                      fullWidth
                      variant="outlined"
                    >
                      Withdraw
                    </Button>
                  )}
                </WalletTransfer>
              </div>
            </Paper>

            {[
              {
                icon: "material-symbols-light:lock-outline",
                iconClassName: "bg-[#5EB1BF] text-white",
                label: "Fixed Yield",
                value: fixedSavingsAccounts?.totalAvailableBalance ?? 0,
                // interestRate: `${
                //   fixedSavingsProduct?.interest_rate ?? 0
                // }% P.A.`,
                isLoading: fixedSavingsAccountsQueryResult.isFetching,
                interestRate: `16-21% P.A.`,
                isValueVisible: isFixedYieldVisible,
                onValueVisibilityClick: toggleFixedYieldVisible,
                to: FIXED,
              },
              {
                icon: "icon-park-outline:target",
                iconClassName: "bg-[#4920AA] text-white",
                label: "Flex Yield",
                value: flexSavingsAccounts?.totalAvailableBalance ?? 0,
                isLoading: fixedSavingsAccountsQueryResult.isFetching,
                interestRate: `${flexSavingsProduct?.interest_rate ?? 0}% P.A.`,
                isValueVisible: isFlexYieldVisible,
                onValueVisibilityClick: toggleFlexYieldVisible,
                to: FLEX,
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
                  to,
                  isLoading,
                },
                id
              ) => {
                return (
                  <Card
                    component={Link}
                    to={to}
                    className={clsx(
                      id === 0 ? "border-[#5EB1BF80]" : "border-[#4920AA4D]",
                      "w-full"
                    )}
                  >
                    <CardActionArea className="p-4 md:p-6 ">
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
                        {isLoading ? (
                          <Skeleton
                            variant="text"
                            className="w-full text-3xl"
                          />
                        ) : (
                          <CurrencyTypography
                            variant="h5"
                            className="font-bold"
                            blur={isValueVisible}
                          >
                            {value}
                          </CurrencyTypography>
                        )}

                        <IconButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onValueVisibilityClick();
                          }}
                        >
                          <Icon
                            icon={
                              !isValueVisible
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

                        <Typography color="success">{interestRate}</Typography>
                      </div>
                    </CardActionArea>
                  </Card>
                );
              }
            )}
          </div>

          <Paper className="py-4 md:py-8 mt-8 space-y-4">
            <Typography variant="h5" className="px-4 md:px-8">
              Recent Activities
            </Typography>
            <LoadingContent
              loading={savingsRecentActivitiesQueryResult.isLoading}
              error={savingsRecentActivitiesQueryResult.isError}
              onRetry={savingsRecentActivitiesQueryResult.refetch}
            >
              {() => (
                <>
                  {savingsRecentActivities?.length ? (
                    <div
                      className="overflow-y-auto h-96 px-4 md:px-8"
                      style={{ contain: "strict" }}
                      ref={recentActivitiesParentRef}
                    >
                      <div
                        className="relative w-full"
                        style={{
                          height: virtualizer.getTotalSize(),
                        }}
                      >
                        <div
                          className="absolute left0 top-0 w-full"
                          style={{
                            transform: `translateY(${
                              virtualItems[0]?.start ?? 0
                            }px)`,
                          }}
                        >
                          {virtualItems.map((virtualItem) => {
                            const transaction =
                              savingsRecentActivities?.[virtualItem.index];
                            return (
                              <div
                                key={transaction?.transactionId}
                                className="flex items-center gap-4 py-2"
                                data-index={virtualItem.index}
                                ref={virtualizer.measureElement}
                              >
                                <IconButton
                                  variant="soft"
                                  color={
                                    TRANSACTION_TYPE_ID_TO_COLOR[
                                      transaction?.transaction_type_code
                                    ] as any
                                  }
                                >
                                  <Iconify
                                    icon={
                                      TRANSACTION_TYPE_ID_TO_ICON[
                                        transaction?.transaction_type_code
                                      ] as any
                                    }
                                  />
                                </IconButton>
                                <div>
                                  <Typography variant="body1" gutterBottom>
                                    {TRANSACTION_TYPE_ID_TO_TITLE[
                                      transaction?.transaction_type_code
                                    ] || "----"}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {dfns.format(
                                      new Date(transaction?.transaction_date),
                                      "dd MMM, yyyy"
                                    )}
                                  </Typography>
                                </div>
                                <div className="flex-1" />
                                <Typography>
                                  {
                                    TRANSACTION_TYPE_ID_TO_SIGN[
                                      transaction?.transaction_type_code
                                    ] as any
                                  }
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
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-y-8 my-8">
                      <DashboardEmptyActivitySvg />
                      <div>
                        <Typography
                          variant="h6"
                          className="text-center"
                          gutterBottom
                        >
                          No Activities
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          className="text-center"
                        >
                          You don’t have any transaction history yet.
                        </Typography>
                      </div>
                    </div>
                  )}
                </>
              )}
            </LoadingContent>
          </Paper>
        </div>

        <div className="w-full md:w-[35%]">
          <Typography variant="h6">Quick Access</Typography>
          <div className="space-y-4 mt-5">
            {quickAccess.map(
              ({
                icon,
                textColor,
                border,
                label,
                description,
                ...restProps
              }) => (
                <Paper className={clsx(border, "w-full")} {...restProps}>
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
          <div className="mt-8">
            <DashboardWithdrawalAccountCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Component = DashboardMain;

export default DashboardMain;
