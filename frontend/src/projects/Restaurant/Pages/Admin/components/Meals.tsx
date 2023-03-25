import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthState } from "@okta/okta-auth-js";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import Loading from "../../../../../components/Loading/Loading";
import ModalComponent from "../../../components/Modal/Modal";
import Search from "../../../components/Search/Search";
import { ProductReqDto } from "../../../domain/dto/backend-dto";
import MealModel from "../../../Models/MealModel";
import {
  addMeal,
  fetchMeals,
  removeMealById,
  updateMeal,
} from "../../../Store/adminSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import Meal from "../../Menu/components/MenuItem";

const Meals: React.FC<{ authState: AuthState | null }> = (props) => {
  const { authState } = props;

  const { meals, status, error } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalClassName, setModalClassName] = useState<string>("");
  const [updateId, setUpdateId] = useState<number>();

  const fetchData = useCallback(() => {
    dispatch(fetchMeals());
  }, [fetchMeals]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addMealHandler = (productReqDto: ProductReqDto) => {
    console.log(`addMealHandler`);
    if (authState !== undefined && authState !== null) {
      console.log(`productReqDto`);
      console.log(`Clicked Add ${productReqDto.name}`);
      dispatch(addMeal({ productReqDto, authState }));
    }
  };

  const removeMealFromMenuHandler = (id: number) => {
    if (authState !== undefined && authState !== null) {
      console.log(`Clicked Removed: ${id}`);
      dispatch(removeMealById({ id, authState }));
    }
  };

  const editMealFromMenuHandler = (
    id: number,
    productReqDto: ProductReqDto
  ) => {
    if (authState !== undefined && authState !== null) {
      console.log(`Clicked Edit: ${id}`);
      dispatch(updateMeal({ id, productReqDto, authState }));
    }
  };

  const modalController = (className: string, mealId?: number) => {
    setModalClassName(className);
    setShowModal(!showModal);
    setUpdateId(mealId);
  };

  let content: ReactElement | ReactElement[] = <Loading />;

  if (status === "loading") {
    content = (
      <div className='container min-vh-100'>
        <Loading />
      </div>
    );
  }
  console.log(error);
  if (error) {
    content = <div className='container min-vh-100 error-message'>{error}</div>;
  }

  if (meals?.length) {
    content = meals.map((meal: MealModel) => {
      return (
        <Meal
          className='admin'
          key={meal.id}
          meal={meal}
          onShowEditModal={modalController.bind(null, "update-meal", meal.id)}
          onRemove={removeMealFromMenuHandler}
        />
      );
    });
  }

  return (
    <div className='restaurant-admin__meals-list'>
      <div className='restaurant-admin__header'>
        <Search className='restaurant__search' />
        <button
          className='add-meal'
          type='button'
          onClick={modalController.bind(null, "add-meal", undefined)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Meal
        </button>
      </div>
      {showModal && (
        <ModalComponent
          updateId={updateId}
          className={modalClassName}
          addMeal={addMealHandler}
          editMeal={editMealFromMenuHandler}
          setShowModal={() => {
            setShowModal(!showModal);
          }}
          showModal={showModal}
        />
      )}
      {content}
    </div>
  );
};

export default Meals;
