import { coreApi } from "configs/store-query";
import { ApiRequest } from "src/types/api";
import { WalletApiResponse } from "src/types/wallet-api";

export const BASE_URL = "/wallet";

export const walletApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query<WalletApiResponse, ApiRequest>({
      query: (config) => ({
        url: BASE_URL,
        method: "GET",
        ...config,
      }),
    }),
  }),
});
