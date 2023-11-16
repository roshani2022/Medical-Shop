import React,{useContext} from "react";
import CartContext from "../Store/CartContext";
import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
const Cart = (props) => {
    const cartContext = useContext(CartContext);
  
   ;
  
    const hasItem = cartContext.items.length > 0;
  
    const orderHandler = () => {
      cartContext.clearCart()
     
    };
  
    return (
      <Modal onClose={props.onClose}>
        <CartItem/>
        <div className={classes.total}>
          <span> Total Amount</span>
          <span>${cartContext.totalAmount.toFixed(2)}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItem && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      </Modal>
    );
  };
  
  export default Cart;
  