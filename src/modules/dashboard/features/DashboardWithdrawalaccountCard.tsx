import { IconButton, Paper, Skeleton, Typography } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import useClipboard from "hooks/useClipboard";
import useAuthUser from "hooks/useAuthUser";
import clsx from "clsx";
import { transactionApi } from "apis/transaction-api";
import { useMemo } from "react";

export default function DashboardWithdrawalAccountCard() {
  const { writeText } = useClipboard();

  const authUser = useAuthUser();
  const transactionOutwardBankListQueryResult =
    transactionApi.useGetTransactionOutwardBankListQuery(undefined, {
      skip: !authUser.bank_details.bankId,
    });
  const banks = transactionOutwardBankListQueryResult.data?.data;

  const normalizedBanks = useMemo(
    () =>
      banks?.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {} as Record<string, (typeof banks)[0]>),
    [banks]
  );

  return (
    <Paper
      elevation={0}
      className={clsx(
        "px-5 py-4",
        !authUser.bank_details?.bankId ? "hidden" : "block"
      )}
    >
      <Typography variant="h6" className="font-semibold">
        Withdrawal Account
      </Typography>
      <div className="mt-3 flex gap-3">
        <div className="rounded-lg bg-[#CDEDF6] w-10 h-10 flex items-center justify-center">
          <Iconify fontSize={22} icon="tabler:building-bank" />
        </div>

        <div className="space-y-2">
          <Typography className="font-semibold capitalize">
            {authUser.bank_details.accountname}
          </Typography>
          <Typography>
            {transactionOutwardBankListQueryResult?.isLoading ? (
              <Skeleton />
            ) : (
              normalizedBanks?.[authUser.bank_details.bankId]?.name
            )}
          </Typography>
          <Typography>
            {authUser.bank_details.accountnumber}
            <IconButton
              onClick={() => writeText(authUser.bank_details.accountnumber)}
              color="primary"
            >
              <Iconify icon="akar-icons:copy" width="1rem" height="1rem" />
            </IconButton>
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
