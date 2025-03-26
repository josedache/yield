import { useVirtualizer } from "@tanstack/react-virtual";
import { savingsApi } from "apis/savings-api";
import {
  TRANSACTION_TYPE_ID_TO_COLOR,
  TRANSACTION_TYPE_ID_TO_ICON,
  TRANSACTION_TYPE_ID_TO_SIGN,
  TRANSACTION_TYPE_ID_TO_TITLE,
} from "constants/transactions";
import * as dfns from "date-fns";
import DashboardEmptyActivitySvg from "assets/svgs/dashboard-empty-activity.svg?react";
import { useMemo, useRef } from "react";
import { IconButton, Paper, Typography } from "@mui/material";
import CurrencyTypography from "components/CurrencyTypography";
import { Icon as Iconify } from "@iconify-icon/react";
import LoadingContent from "components/LoadingContent";

function DashboardRecentActivities() {
  const recentActivitiesParentRef = useRef(null);

  const savingsRecentActivitiesQueryResult =
    savingsApi.useGetSavingsRecentActivitiesQuery(
      useMemo(
        () => ({
          params: {
            type: 300,
            // type: "recurring_deposit"
          },
        }),
        []
      )
    );

  const savingsRecentActivities = savingsRecentActivitiesQueryResult.data?.data;

  const virtualizer = useVirtualizer({
    count: savingsRecentActivities?.length,
    getScrollElement: () => recentActivitiesParentRef.current,
    estimateSize: () => 56,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <>
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
                              <Typography variant="body2" color="textSecondary">
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
    </>
  );
}

export default DashboardRecentActivities;
