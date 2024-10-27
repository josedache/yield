import {
  Button,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import useToggle from "hooks/useToggle";

import CurrencyTypography from "components/CurrencyTypography";
import { format } from "date-fns";
import LoadingContent from "components/LoadingContent";
import FixedStatusChip from "./FixedStatusChip";
import { SavingsSavingsAccount } from "src/types/savings";
import { savingsApi } from "apis/savings-api";
import WalletTransactionFlowSvg from "assets/svgs/wallet--transaction-flow.svg?react";
import {
  TRANSACTION_TYPE_ID_TO_COLOR,
  TRANSACTION_TYPE_ID_TO_ICON,
  TRANSACTION_TYPE_ID_TO_SIGN,
  TRANSACTION_TYPE_ID_TO_TITLE,
} from "constants/transactions";
import { formatNumberToCurrency } from "utils/number";
import { useMemo } from "react";

export default function FixedPlanDetails(
  props: DrawerProps & { onClose: () => void; info: SavingsSavingsAccount }
) {
  const { onClose, info, ...rest } = props;

  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle();

  const getSavingsQuery = savingsApi.useGetSavingsAccountQuery({
    params: { savingsId: info.id },
  });

  const getSavingsTransactionQuery = savingsApi.useGetSavingsTransactionsQuery(
    useMemo(
      () => ({
        params: { savingsId: getSavingsQuery?.data?.data?.id, all: true },
      }),
      [getSavingsQuery?.data?.data?.id]
    ),
    { skip: !getSavingsQuery?.data?.data?.id }
  );

  const details = [
    {
      title: "Creation Date",
      value: getSavingsQuery?.data?.data?.submitted_date
        ? format(getSavingsQuery?.data?.data?.submitted_date, "PP")
        : "N/A",
    },
    {
      title: "Maturity Date",
      value: getSavingsQuery?.data?.data?.maturity_date
        ? format(getSavingsQuery?.data?.data?.maturity_date, "PP")
        : "N/A",
    },
    {
      title: "Duration",
      value: `${getSavingsQuery?.data?.data?.duration} ${getSavingsQuery?.data?.data?.duration_type}`,
    },
    {
      title: "Accrued Interest",
      value: `+₦${
        formatNumberToCurrency(
          getSavingsQuery?.data?.data?.total_interest_earned
        ) || "0"
      }`,
    },
    {
      title: "Estimated Interest",
      value: `₦${
        formatNumberToCurrency(
          `${
            getSavingsQuery?.data?.data?.maturity_amount -
            Number(getSavingsQuery?.data?.data?.available_balance)
          }`
        ) || "0"
      }`,
    },
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
      <div className="py-6">
        <div className="flex justify-between gap-2 items-center px-6">
          <div className="flex gap-1 items-center">
            <Typography variant="h6">{info?.plan_name || "---"}</Typography>
            <FixedStatusChip
              id={getSavingsQuery?.data?.data.account_status_code as any}
              label={getSavingsQuery?.data?.data.account_status}
            />
          </div>

          <IconButton
            variant="contained"
            className="bg-neutral-100"
            onClick={onClose}
          >
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
              {getSavingsQuery?.data?.data?.available_balance}
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

          {getSavingsQuery?.data?.data?.total_interest_earned &&
          Number(getSavingsQuery?.data?.data?.total_interest_earned) > 0 ? (
            <Typography variant="body2" color="primary" className="mt-1">
              +₦
              {formatNumberToCurrency(
                getSavingsQuery?.data?.data?.total_interest_earned
              )}
            </Typography>
          ) : null}
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

          <LoadingContent
            loading={getSavingsQuery.isLoading}
            error={getSavingsQuery?.isError}
            onRetry={getSavingsQuery?.refetch}
            renderLoading={() => (
              <div className="px-6 mt-4 grid grid-cols-1 gap-6  mb-8 w-full">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="flex justify-between">
                    <Skeleton variant="rounded" width={100} height={20} />
                    <Skeleton variant="rounded" width={100} height={20} />
                  </div>
                ))}
              </div>
            )}
          >
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
          </LoadingContent>
        </div>

        {
          <div className="mt-6">
            <div className="px-6 flex justify-between">
              <Typography className="font-semibold">Transactions</Typography>
              <Link className="font-semibold">View All</Link>
            </div>

            <Divider className="mt-2" />

            <LoadingContent
              loading={getSavingsTransactionQuery?.isLoading}
              error={getSavingsTransactionQuery?.isError}
              onRetry={getSavingsTransactionQuery?.refetch}
              renderLoading={() => (
                <div className="grid grid-cols-1 gap-4 w-full p-6 py-4">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div
                      key={index}
                      className="flex gap-3 justify-between items-center w-full"
                    >
                      <div className="flex gap-3">
                        <Skeleton variant="circular" width={40} height={40} />
                        <div className="flex flex-col gap-1">
                          <Skeleton variant="rounded" width={100} height={20} />
                          <Skeleton variant="rounded" width={100} height={20} />
                        </div>
                      </div>

                      <Skeleton variant="rounded" width={100} height={20} />
                    </div>
                  ))}
                </div>
              )}
            >
              <>
                <div className="px-6 mt-4 grid grid-cols-1 gap-6  mb-8">
                  {getSavingsTransactionQuery.data?.data?.length >= 1 ? (
                    <div className="space-y-6">
                      {getSavingsTransactionQuery.data?.data?.map(
                        (transaction, i) => {
                          return (
                            <div key={i} className="flex items-center gap-4">
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
                                  {format(
                                    new Date(transaction?.transaction_date),
                                    "dd MMM, yyyy"
                                  )}
                                </Typography>
                              </div>
                              <div className="flex-1" />
                              <Typography
                                color={
                                  TRANSACTION_TYPE_ID_TO_COLOR[
                                    transaction?.transaction_type_code
                                  ]
                                }
                              >
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
                        }
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-8 text-center">
                      <WalletTransactionFlowSvg />
                      <div className="space-y-1">
                        <Typography variant="h6" className="font-semibold">
                          No Transactions
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          Fund your wallet to see your transactions here.
                        </Typography>
                      </div>
                    </div>
                  )}
                </div>
              </>
            </LoadingContent>
          </div>
        }
      </div>
    </Drawer>
  );
}
