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
  user: any;
  token: string;
  expiresIn: string;
  refreshToken: string;
  is_new_device: boolean;
  login_expiry: number;
  profile: UserClientKycApiResponse["data"];
}>;

export type UserClientKycApiResponse = ApiResponse<{
  clientId: number;
  clientType: string;
  clientTypeId: number;
  title: string;
  titleId: number;
  firstname: string;
  middlename: string;
  lastname: string;
  displayName: string;
  mobileNo: string;
  email: string;
  genderId: number;
  gender: string;
  kycLevel: number;
  savingsAccountId: number;
  maritalStatus: string;
  maritalStatusId: number;
  alternateMobileNo: string;
  dateOfBirth: string;
  bvn: string;
  nin: string;
  active: boolean;
  account_status: number;
  employer_details: Array<{
    resourceId: number;
    country: number;
    state: string;
    stateId: number;
    lga: string;
    lgaId: number;
    staff_id: string;
    office_address: string;
    nearest_land_mark: string;
    job_grade: string;
    employment_status: string;
    employment_status_id: number;
    salary_range: string;
    salary_rangeId: number;
    employment_date: string;
    next_month_salary_payment_date: string;
    payroll_dob: string;
    active: boolean;
    work_email_verified: boolean;
    work_email: string;
    work_phone: string;
    employer: {
      id: number;
      name: string;
      rc_number: number;
      sector: string;
      active: boolean;
      mobile_number: string;
      email_address: string;
    };
  }>;
  address_details: Array<{
    clientID: number;
    addressType: string;
    isActive: boolean;
    street: string;
    townVillage: string;
    countyDistrict: string;
    lgaId: number;
    stateProvinceId: number;
    countryName: string;
    lga: string;
    stateName: string;
    countryId: number;
    postalCode: string;
    createdBy: string;
    updatedBy: string;
    residentStatusId: number;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    nearestLandMark: string;
  }>;
  family_member_details: Array<{
    familyId: number;
    relationship: string;
    relationshipId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    genderId: number;
    gender: string;
    age: number;
    mobileNumber: string;
    dateOfBirth: string;
    maritalStatus: string;
    maritalStatusId: number;
    isDependent: boolean;
    qualification: string;
    profession: string;
    professionId: number;
  }>;
  document_details: {
    passport: boolean;
    drivers_license: boolean;
    voters_card: boolean;
    id_card: boolean;
    bank_statement: boolean;
    rent_agreement: boolean;
    utility_bill: boolean;
    others: boolean;
  };
  kyc_validation_details: {
    is_bvn_validated: boolean;
    is_nin_validated: boolean;
    is_client_identifier_validated: boolean;
    is_mobile_no_validated: boolean;
    is_adddress_validated: boolean;
    is_selfie_validated: boolean;
    is_email_validated: boolean;
  };
  bank_details: {
    bankId: number;
    accountnumber: string;
    accountname: string;
    active: boolean;
    account_type: string | null;
    sort_code: string;
    bank_classification: string | null;
    resourceId: number;
  };
  zeusKycLevel: number;
  preffered_notification_channel: string;
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
  channel: "email" | "phone" | "alternate_number";
  otp: string;
}>;

export type UserSendOtpApiRequest = ApiRequest<{
  channel: "alternate_number" | "bvn_number";
  user_id: string;
  alternate_number: string;
}>;

export type UserPreferredOtpNumberRequest = ApiRequest<{
  channel: "bvn_number" | "alternate_number";
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

export type UserIAgreeApiRequest = ApiRequest<{
  reference: string;
  bvn: string;
}>;

export type UserIAgreeApiResponse = ApiResponse<{
  user: {
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
  };
  token: string;
}>;

export type UserRequestVoiceOtp = ApiRequest<void, void, { phone: string }>;

export type UserResponseVoiceOtp = ApiResponse<{
  status: boolean;
  message: string;
  data: {
    code: string;
    balance: number;
    message_id: string;
    pinId: string;
    message: string;
  };
  statusCode: string;
  referenence: string;
}>;

export type UserRefreshTokenRequest = ApiRequest<{
  user_id: number;
  token: string;
}>;

export type UserRefreshTokenResponse = ApiResponse<{
  token: string;
  refreshToken: string;
  login_expiry: number;
}>;
