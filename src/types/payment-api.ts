import { ApiRequest, ApiResponse } from "./api.ts";

export type PaymentPlanTypeCategoryApiRequest = ApiRequest<
  void,
  { categoryId: string }
>;

export type PaymentPlanTypeCategoryApiResponse = ApiResponse<
  {
    operatorId: string;
    operatorName: string;
    productTypeId: number;
    planId: string;
    icon: string;
  }[]
>;

export type PaymentProductAccountEnquiryApiRequest = ApiRequest<
  void,
  { productId: string; accountId: string }
>;

export type PaymentProductAccountEnquiryApiResponse = ApiResponse<{
  accountId: string;
  accountStatus: string;
  customerNumber: string;
  customerName: string;
}>;
