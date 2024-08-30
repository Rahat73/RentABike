import { TQueryParams, TResponseRedux } from "../../../types";
import { TCouponInfo } from "../../../types/coupon.type";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (couponInfo) => ({
        url: "/coupons",
        method: "POST",
        body: couponInfo,
      }),
      invalidatesTags: ["coupons"],
    }),
    getAllCoupons: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((arg: TQueryParams) => {
          if (arg.key && arg.value !== null && arg.value !== undefined) {
            params.append(arg.key, arg.value as string);
          }
        });

        return {
          url: "/coupons",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TCouponInfo[]>) => {
        return {
          data: response.data,
          //   meta: response.meta,
        };
      },
      providesTags: ["coupons"],
    }),
    deleteCoupon: builder.mutation({
      query: (couponId) => ({
        url: `/coupons/${couponId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupons"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetAllCouponsQuery,
  useDeleteCouponMutation,
} = authApi;
