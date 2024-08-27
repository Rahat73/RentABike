import { TQueryParams, TResponseRedux } from "../../../types";
import { TBike } from "../../../types/bike.type";
import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllbikes: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((arg: TQueryParams) => {
          params.append(arg.key, arg.value as string);
        });

        return {
          url: "/bikes",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TBike[]>) => {
        return {
          data: response.data,
          //   meta: response.meta,
        };
      },
      providesTags: ["bikes"],
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

export const { useGetAllbikesQuery, useUpdateUserInfoMutation } = bikeApi;
