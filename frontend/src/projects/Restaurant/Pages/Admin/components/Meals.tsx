import { ReactElement } from "react";
import Loading from "../../../../../components/Loading/Loading";
import useMeals from "../../../../../hooks/useMeals";
import MealModel from "../../../Models/MealModel";
import Meal from "../../Menu/Meal";

const Meals = () => {
  const { productEntities } = useMeals();

  let content: ReactElement | ReactElement[] = <Loading />;
  if (productEntities?.length) {
    content = productEntities.map((meal: MealModel) => {
      return <Meal key={meal.id} meal={meal} className='admin' />;
    });
  }

  return <div className='restaurant-admin__meals-list'>{content}</div>;
};

export default Meals;
