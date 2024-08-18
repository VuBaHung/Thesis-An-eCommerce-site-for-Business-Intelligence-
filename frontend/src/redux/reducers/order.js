import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};
export const orderReducer = createReducer(initialState, {
  //User get all their orders
  LoadUserOrdersRequest: (state) => {
    state.isLoading = true;
  },
  LoadUserOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  LoadUserOrdersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  // get all Orders of an user
  LoadAllShopOrdersRequest: (state) => {
    state.isLoading = true;
  },
  LoadAllShopOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.shopOrders = action.payload;
  },
  LoadAllShopOrdersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // Admin get all Orders
  AdminLoadAllOrdersRequest: (state) => {
    state.isLoading = true;
  },
  AdminLoadAllOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.adminOrders = action.payload;
  },
  AdminLoadAllOrdersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
