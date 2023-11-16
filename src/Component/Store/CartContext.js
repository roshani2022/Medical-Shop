import React from "react";
const CartContext = React.createContext({
  cartList:[],
  addToCart:(item)=>{},
  totalAmount: 0,
});

export default CartContext