import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { CategoryItem } from '../categories/categories-types';
import { CartItem } from './cart-types';

type InitialState = {
  items: CartItem[];
  cartDropdownIsOpen: boolean;
};

const initialState: InitialState = {
  items: [],
  cartDropdownIsOpen: false,
};

// CREO EL SLICE DEL STORE: ESTADO INICIAL Y QUE SE VA A MODIFICAR CON LAS ACTIONS
const cartSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    cartDropdownIsOpen(state) {
      state.cartDropdownIsOpen = !state.cartDropdownIsOpen;
    },

    addItemToCart(state, action: PayloadAction<CategoryItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      // console.log(current(state));

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },

    removeItemFromCart(state, action: PayloadAction<CategoryItem>) {
      const itemToRemove = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === itemToRemove.id
      );

      if (existingItem!.quantity === 1) {
        // return state.items.filter((cartItem) => cartItem.quantity > 1) Inmmutable
        state.items.splice(state.items.indexOf(existingItem!), 1); //   2) Mutable with immer
      } else {
        existingItem!.quantity--;
      }
    },

    clearItemFromCart(state, action) {
      const itemToRemove = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === itemToRemove.id
      );

      state.items.splice(state.items.indexOf(existingItem!), 1);
    },
  },
});

// ESTO VA A CREAR ACTIONS OBJECT AUTOMATICOS con Types automáticos.
export const cartActions = cartSlice.actions;

export default cartSlice;
