import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["userProfile", "users", "bookings", "bikes", "coupons"],
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["userProfile", "users", "bookings", "bikes", "coupons"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
