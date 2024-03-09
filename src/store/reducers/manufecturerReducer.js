// manufacturerReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialClientState = {
  id: null,
  name: "",
  creator_id: null,
  email: "",
  mobileNumber: "",
  shopName: "",
  ownerName: "",
  location: {
    address: "",
    lat: "",
    long: "",
  },
  documents: {
    nid: "",
    tin: "",
    ownerAddress: "",
    ownerNumber: "",
    tradeLic: "",
  },
  social_connections: {
    whatsapp: "",
  },
  token: "",
};

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState: initialClientState,
  reducers: {
    // Define manufacturer-related actions and reducers here
    updateState: (state, action) => {
      // action.payload should be an object containing the fields to update
      return { ...state, ...action.payload };
    },
  },
});

export const { actions, reducer } = manufacturerSlice;
export default manufacturerSlice.reducer;
