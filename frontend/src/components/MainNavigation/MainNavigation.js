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
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("main-nav").style.top = "0";
    } else {
      document.getElementById("main-nav").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <nav id='main-nav' className='main-nav'>
      <header className='main-nav__header container-xxl'>
        <ul className='main-nav__list'>
          <li>
            <NavLink to='/' activeClassName='active' exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/about-me' activeClassName='active' exact>
              About Me
            </NavLink>
          </li>
          {/* dropdown button start */}
          <li className='main-nav__dropdown'>
            <button className='main-nav__dropdown-button'>Projects</button>
            <div className='main-nav__dropdown-content'>
              <NavLink to='/weather' activeClassName='active'>
                Weather Forecast
              </NavLink>
              <NavLink to='/library' activeClassName='active'>
                Library
              </NavLink>
              <NavLink to='/restaurant' activeClassName='active'>
                Restaurant
              </NavLink>
            </div>
          </li>
          {/* dropdown button end */}
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

{
  /* <ul className='main-nav__list'>
{!isLoading && !user && (
  <li className='main-nav__item'>
    <button
      className='main-nav__feature'
      onClick={() => loginWithRedirect()}
    >
      <FontAwesomeIcon icon={faUser} />
    </button>

  </li>
)}
{!isLoading && user && (
  <li className='main-nav__item'>
    <button
      className='main-nav__feature button'
      onClick={() => logout()}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  </li>
)}
</ul> */
}
