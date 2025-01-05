import { coreApi } from "configs/store-query";
import { WALLET } from "constants/tags";
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

    transferSelfOutwardTransaction: builder.mutation<
      ApiResponse<string>,
      ApiRequest<{
        amount: string | number;
      }>
    >({
      query: (config) => ({
        url: BASE_URL + "/outward/transfer-self",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [WALLET],
    }),

    verifyTransferLiquidateOutwardTransaction: builder.mutation<
      ApiResponse<{ transactionId: string }>,
      ApiRequest<{
        otp: string;
        transactionId: string;
      }>
    >({
      query: (config) => ({
        url: BASE_URL + "/outward/transfer-liquidate/verify",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [WALLET],
    }),
  }),
});
