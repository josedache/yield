import { coreApi } from "configs/store-query";
import { ApiRequest, ApiResponse } from "src/types/api";

export const BASE_URL = "/transaction";

export const transactionApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionOutwardNameEnquiry: builder.query<
      ApiResponse<any>,
      ApiRequest<void, void, { accountNumber: string; bankCode: string }>
    >({
      query: (config) => ({
        url: BASE_URL + "/outward/name-enquiry",
        method: "GET",
        ...config,
      }),
    }),

    getTransactionOutwardBankList: builder.query<
      ApiResponse<
        {
          id: string;
          bank_sort_code: string;
          name: string;
          code: string;
        }[]
      >,
      ApiRequest<void, void, { accountNumber: string; bankCode: string }>
    >({
      query: (config) => ({
        url: BASE_URL + "/outward/bank-list",
        method: "GET",
        ...config,
      }),
    }),

    generateTransactionOutwardPaymentReference: builder.mutation<
      ApiResponse<
        ApiResponse<{
          id: number;
          reference: string;
          status: string;
        }>
      >,
      ApiRequest<{
        amount: string | number;
        provider: "PAYSTACK";
        yieldType: "fixed" | "flex";
        transactionType: "flex" | "wallet";
        transactionId: string | number;
      }>
    >({
      query: (config) => ({
        url: BASE_URL + "/outward/payment-reference",
        method: "POST",
        ...config,
      }),
    }),
  }),
});
