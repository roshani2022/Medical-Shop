import React, { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
  const [cartList, setCartList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const cartHandler = (item, quantity) => {
    const newQuantity = Math.max(item[quantity] - 1, 0);
    const quantityChange = item[quantity] - newQuantity;
    const priceChange = quantityChange * Number(item.price);

    const existingItem = cartList.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedItems = cartList.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            price: Number(cartItem.price) + priceChange,
            quantity: cartItem.quantity + quantityChange,
          };
        }
        return cartItem;
      });
      setCartList(updatedItems);
    } else {
      setCartList((prevCartList) => [
        ...prevCartList,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }

    setTotalAmount((prevTotal) => prevTotal + priceChange);
  };

  const resetOrderQuantities = () => {
    setCartList((prevOrders) =>
      prevOrders.map((order) => ({ ...order, quantity: 0 }))
    );
  };

  const clearCart = () => {
    setCartList([]);
    setTotalAmount(0);
    resetOrderQuantities();
  };

  const cartContext = {
    cartList: cartList,
    clearCart: clearCart,
    addToCart: cartHandler,
    totalAmount: totalAmount,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

