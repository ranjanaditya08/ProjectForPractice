import { createContext, useContext, useState } from "react";

import useSpecdata from "./useSpecdata";

export const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {

  const { specsData, isLoading } = useSpecdata();

  const [cartItems, setCartItems] = useState([]);

  // Get the quantity of a specific item
  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  // Increase the quantity of an item in the cart
  function increaseCartQuantity(id) {
    setCartItems((currItems) => {
      const itemExists = currItems.find((item) => item.id === id);

      if (!itemExists) {
        return [...currItems, { id, quantity: 1 }];
      }

      return currItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  }

  // Decrease the quantity of an item or remove it if quantity is 0
  function decreaseCartQuantity(id) {
    setCartItems((currItems) => {
      const item = currItems.find((item) => item.id === id);
      
      if (item?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      }

      return currItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  }

  // Remove item completely from cart
  function removeFromCart(id) {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  }

  // Get the total quantity of items in the cart
  function totalCartQuantity() {
    return cartItems.reduce((quantity, item) => quantity + item.quantity, 0);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        totalCartQuantity,
        cartItems,
        specsData,
        isLoading
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
