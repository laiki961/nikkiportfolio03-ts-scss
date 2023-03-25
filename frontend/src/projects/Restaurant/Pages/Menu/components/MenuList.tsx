import Loading from "../../../../../components/Loading/Loading";
import MenuItem from "./MenuItem";
import MealModel from "../../../Models/MealModel";
import useCart from "../../../../../hooks/useCart";
// import useMeals from "../../../../../hooks/useMeals";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { Pagination } from "../../../../../components/Pagination/Pagination";
//
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import { fetchMeals } from "../../../Store/mealSlice";

export const MenuList: React.FC = () => {
  const {
    dispatch: dispatchCart,
    REDUCER_ACTIONS: CART_REDUCER_ACTIONS,
    cart,
  } = useCart();

  const { meals, status, error } = useAppSelector((state) => state.meals);
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const paignate = (pageNumber: number) => setCurrentPage(pageNumber);

  const fetchData = useCallback(() => {
    dispatch(fetchMeals());
  }, [fetchMeals]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let content: ReactElement | ReactElement[] = <Loading />;

  if (status === "loading") {
    content = (
      <div className='container min-vh-100'>
        <Loading />
      </div>
    );
  }

  if (error) {
    content = <div className='container min-vh-100 error-message'>{error}</div>;
  }

  if (meals?.length) {
    content = meals.map((meal: MealModel) => {
      const inCart: boolean = cart.some((item) => item.id === meal.id);
      return (
        <MenuItem
          className='menu'
          key={meal.id}
          meal={meal}
          dispatchCart={dispatchCart}
          CART_REDUCER_ACTIONS={CART_REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  return (
    <div className='restaurant-menu__list'>
      {content}
      {/* {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paignate}
        />
      )} */}
    </div>
  );
};
