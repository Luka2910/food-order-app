import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../Store/CartContext";

const HeaderCartButton = (props) => {
  const CartCtx = useContext(CartContext);
  const [btnIsHighilited, setBtnIsHighlited] = useState(false);

  const numberOfItems = CartCtx.items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  const { items } = CartCtx;
  const btnClasses = `${styles.button} ${btnIsHighilited ? styles.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlited(true);
    const timer = setTimeout(() => {
      setBtnIsHighlited(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
