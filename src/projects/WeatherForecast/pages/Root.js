import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import { WeatherContextProvider } from "../store/weather-context";

function WeatherRootLayout() {
  return (
    <WeatherContextProvider>
      <Header />
      <Outlet />
    </WeatherContextProvider>
  );
}

export default WeatherRootLayout;
