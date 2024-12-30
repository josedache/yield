import { ApiResponse } from "./api";

export interface WalletApiResponseData {
  id: number;
  account_number: string;
  product_name: string;
  name: string;
  balance: number;
  available_balance: number;
  total_deposits: number;
  total_withdrawals: number;
  interest_posted: number;
  interest_not_posted: number;
  overdraft_interest: number;
  status: string;
  bank: string;
}

export type WalletApiResponse = ApiResponse<WalletApiResponseData>;
