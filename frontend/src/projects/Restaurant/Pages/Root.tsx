import { Outlet } from "react-router-dom";
import RestaurantNavbar from "../components /Navbar/Navbar";
import { MealsProvider } from "../Store/MealProvider";
import { CartProvider } from "../Store/CartProvider";

function RestaurantRootLayout() {
  return (
    <div className='restaurant__bg-image'>
      <MealsProvider>
        <CartProvider>
          <RestaurantNavbar />
          <Outlet />
        </CartProvider>
      </MealsProvider>
    </div>
  );
}

export default RestaurantRootLayout;
