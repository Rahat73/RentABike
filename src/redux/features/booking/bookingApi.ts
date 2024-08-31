import { TQueryParams, TResponseRedux } from "../../../types";
import { TBooking } from "../../../types/booking.type";
import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingInfo) => ({
        url: "/rentals",
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: ["bookings"],
    }),

    returnBike: builder.mutation({
      query: ({ bookingId, returnTime }) => ({
        url: `/rentals/${bookingId}/return`,
        method: "PUT",
        body: { returnTime },
      }),
      invalidatesTags: ["bookings", "bikes"],
    }),

    applyCoupon: builder.mutation({
      query: ({ bookingId, couponCode }) => ({
        url: `/rentals/${bookingId}/coupon`,
        method: "PUT",
        body: couponCode,
      }),
      invalidatesTags: ["bookings"],
    }),

    makePayment: builder.mutation({
      query: (bookingId) => ({
        url: `/rentals/${bookingId}/payment`,
        method: "PUT",
      }),
      invalidatesTags: ["bookings"],
    }),

    getMyBookings: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((arg: TQueryParams) => {
          if (arg.key && arg.value !== null && arg.value !== undefined) {
            params.append(arg.key, arg.value as string);
          }
        });

        return {
          url: "/rentals/me",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TBooking[]>) => {
        return {
          data: response.data,
          //   meta: response.meta,
        };
      },
      providesTags: ["bookings"],
    }),

    getAllBookings: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((arg: TQueryParams) => {
          if (arg.key && arg.value !== null && arg.value !== undefined) {
            params.append(arg.key, arg.value as string);
          }
        });

        return {
          url: "/rentals",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TBooking[]>) => {
        return {
          data: response.data,
          //   meta: response.meta,
        };
      },
      providesTags: ["bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useReturnBikeMutation,
  useApplyCouponMutation,
  useMakePaymentMutation,
  useGetMyBookingsQuery,
  useGetAllBookingsQuery,
} = bookingApi;
