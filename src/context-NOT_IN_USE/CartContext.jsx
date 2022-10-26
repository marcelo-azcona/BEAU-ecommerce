import React, { createContext, useState } from 'react';

const findCartItem = (cartItems, productToFind) => {
  return cartItems.find((cartProduct) => cartProduct.id === productToFind.id);
};

const addCartItem = (cartItems, productToAdd) => {
  // Check if there is an existing product in the cart
  const selectedCartProduct = findCartItem(cartItems, productToAdd);

  // If exist add a new one in the cartItem array
  if (selectedCartProduct) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // If does not exist, just add one
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItems = (cartItems, productToRemove) => {
  const selectedCartProduct = findCartItem(cartItems, productToRemove);

  if (selectedCartProduct.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.quantity > 1);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItems = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

const CartContext = createContext({
  isCartDropdownOpen: false,
  setIsCartDropdownOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemsFromCart: () => {},
  cartItems: [],
});

const CartContextProvider = ({ children }) => {
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItems(cartItems, productToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItems(cartItems, cartItemToClear));
  };

  const exposedValues = {
    isCartDropdownOpen,
    setIsCartDropdownOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
  };

  return (
    <CartContext.Provider value={exposedValues}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
