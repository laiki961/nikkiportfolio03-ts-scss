import Loading from "../../../../../components/Loading/Loading";
import Meal from "./Meal";
import MealModel from "../../../Models/MealModel";
import useCart from "../../../../../hooks/useCart";
import useMeals from "../../../../../hooks/useMeals";
import { ReactElement, useState } from "react";
import { Pagination } from "../../../../../components/Pagination/Pagination";

export const MenuList: React.FC = () => {
  const { productEntities, totalAmountOfItem, totalPages, itemsPerPage } =
    useMeals();
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();

  const [currentPage, setCurrentPage] = useState(1);

  const paignate = (pageNumber: number) => setCurrentPage(pageNumber);

  let lastItem =
    itemsPerPage * currentPage <= totalAmountOfItem
      ? itemsPerPage * currentPage
      : totalAmountOfItem;

  let content: ReactElement | ReactElement[] = <Loading />;

  console.log(productEntities);

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

  return (
    <div className='restaurnat-menu__list'>
      {content}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paignate}
        />
      )}
    </div>
  );
};