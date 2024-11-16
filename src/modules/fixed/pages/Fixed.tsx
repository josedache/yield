import {
  Button,
  IconButton,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Skeleton,
  ButtonBase,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useSearchParams } from "react-router-dom";
import { format, isValid as dfnsIsValid } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import CurrencyTypography from "components/CurrencyTypography";
import useToggle from "hooks/useToggle";
import SavedCardSvg from "assets/svgs/saved-card.svg?react";
import EmptyPlanSvg from "assets/svgs/empty-state.svg?react";
import FixedCreatePlan from "../features/FixedCreatePlan";
import TanStandardTable from "components/TanStandardTable";
import useTable from "hooks/useTable";
import { savingsApi } from "apis/savings-api";
import FixedStatusChip from "../features/FixedStatusChip";
import LoadingContent from "components/LoadingContent";
import DashboardWithdrawalAccountCard from "modules/dashboard/features/DashboardWithdrawalaccountCard";
import {
  ALL_ACTIVE_SAVINGS_ACCOUNT_STATUS_TYPE,
  SAVINGS_ACCOUNT_STATUS_TYPE,
} from "constants/savings";
import { FixedUrlDialog } from "../enums/FixedUrlDialog";
import { urlSearchParamsExtractor } from "utils/url";
import FixedPlanDetails from "../features/FixedPlanDetails";

