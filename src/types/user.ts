export type User = {
  isAuthenticated: boolean;
  avatar: string;
  token: string;
  userId: number;
  is_new_device: boolean;
  nin: string;
  firstname: string;
  lastname: string;
  middlename: string;
  mobileNo: string;
  email: string;
  bvn: string;
  dateOfBirth: string;
  typeId: 38;
  addressLine1: string;
  stateProvinceId: string;
  kycLevel: number;
  gender: string;
  clientId: number;
  displayName: string;
  genderId: string;
  address_details: {
    addressType: string;
    isActive: boolean;
    addressLine1: string;
    stateProvinceId: number;
    stateName: string;
    countryId: number;
  }[];
  kyc_validation_details: {
    is_bvn_validated: boolean;
    is_nin_validated: boolean;
    is_client_identifier_validated: boolean;
    is_mobile_no_validated: boolean;
    is_email_validated: boolean;
    is_selfie_validated: boolean;
    is_adddress_validated: boolean;
  };
  bank_details: {
    bankId: string;
    accountnumber: string;
    accountname: string;
    active: boolean;
    account_type: string;
    bank_classification: string;
  };
};
