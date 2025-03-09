import {
  Button,
  IconButton,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Skeleton,
  ButtonBase,
  Tabs,
  Tab,
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
import FixedPlanGiftedStatusChip from "../features/FixedPlanGiftedStatusChip";
import FixedPlanTransactionDetails from "../features/FixedPlanGiftedDetails";
import { SavingsAccountGifted } from "src/types/savings-api";

function Fixed() {
  const [searchParams] = useSearchParams();

  const { dialog } = urlSearchParamsExtractor(searchParams, {
    dialog: "" as FixedUrlDialog,
  });

  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle(true);
  const [isFixedCreatePlan, toggleFixedCreatePlan] = useToggle(
    dialog === FixedUrlDialog.CREATE_PLAN
  );
  const [statusId, setStatusId] = useState<number>(0);
  const [isPlanDetails, togglePlanDetails] = useToggle();
  const [info, setInfo] = useState();

  const [giftedPlanDetails, setGiftedPlanDetails] = useState(null);

  const [activeTab, setActiveTab] = useState(0);

  const getSavingsAccountsQuery = savingsApi.useGetSavingsAccountsQuery(
    useMemo(
      () => ({
        params: { type: "fixed_deposit", ...(statusId ? { statusId } : {}) },
      }),
      [statusId]
    ),
    { skip: activeTab !== 0 }
  );

  const giftedSavingsAccountsQueryResult =
    savingsApi.useGetGiftedSavingsAccountsQuery(
      useMemo(
        () => ({ params: { ...(statusId ? { status: statusId } : {}) } }),
        [statusId]
      ),
      { skip: activeTab !== 1 }
    );

  const giftedSavingsAccounts = giftedSavingsAccountsQueryResult.data
    ?.data as SavingsAccountGifted[];

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

  const giftedTableInstance = useTable({
    columns: giftedColumns,
    data: giftedSavingsAccounts || null,
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
                  Interest Rate is <b>16%</b> - <b>21%</b> per annum.{" "}
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
            loading={
              getSavingsAccountsQuery.isLoading ||
              giftedSavingsAccountsQueryResult.isLoading
            }
            error={
              getSavingsAccountsQuery?.isError ||
              giftedSavingsAccountsQueryResult.isError
            }
            onRetry={() => {
              if (getSavingsAccountsQuery?.isError) {
                getSavingsAccountsQuery.refetch();
              }

              if (giftedSavingsAccountsQueryResult?.isError) {
                giftedSavingsAccountsQueryResult.refetch();
              }
            }}
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
                  {/* <Typography variant="h6" className="font-medium" gutterBottom>
                    My Plans
                  </Typography> */}
                  <Tabs
                    className="mb-4"
                    value={activeTab}
                    onChange={(_, value) => setActiveTab(value)}
                  >
                    {[{ label: "My Plans" }, { label: "Gifted Plans" }].map(
                      (props, index) => (
                        <Tab
                          value={index}
                          {...props}
                          classes={{ selected: "text-text-primary" }}
                          label={
                            <Typography
                              component="span"
                              variant="h6"
                              className="font-medium"
                            >
                              {props.label}
                            </Typography>
                          }
                        />
                      )
                    )}
                  </Tabs>
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

                {
                  [
                    <div key={0}>
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
                    </div>,
                    <div key={1}>
                      {giftedSavingsAccounts?.length ? (
                        <div>
                          <TanStandardTable
                            instance={giftedTableInstance}
                            loading={
                              giftedSavingsAccountsQueryResult?.isLoading
                            }
                            error={giftedSavingsAccountsQueryResult.isError}
                            onErrorRetry={
                              giftedSavingsAccountsQueryResult.refetch
                            }
                            onEmptyRetry={
                              giftedSavingsAccountsQueryResult.refetch
                            }
                            // slots={{ bodyCell: CardActionArea }}
                            slotProps={{
                              bodyRow(bodyRow) {
                                return {
                                  onClick: () => {
                                    setGiftedPlanDetails(bodyRow.original);
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
                              No Gifted Plans
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                              You have no gifted plans yet.
                            </Typography>
                          </div>
                        </div>
                      )}
                    </div>,
                  ][activeTab]
                }
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

      {giftedPlanDetails ? (
        <FixedPlanTransactionDetails
          open
          info={giftedPlanDetails}
          onClose={() => {
            setGiftedPlanDetails(null);
          }}
        />
      ) : null}

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
        <div className="flex items-center gap-1">
          {info?.row?.original?.is_gifted ? (
            <svg
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 3.4999H10.3075C10.3319 3.47927 10.3569 3.45927 10.3806 3.4374C10.5704 3.26876 10.7234 3.06276 10.83 2.8323C10.9366 2.60184 10.9944 2.35187 11 2.09802C11.0082 1.82032 10.9596 1.54387 10.8571 1.28564C10.7546 1.02741 10.6004 0.792856 10.404 0.596374C10.2075 0.399893 9.97304 0.245631 9.71484 0.143059C9.45664 0.0404865 9.18021 -0.00823131 8.9025 -0.000103974C8.64855 0.00536593 8.39845 0.0631991 8.16788 0.169775C7.9373 0.276352 7.73121 0.429376 7.5625 0.619271C7.32905 0.88983 7.13927 1.19517 7 1.52427C6.86073 1.19517 6.67095 0.88983 6.4375 0.619271C6.26879 0.429376 6.0627 0.276352 5.83212 0.169775C5.60155 0.0631991 5.35146 0.00536593 5.0975 -0.000103974C4.81979 -0.00823131 4.54336 0.0404865 4.28516 0.143059C4.02696 0.245631 3.79245 0.399893 3.59603 0.596374C3.39961 0.792856 3.24542 1.02741 3.14292 1.28564C3.04043 1.54387 2.99179 1.82032 3 2.09802C3.00556 2.35187 3.06343 2.60184 3.17 2.8323C3.27658 3.06276 3.42956 3.26876 3.61938 3.4374C3.64313 3.45802 3.66813 3.47802 3.6925 3.4999H1.5C1.23478 3.4999 0.98043 3.60525 0.792893 3.79279C0.605357 3.98033 0.5 4.23468 0.5 4.4999V6.4999C0.5 6.76511 0.605357 7.01947 0.792893 7.207C0.98043 7.39454 1.23478 7.4999 1.5 7.4999V11.4999C1.5 11.7651 1.60536 12.0195 1.79289 12.207C1.98043 12.3945 2.23478 12.4999 2.5 12.4999H11.5C11.7652 12.4999 12.0196 12.3945 12.2071 12.207C12.3946 12.0195 12.5 11.7651 12.5 11.4999V7.4999C12.7652 7.4999 13.0196 7.39454 13.2071 7.207C13.3946 7.01947 13.5 6.76511 13.5 6.4999V4.4999C13.5 4.23468 13.3946 3.98033 13.2071 3.79279C13.0196 3.60525 12.7652 3.4999 12.5 3.4999ZM8.3125 1.28177C8.39167 1.19435 8.48805 1.12423 8.59561 1.07583C8.70316 1.02743 8.81956 1.00179 8.9375 1.00052H8.96813C9.10636 1.00139 9.24302 1.02983 9.37012 1.08419C9.49721 1.13855 9.61218 1.21773 9.70828 1.31709C9.80439 1.41645 9.87969 1.534 9.92978 1.66284C9.97987 1.79167 10.0037 1.92921 10 2.0674C9.99873 2.18533 9.97309 2.30173 9.92469 2.40929C9.87629 2.51684 9.80617 2.61323 9.71875 2.6924C9.12562 3.2174 8.14125 3.4024 7.53125 3.4674C7.60625 2.80552 7.8125 1.84365 8.3125 1.28177ZM4.30688 1.30427C4.50059 1.11058 4.76294 1.00119 5.03687 0.999896H5.0675C5.18544 1.00117 5.30184 1.02681 5.40939 1.07521C5.51695 1.12361 5.61333 1.19372 5.6925 1.28115C6.21688 1.87365 6.40188 2.85615 6.46688 3.46365C5.85938 3.40115 4.87687 3.21365 4.28438 2.68927C4.19695 2.6101 4.12684 2.51372 4.07844 2.40616C4.03004 2.29861 4.0044 2.18221 4.00313 2.06427C3.99925 1.92379 4.02395 1.78399 4.07574 1.65335C4.12752 1.52271 4.20531 1.40394 4.30438 1.30427H4.30688ZM1.5 4.4999H6.5V6.4999H1.5V4.4999ZM2.5 7.4999H6.5V11.4999H2.5V7.4999ZM11.5 11.4999H7.5V7.4999H11.5V11.4999ZM12.5 6.4999H7.5V4.4999H12.5V6.4999Z"
                fill="#7CA853"
              />
            </svg>
          ) : null}
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

const giftedColumns: ColumnDef<any>[] = [
  {
    header: "Plan Name",
    accessorKey: "name",
    cell: (info) => {
      return (
        <div>
          <Typography className="capitalize">
            {info.row.original.name}
          </Typography>
        </div>
      );
    },
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: (info) => {
      return (
        <CurrencyTypography>{info.row.original?.amount}</CurrencyTypography>
      );
    },
  },
  {
    header: "Recipient",
    accessorKey: "recipient_name",
    cell: (info) => {
      return <Typography>{info.row.original?.recipient_name}</Typography>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => {
      return (
        <div>
          <FixedPlanGiftedStatusChip
            id={info.row.original.status_code as any}
            label={info.row.original.status}
          />
        </div>
      );
    },
  },
];
