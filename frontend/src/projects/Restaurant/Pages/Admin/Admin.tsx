import { Tab, Tabs } from "react-bootstrap";
import Meals from "./components/AdminMeals";
import Bookings from "./components/Bookings";
import { useOktaAuth } from "@okta/okta-react";
import { Navigate } from "react-router-dom";

const Admin = () => {
  const { authState } = useOktaAuth();

  return authState?.isAuthenticated ? (
    <section className='restaurant-admin min-vh-100 container'>
      <div className='section-title'>
        Hi Admin! In this page you can add, edit, remove meals from the menu.
      </div>
      <Tabs
        defaultActiveKey='meals'
        id='uncontrolled-tab-example'
        className='mb-3'
      >
        <Tab eventKey='meals' title='Meals'>
          <Meals authState={authState} />
        </Tab>
        <Tab eventKey='booking' title='Booking'>
          <Bookings authState={authState} />
        </Tab>
      </Tabs>
    </section>
  ) : (
    <Navigate to={"/"} />
  );
};

export default Admin;
