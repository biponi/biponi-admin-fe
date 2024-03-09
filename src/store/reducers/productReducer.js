// productReducer.js
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    // Initial product state
    products: [],
    totalProducts: 0,
  },
  reducers: {
    // Define product-related actions and reducers here
    updateState: (state, action) => {
      // action.payload should be an object containing the fields to update
      return { ...state, ...action.payload };
    },
  },
});

export const { actions, reducer } = productSlice;
export default productSlice.reducer;
