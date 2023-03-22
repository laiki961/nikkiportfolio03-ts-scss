import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthState } from "@okta/okta-auth-js";
import React, {
  MouseEventHandler,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import Loading from "../../../../../components/Loading/Loading";
import ModalComponent from "../../../components/Modal/Modal";
import Search from "../../../components/Search/Search";
import { ProductReqDto } from "../../../domain/dto/backend-dto";
import MealModel from "../../../Models/MealModel";
import { addMeal, fetchMeals, removeMealById } from "../../../Store/adminSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import Meal from "../../Menu/components/Meal";

const Meals: React.FC<{ authState: AuthState | null }> = (props) => {
  const { authState } = props;
  const meals = useAppSelector((state) => state.admin.meals);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchData = useCallback(() => {
    dispatch(fetchMeals());
  }, []);

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
      <div className='restaurant-admin__header'>
        <Search className='restaurant-admin__search' />
        <button
          className='add-meal'
          type='button'
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Meal
        </button>
      </div>
      {showModal && (
        <ModalComponent
          addMeal={addMealHandler}
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
