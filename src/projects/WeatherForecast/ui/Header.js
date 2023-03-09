import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import classes from "./Header.module.css";

const Header = React.forwardRef((props, ref) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <Link to='/weather'>
          <h1 className={classes["weather-brand"]}>My Weather App</h1>
        </Link>
        <Search className='navbar' />
      </header>
    </Fragment>
  );
});

export default Header;
