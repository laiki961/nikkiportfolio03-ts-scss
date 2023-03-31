import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthState } from "@okta/okta-auth-js";
import React, { ReactElement, useEffect, useState } from "react";
import Loading from "../../../../../components/Loading/Loading";
import ModalComponent from "../../../components/Modal/Modal";
import Search from "../../../components/Search/Search";
import { ProductReqDto } from "../../../domain/dto/backend-dto";
import MealModel, { MealItemModel } from "../../../Models/MealModel";
import {
  addMeal,
  fetchAllMeals,
  fetchMealById,
  removeMealById,
  updateMeal,
} from "../../../Store/adminSlice";
import { fetchMealByName } from "../../../Store/mealSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import NewMealItem from "../../Menu/components/MenuItem";

const AdminMeals: React.FC<{ authState: AuthState | null }> = (props) => {
  const { authState } = props;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalClassName, setModalClassName] = useState<string>("");
  const [updateId, setUpdateId] = useState<number>();
  // const [updateDetails, setUpdateDetails] = useState<MealItemModel>();

  const {
    meals: mealsAdmin,
    updateMealDetails: updateMealDetailsAdmin,
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
    // existing values
    // call api to fetch existing meal data
    // if (mealId !== undefined) {
    //   dispatch(fetchMealById(mealId));
    //   console.log(updateMealDetailsAdmin);
    //   if (updateMealDetailsAdmin !== null) {
    //     setUpdateDetails(updateMealDetailsAdmin);
    //   }
    // }
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
        <NewMealItem
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
    <div className='restaurant-admin-meals'>
      <div className='restaurant-admin-meals__header'>
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
          // mealDetails={updateMealDetailsAdmin}
          className={modalClassName}
          addMeal={addMealHandler}
          editMeal={editMealFromMenuHandler}
          setShowModal={() => {
            setShowModal(!showModal);
          }}
          showModal={showModal}
        />
      )}
      <div className='admin-cards'>{content}</div>
    </div>
  );
};

export default AdminMeals;
