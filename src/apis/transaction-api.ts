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
  }),
});
