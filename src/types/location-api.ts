import { ApiRequest, ApiResponse } from "./api.ts";

export type LocationStateListApiRequest = ApiRequest;

export type LocationStateLisApiResponse = ApiResponse<string[]>;

export type LocationStateLgaListApiRequest = ApiRequest<
  void,
  { state: string }
>;

export type LocationStateLgaListApiResponse = ApiResponse<{
  state: string;
  senatorial_districts: string[];
  lgas: string[];
}>;
