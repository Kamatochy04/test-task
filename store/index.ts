import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import citySlice from "./citySlice";
import { clientApi } from "./api";
import formSlice from "./formSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    city: citySlice,
    form: formSlice,
    [clientApi.reducerPath]: clientApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
