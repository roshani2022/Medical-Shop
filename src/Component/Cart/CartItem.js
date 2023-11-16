import React,{useContext} from "react";
import classes from './CartItem.module.css'
import CartContext from "../Store/CartContext";

const CartItem = () => {

    const cartCtx = useContext(CartContext);
    
   
  
    return (
      <ul className={classes["cart-items"]}>
      {cartCtx.cartList.map((item) => (
        <li key={item.id} className={classes.item}>
          <div className={classes.details}>
            
            <span>{item.name}</span>{" "}
            <span>{item.description}</span>{" "}
            <span>{item.quantity}</span>{" "}
            {"    "}
            <span>{item.price}</span>
          </div>
        </li>
      ))}
    </ul>
    
  );
  };
  export default CartItem
  
  
  