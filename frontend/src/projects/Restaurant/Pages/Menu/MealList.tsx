import Loading from "../../../../components/Loading/Loading";
import Meal from "./Meal";
import MealModel from "../../Models/MealModel";
import useCart from "../../../../hooks/useCart";
import useMeals from "../../../../hooks/useMeals";
import { ReactElement } from "react";

export const MealList: React.FC<{}> = () => {
  const { productEntities } = useMeals();
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();

  let content: ReactElement | ReactElement[] = <Loading />;

  if (productEntities?.length) {
    content = productEntities.map((meal: MealModel) => {
      const inCart: boolean = cart.some((item) => item.id === meal.id);
      return (
        <Meal
          key={meal.id}
          meal={meal}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  return (
    <div className='restaurant container-sm min-vh-100'>
      <div className='restaurant__menu heading-2'>Meun Selection</div>
      {content}
    </div>
  );
};
