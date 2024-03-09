// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import orderReducer from "./reducers/orderReducer";
import transactionReducer from "./reducers/transectionReducer";
import manufacturerReducer from "./reducers/manufecturerReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    transaction: transactionReducer,
    manufacturer: manufacturerReducer,
    // Add other reducers here
  },
});

export default store;
