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
import BookmarkSvg from "assets/svgs/bookmark.svg?react";
import WalletTransactionFlowSvg from "assets/svgs/wallet--transaction-flow.svg?react";
import * as dfns from "date-fns";
import YieldFund from "../features/YieldFund";
import YieldWithdraw from "../features/YieldWithdraw";

function YieldFlex() {
  const [isFAQ, toggleFAQ] = useToggle(true);

  const [isWalletBalanceVisible, toggleWalletBalanceVisible] = useToggle();

  const savedCard = true;

  const isActive = true;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <IconButton variant="soft" color="primary" className="rounded-3xl px-3">
          <Iconify icon="ic:baseline-arrow-back" />
        </IconButton>
        <Typography variant="h5">Flex Yield</Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Paper className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-2">
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Total Balance
                </Typography>
                <div className="flex items-center">
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

                {isActive ? (
                  <div>
                    <Typography
                      variant="body2"
                      className="flex items-center gap-2 text-text-secondary"
                    >
                      Total Interest
                      <span className="w-2 h-2 bg-text-secondary rounded-full"></span>
                      <span className="">{14}%</span> P/A
                    </Typography>
                  </div>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Interest is 14% per annum.
                  </Typography>
                )}
              </div>
              {isActive ? (
                <div className="space-y-2">
                  <YieldFund>
                    {({ toggleOpen }) => (
                      <Button fullWidth onClick={toggleOpen}>
                        Add Money
                      </Button>
                    )}
                  </YieldFund>

                  <YieldWithdraw>
                    {({ toggleOpen }) => (
                      <Button fullWidth variant="outlined" onClick={toggleOpen}>
                        Withdraw
                      </Button>
                    )}
                  </YieldWithdraw>
                </div>
              ) : (
                <YieldFund>
                  {({ toggleOpen }) => (
                    <Button onClick={toggleOpen}>Fund Wallet</Button>
                  )}
                </YieldFund>
              )}
            </div>
          </Paper>

          <Paper variant="outlined" className="p-4 pb-8 space-y-8">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-medium" gutterBottom>
                Recent Transactions
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

            {transactions?.length ? (
              <div className="space-y-6">
                {transactions?.map((transaction) => {
                  const config = {
                    inflow: {
                      color: "success",
                      sign: "+",
                      icon: "ic:twotone-plus",
                    },
                    outflow: {
                      color: "error",
                      sign: "-",
                      icon: "ic:baseline-minus",
                    },
                    percentage: {
                      color: "success",
                      sign: "+",
                      icon: "ic:sharp-percent",
                    },
                  }[transaction?.flow];
                  return (
                    <div
                      key={transaction?.id}
                      className="flex items-center gap-4"
                    >
                      <IconButton variant="soft" color={config?.color as any}>
                        <Iconify icon={config?.icon} />
                      </IconButton>
                      <div>
                        <Typography variant="body1" gutterBottom>
                          {transaction?.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {dfns.format(new Date(), "dd MMM, yyyy")}
                        </Typography>
                      </div>
                      <div className="flex-1" />
                      <Typography>
                        {config?.sign}
                        <CurrencyTypography component="span">
                          {transaction?.amount}
                        </CurrencyTypography>
                      </Typography>
                    </div>
                  );
                })}
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
          </Paper>
        </div>
        <div className="space-y-8">
          {isFAQ ? (
            <Paper variant="outlined" className="p-4 pb-8 space-y-8">
              <div>
                <div className="flex items-center gap-2 justify-between mb-4">
                  <Typography variant="h6" className="font-medium">
                    What is a Flex Yield?
                  </Typography>
                  <IconButton variant="soft" size="small" onClick={toggleFAQ}>
                    <Iconify icon="material-symbols:close" />
                  </IconButton>
                </div>
                <Typography color="textSecondary">
                  Flex Yield is a flexible savings product that allows you
                  manage their funds more flexibly. <br />
                  <br />
                  The feature will allow you autosave, and enjoy the benefits of
                  no-penalty withdrawals.
                  <br />
                  <br />
                  You can also create labels within their target yield to
                  organize your funds according to specific needs.
                </Typography>
              </div>

              <div>
                <Typography variant="h6" className="font-medium mb-4">
                  What is a Flex Yield?
                </Typography>
                <Typography color="textSecondary">
                  With an interest rate of 14%, you can save for as long as you
                  like and withdraw your money at any time.
                </Typography>
              </div>
            </Paper>
          ) : null}
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
          <Paper variant="outlined" className="p-4 pb-8 space-y-8">
            <Typography variant="h6" className="font-medium">
              Targets
            </Typography>

            <div>
              <div className="flex flex-col items-center gap-8 text-center">
                <BookmarkSvg />
                <div className="space-y-1">
                  <Typography variant="h6" className="font-semibold">
                    Coming Soon
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Targets help you organize your funds based on your needs.
                  </Typography>
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export const Component = YieldFlex;

export default YieldFlex;

const transactions = [
  {
    id: 1,
    description: "Withdrawal to Bank Account",
    amount: 50000,
    flow: "outflow",
  },
  {
    id: 2,
    description: "Wallet Interest for July",
    amount: 500,
    flow: "percentage",
  },
  { id: 3, description: "Wallet Funding", amount: 50000, flow: "inflow" },
  {
    id: 4,
    description: "Withdrawal to Bank Account",
    amount: 50000,
    flow: "outflow",
  },
  {
    id: 5,
    description: "Wallet Interest for July",
    amount: 500,
    flow: "percentage",
  },
  { id: 6, description: "Wallet Funding", amount: 50000, flow: "inflow" },
];
