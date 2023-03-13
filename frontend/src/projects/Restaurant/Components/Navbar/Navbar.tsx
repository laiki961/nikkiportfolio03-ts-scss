import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function RestaurantNavbar() {
  return (
    <Navbar id='restaurant-nav' className='restaurant-nav'>
      <Container>
        <Navbar.Brand href='/restaurant' className='restaurant-nav__brand-link'>
          Thai Awesome
        </Navbar.Brand>
        <ul className='restaurant-nav__list'>
          <li>
            <NavLink
              to='/restaurant'
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/restaurant/reservation'
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Reservation
            </NavLink>
          </li>
        </ul>
      </Container>
    </Navbar>
  );
}

export default RestaurantNavbar;
