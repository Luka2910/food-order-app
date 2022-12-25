import React, { useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../Store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount;
  const hasItem = cartCtx.items.length > 0;

  const cartRemoveItemHandler = (id) => {
    cartCtx.deleteItem(id);
  };
  const cartAddItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const checkoutHander = () => {
    setIsCheckingOut(true);
  };

  const sumbitHandler = (userData) => {
    setIsSubmiting(true);
    fetch(
      "https://foodorderapp-29b60-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartRemoveItemHandler.bind(null, item.id)}
          //bind omogucava da se funkciji posalje parametar pre nego sto se ona izvrsi
          onAdd={cartAddItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.hideCart}>
        Cancel
      </button>
      {hasItem && (
        <button className={styles.button} onClick={checkoutHander}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout onCancel={props.hideCart} onConfirm={sumbitHandler} />
      )}
      {!isCheckingOut && modalActions}
    </React.Fragment>
  );

  const submitingForm = <p>Sending order data....</p>;
  const didSubmitForm = (
    <React.Fragment>
      <p>Order succsesful!</p>
      <button className={styles.button} onClick={props.hideCart}>
        Cancel
      </button>
    </React.Fragment>
  );

  return (
    <Modal className={styles["cart-items"]} onClickBackdrop={props.hideCart}>
      {!isSubmiting && !didSubmit && modalContent}
      {isSubmiting && submitingForm}
      {!isSubmiting && didSubmit && didSubmitForm}
    </Modal>
  );
};

export default Cart;
