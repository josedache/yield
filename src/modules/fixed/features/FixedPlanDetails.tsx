import {
  Button,
  ButtonBase,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSnackbar } from "notistack";

import CurrencyTypography from "components/CurrencyTypography";
import useToggle from "hooks/useToggle";
import { format } from "date-fns";
import LoadingContent from "components/LoadingContent";
import FixedStatusChip from "./FixedStatusChip";
import { savingsApi } from "apis/savings-api";
import WalletTransactionFlowSvg from "assets/svgs/wallet--transaction-flow.svg?react";
import {
  TRANSACTION_TYPE_ID_TO_COLOR,
  TRANSACTION_TYPE_ID_TO_ICON,
  TRANSACTION_TYPE_ID_TO_SIGN,
  TRANSACTION_TYPE_ID_TO_TITLE,
} from "constants/transactions";
import { formatNumberToCurrency } from "utils/number";
import FixedLiquidate from "./FixedLiquidate";
import FixedCreatePlan from "./FixedCreatePlan";
import FixedDeleteDraft from "./FixedDeleteDraft";
import FixedEditPlanName from "./FixedEditPlanName";
import FixedRollover from "./FixedRollover";
import { SAVINGS_ACCOUNT_STATUS_TYPE } from "constants/savings";

export default function FixedPlanDetails(
  props: DrawerProps & { onClose: () => void; info: any }
) {
  const { onClose, info, ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [deleteSavingMutation, deleteSavingMutationResult] =
    savingsApi.useDeleteDraftSavingsMutation();

  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle();
  const [isFixedLiquidate, toggleFixedLiquidate] = useToggle();
  const [isCompletePayment, toggleCompletePayment] = useToggle();
  const [isDeleteSavings, toggleDeleteSavings] = useToggle();
  const [isRenamePlan, toggleIsRenamePlan] = useToggle();
  const [isRollOver, toggleIsRollOver] = useToggle();
  const [isEditDraft, toggleEditDraft] = useToggle();

  async function handleDelete() {
    try {
      await deleteSavingMutation({
        body: { savingsId: String(info.id), note: "" },
      }).unwrap();
      enqueueSnackbar("Deleted successfully", { variant: "success" });
      toggleDeleteSavings();
    } catch (error) {
      enqueueSnackbar(error.data?.message || "Failed to delete", {
        variant: "error",
      });
    }
  }

  const getSavingsQuery = savingsApi.useGetSavingsAccountQuery({
    params: { savingsId: info.id },
  });

  const canViewTransactions = [
    SAVINGS_ACCOUNT_STATUS_TYPE.MATURED,
    SAVINGS_ACCOUNT_STATUS_TYPE.ACTIVE,
    SAVINGS_ACCOUNT_STATUS_TYPE.PRE_MATURE_CLOSURE,
  ].includes(
    getSavingsQuery?.data?.data?.account_status_code ||
      info?.account_status_code
  );

  const getSavingsTransactionQuery = savingsApi.useGetSavingsTransactionsQuery(
    useMemo(
      () => ({
        params: { savingsId: info?.id, all: true },
      }),
      [info?.id]
    ),
    { skip: !canViewTransactions }
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
      value: `${getSavingsQuery?.data?.data?.duration || ""} ${
        getSavingsQuery?.data?.data?.duration_type || ""
      }`,
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

  const actions: any = [
    {
      name: "Liquidate Yield",
      icon: "ic:baseline-minus",
      color: "success",
      variant: "soft",
      status: [
        SAVINGS_ACCOUNT_STATUS_TYPE.ACTIVE,
        SAVINGS_ACCOUNT_STATUS_TYPE.MATURED,
      ],
      disabled: getSavingsQuery?.isLoading,
      onClick: toggleFixedLiquidate,
    },
    {
      name: "Edit Name",
      icon: "fluent:edit-20-regular",
      color: "success",
      variant: "soft",
      onClick: toggleIsRenamePlan,
      status: [SAVINGS_ACCOUNT_STATUS_TYPE.ACTIVE],
    },
    {
      name: "Complete Payment",
      icon: "ic:twotone-plus",
      color: "success",
      variant: "soft",
      status: [SAVINGS_ACCOUNT_STATUS_TYPE.SUBMITTED_AND_PENDING_APPROVAL],
      onClick: toggleCompletePayment,
      disabled: getSavingsQuery?.isLoading,
    },
    {
      name: "Rollover yield",
      icon: "solar:refresh-outline",
      color: "success",
      variant: "contained",
      className: "bg-[#7CA853] text-neutral-100",
      status: [SAVINGS_ACCOUNT_STATUS_TYPE.MATURED],
      onClick: toggleIsRollOver,
      disabled: getSavingsQuery?.isLoading,
    },
    {
      name: "Delete Draft",
      icon: "fluent:delete-16-regular",
      color: "error",
      variant: "soft",
      status: [SAVINGS_ACCOUNT_STATUS_TYPE.SUBMITTED_AND_PENDING_APPROVAL],
      onClick: toggleDeleteSavings,
      disabled: getSavingsQuery?.isLoading,
    },
  ];

  return (
    <Fragment>
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
              <Typography className="capitalize">
                {getSavingsQuery?.data?.data?.plan_name || "..."}{" "}
              </Typography>

              <FixedStatusChip
                id={getSavingsQuery?.data?.data.account_status_code as any}
                label={
                  getSavingsQuery?.data?.data.account_status || "Loading..."
                }
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

          <LoadingContent
            loading={getSavingsQuery.isLoading || getSavingsQuery?.isFetching}
            error={getSavingsQuery?.isError}
            onRetry={getSavingsQuery?.refetch}
            renderLoading={() => (
              <div className="flex gap-4 mt-4 px-6 w-full">
                <Skeleton variant="rounded" className="w-full h-[40px]" />
                <Skeleton variant="rounded" className="w-full h-[40px]" />
              </div>
            )}
          >
            <div className="flex gap-4 mt-4 px-6">
              {actions
                ?.filter((action) =>
                  action.status.includes(
                    getSavingsQuery?.data?.data?.account_status_code
                  )
                )
                ?.map(({ name, icon, ...rest }) => (
                  <Button
                    startIcon={
                      <Iconify icon={icon} width="1rem" height="1rem" />
                    }
                    fullWidth
                    {...rest}
                  >
                    {name}
                  </Button>
                ))}
            </div>
          </LoadingContent>

          <div className="mt-6">
            <div className="px-6 flex justify-between">
              <Typography className="font-semibold">Details</Typography>
              {[
                SAVINGS_ACCOUNT_STATUS_TYPE.SUBMITTED_AND_PENDING_APPROVAL,
              ].includes(getSavingsQuery?.data?.data?.account_status_code) ? (
                <ButtonBase
                  onClick={toggleEditDraft}
                  disableRipple
                  className="inline-block underline text-[#4920AA]"
                >
                  Edit Plan
                </ButtonBase>
              ) : null}
            </div>
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
              {() => (
                <div className="px-6 mt-4 grid grid-cols-1 gap-6  mb-8">
                  {details.map(({ title, value }) => (
                    <div className="flex justify-between">
                      <Typography className="text-neutral-600">
                        {title}
                      </Typography>
                      <Typography className="font-semibold text-neutral-900">
                        {value}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
            </LoadingContent>
          </div>

          {canViewTransactions ? (
            <div className="mt-6">
              <div className="px-6 flex justify-between">
                <Typography className="font-semibold">Transactions</Typography>
                <ButtonBase
                  disableRipple
                  className="inline-block underline text-[#4920AA]"
                >
                  View All
                </ButtonBase>
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
                            <Skeleton
                              variant="rounded"
                              width={100}
                              height={20}
                            />
                            <Skeleton
                              variant="rounded"
                              width={100}
                              height={20}
                            />
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
          ) : null}
        </div>
      </Drawer>

      {isFixedLiquidate && (
        <FixedLiquidate
          info={info}
          open={isFixedLiquidate}
          onClose={toggleFixedLiquidate}
        />
      )}

      {isCompletePayment && (
        <FixedCreatePlan
          savingsId={info.id}
          isPayment
          open={isCompletePayment}
          onClose={toggleCompletePayment}
        />
      )}

      {isEditDraft && (
        <FixedCreatePlan
          isEdit
          savingsId={info.id}
          open={isEditDraft}
          onClose={toggleEditDraft}
        />
      )}

      {isDeleteSavings && (
        <FixedDeleteDraft
          savingsId={info.id}
          isLoading={deleteSavingMutationResult.isLoading}
          handleDelete={handleDelete}
          onClose={toggleDeleteSavings}
          open={isDeleteSavings}
        />
      )}

      {isRenamePlan && (
        <FixedEditPlanName
          info={info}
          open={isRenamePlan}
          onClose={toggleIsRenamePlan}
        />
      )}

      {isRollOver && (
        <FixedRollover
          info={info}
          open={isRollOver}
          onClose={toggleIsRollOver}
        />
      )}
    </Fragment>
  );
}
