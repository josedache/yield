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
  Chip,
  ButtonBase,
} from "@mui/material";
import clsx from "clsx";
import CurrencyTypography from "components/CurrencyTypography";
import useToggle from "hooks/useToggle";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { DASHBOARD_KYC, FIXED, FLEX } from "constants/urls";
import useAuthUser from "hooks/useAuthUser";
import { walletApi } from "apis/wallet-api";
import LoadingContent from "components/LoadingContent";
import { savingsApi } from "apis/savings-api";
import { useMemo } from "react";
import { Icon as Iconify } from "@iconify/react";
import WalletFund from "modules/wallet/features/WalletFund";
import DashboardWithdrawalAccountCard from "../features/DashboardWithdrawalaccountCard";
import { FlexUrlDialog } from "modules/flex/enums/FlexUrlDialog";
import { FixedUrlDialog } from "modules/fixed/enums/FixedUrlDialog";
import { FLEX_PRODUCT_ID } from "constants/env";
import WalletTransfer from "modules/wallet/features/WalletTransfer";
import DashboardWalletInterestPosting from "../features/DashboardWalletInterestPosting";
import DashboardRecentActivities from "../features/DashboardRecentActivities";

function DashboardMain() {
  const authUser = useAuthUser();
  const navigate = useNavigate();

  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle(true);
  const [isFixedYieldVisible, toggleFixedYieldVisible] = useToggle(true);
  const [isFlexYieldVisible, toggleFlexYieldVisible] = useToggle(true);

  const walletQueryResult = walletApi.useGetWalletQuery(undefined);

  const wallet = walletQueryResult.data?.data;

  const savingsWalletPostingQueryResult =
    savingsApi.useGetSavingsWalletPostingQuery(
      useMemo(() => ({ params: { savingsId: wallet?.id } }), [wallet?.id]),
      { skip: !wallet?.id }
    );

  const savingsWalletPosting = savingsWalletPostingQueryResult.data?.data;

  const flexSavingsAccountsQueryResult = savingsApi.useGetSavingsAccountsQuery(
    useMemo(() => ({ params: { type: "recurring_deposit" } }), [])
  );

  const flexSavingsAccounts = flexSavingsAccountsQueryResult.data?.data;

  const flexSavingsAccount = flexSavingsAccounts?.savingsAccounts?.[0];

  // const flexSavingsAccountQueryResult = savingsApi.useGetSavingsAccountQuery(
  //   useMemo(
  //     () => ({
  //       params: {
  //         savingType: "recurring_deposit",
  //         savingsId: flexSavingsAccount?.id,
  //       },
  //     }),
  //     [flexSavingsAccount?.id]
  //   ),
  //   { skip: !flexSavingsAccount?.id }
  // );

  // const flexSavingsAccountExpanded = flexSavingsAccountQueryResult.data?.data;

  const flexSavingsWalletPostingQueryResult =
    savingsApi.useGetSavingsWalletPostingQuery(
      useMemo(
        () => ({ params: { savingsId: flexSavingsAccount?.id } }),
        [flexSavingsAccount?.id]
      ),
      { skip: !flexSavingsAccount?.id }
    );

  const flexSavingsWalletPosting =
    flexSavingsWalletPostingQueryResult.data?.data;

  const flexSavingsProductQueryResult =
    savingsApi.useGetSavingsProductInformationQuery(
      useMemo(() => ({ params: { productId: FLEX_PRODUCT_ID } }), [])
    );

  const flexSavingsProduct = flexSavingsProductQueryResult.data?.data;

  const fixedSavingsAccountsQueryResult = savingsApi.useGetSavingsAccountsQuery(
    useMemo(() => ({ params: { type: "fixed_deposit" } }), [])
  );

  const fixedSavingsAccounts = fixedSavingsAccountsQueryResult.data?.data;

  const fixedSavingsAccount = fixedSavingsAccounts?.savingsAccounts?.[0];

  // const fixedSavingsAccountQueryResult = savingsApi.useGetSavingsAccountQuery(
  //   useMemo(
  //     () => ({
  //       params: {
  //         // savingType: "fixed_deposit",
  //         savingsId: fixedSavingsAccount?.id,
  //       },
  //     }),
  //     [fixedSavingsAccount?.id]
  //   ),
  //   { skip: !fixedSavingsAccount?.id }
  // );

  // const fixedSavingsAccountExpanded = fixedSavingsAccountQueryResult.data?.data;

  const fixedSavingsWalletPostingQueryResult =
    savingsApi.useGetSavingsWalletPostingQuery(
      useMemo(
        () => ({ params: { savingsId: fixedSavingsAccount?.id } }),
        [fixedSavingsAccount?.id]
      ),
      { skip: !fixedSavingsAccount?.id }
    );

  const fixedSavingsWalletPosting =
    fixedSavingsWalletPostingQueryResult.data?.data;

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
                <div className="flex items-center gap-2 mb-1">
                  <Typography variant="body2" color="textSecondary">
                    Wallet Balance
                  </Typography>
                  <Chip
                    label="10% P.A."
                    className="bg-[#4920AA1A] text-[#4920AA]"
                    size="small"
                  />
                </div>
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
                        <Iconify
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
                  {
                    () =>
                      savingsWalletPosting?.[0]?.total_interest ? (
                        <div className="flex items-center mt-1 text-gray-500">
                          <Typography variant="body1" className="mr-1">
                            Interest Earned •
                          </Typography>
                          <Typography
                            variant="body1"
                            color="success"
                            className="font-medium"
                          >
                            +
                            <CurrencyTypography
                              component="span"
                              variant="inherit"
                              // blur={isWalletBalanceVisible}
                            >
                              {/* {wallet?.interest_earned} */}
                              {savingsWalletPosting?.[0]?.total_interest}
                            </CurrencyTypography>
                          </Typography>
                          <DashboardWalletInterestPosting
                            posting={savingsWalletPosting}
                          >
                            {({ toggleOpen }) => (
                              <ButtonBase
                                onClick={toggleOpen}
                                className="bg-[#DCFCE7] text-success-main w-3 h-3 rounded-lg flex items-center justify-center ml-1"
                              >
                                <Iconify
                                  icon="iconamoon:arrow-right-2"
                                  className="text-xs"
                                />
                              </ButtonBase>
                            )}
                          </DashboardWalletInterestPosting>
                        </div>
                      ) : null
                    // <div className="flex items-center mt-1 text-gray-500">
                    //   <Typography variant="caption" className="mr-1">
                    //     Available Balance:
                    //   </Typography>
                    //   <CurrencyTypography
                    //     variant="caption"
                    //     blur={isWalletBalanceVisible}
                    //   >
                    //     {wallet?.available_balance}
                    //   </CurrencyTypography>
                    // </div>
                  }
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
                isLoading:
                  fixedSavingsAccountsQueryResult.isFetching ||
                  fixedSavingsWalletPostingQueryResult.isFetching,
                // interestRate: `${
                //   fixedSavingsProduct?.interest_rate ?? 0
                // }% P.A.`,
                interestRate: `16%-21% P.A.`,
                // interestEarned:
                //   flexSavingsAccountExpanded?.total_interest_earned,
                interestEarned: fixedSavingsWalletPosting?.[0]?.total_interest,
                isValueVisible: isFixedYieldVisible,
                onValueVisibilityClick: toggleFixedYieldVisible,
                to: FIXED,
              },
              {
                icon: "icon-park-outline:target",
                iconClassName: "bg-[#4920AA] text-white",
                label: "Flex Yield",
                value: flexSavingsAccounts?.totalAvailableBalance ?? 0,
                isLoading:
                  flexSavingsAccountsQueryResult.isFetching ||
                  flexSavingsWalletPostingQueryResult.isFetching,
                interestRate: `${flexSavingsProduct?.interest_rate ?? 0}% P.A.`,
                // interestEarned:
                //   flexSavingsAccountExpanded?.total_interest_earned,
                interestEarned: flexSavingsWalletPosting?.[0]?.total_interest,
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
                  interestEarned,
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
                          <Iconify fontSize={22} icon={icon} />
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
                          <Iconify
                            icon={
                              !isValueVisible
                                ? "cuida:visibility-off-outline"
                                : "cuida:visibility-on-outline"
                            }
                          />
                        </IconButton>
                      </div>
                      <Divider />

                      {interestEarned ? (
                        <div className="mt-2 flex justify-between gap-2 items-center">
                          <Typography className="flex items-center gap-2">
                            Interest Earned
                          </Typography>

                          <Typography color="success" className="font-medium">
                            +
                            <CurrencyTypography
                              component="span"
                              variant="inherit"
                              // blur={isWalletBalanceVisible}
                            >
                              {interestEarned}
                            </CurrencyTypography>
                          </Typography>
                        </div>
                      ) : (
                        <div className="mt-2 flex justify-between gap-2 items-center">
                          <Typography className="flex items-center gap-2">
                            Interest Rate
                          </Typography>

                          <Typography color="success">
                            {interestRate}
                          </Typography>
                        </div>
                      )}
                    </CardActionArea>
                  </Card>
                );
              }
            )}
          </div>

          <DashboardRecentActivities />
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
                      <Iconify
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
