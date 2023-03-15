import { useContext } from "react";
import CartContext from "../projects/Restaurant/Store/CartProvider";
import { UseCartContextType } from "../projects/Restaurant/Store/CartProvider";

const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};

export default useCart;
