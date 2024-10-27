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
}>;

export type FixedCreatePlanContentProps = {
  formik: FormikProps<FixedCreatePlanFormikType>;
  savingsFixedProductInformation: SavingsFixedDepositProductInformationApiResponse;
  savingsDepositCalculator: SavingsCalculatorApiResponse;
};
