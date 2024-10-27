import { IconButton, Paper, Typography } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import useClipboard from "hooks/useClipboard";

export default function DashboardWithdrawalAccountCard() {
  const { writeText } = useClipboard();
  return (
    <Paper elevation={0} className="px-5 py-4">
      <Typography variant="h6" className="font-semibold">
        Withdrawal Account
      </Typography>
      <div className="mt-3 flex gap-3">
        <div className="rounded-lg bg-[#CDEDF6] w-10 h-10 flex items-center justify-center">
          <Iconify fontSize={22} icon="tabler:building-bank" />
        </div>

        <div className="space-y-2">
          <Typography className="font-semibold">
            Stepanie Takeme Olubusola
          </Typography>
          <Typography>First City Monument Bank</Typography>
          <Typography>
            2893015264{" "}
            <IconButton
              onClick={() => writeText("289303315264")}
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
