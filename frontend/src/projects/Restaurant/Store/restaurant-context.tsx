import React, { useEffect } from "react";
import { useState } from "react";
import useHttp from "../../../hooks/use-http";
import ProductModel from "../Models/ProductModel";

type RestaurantContextObj = {
  products: ProductModel[];
  isLoading: boolean;
  error: boolean;
};

export const RestaurantContext = React.createContext<RestaurantContextObj>({
  products: [],
  isLoading: false,
  error: false,
});

export const RestaurantContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const restaurantContext: RestaurantContextObj = {
    isLoading,
    products,
    error,
  };

  return (
    <RestaurantContext.Provider value={restaurantContext}>
      {props.children}
    </RestaurantContext.Provider>
  );
};
