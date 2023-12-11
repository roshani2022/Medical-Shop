import React, { useState,useEffect } from "react";
import MedContext from "./MedContext";
import axios from "axios";
const MedProvider = (props) => {
    const [orders, setOrders] = useState([]);

    const url = "https://crudcrud.com/api/5ccf57f3d07a4329af4c84eab0d973f6/product"
    
    const addOrderHandler = async(order) => {
       try{
        const res = await axios.post(url,order)      
  
        setOrders((prevOrders) => [
          ...prevOrders,
          {
            id: res.data.id,
            ...order,         
          },
          
        ]);
       } catch(error){
          console.log(error)
       }
    };

   useEffect(()=>{
    const getProduct = async() => {
      try{
          const res = await axios.get(url)
          setOrders(res.data)
      }catch(error){

      }
    }
   getProduct()
   },[]) 

    // const decreaseQuantityHandler = (orderId, quantity) => {
    //   setOrders((prevOrders) => {
    //     return prevOrders.map((order) => {
    //       if (order.id === orderId) {
    //         const newQuantity = Math.max(order[quantity] - 1, 0);
    //         return {
    //           ...order,
    //           [quantity]: newQuantity,
    //         };
    //       }
    //       return order;
    //     });
    //   });
    // };

    const decreaseQuantityHandler = async (orderId, quantity) => {
      try {
        // Find the order in the local state
        const orderToUpdate = orders.find((order) => order.id === orderId);
    
        if (!orderToUpdate) {
          console.error(`Order with id ${orderId} not found.`);
          return;
        }
    
        // Decrease the quantity locally
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, [quantity]: Math.max(order[quantity] - 1, 0) }
              : order
          )
        );
    
        // Make a PUT or PATCH request to update the quantity on the backend
        await axios.put(`${url}/${orderId}`, {
          [quantity]: Math.max(orderToUpdate[quantity] - 1, 0),
        });
      } catch (error) {
        console.error('Error updating order quantity:', error);
      }
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