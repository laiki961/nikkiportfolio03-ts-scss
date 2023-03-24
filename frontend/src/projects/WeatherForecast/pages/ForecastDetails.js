import React, { useState } from "react";
import WeatherDetailsModal from "./DetailsModal";

const ForcastWeather = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const onClickedDetails = (e) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };

  return (
    <div className='weather__forecast-day'>
      <button className='weather__icon' onClick={onClickedDetails}>
        <img src={props.icon} alt='weathericon' />
        <p>
          {props.formattedDate.day}, {props.formattedDate.month}{" "}
          {props.formattedDate.date}
        </p>
      </button>

      {showDetails && (
        <WeatherDetailsModal
          city={props.city}
          country={props.country}
          icon={props.icon}
          formattedDate={props.formattedDate}
          details={props.details}
          onClose={onClickedDetails}
        />
      )}
    </div>
  );
};

export default ForcastWeather;
