import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
// import { verifyToken } from "../../utils/verifyToken";
import { logout, setUser, TUser } from "../features/auth/authSlice";
import { RootState } from "../store";
import { verifyToken } from "../../utils/verifyToken";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Sending request for access token...");
    const refreshResult = await fetch(
      "http://localhost:5000/api/v1/auth/refresh-token",
      { method: "POST", credentials: "include" }
    )
      .then((res) => res.json())
      .catch((err) => err);

    if (refreshResult?.data?.accessToken) {
      const user = verifyToken(refreshResult?.data?.accessToken) as TUser;
      api.dispatch(setUser({ user, token: refreshResult?.data?.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [],
  endpoints: () => ({}),
});
