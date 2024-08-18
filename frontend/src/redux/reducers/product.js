import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  success: false,
};

export const productReducer = createReducer(initialState, {
  ProductCreateRequest: (state) => {
    state.success = false;
    state.isLoading = true;
  },
  ProductCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  ProductCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  // get all products of shop
  getAllProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  getAllProductsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // delete products of shop
  deleteProductShopRequest: (state) => {
    state.isLoading = true;
  },
  deleteProductShopSuccess: (state, action) => {
    state.isLoading = false;
    state.msg = action.payload;
  },
  deleteProductShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
