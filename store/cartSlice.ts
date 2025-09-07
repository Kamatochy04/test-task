import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartApi } from "./api/cartApi";
import { CartItem } from "types/cartItem";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.getCartItems.matchFulfilled,
      (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      }
    );

    builder.addMatcher(
      cartApi.endpoints.deleteCartItem.matchFulfilled,
      (state, action: PayloadAction<number>) => {
        const id = action.payload;
        state.items = state.items.filter((item) => item.id !== id);
      }
    );
  },
});

export default cartSlice.reducer;
