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
  fund_source: "wallet" | "paystack";
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

export type SavingsFixedDepositProductInformation = ApiResponse<{
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

export type GetSavingsResponse = {
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
};

export type SavingsFixedDepositProductInformationApiResponse =
  ApiResponse<SavingsFixedDepositProductInformation>;

export type SavingsAccountsApiResponse = {
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
