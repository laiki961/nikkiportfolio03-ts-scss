import { useCallback, useEffect } from "react";
import Search from "../../components/Search/Search";
import { fetchMealByName, fetchMeals } from "../../Store/mealSlice";
import { useAppDispatch, useAppSelector } from "../../Store/store";

import { MenuList } from "./components/MenuList";

const Menu = () => {
  const { meals, status, error } = useAppSelector((state) => state.meals);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetchMeals());
  }, [fetchMeals]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mealsSearchByName = (name: string) => {
    dispatch(fetchMealByName(name));
  };

  return (
    <section className='restaurant-menu container-sm py-5'>
      <div className='restaurant-menu__header'>
        <span className='restaurant-menu__heading'>Meun Selection</span>
        <Search className='restaurant__search' onClick={mealsSearchByName} />
      </div>
      <MenuList meals={meals} status={status} error={error} />
    </section>
  );
};

export default Menu;
