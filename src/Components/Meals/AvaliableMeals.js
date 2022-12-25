import React, { useEffect, useState } from "react";
import styles from "./AvaliableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvaliableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError,setHttpError]=useState();
  //posto u useEffectu se ocekuje clean f-ja(sinhrona),ako zelimo asinhronu f-ju,kreiracemo je u okviru useEffecta i tu i izvrsiti
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://foodorderapp-29b60-default-rtdb.firebaseio.com/meals.json"
      );
        //ovo throw new Error znaci da ce f-ja fetchMeals vratiti gresku koju mozemo uvatiti catch-om i throw new error ce u susstini biti objekat koji ima properti message kojem mozemo da pristupimo i ispisemo tekst koji smo ispsiali izmedju zagrada
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error)=>{
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  

  if(isLoading){
    return(
      <section className={styles.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }
  
  //da li je http error true odnosno da li ima neki tekst iznutra
  if(httpError){
    return(
      <section className={styles.mealsError}>
          <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      title={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
   <section className={styles.meals}>
    <Card>
    <ul>{mealsList}</ul>
    </Card>
   </section>
  );
};

export default AvaliableMeals;
