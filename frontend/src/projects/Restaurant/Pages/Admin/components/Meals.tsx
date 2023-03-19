import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";
import Loading from "../../../../../components/Loading/Loading";
import useAdmin from "../../../../../hooks/useAdmin";
import useMeals from "../../../../../hooks/useMeals";
import MealModel from "../../../Models/MealModel";
import Meal from "../../Menu/components/Meal";

const Meals = () => {
  const { productEntities } = useMeals();
  const { dispatch, REDUCER_ACTIONS } = useAdmin();

  //rerender if deleted a meal / updated
  const addMealHandler = () => {
    console.log(`Clicked Add`);
    // dispatch!({
    //   type: REDUCER_ACTIONS!.UPDATE,
    //   payload: { ...meal },
    // });
  };

  let content: ReactElement | ReactElement[] = <Loading />;
  if (productEntities?.length) {
    content = productEntities.map((meal: MealModel) => {
      return (
        <Meal
          className='admin'
          key={meal.id}
          meal={meal}
          dispatchAdmin={dispatch}
          ADMIN_REDUCER_ACTIONS={REDUCER_ACTIONS}
          // onClickRemove={removeMealFromMenuHandler}
        />
      );
    });
  }

  return (
    <div className='restaurant-admin__meals-list'>
      <div className='restaurant-admin__feature'>
        <button className='add-meal' type='button' onClick={addMealHandler}>
          <FontAwesomeIcon icon={faPlus} /> Add Meal
        </button>
      </div>
      {content}
    </div>
  );
};

export default Meals;
