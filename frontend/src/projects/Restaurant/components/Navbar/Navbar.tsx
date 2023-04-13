import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useCart from "../../../../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useOktaAuth } from "@okta/okta-react";

function RestaurantNavbar() {
  const { totalItems } = useCart();

  const { authState } = useOktaAuth();

  return (
    <Navbar id='restaurant-nav' className='restaurant-nav'>
      <Container>
        <Navbar.Brand href='/restaurant' className='restaurant-nav__brand-link'>
          Thai Awesome
        </Navbar.Brand>
        <ul className='restaurant-nav__list'>
          <li>
            <NavLink to='menu' activeClassName='active'>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to='reservation' activeClassName='active'>
              Reservation
            </NavLink>
          </li>
          {authState?.accessToken?.claims.userType === "admin" && (
            <li>
              <NavLink to='admin' activeClassName='active'>
                Admin
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to='/restaurant/cart'
              activeClassName='active restaurant-nav__cart'
              className='restaurant-nav__cart'
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span className={`restaurant-nav__badge`}>{totalItems}</span>
            </NavLink>
          </li>
        </ul>
      </Container>
    </Navbar>
  );
}

export default RestaurantNavbar;
