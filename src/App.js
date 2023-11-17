import React, { useState } from "react";
import "./App.css";
import Header from "./Component/Layout/Header";
import Cart from "./Component/Cart/Cart";
import CartProvider from './Component/Store/CartProvider'
import MedProvider from "./Component/Store/MedProvider";
import MedForm from "./Component/AvilableMedicine/MedForm";
import MedList from "./Component/AvilableMedicine/MedList";


const App = (props) => {

  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };
   
  return (
    <CartProvider>
    <MedProvider>
    {showCart && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
    <MedForm id={props.id}/>
    <MedList/>
  </MedProvider>
  </CartProvider>
  )
}
export default App;