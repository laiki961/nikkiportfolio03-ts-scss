import Loading from "../../../../../components/Loading/Loading";
import MealModel from "../../../Models/MealModel";
import useCart from "../../../../../hooks/useCart";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { Pagination } from "../../../../../components/Pagination/Pagination";
import { MealItem } from "../../../Store/mealSlice";
import NewMenuItem from "./MenuItem";

export const MenuList: React.FC<{
  meals: MealItem[];
  error: string | null;
  status: string | null;
}> = (props) => {
  const {
    dispatch: dispatchCart,
    REDUCER_ACTIONS: CART_REDUCER_ACTIONS,
    cart,
  } = useCart();

  const [currentPage, setCurrentPage] = useState(1);
  const paignate = (pageNumber: number) => setCurrentPage(pageNumber);

  let content: ReactElement | ReactElement[] = <Loading />;

  if (props.status === "loading") {
    content = (
      <div className='container'>
        <Loading />
      </div>
    );
  }

  if (props.error) {
    content = (
      <div className='container min-vh-100 error-message'>{props.error}</div>
    );
  }

  if (props.meals?.length) {
    content = props.meals.map((meal: MealModel) => {
      const inCart: boolean = cart.some((item) => item.id === meal.id);
      return (
        <NewMenuItem
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
    // <div className='restaurant-menu__list'>
    <div className='menu-cards'>
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
