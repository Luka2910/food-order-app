import classes from "./Checkout.module.css";
import { useRef,useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity,setFormInputsValidity]=useState({
    name:true,
    street:true,
    postalCode:true,
    city:true
  })
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    console.log(enteredName, enteredStreet, enteredPostalCode, enteredCity);

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredSteetIsValid = !isEmpty(enteredStreet);
    const enteredPosatalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
        name:enteredNameIsValid,
        street:enteredSteetIsValid,
        postalCode:enteredPosatalCodeIsValid,
        city:enteredCityIsValid
    })

    const formIsValid =
      enteredNameIsValid &&
      enteredSteetIsValid &&
      enteredPosatalCodeIsValid &&
      enteredCityIsValid;

      if(!formIsValid){
        return;
    }

    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        postalCode:enteredPostalCode,
        city:enteredCity
    })
  };
   

  const nameInputClass=`${classes.control} ${formInputsValidity.name?'':classes.invalid}`
  const streetInputClass=`${classes.control} ${formInputsValidity.street?'':classes.invalid}`
  const postalCodeInputClass=`${classes.control} ${formInputsValidity.postalCode?'':classes.invalid}`
  const cityInputClass=`${classes.control} ${formInputsValidity.city?'':classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetInputClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeInputClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code(5 charachters)!</p>}
      </div>
      <div className={cityInputClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
