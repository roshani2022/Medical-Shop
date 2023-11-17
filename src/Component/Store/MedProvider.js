import React, { useState } from "react";
import MedContext from "./MedContext";
const MedProvider = (props) => {
    const [orders, setOrders] = useState([]);
    
    const addOrderHandler = (order) => {
      
  
      setOrders((prevOrders) => [
        ...prevOrders,
        {
          id: Math.random().toString(),
          ...order,
        },
      ]);
    };

    const decreaseQuantityHandler = (orderId, quantity) => {
      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          if (order.id === orderId) {
            const newQuantity = Math.max(order[quantity] - 1, 0);
            return {
              ...order,
              [quantity]: newQuantity,
            };
          }
          return order;
        });
      });
    };
    

    const medContext = {
        orders: orders,
        addOrder: addOrderHandler,
        decreaseQuantityHandler:decreaseQuantityHandler,

      };
    
      return (
        <MedContext.Provider value={medContext}>
          {props.children}
        </MedContext.Provider>
      );
    };
    
    export default MedProvider;