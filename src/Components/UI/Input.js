import React from "react";
import styles from './Input.module.css'
//ovaj ref u zagradi je onaj koji prosledjujemo u MealItemForm.js
const Input=React.forwardRef((props,ref)=>{
    return(
        <div className={styles.input}>
            <label>{props.label}</label>
            <input ref={ref} {...props.input}/>
        </div>
    )
})
//ovo ...props.input omogucice da svi propertiji koje prosledimo u MealItemForm komponenti docu do innputa,da ne moramo po na osob sve da pisemo

export default Input;