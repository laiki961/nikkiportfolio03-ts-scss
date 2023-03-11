import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Loading from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function MainNavigation() {
  let prevScrollpos = window.pageYOffset;

  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <Loading />;
  }

  const handleLogout = async () => {
    oktaAuth.signOut();
  };

  console.log(authState);

  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("main-nav").style.top = "0";
    } else {
      document.getElementById("main-nav").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <nav id='main-nav' className='main-nav'>
      <header className='main-nav__header container-sm'>
        <ul className='main-nav__list'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/weather'
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Weather Forecast
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/library'
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Library
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/restaurant'
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Restaurant
            </NavLink>
          </li>
        </ul>
        <ul className='main-nav__list'>
          {!authState.isAuthenticated ? (
            <li className='main-nav__item'>
              <Link type='button' className='main-nav__feature' to='/login'>
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
          ) : (
            <li className='main-nav__item'>
              <button
                className='main-nav__feature button'
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </li>
          )}
        </ul>
      </header>
    </nav>
  );
}

export default MainNavigation;
