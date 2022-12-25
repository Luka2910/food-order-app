import React, { useRef, useState } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);
  //da bi mogao da citam sta je korisnik uneo u input koristicu useRef, s obzirom da je Input custom komponenta da bih koristio ref morao sam da izvrsim izmene u Input.js(pogledaj)
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(amountInputRef.current.value)
    const enteredAmount = amountInputRef.current.value; //ovako dobijamo vrednost koja je unesena u input
    //e sad sve sto se unese u input je string bez obzira sto nam je input type number
    const enteredAmountNumber = +enteredAmount; //ovo konvertuje string  u number
    //proveravamo enteredNumber kao text da vidimo da li je input ostao prazan mozda kojim slucajem
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
        setIsAmountValid(false);
      return;
    }
    props.onAddItemToCart(enteredAmountNumber);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid&&<p>You must provide the right amount(1-5)</p>}
    </form>
  );
};

export default MealItemForm;
