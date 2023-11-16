import React from "react";

const MedContext = React.createContext({
  orders:[],
  addOrder:(item)=>{},
  
});

export default MedContext;