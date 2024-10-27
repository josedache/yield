import { coreApi } from "configs/store-query";
import * as tags from "constants/tags";
import { ApiRequest, ApiResponse } from "src/types/api";
import {
  GetSavingsResponse,
  SavingsAccountsApiResponse,
  SavingsActivateAccountRequest,
  SavingsActivateAccountResponse,
  SavingsCalculatorApiRequest,
  SavingsCalculatorApiResponse,
  SavingsFixedDepositCreateApiRequest,
  SavingsFixedDepositCreateApiResponse,
  SavingsFixedDepositProductInformationApiResponse,
} from "src/types/savings";

export const BASE_URL = "/savings";

export const savingsApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    savingsFixedDepositCreatePlan: builder.mutation<
      SavingsFixedDepositCreateApiResponse,
      SavingsFixedDepositCreateApiRequest
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/fixeddeposit/create",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.SAVINGS],
    }),

    savingsCalculator: builder.mutation<
      SavingsCalculatorApiResponse,
      SavingsCalculatorApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/calculator",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.SAVINGS],
    }),

    savingsActivateAccount: builder.mutation<
      SavingsActivateAccountResponse,
      SavingsActivateAccountRequest
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/activate_account",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.SAVINGS],
    }),

    getSavingsProductInformation: builder.query<
      SavingsFixedDepositProductInformationApiResponse,
      ApiRequest<void, void, { productId: number }>
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/product_info",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.SAVINGS],
    }),

    getSavingsAccounts: builder.query<
      ApiResponse<SavingsAccountsApiResponse>,
      ApiRequest<void, void, { type?: "fixed_deposit" | "recurring" }>
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/accounts",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.SAVINGS],
    }),

    getSavingsAccount: builder.query<
      ApiResponse<GetSavingsResponse>,
      ApiRequest
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/account",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.SAVINGS],
    }),
  }),
});
