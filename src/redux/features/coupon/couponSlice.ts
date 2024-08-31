import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TCoupon = {
  couponCode: string | null;
  discountPercent: number | null;
};

const initialState: TCoupon = {
  couponCode: null,
  discountPercent: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCoupon: (state, action) => {
      state.couponCode = action.payload.couponCode;
      state.discountPercent = action.payload.discountPercent;
    },
    reset: (state) => {
      state.couponCode = null;
      state.discountPercent = null;
    },
  },
});

export const { setCoupon, reset } = couponSlice.actions;

export default couponSlice.reducer;

export const selectCoupon = (state: RootState) => state.coupon;
