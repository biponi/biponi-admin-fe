// transactionReducer.js
import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [], // You can initialize it with your actual data if available
    totalTransactions: 0,
    totalPages: 0,
    currentPage: 1,
  },
  reducers: {
    // Define transaction-related actions and reducers here
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setTotalTransactions: (state, action) => {
      state.totalTransactions = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateState: (state, action) => {
      // action.payload should be an object containing the fields to update
      return { ...state, ...action.payload };
    },
  },
});

export const { actions, reducer } = transactionSlice;
export default transactionSlice.reducer;
