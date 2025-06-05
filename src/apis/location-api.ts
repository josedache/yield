import { coreApi } from "configs/store-query";
import {
  LocationStateLgaListApiRequest,
  LocationStateLgaListApiResponse,
  LocationStateLisApiResponse,
  LocationStateListApiRequest,
} from "../types/location-api.ts";
import { LOCATION } from "constants/tags";

export const BASE_URL = "/location";

export const locationApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getLocationAllStates: builder.query<
      LocationStateLisApiResponse,
      LocationStateListApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/all-states",
        method: "GET",
        ...config,
      }),
      providesTags: [LOCATION],
    }),
    getLocationStateLgas: builder.query<
      LocationStateLgaListApiResponse,
      LocationStateLgaListApiRequest
    >({
      query: ({ path, ...config }) => ({
        url: BASE_URL + `/lgas/${path.state}`,
        method: "GET",
        ...config,
      }),
      providesTags: [LOCATION],
    }),
  }),
});
