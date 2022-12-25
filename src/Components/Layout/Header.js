import React from "react";
import styles from "./Header.module.css";
import mealImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.showCart}/>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealImage} alt="Photo of meals"/>
      </div>
    </React.Fragment>
  );
};

export default Header;
