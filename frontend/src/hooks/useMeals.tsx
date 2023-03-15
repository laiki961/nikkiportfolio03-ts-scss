import { useContext } from "react";
import MealsContext from "../projects/Restaurant/store/MealProvider";
import { UseMealsContextType } from "../projects/Restaurant/store/MealProvider";

const useMeals = (): UseMealsContextType => {
  return useContext(MealsContext);
};

export default useMeals;
