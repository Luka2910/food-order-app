import React, { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../Store/CartContext";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const CartCtx=useContext(CartContext);//na ovaj nacin ostvarujemo 'konekciju sa contextom'
  const addItemToCartHandler=(amount)=>{
    CartCtx.addItem({
      id:props.id,
      name:props.title,
      amount:amount,
      price:props.price

    })
  }
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.title}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddItemToCart={addItemToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
