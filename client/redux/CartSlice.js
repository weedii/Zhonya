import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],

  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const indexItem = state.cartItems.findIndex(
        (item) => item.reference === action.payload.reference
      );

      if (indexItem >= 0) {
        if (state.cartItems[indexItem].quantity < 5) {
          state.cartItems[indexItem].quantity += 1;
          state.totalQuantity += 1;
          toast.success(
            action.payload.brand +
              " " +
              action.payload.model +
              " added successfully"
          );
        } else toast.error("Max is 5 items per product");
      } else {
        state.cartItems.push(action.payload);
        action.payload.quantity = 1;
        state.totalQuantity += 1;
        toast.success(
          action.payload.brand +
            " " +
            action.payload.model +
            " added successfully"
        );
      }
    },

    increaseQuantity: (state, action) => {
      const indexItem = state.cartItems.findIndex(
        (item) => item.reference === action.payload.reference
      );

      state.cartItems[indexItem].quantity += 1;
      state.totalQuantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const indexItem = state.cartItems.findIndex(
        (item) => item.reference === action.payload.reference
      );

      state.cartItems[indexItem].quantity -= 1;
      state.totalQuantity -= 1;
    },

    removeFromCart: (state, action) => {
      const removedItemQuantity = action.payload.quantity;
      state.cartItems = state.cartItems.filter(
        (item) => item.reference !== action.payload.reference
      );
      state.totalQuantity -= removedItemQuantity;
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
