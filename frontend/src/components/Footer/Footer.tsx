import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <h6>About Me</h6>
            <p className='text-justify'>
              Nikki's Profolio
              <br />
              Toronto, ON, Canada
              <br />
              <i>Contact: +1 (437) 970-0655</i>
            </p>
          </div>

          <div className='col-xs-6 col-md-3'>
            <h6>Quick Links</h6>
            <ul className='footer__links'>
              <li>
                <Link to='/'>Projects</Link>
                <br />
                <Link to='/weather'>Weather Forecast</Link>
                <br />
                <Link to='/library'>Library</Link>
                <br />
                <Link to='/ecommerce'>eCommerce</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-sm-6 col-xs-12'>
            <p className='footer__copyright-text'>
              Copyright @ 2023 All Rights Reserved by Nikki.
            </p>
          </div>
          <div className='col-md-4 col-sm-6 col-xs-12'>
            <ul className='footer__social-icons'>
              <li>
                <a
                  className='linkedin'
                  href='https://www.linkedin.com/in/nikkilkip/'
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a className='linkedin' href='https://github.com/laiki961'>
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
