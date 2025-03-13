import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartCount/reducer";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
