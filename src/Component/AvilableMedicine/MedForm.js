import React, { useState, useContext } from "react";
import Input from "../UI/Input";
import Card from "../UI/Card";
import classes from "./MedForm.module.css";
import Button from "../UI/Button";
import MedContext from "../Store/MedContext";

const MedForm = () => {

  const medContext = useContext(MedContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity,setQuantity]=useState("")
 

  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const priceHandler = (event) => {
    setPrice(event.target.value);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const quantityHadler = (event) =>{
    setQuantity(event.target.value)
  }

  

  const submitHandler = (event) => {
    event.preventDefault();

    const orderMed = { name, price, description,quantity};
    medContext.addOrder(orderMed);

    setName("");
    setPrice("");
    setDescription("");
    setQuantity("");
  };

  return (
    <Card className={classes.orderform}>
      <form onSubmit={submitHandler}>
        <Input
          label="ShoeName:"
          type="text"
          id="name"
          value={name}
          onChange={nameHandler}
        />
        <Input
          label="Description:"
          type="text"
          id="desc"
          value={description}
          onChange={descriptionHandler}
        />
        <Input
          label="Price:"
          type="number"
          id="price"
          value={price}
          onChange={priceHandler}
        />

          <Input
            label="Quantity Avilable"
            type="number"
            id="quantity"
            value={quantity}
            onChange={quantityHadler}
          />
        <div className={classes.action}>
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </Card>
  );
};
export default MedForm;
 
