import React from "react";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/LandingPage/Root";
import { LandingPage } from "./components/LandingPage/LandingPage";
import ErrorPage from "./components/Error/Error";

import WeatherRootLayout from "./projects/WeatherForecast/pages/Root";
import WeatherHome from "./projects/WeatherForecast/pages/Home";
import Forecasts from "./projects/WeatherForecast/pages/Forecasts";

import Restaurant from "./projects/Restaurant/Restaurant";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "weather",
        element: <WeatherRootLayout />,
        children: [
          {
            index: true,
            element: <WeatherHome />,
          },
          {
            path: ":cityName",
            id: "forecast-weather",
            children: [
              {
                index: true,
                element: <Forecasts />,
              },
            ],
          },
        ],
      },
      { path: "restaurant", element: <Restaurant />, index: true },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
