import { Tab, Tabs } from "react-bootstrap";
import Meals from "./components/Meals";
import Bookings from "./components/Bookings";

const Admin = () => {
  return (
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
          <Meals />
        </Tab>
        <Tab eventKey='booking' title='Booking'>
          <Bookings />
        </Tab>
      </Tabs>
    </section>
  );
};

export default Admin;
