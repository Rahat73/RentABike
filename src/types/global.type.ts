import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TData<T> = {
  data: T; // data can different types
  message: string;
  success: boolean;
  accessToken?: string;
};

// export type TMeta = {
//   limit: number;
//   page: number;
//   total: number;
//   totalPage: number;
// };

export type TResponse<T> = {
  data?: T; // data can different types
  error?: TError;
  //   meta?: TMeta;
  message: string;
  success: boolean;
};

export type TPostResponse<T> = {
  data?: TData<T>; // data can different types
  error?: TError;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi; //BaseQueryApi needed for transformResponse

export type TQueryParams = {
  key: string;
  value: boolean | React.Key;
};

export type TDays = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type TRoles = "admin" | "user";
