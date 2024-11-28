import { ApiRequest, ApiResponse } from "src/types/api";

export type LandingPageCalculatorRequest =  ApiRequest<{
    productId: string;
    depositAmount: number,
    depositPeriod: string,
    depositPeriodFrequencyId: string,
  }>;

export type LandingPageCalculatorResponse = ApiResponse<{
    depositAmount: string,
    depositPeriod: number,
    nominalAnnualInterestRate: number,
   maturityAmount:number,
   maturityDate : string,
   expectedInterestAmount : string,
   depositPeriodFrequencyId: string,
}>