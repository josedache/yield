import { ApiResponse } from "./api";

export type WalletApiResponse = ApiResponse<{
  account_number: string;
  product_name: string;
  balance: number;
  total_deposits: number;
  total_withdrawals: number;
  interest_earned: number;
  interest_posted: number;
  interest_not_posted: number;
  overdraft_interest: number;
  status: string;
  bank: string;
}>;
