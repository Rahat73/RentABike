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
    getMyBookings: builder.query({
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

    // getBikeById: builder.query({
    //   query: (bikeId) => {
    //     return {
    //       url: `/bikes/${bikeId}`,
    //       method: "GET",
    //     };
    //   },
    //   transformResponse: (response: TResponseRedux<TBike>) => {
    //     return {
    //       data: response.data,
    //       //   meta: response.meta,
    //     };
    //   },
    //   providesTags: ["bikes"],
    // }),
  }),
});

export const { useCreateBookingMutation, useGetMyBookingsQuery } = bookingApi;
