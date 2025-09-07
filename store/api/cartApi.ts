import { CartItem } from "types/cartItem";
import { clientApi } from ".";

export const cartApi = clientApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query<CartItem[], void>({
      query: () => "items",
    }),
    deleteCartItem: builder.mutation<number, number>({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetCartItemsQuery, useDeleteCartItemMutation } = cartApi;
