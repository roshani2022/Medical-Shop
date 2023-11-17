import React, { useContext } from "react";
import classes from "./HeaderButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../Store/CartContext";

const HeaderButton = (props) => {
  const cartCtx = useContext(CartContext);
 
  
let q=0;
   if(cartCtx.cartList.length>0){
    cartCtx.cartList.forEach((element) => {
          q += element.quantity
        });
   }
   

  return (
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{q}</span>
    </button>
  );
};

export default HeaderButton;