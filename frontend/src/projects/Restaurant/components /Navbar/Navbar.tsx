import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import icon from "../../images/icon-portfolio/SVG/shopping-cart.svg";
import useCart from "../../../../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function RestaurantNavbar() {
  const { totalItems } = useCart();

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
              to='reservation'
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Reservation
            </NavLink>
          </li>
          <li>
            <NavLink
              to='admin'
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/restaurant/cart'
              className={({ isActive }) =>
                isActive
                  ? "active restaurant-nav__cart"
                  : "restaurant-nav__cart"
              }
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {/* <img src={icon} className='restaurant-nav__icon'></img> */}
              <span className='restaurant-nav__badge'>{totalItems}</span>
            </NavLink>
          </li>
        </ul>
      </Container>
    </Navbar>
  );
}

export default RestaurantNavbar;
