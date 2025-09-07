import { UserInfo } from "store/formSlice";
import { clientApi } from ".";

export const userApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserInfo, void>({
      query: () => "user",
    }),
  }),
});

export const { useGetUserInfoQuery } = userApi;
