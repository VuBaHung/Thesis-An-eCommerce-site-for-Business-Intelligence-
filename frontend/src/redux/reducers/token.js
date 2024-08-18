import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};
export const tokenReducer = createReducer(initialState, {
  LoadTokenRequest: (state) => {
    state.loading = true;
  },
  LoadTokenSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.token = action.payload;
  },
  LoadInfor: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.userInfor = action.payload;
  },
  LoadTokenFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
});
