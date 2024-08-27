import { TQueryParams, TResponseRedux } from "../../../types";
import { TUserInfo } from "../../../types/loginRegistration.type";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((arg: TQueryParams) => {
          params.append(arg.key, arg.value as string);
        });

        return {
          url: "/users/me",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TUserInfo>) => {
        return {
          data: response.data,
          //   meta: response.meta,
        };
      },
      providesTags: ["userProfile"],
    }),

    updateUserInfo: builder.mutation({
      query: (userInfo) => ({
        url: "/users/me",
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["userProfile"],
    }),
  }),
});

export const { useGetUserInfoQuery, useUpdateUserInfoMutation } = userApi;
