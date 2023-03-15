import { useContext } from "react";
import MealsContext from "../projects/Restaurant/Store/MealProvider";
import { UseMealsContextType } from "../projects/Restaurant/Store/MealProvider";

const useMeals = (): UseMealsContextType => {
  return useContext(MealsContext);
};

export default useMeals;
