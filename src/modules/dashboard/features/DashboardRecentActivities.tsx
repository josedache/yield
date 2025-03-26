import { useVirtualizer } from "@tanstack/react-virtual";
import DashboardEmptyActivitySvg from "assets/svgs/dashboard-empty-activity.svg?react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IconButton, LinearProgress, Paper, Typography } from "@mui/material";
import LoadingContent from "components/LoadingContent";
import { transactionApi } from "apis/transaction-api.ts";
import useIntersectionObserver from "hooks/useIntersectionObserver.tsx";
import { PAGE_LIMIT, PAGE_OFFSET } from "constants/pagination.ts";
import { Transaction } from "../../../types/transaction-api.ts";
import { Icon as Iconify } from "@iconify-icon/react";
import clsx from "clsx";
import CurrencyTypography from "components/CurrencyTypography.tsx";
import * as dfns from "date-fns";
import { TransactionType } from "enums/TransactionType.ts";

function DashboardRecentActivities() {
  const transactionsParentRef = useRef(null);

  const [infiniteTransactions, setInfiniteTransactions] = useState<{
    [x: string]: Transaction[];
  }>({});

  const [pageState, setPageState] = useState(() => ({
    cursor: undefined,
    offset: PAGE_OFFSET,
    limit: PAGE_LIMIT,
  }));

  const transactionsQueryResult = transactionApi.useGetTransactionsQuery(
    useMemo(
      () => ({
        params: {
          limit: pageState.limit,
          offset: pageState.offset,
          sortOrder: "desc",
        },
      }),
      [pageState.limit, pageState.offset],
    ),
  );

  const transactionSections = (() => {
    const transactions = Object.values(infiniteTransactions).flatMap(
      (transactions) => transactions,
    );

    const groupedTransactions = transactions?.reduce(
      (acc, curr) => {
        if (acc[curr.transaction_date]) {
          acc[curr.transaction_date].transactions.push(curr);
        } else {
          acc[curr.transaction_date] = {
            date: curr.transaction_date,
            transactions: [curr],
          };
        }

        return acc;
      },
      {} as { [x: string]: TransactionSection },
    );

    if (!groupedTransactions) {
      return [];
    }

    return Object.values(groupedTransactions);
  })();

  const topItemIntersectionObserver = useIntersectionObserver((entries) => {
    if (transactionsQueryResult.isFetching) return;

    if (
      entries[0].isIntersecting &&
      (transactionsQueryResult.isUninitialized ||
        transactionsQueryResult.data?.data?.length)
      // Math.ceil(pageState.offset / pageState.limit) + 1 <
      //   transactionsQueryResult.data?.data?.pageCount
    ) {
      // setPageState((p) => ({
      //     ...p,
      //     cursor: transactionsQueryResult.data?.data?.cursor,
      // }));
      setPageState((p) => ({ ...p, offset: p.offset + p.limit }));
    }
  });

  const observerRef = useRef(topItemIntersectionObserver);

  const lastItemRefCallback = useCallback((node: HTMLDivElement) => {
    observerRef.current.disconnect();
    if (node) {
      observerRef.current.observe(node);
    }
  }, []);

  const virtualizer = useVirtualizer({
    count: transactionSections?.length,
    getScrollElement: () => transactionsParentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    setInfiniteTransactions((p) => ({
      ...p,
      [JSON.stringify(transactionsQueryResult.originalArgs)]:
        transactionsQueryResult.data?.data ?? [],
    }));
  }, [
    transactionsQueryResult.originalArgs,
    transactionsQueryResult.data?.data,
  ]);

  return (
    <>
      <Paper className="py-4 md:py-8 mt-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-10 bg-inherit ">
          <div>
            {transactionsQueryResult.isFetching &&
            !transactionsQueryResult.isLoading ? (
              <LinearProgress variant="indeterminate" />
            ) : (
              <div className="h-1" />
            )}
          </div>
        </div>
        <Typography variant="h5" className="px-4 md:px-8 mb-4">
          Recent Activities
        </Typography>
        <LoadingContent
          loading={transactionsQueryResult.isLoading}
          error={transactionsQueryResult.isError}
          onRetry={transactionsQueryResult.refetch}
        >
          {() => (
            <>
              {transactionSections?.length ? (
                <div
                  className="overflow-y-auto h-96 px-4 md:px-8"
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
                      className="absolute left-0 top-0 w-full space-y-8"
                      style={{
                        transform: `translateY(${
                          virtualItems[0]?.start ?? 0
                        }px)`,
                      }}
                    >
                      {virtualItems.map((virtualItem) => {
                        const transactionSection =
                          transactionSections?.[virtualItem.index];
                        return (
                          <div
                            key={transactionSection?.date}
                            data-index={virtualItem.index}
                            ref={virtualizer.measureElement}
                          >
                            <DashboardRecentActivitySection
                              key={transactionSection?.date}
                              section={transactionSection}
                            />
                          </div>
                        );
                      })}
                      <div ref={lastItemRefCallback} />
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
    </>
  );
}

export default DashboardRecentActivities;

function DashboardRecentActivitySection(props: {
  section: TransactionSection;
}) {
  const { section } = props;
  const date = new Date(section.date);
  const yearStart = dfns.startOfYear(new Date());

  return (
    <>
      <div className="space-y-2">
        <Typography variant="h6" className="font-bold">
          {dfns.isBefore(date, yearStart)
            ? dfns.format(date, "dd MMMM yyyy")
            : dfns.format(date, "dd MMMM")}
        </Typography>

        <div className="space-y-4">
          {section.transactions?.map((transaction) => (
            <DashboardRecentActivityTransaction
              key={transaction?.id}
              transaction={transaction}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function DashboardRecentActivityTransaction(props: {
  transaction: Transaction;
}) {
  const { transaction } = props;

  const isDebit = ![TransactionType.deposit, TransactionType.interest].includes(
    transaction?.transaction_type,
  );

  return (
    <>
      <Paper className="p-4 flex items-center gap-4">
        <IconButton
          variant="soft"
          color={
            {
              [TransactionType.withdrawal]: "error",
              [TransactionType.deposit]: "success",
              [TransactionType.card]: "error",
              [TransactionType.airtime]: "error",
              [TransactionType.cable]: "error",
              [TransactionType.electricity]: "error",
              [TransactionType.overdraft]: "success",
              [TransactionType.feeDeduction]: "error",
              [TransactionType.yield]: "error",
              [TransactionType.interest]: "success",
              [TransactionType.other]: "error",
            }[transaction?.transaction_type] as any
          }
        >
          <Iconify
            icon={
              {
                [TransactionType.withdrawal]: "uis:arrow-up-right",
                [TransactionType.deposit]: "uis:arrow-down-left",
                [TransactionType.card]: "famicons:card-outline",
                [TransactionType.airtime]: "fluent:phone-24-regular",
                [TransactionType.cable]: "streamline:satellite-dish",
                [TransactionType.electricity]: "mage:electricity",
                [TransactionType.overdraft]: "uis:arrow-down-left",
                [TransactionType.feeDeduction]: "uis:arrow-up-right",
                [TransactionType.yield]: "uis:arrow-up-right",
                [TransactionType.interest]: "uis:arrow-down-left",
                [TransactionType.other]: "famicons:card-outline",
              }[transaction?.transaction_type] as any
            }
          />
        </IconButton>

        <div className="flex-1 space-y-0.5">
          <Typography className="space-x-1">
            {transaction?.mobile_label
              ?.split(" ")
              ?.map((word) => (
                <span
                  className={clsx(
                    word.toLowerCase() === "to" || word.toLowerCase() === "from"
                      ? ""
                      : "font-semibold",
                  )}
                >
                  {word}
                </span>
              ))}
          </Typography>
          <Typography>{transaction?.transaction_category}</Typography>
        </div>

        <div className="text-right">
          <Typography
            className={clsx(isDebit ? "text-error-main" : "text-success-main")}
          >
            {isDebit ? "-" : "+"}
            <CurrencyTypography component="span">
              {transaction?.amount}
            </CurrencyTypography>
          </Typography>
          {transaction?.transaction_time ? (
            <Typography variant="body2">
              {dfns.format(
                new Date(transaction?.transaction_time),
                "hh:mm aaa",
              )}
            </Typography>
          ) : null}
        </div>
      </Paper>
    </>
  );
}

type TransactionSection = { date: string; transactions: Transaction[] };
