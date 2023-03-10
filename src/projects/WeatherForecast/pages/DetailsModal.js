import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "../../../components/Card/Card";
import classes from "./DetailsModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const WeatherDetailsModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <section className={classes["weather-details-page"]}>
        <div>
          <h3 className={classes.city}>
            {props.city},{props.country}
          </h3>
        </div>
        <div>
          <img src={props.icon} alt='weathericon' />
          <p>{` ${props.formattedDate.day}, ${props.formattedDate.month} ${props.formattedDate.date}`}</p>
        </div>
        <div className={classes["weather-details"]}>
          <p>{props.details.description}</p>
          <p>{`Min Temp: ${props.details.minTemp}°C`}</p>
          <p>{`Max Temp: ${props.details.maxTemp}°C`}</p>
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
