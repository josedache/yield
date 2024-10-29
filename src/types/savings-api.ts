import { ApiResponse, ApiRequest } from "./api";

export type SavingsFixedDepositCreateApiRequest = ApiRequest<{
  productId: number;
  lockinPeriodFrequency: number;
  lockinPeriodFrequencyType: number;
  depositAmount: number;
  depositPeriod: number;
  depositPeriodFrequencyId: number;
  name: string;
}>;
export type SavingsCalculatorApiRequest = ApiRequest<{
  productId: string;
  depositAmount: number;
  depositPeriod: string;
  depositPeriodFrequencyId: string;

  recurringFrequency?: string;
  recurringFrequencyType?: string;
}>;
export type SavingsActivateAccountRequest = ApiRequest<{
  savingsId: string;
  fund_source: "wallet" | "paystack" | "transfer";
}>;

export type UpdateDraftSavingsAPiRequest = ApiRequest<{
  productId: 1;
  savingsId: 555;
  depositAmount: 78000;
  depositPeriod: 11;
  depositPeriodFrequencyId: 2;
  recurringFrequency: 6;
  recurringFrequencyType: 2;
}>;

export type LiquidateSavingsAPiRequest = ApiRequest<{
  savingsId: string;
  note: string;
  otp: number;
}>;

export type SendSavingsOtpAPiRequest = ApiRequest<{
  channel: "email" | "phone";
  action: "liquidate" | "withdraw";
  amount: number;
}>;

export type SavingsFixedDepositCreateApiResponse = ApiResponse<{
  officeId: number;
  clientId: number;
  savingsId: number;
  resourceId: number;
}>;
export type SavingsCalculatorApiResponse = ApiResponse<{
  expectedInterestAmount: number;
  depositAmount: number;
  maturityAmount: number;
  maturityDate: string;
  depositPeriod: number;
  depositPeriodFrequency: number;
  nominalAnnualInterestRate: number;
}>;

export type SavingsActivateAccountResponse = ApiResponse<{
  message: string;
  reference: string;

  officeId: number;
  clientId: number;
  savingsId: number;
  resourceId: number;
}>;

export type GetSavingsResponse = ApiResponse<{
  id: number;
  client_name: string;
  client_id: number;
  plan_name: string;
  submitted_date: string;
  deposit_type: string;
  account_no: string;
  interest_rate: number;
  type: string;
  available_balance: string;
  currency: string;
  total_deposits: string;
  total_interest_earned: string;
  interest_posted: string;
  duration: number;
  duration_type: string;
  maturity_amount: number;
  maturity_date: string;
  account_status: string;
  account_status_code: number;
  active: boolean;
  approved: boolean;
  closed: boolean;
  prematureClosed: boolean;
  rejected: boolean;
  matured: boolean;
}>;

export type SavingsFixedDepositProductInformationApiResponse = ApiResponse<{
  id: string;
  product_id: string;
  name: string;
  description: string;
  allow_withdrawal: boolean;
  is_calendar_inherited: boolean;
  transfer_to_savings: boolean;
  pre_closure_penal: boolean;
  adjust_advance_future: boolean;
  is_mandatory_deposit: boolean;
  min_deposit_amt: number;
  max_deposit_amt: number;
  min_period: number;
  max_period: number;
  max_period_type: number;
  min_period_type: number;
  interest_compounding_period: number;
  field_officer: number;
  interest_rate: number;
  penal_interest: number | null;
  in_multiples_of: number;
  in_multiples_of_type: number;
  interest_posting_period: number;
  interest_calculated_using: number;
  days_in_a_year: number;
  product_type: string;
  channel: string;
  platform: string;
  created_at: string;
  updated_at: string;
}>;

export type SavingsAccounts = {
  totalAvailableBalance: string;
  savingsAccounts: {
    id: number;
    client_name: string;
    product_id: number;
    client_id: number;
    plan_name: string;
    submitted_date: string;
    deposit_type: string;
    account_no: string;
    last_transaction_date: string;
    type: string;
    available_balance: string;
    currency: string;
    total_deposits: string;
    total_interest: string;
    interest_not_posted: string;
    total_interest_overdraft: string;
    account_status: string;
    account_status_code: number;
    active: boolean;
    approved: boolean;
    closed: boolean;
    prematureClosed: boolean;
    rejected: boolean;
    matured: boolean;
  }[];
};

export type SavingsAccountsApiResponse = ApiResponse<SavingsAccounts>;
// | [
//     { fixed_deposits: SavingsAccounts },
//     { recurring_deposits: SavingsAccounts }
//   ]

export type SavingsTransactionsApiResponse = ApiResponse<
  {
    transactionId: number;
    accountNo: string;
    title: string;
    type: string;
    transaction_type: string;
    transaction_type_code: number;
    amount: string;
    transaction_date: string;
    transaction_status: string;
  }[]
>;

export type SavingsTransactionApiResponse = ApiResponse<
  {
    transactionId: number;
    accountNo: string;
    transaction_nature: string;
    title: string;
    type: string;
    amount: string;
    transaction_date: string;
    transaction_status: string;
  }[]
>;

export type LiquidateSavingsApiResponse = ApiResponse<{
  officeId: number;
  clientId: number;
  savingsId: number;
  resourceId: number;
  closedOnDate: string;
  note: string;
  matured: boolean;
  prematureClosed: boolean;
}>;

export type SavingsTransferApiRequest = ApiRequest<{
  type: "withdraw" | "transfer";
  otp: number;
  savingsId: number;
  transferAmount: number;
  transferDescription?: string;
}>;

export type SavingsTransferApiResponse = ApiResponse<{
  savingsId: number;
  resourceId: number;
}>;

export type SavingsRecentActivitiesApiResponse = ApiResponse<{
  transactionId: number;
  accountNo: string;
  title: string;
  type: string;
  transaction_type: string;
  transaction_type_code: 1;
  amount: string;
  transaction_date: string;
  transaction_status: string;
}[]>;
