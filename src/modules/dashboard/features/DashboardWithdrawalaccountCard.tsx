import { Typography } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";

export default function DashboardWithdrawalaccountCard() {
  return (
    <div>
      <Typography className="font-semibold">Withdrawal Account</Typography>
      <div className="mt-3 flex gap-2">
        <div className="rounded-lg w-10 h-10 flex items-center justify-center">
          <Iconify fontSize={22} icon="tabler:building-bank" />
        </div>

        <div className="space-y-2">
          <Typography className="font-semibold">
            Stepanie Takeme Olubusola
          </Typography>
          <Typography>First City Monument Bank</Typography>
          <Typography>2893015264</Typography>
        </div>
      </div>
    </div>
  );
}
