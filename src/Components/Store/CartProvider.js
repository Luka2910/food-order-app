import React, { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //inace concat pravi novi niz u koji smesta elemenat koji mu se prosledi,slicno je kao push,samo sto push dodaje u postojeci niz,ne pravi novi
    //ocekujemo na ovom item sto prihvatamo daa cemo tu imati sve potrebne info i price i amount i name itd..
    let updatedItems;
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updateItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if(action.type==='remove'){
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    const existingCartItem=state.items[existingCartItemIndex];
    const updatedTotalAmount=state.totalAmount-existingCartItem.price
    let updatedItems
    if(existingCartItem.amount===1){
      updatedItems=state.items.filter((item)=>{return item.id!==action.id});
    }else{
      const updatedItem={...existingCartItem,amount:existingCartItem.amount-1}
      updatedItems=[...state.items];
      updatedItems[existingCartItemIndex]=updatedItem;
    }
    return{
      items:updatedItems,
      totalAmount:updatedTotalAmount
    }
  }
  if(action.type==='CLEAR'){
    return defaultCartState
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const deleteItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "remove", id: id });
  };
  const clearItemFromCartHandler=()=>{
    dispatchCartAction({type:'CLEAR'})
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    deleteItem: deleteItemFromCartHandler,
    clearCart:clearItemFromCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
