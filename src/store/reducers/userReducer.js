// userReducer.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: "",
    email: "",
    mobileNumber: "not given",
    avatar:
      "https://res.cloudinary.com/emerging-it/image/upload/v1697993177/Growb/default-icon/fpnvpqwno80grmvstwnc.jpg",
    nid: "",
    type: "default", // "admin" | "retailer" | "menu" | "ro" | "logistic" | "default"
    token: null,
    refreshToken: null,
    timestamps: {
      createdAt: null,
      updatedAt: null,
    },
  },
  reducers: {
    // Define user-related actions and reducers here
    updateUserState: (state, action) => {
      // action.payload should be an object containing the fields to update
      return { ...state, ...action.payload };
    },

    updateUserToken: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});
export const { updateUserState, updateUserToken } = userSlice.actions;
export const { actions, reducer } = userSlice;
export default userSlice.reducer;
