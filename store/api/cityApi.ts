import { City } from "types/city";
import { clientApi } from ".";

export const cityApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.query<City[], void>({
      query: () => "cities",
      transformResponse: (response: City[]) => response,
    }),
  }),
});

export const { useGetCitiesQuery } = cityApi;
