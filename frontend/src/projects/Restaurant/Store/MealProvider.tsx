import {
  createContext,
  ReactElement,
  useState,
  useEffect,
  useCallback,
} from "react";
import Loading from "../../../components/Loading/Loading";
import useHttp from "../../../hooks/use-http";
import MealModel from "../Models/MealModel";

const initState: MealModel[] = [];

export type UseMealsContextType = {
  productEntities: MealModel[];
  totalAmountOfItem: number;
  totalPages: number;
  itemsPerPage: number;
  error: any;
};

const initContextState: UseMealsContextType = {
  productEntities: [],
  totalAmountOfItem: 0,
  totalPages: 0,
  itemsPerPage: 20,
  error: null,
};

const MealsContext = createContext<UseMealsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const MealsProvider = ({ children }: ChildrenType): ReactElement => {
  const [productEntities, setProductEntities] =
    useState<MealModel[]>(initState);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  const [itemsPerPage] = useState<number>(20);
  const [totalAmountOfItem, setTotalAmountOfItem] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const tranformMeals = (taskObj: any | Promise<MealModel[]>) => {
      setTotalAmountOfItem(taskObj.page.totalElement);
      setTotalPages(taskObj.page.totalPages);
      const responseData = taskObj._embedded.productEntities;
      setProductEntities(responseData);
    };

    const baseUrl: string = `${process.env.REACT_APP_RESTAURANT_API}/productEntities`;
    const url: string = `${baseUrl}?page=0&size=${itemsPerPage}`;

    fetchMeals({ url: url }, tranformMeals);
  }, [fetchMeals]);

  return (
    <MealsContext.Provider
      value={{
        productEntities,
        totalAmountOfItem,
        totalPages,
        itemsPerPage,
        error,
      }}
    >
      {!isLoading && children}
      {isLoading && <Loading />}
    </MealsContext.Provider>
  );
};

export default MealsContext;
