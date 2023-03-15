import { createContext, ReactElement, useState, useEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import useHttp from "../../../hooks/use-http";
import MealModel from "../models/MealModel";

const initState: MealModel[] = [];

export type UseMealsContextType = { productEntities: MealModel[] };

const initContextState: UseMealsContextType = { productEntities: [] };

const MealsContext = createContext<UseMealsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const MealsProvider = ({ children }: ChildrenType): ReactElement => {
  const [productEntities, setProductEntities] =
    useState<MealModel[]>(initState);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    //Promise<MealModel[]> | Promise<any>
    const tranformMeals = (taskObj: any | Promise<MealModel[]>) => {
      const responseData = taskObj._embedded.productEntities;
      const loadedMeals: MealModel[] = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: responseData[key].id,
          name: responseData[key].name,
          description: responseData[key].description,
          category: responseData[key].category,
          price: responseData[key].price,
        });
      }
      setProductEntities(loadedMeals);
    };

    const baseUrl: string = `${process.env.REACT_APP_RESTAURANT_API}/productEntities`;
    const url: string = `${baseUrl}?page=0&size=9`;

    fetchMeals({ url: url }, tranformMeals);
  }, []);

  return (
    <MealsContext.Provider value={{ productEntities }}>
      {children}
      {/* {!isLoading && children}
      {isLoading && <Loading />}
      {error && <p>error</p>} */}
    </MealsContext.Provider>
  );
};

export default MealsContext;
