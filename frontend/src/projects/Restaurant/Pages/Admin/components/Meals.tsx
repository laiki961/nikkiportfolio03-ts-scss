import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthState } from "@okta/okta-auth-js";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import Loading from "../../../../../components/Loading/Loading";
import MealModel from "../../../Models/MealModel";
import { fetchMeals, removeMealById } from "../../../Store/adminSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import Meal from "../../Menu/components/Meal";

const Meals: React.FC<{ authState: AuthState | null }> = (props) => {
  const { authState } = props;
  const meals = useAppSelector((state) => state.admin.meals);

  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetchMeals());
  }, []);

  // how to rerender whenever an item being remove / add / update
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addMealHandler = () => {
    console.log(`Clicked Add`);
  };

  const removeMealFromMenuHandler = (id: number) => {
    if (authState !== undefined && authState !== null) {
      console.log(`Clicked Removed: ${id}`);
      dispatch(removeMealById({ id, authState }));
    }
  };

  // const editMealFromMenuHandler = (id: number) => {
  //   console.log(`Clicked Edit: ${id}`);
  // };

  console.log(`meals`);
  console.log(meals);

  let content: ReactElement | ReactElement[] = <Loading />;

  if (meals?.length) {
    content = meals.map((meal: MealModel) => {
      return (
        <Meal
          className='admin'
          key={meal.id}
          meal={meal}
          // onUpdate={editMealFromMenuHandler}
          onRemove={removeMealFromMenuHandler}
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
