import React from "react";
import "./App.scss";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import Footer from "./components/Footer/Footer";
import { LandingPage } from "./components/LandingPage/LandingPage";
import ErrorPage from "./components/Error/Error";

import OktaAuth, { toRelativeUrl } from "@okta/okta-auth-js";
import { oktaConfig } from "./lib/config";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";

import AboutMe from "./projects/AboutMe/AboutMe";

import Header from "./projects/WeatherForecast/ui/Header";
import WeatherHome from "./projects/WeatherForecast/pages/WeatherForecastHome";
import Forecast from "./projects/WeatherForecast/pages/FiveDaysForecast";

import LibraryHomePage from "./projects/LibraryApp/Pages/LibraryHomePage/HomePage";
import { Navbar } from "./projects/LibraryApp/Components/NavbarAndFooter/Navbar";
import { SearchBooksPage } from "./projects/LibraryApp/Pages/SearchBooksPage/SearchBooksPage";
import { BookCheckoutPage } from "./projects/LibraryApp/Pages/BookCheckoutPage/BookCheckoutPage";
import { ReviewListPage } from "./projects/LibraryApp/Pages/BookCheckoutPage/ReviewListPage/ReviewListPage";
import { ShelfPage } from "./projects/LibraryApp/Pages/ShelfPage/ShelfPage";
import { MessagesPage } from "./projects/LibraryApp/Pages/MessagesPage/MessagesPage";
import { ManageLibraryPage } from "./projects/LibraryApp/Pages/ManageLibraryPage/ManageLibraryPage";

import RestaurantCartPage from "./projects/Restaurant/pages/Cart/Cart";
import RestaurantOrderPage from "./projects/Restaurant/pages/Checkout/Checkout";
import RestaurantReservationPage from "./projects/Restaurant/pages/Reservation/Reservation";
import RestaurantAdminPage from "./projects/Restaurant/pages/Admin/Admin";
import RestaurantMenuPage from "./projects/Restaurant/pages/Menu/Menu";
import RestaurantPaymentCompleted from "./projects/Restaurant/pages/Checkout/components/PaymentCompleted";
import RestaurantNavbar from "./projects/Restaurant/components/Navbar/Navbar";
import { CartProvider } from "./projects/Restaurant/Store/CartProvider";

const oktaAuth = new OktaAuth(oktaConfig);

function App() {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push("/login");
  };

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div>
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <MainNavigation />
        <Switch>
          <div className='min-vh-100'>
            <Route path='/' exact>
              <LandingPage />
            </Route>
            <Route path='/home'>
              <Redirect to='/' />
            </Route>
            <Route path='/error'>
              <ErrorPage />
            </Route>

            <Route
              path='/login'
              render={() => <LoginWidget config={oktaAuth} />}
            />
            <Route path='/login/callback' component={LoginCallback} />

            <Route path='/about-me'>
              <AboutMe />
            </Route>

            <Route path='/library' exact>
              <Navbar />
              <LibraryHomePage />
            </Route>
            <Route path='/library/search'>
              <Navbar />
              <SearchBooksPage />
            </Route>
            <Route path='/library/checkout/:bookId'>
              <Navbar />
              <BookCheckoutPage />
            </Route>
            <Route path='/library/reviewlist/:bookId'>
              <Navbar />
              <ReviewListPage />
            </Route>
            <SecureRoute path='/library/shelf'>
              <Navbar />
              <ShelfPage />
            </SecureRoute>
            <SecureRoute path='/library/messages'>
              <Navbar />
              <MessagesPage />
            </SecureRoute>
            <SecureRoute path='/library/admin'>
              <Navbar />
              <ManageLibraryPage />
            </SecureRoute>

            <Route exact path='/weather'>
              <Header />
              <WeatherHome />
            </Route>
            <Route path='/weather/:cityName'>
              <Header />
              <Forecast />
            </Route>

            <CartProvider>
              <Route path='/restaurant' exact>
                <Redirect to='/restaurant/menu' />
              </Route>
              <Route path='/restaurant/menu'>
                <RestaurantNavbar />
                <RestaurantMenuPage />
              </Route>
              <Route path='/restaurant/cart'>
                <RestaurantNavbar />
                <RestaurantCartPage />
              </Route>
              <SecureRoute path='/restaurant/order'>
                <RestaurantNavbar />
                <RestaurantOrderPage />
              </SecureRoute>
              <SecureRoute path='/restaurant/payment-completed'>
                <RestaurantNavbar />
                <RestaurantPaymentCompleted />
              </SecureRoute>
              <Route path='/restaurant/reservation'>
                <RestaurantNavbar />
                <RestaurantReservationPage />
              </Route>
              <SecureRoute path='/restaurant/admin'>
                <RestaurantNavbar />
                <RestaurantAdminPage />
              </SecureRoute>
            </CartProvider>
          </div>
        </Switch>
      </Security>
      <Footer />
    </div>
  );
}

export default App;
