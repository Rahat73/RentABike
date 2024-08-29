import { TQueryParams, TResponseRedux } from "../../../types";
import { TUserInfo } from "../../../types/loginRegistration.type";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((arg: TQueryParams) => {
          params.append(arg.key, arg.value as string);
        });

        return {
          url: "/users/",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TUserInfo[]>) => {
        return {
          data: response.data,
          //   meta: response.meta,
        };
      },
      providesTags: ["users"],
    }),

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

    makeAdmin: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useMakeAdminMutation,
  useDeleteUserMutation,
} = userApi;
