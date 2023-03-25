import { Outlet } from "react-router-dom";
import RestaurantNavbar from "../components/Navbar/Navbar";

import { CartProvider } from "../Store/CartProvider";
import { useAppDispatch } from "../Store/store";
import { useEffect } from "react";
import { fetchMeals } from "../Store/adminSlice";

function RestaurantRootLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMeals());
  });

  return (
    <div className='restaurant__bg-image min-vh-100'>
      <CartProvider>
        <RestaurantNavbar />
        <Outlet />
      </CartProvider>
    </div>
  );
}

export default RestaurantRootLayout;
