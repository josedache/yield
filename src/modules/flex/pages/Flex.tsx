import {
  Button,
  IconButton,
  Paper,
  Typography,
  Link as MuiLink,
  ButtonBase,
  Skeleton,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import CurrencyTypography from "components/CurrencyTypography";
import useToggle from "hooks/useToggle";
import SavedCardSvg from "assets/svgs/saved-card.svg?react";
import WalletTransactionFlowSvg from "assets/svgs/wallet--transaction-flow.svg?react";
import * as dfns from "date-fns";
import FlexFund from "../features/FlexFund";
import YieldWithdraw from "../features/FlexWithdraw";
import { savingsApi } from "apis/savings-api";
import { useMemo, useRef } from "react";
import LoadingContent from "components/LoadingContent";
import {
  TRANSACTION_TYPE_ID_TO_COLOR,
  TRANSACTION_TYPE_ID_TO_ICON,
  TRANSACTION_TYPE_ID_TO_SIGN,
  TRANSACTION_TYPE_ID_TO_TITLE,
} from "constants/transactions";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useSearchParams } from "react-router-dom";
import { urlSearchParamsExtractor } from "utils/url";
import { FlexUrlDialog } from "../enums/FlexUrlDialog";

function Flex() {
  const [searchParams] = useSearchParams();

  const { dialog } = urlSearchParamsExtractor(searchParams, {
    dialog: "" as FlexUrlDialog,
  });

  const [isFund, toggleFund] = useToggle(dialog === FlexUrlDialog.FUND);

  const [isFAQ, toggleFAQ] = useToggle(true);

  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle();

  const transactionsParentRef = useRef(null);

  const getSavingsProductInformationQuery =
    savingsApi.useGetSavingsProductInformationQuery({
      params: { productId: 10 },
    });

  const savingsAccountsQueryResult = savingsApi.useGetSavingsAccountsQuery(
    useMemo(
      () => ({
        params: {
          statusId: 300,
          type: "recurring_deposit",
        },
      }),
      []
    )
  );

  const listSavingsAccount =
    savingsAccountsQueryResult.data?.data?.savingsAccounts?.[0];

  const totalAvailableBalance = Number(
    savingsAccountsQueryResult.data?.data?.totalAvailableBalance ?? 0
  );

  const isActive = Number(totalAvailableBalance) > 0;

  const savingsAccountQueryResult = savingsApi.useGetSavingsAccountQuery(
    useMemo(
      () => ({
        params: {
          savingType: "recurring_deposit",
          savingsId: listSavingsAccount?.id,
        },
      }),
      [listSavingsAccount?.id]
    ),
    { skip: !listSavingsAccount?.id }
  );

  const savingsAccount = savingsAccountQueryResult.data?.data;

  const savingsTransactionsQueryResult =
    savingsApi.useGetSavingsTransactionsQuery(
      useMemo(
        () => ({
          params: {
            savingsId: listSavingsAccount?.id,
            all: true,
          },
        }),
        [listSavingsAccount?.id]
      ),
      { skip: !listSavingsAccount?.id }
    );

  const savingsTransactions = savingsTransactionsQueryResult.data?.data;

  const savedCard = false;

  const virtualizer = useVirtualizer({
    count: savingsTransactions?.length,
    getScrollElement: () => transactionsParentRef.current,
    estimateSize: () => 56,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  async function handleFlexFundSuccess(
    totalAvailableBalance: number,
    interval?: any
  ) {
    try {
      const [savingsData] = await Promise.all([
        savingsAccountsQueryResult.refetch().unwrap(),
        savingsAccountQueryResult.refetch().unwrap(),
        savingsTransactionsQueryResult.refetch().unwrap(),
      ]);

      const retry =
        Number(savingsData?.data?.totalAvailableBalance) ==
        Number(totalAvailableBalance);

      if (retry) {
        interval = setTimeout(() => {
          handleFlexFundSuccess(totalAvailableBalance, interval);
        }, 1000 * 5);
      } else {
        clearTimeout(interval);
      }
    } catch {}
  }

  const isLoading =
    savingsAccountsQueryResult.isLoading || savingsAccountQueryResult.isLoading;

  const isError =
    savingsAccountsQueryResult.isError || savingsAccountQueryResult.isError;

  function onRefetch() {
    if (savingsAccountsQueryResult.isError) {
      savingsAccountsQueryResult.refetch();
    }

    if (savingsAccountQueryResult.isError) {
      savingsAccountQueryResult.refetch();
    }
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center flex-wrap gap-2">
          <Typography variant="h5">Flex Yield</Typography>
          <div className="flex-1" />
          {savingsAccount ? (
            <Paper
              variant="outlined"
              className="flex items-center gap-2 p-2 bg-[#5EB1BF1A] border-[#5EB1BFB2]"
            >
              <Iconify
                icon="icon-park-outline:send-one"
                className="text-lg text-[#5EB1BF]"
              />
              <Typography>
                <span className="text-text-secondary">
                  Credit Direct Limited:
                </span>
                {"  "}
                <FlexFund
                  onSuccess={() => handleFlexFundSuccess(totalAvailableBalance)}
                >
                  {({ toggleOpen }) => (
                    <MuiLink
                      color="textPrimary"
                      className="font-semibold cursor-pointer"
                      component="span"
                      onClick={toggleOpen}
                    >
                      {savingsAccount?.account_no}
                    </MuiLink>
                  )}
                </FlexFund>
              </Typography>
            </Paper>
          ) : null}
        </div>

        <LoadingContent loading={isLoading} error={isError} onRetry={onRefetch}>
          {() => (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-8 w-full md:w-[60%]">
                <Paper className="p-6">
                  <div className="flex lg:items-center flex-col lg:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        Total Balance
                      </Typography>
                      <div className="flex items-center">
                        <CurrencyTypography
                          variant="h3"
                          className="font-bold"
                          blur={isWalletBalanceVisible}
                        >
                          {totalAvailableBalance}
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
                      <div>
                        <div>
                          {getSavingsProductInformationQuery?.isLoading ? (
                            <Skeleton variant="text" className="text-xl" />
                          ) : (
                            <>
                              {isActive ? (
                                <div>
                                  <Typography
                                    variant="body2"
                                    className="flex items-center gap-2 text-text-secondary"
                                  >
                                    Total Interest
                                    <span className="w-2 h-2 bg-text-secondary rounded-full"></span>
                                    <span className="">
                                      {
                                        getSavingsProductInformationQuery?.data
                                          ?.data?.interest_rate
                                      }
                                      %
                                    </span>{" "}
                                    P/A
                                  </Typography>
                                </div>
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Interest is{" "}
                                  <b>
                                    {
                                      getSavingsProductInformationQuery?.data
                                        ?.data?.interest_rate
                                    }
                                    %
                                  </b>{" "}
                                  per annum.
                                </Typography>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {isActive ? (
                      <div className="w-full lg:max-w-[135px] grid grid-cols-2 lg:grid-cols-1 gap-3">
                        <FlexFund
                          onSuccess={() =>
                            handleFlexFundSuccess(totalAvailableBalance)
                          }
                        >
                          {({ toggleOpen }) => (
                            <Button fullWidth onClick={toggleOpen}>
                              Add Money
                            </Button>
                          )}
                        </FlexFund>

                        <YieldWithdraw>
                          {({ toggleOpen }) => (
                            <Button
                              fullWidth
                              variant="outlined"
                              onClick={toggleOpen}
                            >
                              Withdraw
                            </Button>
                          )}
                        </YieldWithdraw>
                      </div>
                    ) : (
                      <FlexFund
                        onSuccess={() =>
                          handleFlexFundSuccess(totalAvailableBalance)
                        }
                      >
                        {({ toggleOpen }) => (
                          <Button
                            fullWidth
                            className="lg:max-w-[135px]"
                            onClick={toggleOpen}
                          >
                            Fund Wallet
                          </Button>
                        )}
                      </FlexFund>
                    )}
                  </div>
                </Paper>

                <Paper
                  variant="outlined"
                  className="p-4 pb-8 space-y-4 min-h-[calc(100vh-370px)]"
                >
                  <div className="flex items-center justify-between">
                    <Typography
                      variant="h6"
                      className="font-medium"
                      gutterBottom
                    >
                      Recent Transactions
                    </Typography>
                    {/* {savingsTransactions?.length ? (
                    <TextField
                      select
                      placeholder="Filter By"
                      size="small"
                      className="min-w-24"
                    >
                      {[].map(() => (
                        <MenuItem></MenuItem>
                      ))}
                    </TextField>
                  ) : null} */}
                  </div>
                  <LoadingContent
                    loading={savingsTransactionsQueryResult.isLoading}
                    error={savingsTransactionsQueryResult.isError}
                    onRetry={savingsTransactionsQueryResult.refetch}
                  >
                    {() => (
                      <>
                        {savingsTransactions?.length ? (
                          <div
                            className="overflow-y-auto h-96"
                            style={{ contain: "strict" }}
                            ref={transactionsParentRef}
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
                                    savingsTransactions?.[virtualItem.index];
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
                                        <Typography
                                          variant="body1"
                                          gutterBottom
                                        >
                                          {TRANSACTION_TYPE_ID_TO_TITLE[
                                            transaction?.transaction_type_code
                                          ] || "----"}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                        >
                                          {dfns.format(
                                            new Date(
                                              transaction?.transaction_date
                                            ),
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
                          <div className="flex h-full flex-col items-center justify-center gap-8 text-center">
                            <WalletTransactionFlowSvg />
                            <div className="space-y-1">
                              <Typography
                                variant="h6"
                                className="font-semibold"
                              >
                                No Transactions
                              </Typography>
                              <Typography variant="body1" color="textSecondary">
                                Fund your wallet to see your transactions here.
                              </Typography>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </LoadingContent>
                </Paper>
              </div>
              <div className="space-y-8 w-full md:w-[40%]">
                {isFAQ ? (
                  <Paper variant="outlined" className="px-6 pt-5 pb-14">
                    <div>
                      <div className="flex items-center gap-2 justify-between">
                        <Typography variant="h6" className="font-medium">
                          What is a Flex Yield?
                        </Typography>
                        <IconButton
                          variant="soft"
                          className="bg-neutral-100"
                          onClick={toggleFAQ}
                        >
                          <Iconify icon="material-symbols:close" />
                        </IconButton>
                      </div>
                      <Typography color="textSecondary" className="mt-4">
                        <span className="text-[#4920AA] font-semibold">
                          Flex Yield
                        </span>{" "}
                        is a flexible savings product that allows you manage
                        their funds more flexibly.
                      </Typography>
                      <Typography color="textSecondary" className="mt-3">
                        The feature will allow you{" "}
                        <span className="text-[#5EB1BF] font-semibold">
                          autosave
                        </span>
                        , and enjoy the benefits of no-penalty withdrawals.
                      </Typography>

                      <Typography color="textSecondary" className="mt-3">
                        You can also create{" "}
                        <span className="text-[#7CA853] font-semibold">
                          labels
                        </span>{" "}
                        within your target yield to organize your funds
                        according to specific needs.
                      </Typography>
                    </div>

                    <div>
                      <Typography variant="h6" className="font-medium mt-8">
                        Earn Interest
                      </Typography>
                      <Typography color="textSecondary" className="mt-4">
                        With an interest rate of{" "}
                        <span className="text-[#4920AA] font-semibold">
                          14%
                        </span>
                        , you can save for as long as you like and withdraw your
                        money at any time.
                      </Typography>
                    </div>
                  </Paper>
                ) : null}
                <Paper variant="outlined" className="p-4 pb-8 space-y-8">
                  <Typography variant="h6" className="font-medium">
                    Saved Card(s)
                  </Typography>

                  <div>
                    {savedCard ? (
                      <div className="space-y-8">
                        <div className="rounded-lg p-6 bg-green-900 space-y-24 text-white">
                          <div className="flex items-center gap-2 justify-between">
                            <svg
                              width="48"
                              height="28"
                              viewBox="0 0 48 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="14" cy="14" r="14" fill="#E33A24" />
                              <circle
                                cx="34"
                                cy="14"
                                r="14"
                                fill="#F8CB2E"
                                fill-opacity="0.8"
                              />
                            </svg>

                            <div className="bg-white/25 text-white px-2 py-1 rounded-2xl flex items-center">
                              <Typography variant="body2">
                                Default Card
                              </Typography>
                            </div>
                          </div>

                          <div>
                            <Typography variant="body2">Card Number</Typography>
                            <Typography variant="h5">
                              **** **** **** 0176
                            </Typography>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="soft"
                            color="success"
                            startIcon={<Iconify icon="material-symbols:add" />}
                            fullWidth
                          >
                            Add Card
                          </Button>
                          <Button
                            variant="soft"
                            color="error"
                            startIcon={<Iconify icon="gravity-ui:trash-bin" />}
                            fullWidth
                          >
                            Delete Card
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-8 text-center">
                        <SavedCardSvg className="mt-8" />
                        <div className="space-y-1 mt-8">
                          <Typography variant="h6" className="font-semibold">
                            Saved Card
                          </Typography>
                          <Typography variant="body1" color="textSecondary">
                            Save your card to help you fund your yield easily.
                          </Typography>
                          <ButtonBase
                            disableRipple
                            className="inline-block underline text-[#4920AA]"
                          >
                            Link a Card
                          </ButtonBase>
                        </div>
                      </div>
                    )}
                  </div>
                </Paper>
                {/* <Paper variant="outlined" className="p-4 pb-8 space-y-8">
                  <Typography variant="h6" className="font-medium">
                    Targets
                  </Typography>

                  <div>
                    <div className="flex flex-col items-center gap-8 text-center">
                      <BookmarkSvg className="mt-8" />
                      <div className="space-y-1">
                        <Typography variant="h6" className="font-semibold">
                          Coming Soon
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          Targets help you organize your funds based on your
                          needs.
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Paper> */}
              </div>
            </div>
          )}
        </LoadingContent>
      </div>

      <FlexFund
        open={isFund}
        onClose={toggleFund}
        onSuccess={() => handleFlexFundSuccess(totalAvailableBalance)}
      />
    </>
  );
}

export const Component = Flex;

export default Flex;
