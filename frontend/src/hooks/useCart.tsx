import { useContext } from "react";
import CartContext from "../projects/Restaurant/store/CartProvider";
import { UseCartContextType } from "../projects/Restaurant/store/CartProvider";

const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};

export default useCart;
