import "./App.css";
import React,{useState} from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Components/Store/CartProvider";

function App() {
  const [isVisible,setIsVisible]=useState(false);
  const showCardHandler=()=>{
    setIsVisible(true);
  }
  const hideCardHandler=()=>{
    setIsVisible(false);
  }
  return (
    <CartProvider>
      <Header showCart={showCardHandler} />
      {isVisible && <Cart hideCart={hideCardHandler}/>}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
