import {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import useMeals from "../../../hooks/useMeals";
import { ProductReqDto } from "../domain/dto/backend-dto";
import { MealItemModel } from "../Models/MealModel";

type AdminStateType = {
  meals: MealItemModel[];
};

const initAdminState: AdminStateType = {
  meals: [],
};

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  UPDATE: "UPDATE",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: MealItemModel;
};

const reducer = (
  state: AdminStateType,
  action: ReducerAction
): AdminStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload missing in ADD action");
      }
      const { id, name, description, category, price } = action.payload;
      // pass the entire MealItemModel to backend

      //check if the name exist in the backend
      return {
        ...state,
        meals: [{ id, name, description, category, price }],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload missing in REMOVE action");
      }
      const { id } = action.payload;
      const filteredMeals: MealItemModel[] = state.meals.filter(
        (item) => item.id !== id
      );
      // pass the id to backend
      return { ...state };
    }

    case REDUCER_ACTION_TYPE.UPDATE: {
      if (!action.payload) {
        throw new Error("action.payload missing in UPDATE action");
      }

      // pass the id to backend
      return { ...state, meals: [] };
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

const useAdminContext = (initAdminState: AdminStateType) => {
  const [state, dispatch] = useReducer(reducer, initAdminState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  /////////////////////

  const meals = state.meals.sort((a, b) => {
    const itemA: number = a.id;
    const itemB: number = b.id;
    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTIONS, meals };
};

export type UseAdminContextType = ReturnType<typeof useAdminContext>;

const initAdminContextState: UseAdminContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  meals: [],
};

export const AdminContext = createContext<UseAdminContextType>(
  initAdminContextState
);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const AdminProvider = ({ children }: ChildrenType): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initAdminState);
  const { productEntities } = useMeals();

  const baseUrl: string = `${process.env.REACT_APP_RESTAURANT_API}/admin`;
  const [apiResponse, setApiResponse] = useState<Response | null>(null);
  const [availableMeals, setAvailableMeals] = useState<MealItemModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>();

  const addMeal = useCallback(async (productReqDto: ProductReqDto) => {
    const addUrl: string = `${baseUrl}/secure/add-product`; // POST
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(addUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productReqDto),
      });
      if (!response.ok) {
        throw new Error(
          `Request Failed ${response.status}: ${response.statusText}`
        );
      }
      const data = await response.json();
      setApiResponse(data);
      ///convert data?
      setAvailableMeals(productEntities);
    } catch (error) {
      // if (typeof error === "string") {
      //   // setError(error.message || `Something went wrong`);
      // } else
      if (error instanceof Error) {
        setError(error as any);
      }
    }
    setIsLoading(false);
  }, []);

  const removeMeal = useCallback(async (id: number) => {
    const removeUrl: string = `${baseUrl}/secure/remove-product?productId=${id}`; //DELETE
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(removeUrl, {
        method: "DELETE",
        headers: {},
        body: null,
      });
      if (!response.ok) {
        throw new Error(
          `Request Failed ${response.status}: ${response.statusText}`
        );
      }
      const data = await response.json();
      ///convert data?
      setApiResponse(data);
      setAvailableMeals(productEntities);
    } catch (error) {
      if (error instanceof Error) {
        setError(error as any);
      }
    }
    setIsLoading(false);
  }, []);

  const updateMeal = useCallback(
    async (id: number, productReqDto: ProductReqDto) => {
      const updateUrl: string = `${baseUrl}/secure/update-product?productId=${id}`; //PUT
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(updateUrl, {
          method: "PUT",
          headers: {},
          body: null,
        });
        if (!response.ok) {
          throw new Error(
            `Request Failed ${response.status}: ${response.statusText}`
          );
        }
        const data = await response.json();
        ///convert data?
        setApiResponse(data);
        setAvailableMeals(productEntities);
      } catch (error) {
        if (error instanceof Error) {
          setError(error as any);
        }
      }
      setIsLoading(false);
    },
    []
  );

  return (
    <AdminContext.Provider value={useAdminContext(initAdminState)}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
