import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { verifyToken } from "../../utils/verifyToken";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl:
    "https://bike-rental-reservation-system-backend-seven.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["users", "userProfile", "bikes", "bookings", "coupons"],
  endpoints: () => ({}),
});
