import {
  Button,
  IconButton,
  Paper,
  Typography,
  Link as MuiLink,
  TextField,
  MenuItem,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import CurrencyTypography from "components/CurrencyTypography";
import useToggle from "hooks/useToggle";
import SavedCardSvg from "assets/svgs/saved-card.svg?react";
import EmptyPlanSvg from "assets/svgs/empty-state.svg?react";

import FixedCreatePlan from "../features/FixedCreatePlan";
import TanStandardTable from "components/TanStandardTable";
import useTable from "hooks/useTable";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import FixedPlanDetails from "../features/FixedPlanDetails";

function Fixed() {
  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle();
  const [isFixedCreatePlan, toggleFixedCreatePlan] = useToggle();
  const [isPlanDetails, togglePlanDetails] = useToggle();

  const savedCard = false;

  const data = [
    {
      planName: "Plan 1",
      amount: 100000,
      maturityDate: new Date(),
      status: "Active",
    },
    {
      planName: "Plan 2",
      amount: 200000,
      maturityDate: new Date(),
      status: "Active",
    },
    {
      planName: "Plan 3",
      amount: 300000,
      maturityDate: new Date(),
      status: "Active",
    },
    {
      planName: "Plan 4",
      amount: 400000,
      maturityDate: new Date(),
      status: "Active",
    },
    {
      planName: "Plan 5",
      amount: 500000,
      maturityDate: new Date(),
      status: "Active",
    },
  ];

  const tableInstance = useTable({
    columns,
    data: data || null,
    // pageCount: customersQuery?.data?.data?.pages ?? -1,
    manualPagination: true,
    // state: { pagination },
    // onPaginationChange: setPagination,
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Typography variant="h5">Fixed Yield</Typography>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="space-y-8 w-full md:w-[65%]">
          <Paper className="p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-[70%]">
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Total Balance
                </Typography>
                <div className="flex items-center mt-1">
                  <CurrencyTypography
                    variant="h4"
                    className="font-bold"
                    blur={isWalletBalanceVisible}
                  >
                    0
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

                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mt-2 md:mt-4"
                >
                  Interest Rate is 15 - 20% per annum.{" "}
                </Typography>
              </div>
              <Button
                className="w-full md:w-[30%]"
                fullWidth
                onClick={toggleFixedCreatePlan}
              >
                Create Plan
              </Button>
            </div>
          </Paper>

          <div>
            {!data?.length && (
              <Typography variant="h6" className="font-medium" gutterBottom>
                My Plans
              </Typography>
            )}

            <Paper variant="outlined" className="p-0 overflow-hidden">
              {data?.length ? (
                <div className="flex items-center justify-between p-4">
                  <Typography variant="h6" className="font-medium" gutterBottom>
                    My Plans
                  </Typography>
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
                </div>
              ) : null}

              {data?.length ? (
                <div>
                  <TanStandardTable
                    instance={tableInstance}
                    // slots={{ bodyRow: ButtonBase }}
                    // slotProps={{
                    //   bodyRow(bodyRow) {
                    //     // const organization = bodyRow.original;
                    //     return {
                    //       onClick: () => {
                    //         togglePlanDetails();
                    //       },
                    //     };
                    //   },
                    // }}
                    // loading={customersQuery?.isFetching}
                    // error={customersQuery.isError}
                    // onErrorRetry={customersQuery.refetch}
                    // onEmptyRetry={customersQuery.refetch}
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
        </div>
        <div className="space-y-8 w-full md:w-[35%]">
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
                  <SavedCardSvg />
                  <div className="space-y-1">
                    <Typography variant="h6" className="font-semibold">
                      Saved Card
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Save your card to help you fund your yield easily.
                    </Typography>
                    <MuiLink>Link a Card</MuiLink>
                  </div>
                </div>
              )}
            </div>
          </Paper>
        </div>
      </div>
      {isFixedCreatePlan && (
        <FixedCreatePlan
          onClose={toggleFixedCreatePlan}
          open={isFixedCreatePlan}
        />
      )}

      {isPlanDetails && (
        <FixedPlanDetails onClose={togglePlanDetails} open={isPlanDetails} />
      )}
    </div>
  );
}

export const Component = Fixed;

export default Fixed;

const columns: ColumnDef<any>[] = [
  {
    header: "Plan Name",
    accessorKey: "planName",
    cell: (info) => {
      return (
        <div>
          <Typography className="font-semibold">
            {info.row.original.planName}
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
        <CurrencyTypography className="font-semibold">
          {info.row.original.amount}
        </CurrencyTypography>
      );
    },
  },
  {
    header: "Maturity Date",
    accessorKey: "maturityDate",
    cell: (info) => {
      return (
        <div>
          <Typography className="font-semibold">
            {format(info.row.original.maturityDate, "PP") || "-"}
          </Typography>
        </div>
      );
    },
  },

  {
    header: "Action",
    cell: () => <div></div>,
  },
];
