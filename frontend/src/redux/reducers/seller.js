import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};
export const sellerReducer = createReducer(initialState, {
  LoadSellerRequest: (state) => {
    state.isLoading = true;
  },
  LoadSellerSuccess: (state, action) => {
    state.isSeller = true;
    state.isLoading = false;
    state.seller = action.payload;
  },
  LoadSellerFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSeller = false;
  },
  // //Update Shop infor
  // updateShopInfoRequest: (state) => {
  //   state.updateLoading = true;
  // },
  // updateShopInfoSuccess: (state, action) => {
  //   state.updateLoading = false;
  //   state.shop = action.payload;
  // },
  // updateShopInfoFail: (state, action) => {
  //   state.updateLoading = false;
  //   state.error = action.payload;
  //   state.isSeller = false;
  // },
});
