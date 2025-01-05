import { FormikProps } from "formik";
import {
  SavingsCalculatorApiResponse,
  SavingsFixedDepositProductInformationApiResponse,
} from "src/types/savings-api";

export type FixedCreatePlanFormikType = Partial<{
  productId: number;
  lockinPeriodFrequency: number;
  lockinPeriodFrequencyType: number;
  depositAmount: number;
  depositPeriod: number;
  depositPeriodFrequencyId: number;
  name: string;
  fundSource?: string;
}>;

export type FixedCreatePlanContentProps = {
  formik: FormikProps<FixedCreatePlanFormikType>;
  disabledFields?: Array<"depositAmount" | "depositPeriod" | "name">;
  savingsFixedProductInformation: SavingsFixedDepositProductInformationApiResponse;
  savingsDepositCalculator: SavingsCalculatorApiResponse;
};
