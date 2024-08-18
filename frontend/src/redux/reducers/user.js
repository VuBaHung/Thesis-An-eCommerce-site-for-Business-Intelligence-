import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};
export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  //update User Information
  updateUserInfoRequest: (state) => {
    state.updateLoading = true;
  },
  updateUserInfoSuccess: (state, action) => {
    state.updateLoading = false;
    state.user = action.payload;
  },
  updateUserInfoFail: (state, action) => {
    state.updateLoading = false;
    state.error = action.payload;
  },
  //update User Address
  updateUserAddressRequest: (state) => {
    state.addressLoading = true;
  },
  updateUserAddressSuccess: (state, action) => {
    state.addressLoading = false;
    state.user = action.payload;
  },
  updateUserAddressFail: (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  },
  //Delete User Address
  deleteUserAddressRequest: (state) => {
    state.deleteLoading = true;
  },
  deleteUserAddressSuccess: (state, action) => {
    state.deleteLoading = false;
    state.user = action.payload;
  },
  deleteUserAddressFail: (state, action) => {
    state.deleteLoading = false;
    state.error = action.payload;
  },
  //Get All sellers
  GetAllSellerRequest: (state) => {
    state.loading = true;
  },
  GetAllSellerSuccess: (state, action) => {
    state.loading = false;
    state.allSellers = action.payload;
  },
  GetAllSellerFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