function Fixed() {
  const [searchParams] = useSearchParams();

  const { dialog } = urlSearchParamsExtractor(searchParams, {
    dialog: "" as FixedUrlDialog,
  });

  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle();
  const [isFixedCreatePlan, toggleFixedCreatePlan] = useToggle(
    dialog === FixedUrlDialog.CREATE_PLAN
  );
  const [statusId, setStatusId] = useState<number>(0);
  const [isPlanDetails, togglePlanDetails] = useToggle();
  const [info, setInfo] = useState();

  const getSavingsAccountsQuery = savingsApi.useGetSavingsAccountsQuery(
    useMemo(
      () => ({
        params: { type: "fixed_deposit", ...(statusId ? { statusId } : {}) },
      }),
      [statusId]
    )
  );

  const savingsAccountsBalanceQueryResult =
    savingsApi.useGetSavingsAccountsQuery(
      useMemo(() => {
        const params = new URLSearchParams();
        params.set("type", "fixed_deposit");
        params.set("statusId", String(SAVINGS_ACCOUNT_STATUS_TYPE.ACTIVE));
        params.append("statusId", String(SAVINGS_ACCOUNT_STATUS_TYPE.MATURED));

        return {
          params: params as any,
        };
      }, [])
    );

  const totalAvailableBalance = Number(
    savingsAccountsBalanceQueryResult?.data?.data?.totalAvailableBalance ?? 0
  );

  const savedCard = false;

  const tableInstance = useTable({
    columns,
    data: getSavingsAccountsQuery?.data?.data?.savingsAccounts || null,
    manualPagination: true,
  });

  async function handleFixedCreatePlanSuccess(
    totalAvailableBalance: number,
    interval?: any
  ) {
    try {
      const [savingsData] = await Promise.all([
        getSavingsAccountsQuery.refetch().unwrap(),
      ]);

      const retry =
        Number(savingsData?.data?.totalAvailableBalance) ==
        Number(totalAvailableBalance);

      if (retry) {
        interval = setTimeout(() => {
          handleFixedCreatePlanSuccess(totalAvailableBalance, interval);
        }, 1000 * 5);
      } else {
        clearTimeout(interval);
      }
    } catch {}
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Typography variant="h5">Fixed Yield</Typography>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="space-y-8 w-full md:w-[60%]">
          <Paper className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-[70%]">
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Total Balance
                </Typography>
                <div className="flex items-center mt-1">
                  {savingsAccountsBalanceQueryResult?.isLoading ? (
                    <Skeleton
                      variant="text"
                      width={100}
                      sx={{ fontSize: "3rem" }}
                    />
                  ) : (
                    <CurrencyTypography
                      variant="h3"
                      className="font-bold"
                      blur={isWalletBalanceVisible}
                    >
                      {
                        savingsAccountsBalanceQueryResult?.data?.data
                          ?.totalAvailableBalance
                      }
                    </CurrencyTypography>
                  )}
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

                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mt-2 md:mt-4"
                >
                  Interest Rate is <b>15</b> - <b>20%</b> per annum.{" "}
                </Typography>
              </div>
              <Button
                className="w-full md:w-[30%]"
                fullWidth
                disabled={savingsAccountsBalanceQueryResult?.isLoading}
                onClick={toggleFixedCreatePlan}
              >
                Create Plan
              </Button>
            </div>
          </Paper>

          <LoadingContent
            loading={getSavingsAccountsQuery.isLoading}
            error={getSavingsAccountsQuery?.isError}
            onRetry={getSavingsAccountsQuery.refetch}
            renderLoading={() => (
              <Paper variant="outlined" className="p-0 overflow-hidden w-full">
                <div className="flex items-center justify-between p-4">
                  <Skeleton variant="rounded" className="w-[100px] h-[20px] " />
                  <Skeleton variant="rounded" className="w-[100px] h-[40px] " />
                </div>

                <Skeleton variant="rectangular" className="w-full h-[50px] " />

                <div className="grid grid-cols-1 gap-2 mt-2">
                  {[...Array(5)].map((index) => (
                    <div
                      key={index}
                      className="flex gap-1 items-center justify-between p-2"
                    >
                      {[...Array(5)].map((item) => (
                        <Skeleton
                          key={item}
                          variant="rounded"
                          className="w-[100px] h-[20px] p-2"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </Paper>
            )}
          >
            <div>
              <Paper variant="outlined" className="p-0 overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <Typography variant="h6" className="font-medium" gutterBottom>
                    My Plans
                  </Typography>
                  <TextField
                    select
                    disabled={getSavingsAccountsQuery?.isFetching}
                    value={statusId}
                    onChange={(e) => {
                      setStatusId(e.target.value as any);
                    }}
                    // slotProps={{
                    //   input: {
                    //     startAdornment: <CircularProgress size={} />,
                    //   },
                    // }}
                    placeholder="Filter By"
                    size="small"
                    className="min-w-24"
                  >
                    {ALL_ACTIVE_SAVINGS_ACCOUNT_STATUS_TYPE.map(
                      ({ id, name }) => (
                        <MenuItem value={id}>{name}</MenuItem>
                      )
                    )}
                  </TextField>
                </div>

                {getSavingsAccountsQuery?.data?.data?.savingsAccounts
                  ?.length ? (
                  <div>
                    <TanStandardTable
                      instance={tableInstance}
                      loading={getSavingsAccountsQuery?.isLoading}
                      error={getSavingsAccountsQuery.isError}
                      onErrorRetry={getSavingsAccountsQuery.refetch}
                      onEmptyRetry={getSavingsAccountsQuery.refetch}
                      // slots={{ bodyCell: CardActionArea }}
                      slotProps={{
                        bodyRow(bodyRow) {
                          return {
                            onClick: () => {
                              setInfo(bodyRow.original);
                              togglePlanDetails();
                            },
                          };
                        },
                      }}
                      classes={{
                        // bodyCell: "pointer bg-red-500",
                        bodyRow: "table-row cursor-pointer",
                      }}
                      pagination={false}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-8 text-center py-20">
                    <EmptyPlanSvg />
                    <div className="space-y-1">
                      <Typography variant="h6" className="font-semibold">
                        No Plans
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        You have no plans yet.
                      </Typography>
                    </div>
                  </div>
                )}
              </Paper>
            </div>
          </LoadingContent>
        </div>
        <div className="space-y-8 w-full md:w-[40%]">
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
                        <Typography variant="body2">Default Card</Typography>
                      </div>
                    </div>

                    <div>
                      <Typography variant="body2">Card Number</Typography>
                      <Typography variant="h5">**** **** **** 0176</Typography>
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
                      disabled
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

          <DashboardWithdrawalAccountCard />
        </div>
      </div>
      {isFixedCreatePlan && (
        <FixedCreatePlan
          onClose={toggleFixedCreatePlan}
          open={isFixedCreatePlan}
          onSuccess={() => handleFixedCreatePlanSuccess(totalAvailableBalance)}
        />
      )}

      {isPlanDetails && (
        <FixedPlanDetails
          info={info}
          onClose={() => {
            setInfo(null);
            togglePlanDetails();
          }}
          open={isPlanDetails}
        />
      )}
    </div>
  );
}

export const Component = Fixed;

export default Fixed;

const columns: ColumnDef<any>[] = [
  {
    header: "Plan Name",
    accessorKey: "plan_name",
    cell: (info) => {
      return (
        <div>
          <Typography className="capitalize">
            {info.row.original.plan_name}
          </Typography>
        </div>
      );
    },
  },
  {
    header: "Amount",
    accessorKey: "maturity_amount",
    cell: (info) => {
      return (
        <CurrencyTypography>
          {[
            SAVINGS_ACCOUNT_STATUS_TYPE.REJECTED,
            SAVINGS_ACCOUNT_STATUS_TYPE.SUBMITTED_AND_PENDING_APPROVAL,
          ].includes(info.row.original?.account_status_code)
            ? info.row.original?.principal
            : info.row.original?.available_balance}
        </CurrencyTypography>
      );
    },
  },
  {
    header: "Maturity Date",
    accessorKey: "maturity_date",
    cell: (info) => {
      return (
        <div>
          <Typography>
            {info.row.original.maturity_date &&
            dfnsIsValid(new Date(info.getValue() as any))
              ? format(info.row.original.maturity_date, "PP")
              : "-"}
          </Typography>
        </div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => {
      return (
        <div>
          <FixedStatusChip
            id={info.row.original.account_status_code as any}
            label={info.row.original.account_status}
          />
        </div>
      );
    },
  },
];
