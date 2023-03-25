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
  fetchAllMeals,
  removeMealById,
  updateMeal,
} from "../../../Store/adminSlice";
import { fetchMealByName } from "../../../Store/mealSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import MealItem from "../../Menu/components/MenuItem";

const Meals: React.FC<{ authState: AuthState | null }> = (props) => {
  const { authState } = props;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalClassName, setModalClassName] = useState<string>("");
  const [updateId, setUpdateId] = useState<number>();

  const {
    meals: mealsAdmin,
    status: statusAdmin,
    error: errorAdmin,
  } = useAppSelector((state) => state.admin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllMeals());
  }, [dispatch]);

  const mealsSearchByName = (name: string) => {
    dispatch(fetchMealByName(name));
  };

  const addMealHandler = (productReqDto: ProductReqDto) => {
    if (authState !== undefined && authState !== null) {
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

  if (statusAdmin === "loading") {
    content = (
      <div className='container min-vh-100'>
        <Loading />
      </div>
    );
  }

  if (errorAdmin) {
    content = (
      <div className='container min-vh-100 error-message'>{errorAdmin}</div>
    );
  }

  if (mealsAdmin?.length) {
    content = mealsAdmin.map((meal: MealModel) => {
      return (
        <MealItem
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
        <Search className='restaurant__search' onClick={mealsSearchByName} />
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
