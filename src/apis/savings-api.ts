import { coreApi } from "configs/store-query";
import * as tags from "constants/tags";
import { ApiRequest, ApiResponse } from "src/types/api";
import {
  GetSavingsResponse,
  LiquidateSavingsAPiRequest,
  LiquidateSavingsApiResponse,
  SavingsAccountsApiResponse,
  SavingsAccountsGiftedApiResponse,
  SavingsActivateAccountRequest,
  SavingsActivateAccountResponse,
  SavingsCalculatorApiRequest,
  SavingsCalculatorApiResponse,
  SavingsCreateGiftYieldApiRequest,
  SavingsCreateGiftYieldApiResponse,
  SavingsFixedDepositCreateApiRequest,
  SavingsFixedDepositCreateApiResponse,
  SavingsFixedDepositProductInformationApiResponse,
  SavingsInvestmentLetterApiResponse,
  SavingsRecentActivitiesApiResponse,
  SavingsTransactionApiResponse,
  SavingsTransactionsApiResponse,
  SavingsTransferApiRequest,
  SavingsTransferApiResponse,
  SavingsWalletPostingApiResponse,
  SavingsYieldUserDetailsResponse,
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
      invalidatesTags: (_result, error) =>
        error ? [] : [tags.SAVINGS, tags.WALLET],
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
      invalidatesTags: (_result, error) =>
        error ? [] : [tags.SAVINGS, tags.WALLET],
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
      ApiRequest<
        void,
        void,
        {
          type?: "fixed_deposit" | "recurring_deposit";
          statusId?: number | number[];
        }
      >
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

    getSavingsRecentActivities: builder.query<
      SavingsRecentActivitiesApiResponse,
      ApiRequest<
        void,
        void,
        {
          // type: "recurring_deposit" | "fixed_deposit";
          type: 300 | 400;
        }
      >
    >({
      query: (config) => ({
        url: BASE_URL + "/recent_activities",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.SAVINGS],
    }),

    getSavingsYieldUserDetails: builder.query<
      SavingsYieldUserDetailsResponse,
      ApiRequest<
        void,
        void,
        {
          mobileNo: string;
        }
      >
    >({
      query: (config) => ({
        url: BASE_URL + "/yield_user_details",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.SAVINGS],
    }),

    createSavingsGiftYield: builder.mutation<
      SavingsCreateGiftYieldApiResponse,
      SavingsCreateGiftYieldApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/create_gift_yield",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.SAVINGS],
    }),

    getGiftedSavingsAccounts: builder.query<
      SavingsAccountsGiftedApiResponse,
      ApiRequest<
        void,
        void,
        {
          savingsId?: any;
          status?: any;
        }
      >
    >({
      query: (config) => ({
        url: BASE_URL + "/gifted_accounts",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.SAVINGS],
    }),
    getSavingsWalletPosting: builder.query<
      SavingsWalletPostingApiResponse,
      ApiRequest<
        void,
        void,
        {
          savingsId?: any;
        }
      >
    >({
      query: (config) => ({
        url: BASE_URL + "/wallet_posting",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.SAVINGS],
    }),

    getInvestmentLetter: builder.query<
      SavingsInvestmentLetterApiResponse,
      ApiRequest<
        void,
        void,
        {
          savingsId: string;
          send: boolean;
          savingsType: string;
          format: string;
        }
      >
    >({
      query: ({ params }) => ({
        url: BASE_URL + "/investment_letter",
        method: "GET",
        params,
      }),
      providesTags: [tags.SAVINGS],
    }),
  }),
});
