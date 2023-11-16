import React, { useState } from "react";
import MedContext from "./MedContext";
const MedProvider = (props) => {
    const [orders, setOrders] = useState([]);
    
    const addOrderHandler = (order) => {
      order.quantity = 0;
  
      setOrders((prevOrders) => [
        ...prevOrders,
        {
          id: Math.random().toString(),
          ...order,
        },
      ]);
    };

    const medContext = {
        orders: orders,
        addOrder: addOrderHandler,

      };
    
      return (
        <MedContext.Provider value={medContext}>
          {props.children}
        </MedContext.Provider>
      );
    };
    
    export default MedProvider;