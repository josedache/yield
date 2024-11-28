import { coreApi } from "configs/store-query";
import { LandingPageCalculatorRequest, LandingPageCalculatorResponse } from "modules/landingPage/types/YieldCalculator";

export const BASE_URL = "/savings";

export const landingPageApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    landingPageCalculator: builder.mutation<
    LandingPageCalculatorResponse,
    LandingPageCalculatorRequest 
    >({
    query: (config) => ({
      url: BASE_URL + "/calculator",
      method: "POST",
      headers: {
        "x-channel-code": "3",
      },
      ...config,
    }),
  }),
  })
})