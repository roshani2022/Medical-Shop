import React, { useContext } from "react";
import Card from "../UI/Card";
import CartContext from "../Store/CartContext";
import MedContext from "../Store/MedContext";
import classes from "./MedList.module.css";

const MedList = () => {
  const medContext = useContext(MedContext);

  const cartContext = useContext(CartContext);

  const handleQuantityClick = (order, quantity) => {
    medContext.decreaseQuantityHandler(order.id, quantity);
    cartContext.addToCart(order, quantity);
  };

  const showOrder = (orders) => {
    return orders.map((order) => (
      <li key={order.id}>
        {order.name} - {order.description} -{order.price} {"  "}
        <button
          type="button"
          onClick={() => handleQuantityClick(order, "quantity")}
          disabled={order.quantity === 0}
        >
          Add to Cart{order.quantity}
        </button>

        {order.quantity===0 && (
          <span style={{color:'red', marginLeft:'10px'}}>Sorry Out of Stock!!</span>
        )}
      </li>
    ));
  };
  return (
    medContext.orders.length > 0 && (
      <Card className={classes.orderlist}>
        <ul>{showOrder(medContext.orders)}</ul>
      </Card>
    )
  );
};

export default MedList;
