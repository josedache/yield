import { ApiRequest, ApiResponse } from "./api.ts";

export type SmileIdInitiateAddressApiRequest = ApiRequest<{
  address: string;
  full_name: string;
  utility_number: string;
  utility_type: string;
  utility_provider: string;
  partner_params: {
    user_id: string;
    job_id: string;
  };
  state: string;
  city: string;
  // tin: string;
}>;

export type SmileIdInitiateAddressApiResponse = ApiResponse;
