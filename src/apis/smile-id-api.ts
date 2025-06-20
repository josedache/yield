import { coreApi } from "configs/store-query";
import * as tags from "constants/tags";
import {
  SmileIdInitiateAddressApiRequest,
  SmileIdInitiateAddressApiResponse,
} from "../types/smile-id-api.ts";

export const BASE_URL = "/smile-id";

export const smileIdApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    initiateSmileIdAddress: builder.mutation<
      SmileIdInitiateAddressApiResponse,
      SmileIdInitiateAddressApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/address-initiate",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [tags.USER],
    }),
  }),
});
