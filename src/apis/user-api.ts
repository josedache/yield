import { coreApi } from "configs/store-query";
import * as tags from "constants/tags";
import { ApiRequest, ApiResponse } from "src/types/api";
import {
  UserClientKycApiResponse,
  UserCreatePasswordApiRequest,
  UserCreatePasswordApiResponse,
  UserFileUploadPasswordApiRequest,
  UserFileUploadPasswordApiResponse,
  UserIAgreeApiRequest,
  UserIAgreeApiResponse,
  UserLoginApiRequest,
  UserLoginApiResponse,
  UserLogoutApiRequest,
  UserRequestVoiceOtp,
  UserResetPasswordApiRequest,
  UserResetPasswordApiResponse,
  UserResetPasswordSendApiRequest,
  UserResetPasswordSendApiResponse,
  UserResetPasswordVerifyApiRequest,
  UserResetPasswordVerifyApiResponse,
  UserResponseVoiceOtp,
  UserSignupYieldApiRequest,
  UserSignupYieldApiResponse,
  UserVerifyOtpApiRequest,
  UserVerifyOtpApiResponse,
} from "src/types/user-api";
import { objectToFormData } from "utils/object";

export const BASE_URL = "/user";

export const userApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    // loginUser: builder.mutation<UserLoginApiResponse, UserLoginApiRequest>({
    //   query: ({ ...config }) => ({
    //     url: BASE_URL + "/login",
    //     method: "POST",
    //     ...config,
    //   }),
    //   invalidatesTags: [tags.USER],
    // }),

    loginUser: builder.mutation<UserLoginApiResponse, UserLoginApiRequest>({
      queryFn: async (config, _, __, baseQuery) => {
        const loginResult = await baseQuery({
          url: BASE_URL + "/login",
          method: "POST",
          ...config,
        });

        if (loginResult.error) {
          return loginResult;
        }

        const headers = new Headers();
        headers.set(
          "Authorization",
          `Bearer ${(loginResult.data as any)?.data?.token}`
        );

        const verifyResult = await baseQuery({
          url: BASE_URL + "/kyc/client/verify",
          method: "GET",
          headers: headers,
        });

        if (verifyResult.error) {
          return verifyResult as any;
        }

        return {
          ...loginResult,
          data: {
            ...(loginResult.data as any),
            data: {
              ...(loginResult.data as any).data,
              profile: verifyResult.data,
            },
          },
        };
      },
      invalidatesTags: [tags.USER],
    }),

    getUserClientKyc: builder.query<UserClientKycApiResponse, ApiRequest>({
      query: (config) => ({
        url: BASE_URL + "/kyc/client/verify",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.USER],
    }),

    verifyUserClientKyc: builder.mutation<UserClientKycApiResponse, ApiRequest>(
      {
        query: ({ ...config }) => ({
          url: BASE_URL + "/kyc/client/verify",
          method: "POST",
          ...config,
        }),
        invalidatesTags: [tags.USER],
      }
    ),

    logoutUser: builder.mutation<ApiResponse, UserLogoutApiRequest>({
      query: ({ ...config }) => ({
        url: BASE_URL + "/logout",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.USER],
    }),

    sendUserResetPassword: builder.mutation<
      UserResetPasswordSendApiResponse,
      UserResetPasswordSendApiRequest
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/send/reset-password",
        method: "POST",
        headers: {
          "x-channel-code": "2",
        },
        ...config,
      }),
      invalidatesTags: [tags.USER],
    }),

    verifyUserResetPassword: builder.mutation<
      UserResetPasswordVerifyApiResponse,
      UserResetPasswordVerifyApiRequest
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/verify/reset-password",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.USER],
    }),

    resetPassword: builder.mutation<
      UserResetPasswordApiResponse,
      UserResetPasswordApiRequest
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/reset-password",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.USER],
    }),

    signupYieldSecondStageUser: builder.mutation<
      UserSignupYieldApiResponse,
      UserSignupYieldApiRequest
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/yield_second_stage",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.USER],
    }),

    signupYieldUser: builder.mutation<
      UserSignupYieldApiResponse,
      UserSignupYieldApiRequest
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/yield_sign_up",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.USER],
    }),

    verifyUserOtp: builder.mutation<
      UserVerifyOtpApiResponse,
      UserVerifyOtpApiRequest
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/verify_otp",
        method: "POST",
        headers: {
          "x-channel-code": "2",
        },
        ...config,
      }),
      invalidatesTags: [tags.USER],
    }),

    createYieldUserPassword: builder.mutation<
      UserCreatePasswordApiResponse,
      UserCreatePasswordApiRequest
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/yield_create_password",
        method: "PUT",
        ...config,
      }),
      invalidatesTags: [tags.USER],
    }),

    uploadUserFile: builder.mutation<
      UserFileUploadPasswordApiResponse,
      UserFileUploadPasswordApiRequest
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/file/upload",
        method: "POST",
        ...config,
        body: objectToFormData(config.body),
      }),
      invalidatesTags: [tags.USER],
    }),

    getUserSelfieFile: builder.query<ApiResponse<string>, ApiRequest>({
      query: (config) => ({
        url: BASE_URL + "/file/selfie",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.USER],
    }),

    iAgreeUser: builder.mutation<UserIAgreeApiResponse, UserIAgreeApiRequest>({
      query: ({ ...config }) => ({
        url: BASE_URL + "/i_agree",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.USER],
    }),

    requestUserVoiceOtp: builder.query<
      UserResponseVoiceOtp,
      UserRequestVoiceOtp
    >({
      query: ({ ...config }) => ({
        url: BASE_URL + "/get_otp_voice",
        method: "GET",
        ...config,
      }),
      providesTags: [tags.USER],
    }),
  }),
});
