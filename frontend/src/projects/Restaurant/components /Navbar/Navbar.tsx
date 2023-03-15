import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import icon from "../../images/icon-portfolio/SVG/shopping-cart.svg";
// import { Order } from "../../models/CartModel";
import { RootState } from "../../store/index";

function RestaurantNavbar() {
  // const dispatch = useDispatch();
  // const cartQuantity = useSelector<RootState, Order[]>(
  //   (state) => state.totalQuantity
  // );

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
          <li>
            <NavLink
              to='/restaurant/cart'
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <img src={icon} className='restaurant-nav__icon'></img>
              <span>3</span>
            </NavLink>
          </li>
        </ul>
      </Container>
    </Navbar>
  );
}

export default RestaurantNavbar;
