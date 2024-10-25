import { ApiRequest, ApiResponse } from "./api";

export type UserLoginApiRequest = ApiRequest<{
  password: string;
  phone: string;
  device_id: string;
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
  // "is_selfie_validated": false,
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
