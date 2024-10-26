import { ApiRequest, ApiResponse } from "./api";

export type UserLoginApiRequest = ApiRequest<{
  password: string;
  phone: string;
  login_method: string;
  channel: string;
  version: string;
}>;

export type UserLoginApiResponse = ApiResponse<{
  userId: number;
  token: string;
  is_new_device: boolean;
}>;

export type UserClientKycApiResponse = ApiResponse<{
  nin: string;
  //"is_bvn_validated": true,
  //"firstname": "tetw",
  // "lastname": "testwer",
  // "middlename": "uwtube",
  // "mobileNo": "004333430",
  email: string;
  // "is_selfie_validated": boolean,
  // "bvn" : "223174432321",
  dateOfBirth: string;
  typeId: 38;
  addressLine1: string;
  stateProvinceId: string;
  //"lastname": "drey",
  // "is_email_validated": true,
  accountnumber: string;
  gender: string;
}>;

export type UserClientKycVerifyApiRequest = ApiRequest<{
  bvn: string;
  nin: string;
  dateOfBirth: string;
  gender: string;
  mobileNo: string;
  emailAddress: string;
  firstname: string;
  lastname: string;
  middlename: string;
  addressId: string;
  typeId: 36;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  stateProvinceId: string;
  stateName: string;
  city: string;
  countryId: string;
  countryName: string;
  accountnumber: string;
  accountname: string;
  bankId: string;
  is_bvn_validated: true;
  is_mobile_no_validated: true;
  is_email_validated: true;
  is_nin_validated: true;
  is_client_identifier_validated: string;
  isActive: true;
}>;

export type UserLogoutApiRequest = ApiRequest<{ flag?: "others" | "all" }>;

export type UserResetPasswordSendApiRequest = ApiRequest<{
  identifier: string;
  device_id?: string;
}>;

export type UserResetPasswordSendApiResponse = ApiResponse<{
  userId: number;
  token: string;
  is_new_device: boolean;
}>;

export type UserResetPasswordVerifyApiRequest = ApiRequest<{
  channel: "email" | "phone";
  otp: string;
}>;

export type UserResetPasswordVerifyApiResponse = ApiResponse<string>;

export type UserResetPasswordApiRequest = ApiRequest<{
  password: string;
}>;

export type UserResetPasswordApiResponse = ApiResponse<boolean>;

export type UserSignupYieldApiRequest = ApiRequest<{
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  bvn: string;
  nin?: string;
  device_id?: string;
  fcm_token?: string;
  referal_code?: string;
  alternate_number?: string;
}>;

export type UserSignupYieldApiResponse = ApiResponse<{
  user: {
    phone: string;
  };
  token: string;
}>;

export type UserVerifyOtpApiRequest = ApiRequest<{
  channel: "email" | "phone";
  otp: string;
}>;

export type UserVerifyOtpApiResponse = ApiResponse<{
  id: number;
  client_id: string;
  tier_level: string;
  bvn: string;
  nin: string;
  referal_code: string;
  alternate_number: string;
  is_active: boolean;
  is_2fa: boolean;
  is_suspended: boolean;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  hashed_pin: string;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  is_bvn_verified: boolean;
  onboarding_stage: string;
  is_nin_verified: boolean;
  created_at: string;
  updated_at: string;
  cba_wallet_id: string;
}>;

export type UserCreatePasswordApiRequest = ApiRequest<{
  password: string;
}>;

export type UserCreatePasswordApiResponse = ApiResponse<any>;

export type UserFileUploadPasswordApiRequest = ApiRequest<any>;

export type UserFileUploadPasswordApiResponse = ApiResponse<any>;
