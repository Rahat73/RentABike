import { TQueryParams, TResponseRedux } from "../../../types";
import { TBike } from "../../../types/bike.type";
import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllbikes: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((arg: TQueryParams) => {
          if (arg.key && arg.value !== null && arg.value !== undefined) {
            params.append(arg.key, arg.value as string);
          }
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

    getBikeById: builder.query({
      query: (bikeId) => {
        return {
          url: `/bikes/${bikeId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TBike>) => {
        return {
          data: response.data,
          //   meta: response.meta,
        };
      },
      providesTags: ["bikes"],
    }),

    createBike: builder.mutation({
      query: (bikeInfo) => ({
        url: `/bikes`,
        method: "POST",
        body: bikeInfo,
      }),
      invalidatesTags: ["bikes"],
    }),

    updateBikeInfo: builder.mutation({
      query: ({ bikeId, bikeInfo }) => ({
        url: `/bikes/${bikeId}`,
        method: "PUT",
        body: bikeInfo,
      }),
      invalidatesTags: ["bikes"],
    }),

    deleteBike: builder.mutation({
      query: (bikeId) => ({
        url: `/bikes/${bikeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bikes"],
    }),
  }),
});

export const {
  useGetAllbikesQuery,
  useGetBikeByIdQuery,
  useCreateBikeMutation,
  useUpdateBikeInfoMutation,
  useDeleteBikeMutation,
} = bikeApi;
