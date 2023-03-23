import { createContext, ReactElement, useMemo, useReducer } from "react";
import { CartItemModel } from "../Models/CartModel";
import CartItem from "../pages/Cart/components/CartItem";

type CartStateType = {
  cart: CartItemModel[];
};

const initCartState: CartStateType = {
  cart: [],
};

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemModel;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload missing in ADD action");
      }
      const { id, name, price } = action.payload;
      console.log(action.payload);
      const filteredCart: CartItemModel[] = state.cart.filter(
        (item) => item.id !== id
      );
      const itemExists: CartItemModel | undefined = state.cart.find(
        (item) => item.id === id
      );
      const amount: number = itemExists
        ? itemExists.amount + action.payload.amount
        : action.payload.amount;

      if (itemExists) {
        console.log(`itemExists.amount: ${itemExists.amount}`);
        console.log(`action.payload.amount: ${action.payload.amount}`);
      }

      // const nonUpdatedItemsAmount = filteredCart.reduce(
      //   (preValue, cartItem) => {
      //     return preValue + cartItem.amount;
      //   },
      //   0
      // );

      // const totalItems: number = itemExists
      //   ? itemExists.amount + action.payload.amount + nonUpdatedItemsAmount
      //   : state.totalItems + action.payload.amount;

      // const nonUpdatedItemsPrice = filteredCart.reduce((preValue, cartItem) => {
      //   return preValue + cartItem.amount * cartItem.price;
      // }, 0);

      // const totalPrice: number = itemExists
      //   ? itemExists.price +
      //     action.payload.amount * price +
      //     nonUpdatedItemsPrice
      //   : state.totalPrice + action.payload.amount * price;

      localStorage.setItem(
        "cart",
        JSON.stringify([...filteredCart, { id, name, price, amount }])
      );

      return {
        ...state,
        cart: [...filteredCart, { id, name, price, amount }],
      };
    }
    // case REDUCER_ACTION_TYPE.REMOVE: {
    //   if (!action.payload) {
    //     throw new Error("action.payload missing in REMOVE action");
    //   }
    //   const { id } = action.payload;
    //   const filteredCart: CartItemModel[] = state.cart.filter(
    //     (item) => item.id !== id
    //   );

    //   const totalItems: number = filteredCart.reduce(
    //     (previousValue, cartItem) => {
    //       return previousValue + cartItem.amount;
    //     },
    //     0
    //   );

    //   const totalPrice: number = filteredCart.reduce(
    //     (previousValue, cartItem) => {
    //       return previousValue + cartItem.price * cartItem.amount;
    //     },
    //     0
    //   );

    //   localStorage.setItem(
    //     "cart",
    //     JSON.stringify([filteredCart, totalItems, totalPrice])
    //   );

    //   return { ...state, cart: [...filteredCart], totalItems, totalPrice };
    // }

    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload missing in QUANTITY action");
      }

      const { id, amount } = action.payload;

      const itemExists: CartItemModel | undefined = state.cart.find(
        (item) => item.id === id
      );
      if (!itemExists) {
        throw new Error("Item must exist in order to update quantity");
      }

      const updatedItem: CartItemModel = { ...itemExists, amount };

      const filteredCart: CartItemModel[] = state.cart.filter(
        (item) => item.id !== id
      );

      localStorage.setItem(
        "cart",
        JSON.stringify([...filteredCart, updatedItem])
      );
      return { ...state, cart: [...filteredCart, updatedItem] };
    }

    case REDUCER_ACTION_TYPE.SUBMIT: {
      const totalItems = state.cart.reduce((preValue, cartItem) => {
        return preValue + cartItem.amount;
      }, 0);

      const totalPrice = state.cart.reduce((preValue, cartItem) => {
        return preValue + cartItem.amount * cartItem.price;
      }, 0);

      localStorage.setItem("cartTotalItems", JSON.stringify(totalItems));
      localStorage.setItem("cartTotalPrice", JSON.stringify(totalPrice));
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.amount;
  }, 0);

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.amount * cartItem.price;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => {
    const itemA: number = a.id;
    const itemB: number = b.id;
    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
