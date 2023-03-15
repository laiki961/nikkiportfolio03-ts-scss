import { createSlice } from "@reduxjs/toolkit";
import MealModel from "../models/MealModel";

// const initialCounterState = { counter: 0, showToast: false };

interface CartState {
  items: MealModel[];
  totalQuantity: number;
  totalAmount: number;
}

const initialCartState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  // changed: false,
};

// const orderAdapter = createEntityAdapter<Order>();

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      // const newItem = action.payload;
      // const existingItem = state.items.find((item) => item.id === newItem.id);
      // state.totalQuantity++;
      // if (!existingItem) {
      //   state.items.push({
      //     id: newItem.id,
      //     name: newItem.name,
      //     price: newItem.price,
      //     amount: 1,
      //     subTotal: newItem.price,
      //   });
      // } else {
      //   existingItem.amount++;
      //   existingItem.subTotal = existingItem.subTotal + newItem.price;
      // }
    },

    // increment(state) {
    //   state.counter++;
    // },
    // decrement(state) {
    //   state.counter--;
    // },
    // increase(state, action) {
    //   state.counter = state.counter + action.payload;
    // },
    // addToCart(state) {
    //   state.showToast = !state.showToast;
    // },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
