import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  success: false,
};

export const EventReducer = createReducer(initialState, {
  EventCreateRequest: (state) => {
    state.success = false;
  },
  EventCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  EventCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  // get all Events of shop
  getAllEventsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllEventsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  },
  getAllEventsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // get all Events
  getAllEventsRequest: (state) => {
    state.isLoading = true;
  },
  getAllEventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAllEventsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // delete Events of shop
  deleteEventShopRequest: (state) => {
    state.isLoading = true;
  },
  deleteEventShopSuccess: (state, action) => {
    state.isLoading = false;
    state.msg = action.payload;
  },
  deleteEventShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
