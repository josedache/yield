import { coreApi } from "configs/store-query";
import * as tags from "constants/tags";
import { ApiRequest, ApiResponse } from "src/types/api";
import {
  GetSavingsResponse,
  LiquidateSavingsAPiRequest,
  LiquidateSavingsApiResponse,
  SavingsAccountsApiResponse,
  SavingsActivateAccountRequest,
  SavingsActivateAccountResponse,
  SavingsCalculatorApiRequest,
  SavingsCalculatorApiResponse,
  SavingsFixedDepositCreateApiRequest,
  SavingsFixedDepositCreateApiResponse,
  SavingsFixedDepositProductInformationApiResponse,
  SavingsTransactionApiResponse,
  SavingsTransactionsApiResponse,
  SavingsTransferApiRequest,
  SavingsTransferApiResponse,
  SendSavingsOtpAPiRequest,
  UpdateDraftSavingsApiRequest,
} from "src/types/savings-api";

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

    savingsRename: builder.mutation<
      ApiResponse<{
        officeId: number;
        clientId: number;
        savingsId: number;
        resourceId: number;
      }>,
      ApiRequest<{
        savingsId: string;
        name: string;
      }>
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/rename",
        method: "PUT",
        ...config,
      }),
      invalidatesTags: [tags.SAVINGS],
    }),

    updateDraftSavings: builder.mutation<
      ApiResponse<boolean>,
      UpdateDraftSavingsApiRequest
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/update_draft_account",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.SAVINGS],
    }),

    deleteDraftSavings: builder.mutation<
      ApiResponse<{
        officeId: number;
        clientId: number;
        savingsId: number;
        resourceId: number;
      }>,
      ApiRequest<{ savingsId: string; note: string }>
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/delete_draft_account",
        method: "DELETE",
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
      invalidatesTags: [tags.SAVINGS_CALCULATOR],
    }),

    liquidateSavings: builder.mutation<
      LiquidateSavingsApiResponse,
      LiquidateSavingsAPiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/fixeddeposit/liquidate",
        method: "POST",
        ...config,
      }),
      invalidatesTags: (_result, error) => (error ? [] : [tags.SAVINGS]),
    }),

    sendSavingsOtp: builder.mutation<
      ApiResponse<string>,
      SendSavingsOtpAPiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/send_otp",
        method: "POST",
        ...config,
      }),
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
      invalidatesTags: (_result, error) => (error ? [] : [tags.SAVINGS]),
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
      providesTags: [tags.SAVINGS_PRODUCT_INFORMATION],
    }),

    getSavingsAccounts: builder.query<
      SavingsAccountsApiResponse,
      ApiRequest<void, void, { type?: "fixed_deposit" | "recurring_deposit" }>
    >({
      query: (config) => ({
        url: BASE_URL + "/accounts",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.SAVINGS],
    }),

    getSavingsAccount: builder.query<GetSavingsResponse, ApiRequest>({
      query: (config) => ({
        url: BASE_URL + "/account",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.SAVINGS],
    }),

    getSavingsTransactions: builder.query<
      SavingsTransactionsApiResponse,
      ApiRequest<void, void, { savingsId: number; all?: boolean }>
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/transactions",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.SAVINGS],
    }),

    getSavingsTransaction: builder.query<
      SavingsTransactionApiResponse,
      ApiRequest<
        void,
        void,
        {
          type: "recurring_deposit" | "fixed_deposit";
          savingsId?: number;
          transactionId?: number;
        }
      >
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/transaction",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.SAVINGS],
    }),

    transferSavings: builder.mutation<
      SavingsTransferApiResponse,
      SavingsTransferApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/transfer",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.SAVINGS],
    }),
  }),
});
