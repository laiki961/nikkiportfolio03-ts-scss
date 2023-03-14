import { Outlet } from "react-router-dom";
import RestaurantNavbar from "../components /Navbar/Navbar";
import { RestaurantContextProvider } from "../store/restaurant-context";
import { Provider } from "react-redux";
import store from "../store/index";

function RestaurantRootLayout() {
  return (
    <div className='restaurant__bg-image'>
      <Provider store={store}>
        <RestaurantContextProvider>
          <RestaurantNavbar />
          <Outlet />
        </RestaurantContextProvider>
      </Provider>
    </div>
  );
}

export default RestaurantRootLayout;
