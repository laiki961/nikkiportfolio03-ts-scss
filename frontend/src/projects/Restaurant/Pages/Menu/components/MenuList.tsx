import Loading from "../../../../../components/Loading/Loading";
import Meal from "./Meal";
import MealModel from "../../../Models/MealModel";
import useCart from "../../../../../hooks/useCart";
import useMeals from "../../../../../hooks/useMeals";
import { ReactElement } from "react";

export const MenuList: React.FC<{}> = () => {
  const { productEntities } = useMeals();
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();

  let content: ReactElement | ReactElement[] = <Loading />;

  if (productEntities?.length) {
    content = productEntities.map((meal: MealModel) => {
      const inCart: boolean = cart.some((item) => item.id === meal.id);
      return (
        <Meal
          className='menu'
          key={meal.id}
          meal={meal}
          dispatchCart={dispatch}
          CART_REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  return <>{content}</>;
};
