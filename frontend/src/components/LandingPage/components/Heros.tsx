import { Link } from "react-router-dom";

export const Heros = () => {
  return (
    <div className='landing-page-hero'>
      <div className='d-none d-lg-block'>
        <div className='row g-0'>
          <div
            className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'
          >
            <div className='ml-2 u-margin-tb-sm'>
              <h1 className='heading-1'>
                Weather Forecast <i className='text-3'>by Open Weather</i>
              </h1>
              <p className='lead text-1'>
                This app is using the free API provided by Open Weather. It
                allows user to query the upcoming 5 days weather forecast by
                entering a city name. User can also check the weather details by
                clicking on a specific day.
              </p>
              <div className='label__container'>
                <span className='label'>JavaScript</span>
                <span className='label'>React</span>
                <span className='label'>HTML</span>
                <span className='label'>SCSS</span>
              </div>
              <Link className='btn btn-dark btn-lg' to='/weather'>
                Check it out
              </Link>
            </div>
          </div>
          <div className='col-sm-6 col-md-6'>
            {/* <div className='col-image-weather'></div> */}
            <iframe
              className='project-demo'
              src='https://www.youtube.com/embed/FwYHgpzdSTI'
            ></iframe>
          </div>
        </div>
        <div className='row g-0'>
          <div className='col-sm-6 col-md-6'>
            <div className='col-image-left'></div>
            <div className='col-image-library'></div>
          </div>
          <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
            <div className='ml-2'>
              <h1 className='heading-1'>Library</h1>
              <p className='lead text-1'>
                <span className='text-3 u-block u-margin-bottom-sm'>
                  Udemy Course: Full Stack: React and Java Spring Boot - The
                  Developer
                </span>
                This is the application that I have built by following along the
                course. It gave me an example of how to build a complete
                application.
              </p>
              <div className='label__container'>
                <span className='label'>TypeScript</span>
                <span className='label'>React</span>
                <span className='label'>Java</span>
                <span className='label'>Spring Boot</span>
                <span className='label'>JDBC</span>
                <span className='label'>MySql</span>
                <span className='label'>Okta</span>
                <span className='label'>HTML</span>
                <span className='label'>SCSS</span>
              </div>
              <Link className='btn btn-dark btn-lg' to='/library'>
                Check it out
              </Link>
            </div>
          </div>
        </div>
        <div className='row g-0'>
          <div
            className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'
          >
            <div className='ml-2'>
              <h1 className='heading-1'>Restaurant</h1>
              <p className='lead text-1'>
                I built this application to utilize and pratice all the skills
                that I have leant. The menu is connected to the database using
                JDBC. You can try to login as an Admin and test it out! (You
                will see the login credential when you on the login page)
              </p>
              <div className='label__container'>
                <span className='label'>TypeScript</span>
                <span className='label'>React</span>
                <span className='label'>Redux</span>
                <span className='label'>Java</span>
                <span className='label'>Spring Boot</span>
                <span className='label'>JDBC</span>
                <span className='label'>MySql</span>
                <span className='label'>Stripe</span>
                <span className='label'>Okta</span>
                <span className='label'>HTML</span>
                <span className='label'>SCSS</span>
                <span className='label'>Bootstrap</span>
              </div>
              <Link className='btn btn-dark btn-lg' to='/restaurant'>
                Check it out
              </Link>
            </div>
          </div>
          <div className='col-sm-6 col-md-6'>
            <div className='col-image-restaurant'></div>
          </div>
        </div>
      </div>

      {/* Mobile Heros */}
      <div className='d-lg-none'>
        <div className='container'>
          <div className='m-2'>
            {/* <div className='col-image-weather'></div> */}
            <iframe
              className='project-demo'
              src='https://www.youtube.com/embed/FwYHgpzdSTI'
            ></iframe>
            <div className='mt-2'>
              <h1 className='heading-1'>
                Weather Forecast <i className='text-3'>by Open Weather</i>
              </h1>
              <p className='lead text-1'>
                This app is using the free API provided by Open Weather. It
                allows user to query the upcoming 5 days weather forecast by
                entering a city name. User can also check the weather details by
                clicking on a specific day.
              </p>
              <div className='label__container'>
                <span className='label'>JavaScript</span>
                <span className='label'>React</span>
                <span className='label'>HTML</span>
                <span className='label'>SCSS</span>
              </div>
              <Link className='btn btn-dark btn-md' to='/weather'>
                Check it out
              </Link>
            </div>
          </div>
          <div className='m-2'>
            <div className='col-image-library'></div>
            <div className='mt-2'>
              <h1 className='heading-1'>Library</h1>
              <p className='lead text-1'>
                <span className='text-3 u-block u-margin-bottom-sm'>
                  Udemy Course: Full Stack: React and Java Spring Boot - The
                  Developer
                </span>
                This is the application that I have built by following along the
                course. It gave me an example of how to build a complete
                application.
              </p>
              <Link
                type='button'
                className='btn btn-dark btn-md'
                to='/restaurant'
              >
                Check it out
              </Link>
            </div>
          </div>
          <div className='m-2'>
            <div className='col-image-restaurant'></div>
            <div className='mt-2'>
              <h1 className='heading-1'>Restaurant</h1>
              <p className='lead text-1'>
                I built this application to utilize and pratice all the skills
                that I have leant. The menu is connected to the database using
                JDBC. You can try to login as an Admin and test it out! (You
                will see the login credential when you on the login page)
              </p>
              <Link className='btn btn-dark btn-md' to='/restaurant'>
                Check it out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
