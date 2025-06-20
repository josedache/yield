import { coreApi } from "configs/store-query";
import * as tags from "constants/tags";
import {
  PaymentPlanTypeCategoryApiRequest,
  PaymentPlanTypeCategoryApiResponse,
  PaymentProductAccountEnquiryApiRequest,
  PaymentProductAccountEnquiryApiResponse,
} from "../types/payment-api.ts";

export const BASE_URL = "/payment";

export const paymentApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlanTypePaymentCategory: builder.query<
      PaymentPlanTypeCategoryApiResponse,
      PaymentPlanTypeCategoryApiRequest
    >({
      query: ({ path, ...config }) => ({
        url: BASE_URL + `/category/${path?.categoryId}`,
        method: "GET",
        ...config,
      }),
      providesTags: [tags.PAYMENT],
    }),
    getPaymentProductAccountEnquiry: builder.query<
      PaymentProductAccountEnquiryApiResponse,
      PaymentProductAccountEnquiryApiRequest
    >({
      query: ({ path, ...config }) => ({
        url:
          BASE_URL + `/enquiry/${path?.productId}/account/${path?.accountId}`,
        method: "GET",
        ...config,
      }),
      providesTags: [tags.PAYMENT],
    }),
  }),
});
