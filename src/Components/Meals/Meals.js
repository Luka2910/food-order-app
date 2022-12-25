import MealsSummary from "./MealsSummary";
import AvaliableMeals from "./AvaliableMeals";
import React from "react";

const Meals=()=>{
    return(
        <React.Fragment>
            <MealsSummary/>
            <AvaliableMeals/>
        </React.Fragment>
    )
}

export default Meals;