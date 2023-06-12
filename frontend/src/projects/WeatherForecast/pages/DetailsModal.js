import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "../../../components/Card/Card";

const Backdrop = (props) => {
  return <div className='backdrop' onClick={props.onClose}></div>;
};

const WeatherDetailsModalOverlay = (props) => {
  return (
    <Card className='weather__modal'>
      <section className='weather__details-modal'>
        <div>
          <h3 className='weather__location heading-2 u-margin-tb-sm'>
            {props.city}, {props.country}
          </h3>
          <p>{`${props.formattedDate.day}, ${props.formattedDate.month} ${props.formattedDate.date}`}</p>
        </div>
        <div>
          <img src={props.icon} alt='weathericon' />
        </div>
        <div className='weather__details'>
          <p>{props.details.description}</p>
          <p>{`Min Temp: ${Math.round(props.details.minTemp * 10) / 10}°C`}</p>
          <p>{`Max Temp: ${Math.round(props.details.maxTemp * 10) / 10}°C`}</p>
          <p>{`Humidity: ${props.details.humidity}`}</p>
        </div>
      </section>
    </Card>
  );
};

const portalElement = document.getElementById("backdrop-root");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <WeatherDetailsModalOverlay
          city={props.city}
          country={props.country}
          icon={props.icon}
          formattedDate={props.formattedDate}
          details={props.details}
        />,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
