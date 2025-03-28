import { ApiResponse } from "./api.ts";

export type Transaction = {
  id: number;
  title: string;
  type: string;
  transaction_type: number;
  amount: string;
  transaction_status: string;
  beneficiary_bank: string;
  beneficiary_destination_code: string;
  beneficiary_account_number: string;
  beneficiary_account_name: string;
  transaction_category: string;
  session_id: string;
  reference_number: string;
  transaction_date: string;
  transaction_time: string;
  mobile_label: string;
  note: string;
  icon: string;
};

export type TransactionListApiResponse = ApiResponse<Transaction[]>;
