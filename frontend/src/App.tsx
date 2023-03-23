import React from "react";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/LandingPage/Root";
import { LandingPage } from "./components/LandingPage/LandingPage";
import ErrorPage from "./components/Error/Error";

import { oktaConfig } from "./lib/config";
import { LoginCallback } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";

import WeatherRootLayout from "./projects/WeatherForecast/pages/Root";
import WeatherHome from "./projects/WeatherForecast/pages/WeatherForecastHome";
import Forecasts from "./projects/WeatherForecast/pages/FiveDaysForecasts";

import LibraryRootLayout from "./projects/LibraryApp/Pages/Root";
import LibraryHomePage from "./projects/LibraryApp/Pages/LibraryHomePage/HomePage";
import { SearchBooksPage } from "./projects/LibraryApp/Pages/SearchBooksPage/SearchBooksPage";
import { BookCheckoutPage } from "./projects/LibraryApp/Pages/BookCheckoutPage/BookCheckoutPage";
import { ReviewListPage } from "./projects/LibraryApp/Pages/BookCheckoutPage/ReviewListPage/ReviewListPage";
import { ShelfPage } from "./projects/LibraryApp/Pages/ShelfPage/ShelfPage";
import { MessagesPage } from "./projects/LibraryApp/Pages/MessagesPage/MessagesPage";
import { ManageLibraryPage } from "./projects/LibraryApp/Pages/ManageLibraryPage/ManageLibraryPage";

import RestaurantRootLayout from "./projects/Restaurant/pages/Root";
import RestaurantCartPage from "./projects/Restaurant/pages/Cart/Cart";
import RestaurantOrderPage from "./projects/Restaurant/pages/Checkout/Checkout";
import RestaurantReservationPage from "./projects/Restaurant/pages/Reservation/Reservation";
import RestaurantAdminPage from "./projects/Restaurant/pages/Admin/Admin";
import RestaurantMenuPage from "./projects/Restaurant/pages/Menu/Menu";

import AboutMe from "./projects/AboutMe/AboutMe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "/login",
        element: <LoginWidget config={oktaConfig} />,
      },
      { path: "/callback", element: <LoginCallback /> },
      {
        path: "/about-me",
        element: <AboutMe />,
      },
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
      {
        path: "library",
        element: <LibraryRootLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <LibraryHomePage /> },
          { path: "/library/search", element: <SearchBooksPage /> },
          { path: "/library/checkout/:bookId", element: <BookCheckoutPage /> },
          { path: "/library/reviewlist/:bookId", element: <ReviewListPage /> },
          {
            path: "/library/shelf",
            element: <ShelfPage />,
          },
          {
            path: "/library/messages",
            element: <MessagesPage />,
          },
          {
            path: "/library/admin",
            element: <ManageLibraryPage />,
          },
        ],
      },
      {
        path: "restaurant",
        element: <RestaurantRootLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <RestaurantMenuPage />,
          },
          {
            path: "/restaurant/menu",
            element: <RestaurantMenuPage />,
          },
          {
            path: "/restaurant/cart",
            element: <RestaurantCartPage />,
          },
          {
            path: "/restaurant/order",
            element: <RestaurantOrderPage />,
          },
          {
            path: "/restaurant/reservation",
            element: <RestaurantReservationPage />,
          },
          {
            path: "/restaurant/admin",
            element: <RestaurantAdminPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
