import { Outlet } from "react-router-dom";
import RestaurantNavbar from "../components /Navbar/Navbar";
import { Provider } from "react-redux";
import store from "../store/index";
import { MealsProvider } from "../store/MealProvider";

function RestaurantRootLayout() {
  return (
    <div className='restaurant__bg-image'>
      <MealsProvider>
        <Provider store={store}>
          <RestaurantNavbar />
          <Outlet />
        </Provider>
      </MealsProvider>
    </div>
  );
}

export default RestaurantRootLayout;
