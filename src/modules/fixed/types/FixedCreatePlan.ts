import { FormikProps } from "formik";
import {
  SavingsCalculatorApiResponse,
  SavingsFixedDepositProductInformationApiResponse,
  SavingsYieldUserDetailsResponse,
} from "src/types/savings-api";

export type FixedCreatePlanFormikType = Partial<{
  type: "personal" | "gift";
  productId: number;
  lockinPeriodFrequency: number;
  lockinPeriodFrequencyType: number;
  depositAmount: number;
  depositPeriod: number;
  depositPeriodFrequencyId: number;
  name: string;
  note?: string;
  fundSource?: string;
  phone?: string;
}>;

export type FixedCreatePlanContentProps = {
  formik: FormikProps<FixedCreatePlanFormikType>;
  disabledFields?: Array<"depositAmount" | "depositPeriod" | "name">;
  savingsFixedProductInformation: SavingsFixedDepositProductInformationApiResponse;
  savingsDepositCalculator: SavingsCalculatorApiResponse;
  recipientUserDetails?: SavingsYieldUserDetailsResponse["data"];
  recipientUserDetailsError?: any;
  isGifting: boolean;
};
