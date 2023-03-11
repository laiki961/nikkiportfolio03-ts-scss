import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import "../../../App.scss";

const Header = React.forwardRef((props, ref) => {
  return (
    <Fragment>
      <header className='header weather__header'>
        <Link to='/weather'>
          <h1 className='weather__brand brand-1'>My Weather App</h1>
        </Link>
        <Search className='navbar' />
      </header>
    </Fragment>
  );
});

export default Header;
