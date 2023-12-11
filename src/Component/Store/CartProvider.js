import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";
import axios from "axios";

const CartProvider = (props) => {
  const [cartList, setCartList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const url = "https://crudcrud.com/api/5ccf57f3d07a4329af4c84eab0d973f6/cart";

  const cartHandler = async (item, quantity) => {
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
      // setCartList(updatedItems);
      setCartList(updatedItems, () => {
        setTotalAmount((prevTotal) => prevTotal + priceChange);
      });
    } else {
      try {
        const res = await axios.post(url, item);
        setCartList(
          (prevCartList) => [
            ...prevCartList,
            {
              ...item,
              quantity: 1,
            },
            res.data,
          ],
          () => {
            setTotalAmount((prevTotal) => prevTotal + priceChange);
          }
        );
      } catch (error) {
        console.error("Error making POST request:", error);
      }
    }
  };

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axios.get(url);

        setCartList(response.data || []);
      } catch (err) {
        console.log("Error fetching cart items:", err);
      }
    };
    getCartItems();
  }, []);

  const resetOrderQuantities = async () => {
    setCartList((prevOrders) =>
      prevOrders.map((order) => ({ ...order, quantity: 0 }))
    );
  };

  const clearCart = async () => {
    try {
      // Delete all orders in the cart
      const response = await axios.delete(url);
      console.log("Delete response:", response.data)
      console.log("Cart cleared successfully.");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
    setCartList([]);
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
