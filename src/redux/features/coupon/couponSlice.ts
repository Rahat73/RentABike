import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TCoupon = {
  couponCode: string | null;
};

const initialState: TCoupon = {
  couponCode: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCoupon: (state, action) => {
      state.couponCode = action.payload.couponCode;
    },
    reset: (state) => {
      state.couponCode = null;
    },
  },
});

export const { setCoupon, reset } = couponSlice.actions;

export default couponSlice.reducer;

export const selectCoupon = (state: RootState) => state.coupon;
