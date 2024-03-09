// orderReducer.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    // Initial order state
    orders: [],
    offset: 0,
  },
  reducers: {
    // Define order-related actions and reducers here
    updateState: (state, action) => {
      // action.payload should be an object containing the fields to update
      return { ...state, ...action.payload };
    },
  },
});

export const { actions, reducer } = orderSlice;
export default orderSlice.reducer;
