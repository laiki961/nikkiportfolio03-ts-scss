import classes from "./Forecasts.module.css";
import ForecastWeather from "../ForecastWeather";
import WeatherContext from "../store/weather-context";
import Loading from "../../../components/Loading/Loading";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Forecasts = () => {
  const { forecasts, isLoading, error } = useContext(WeatherContext);
  const navigate = useNavigate();

  useEffect(() => {}, [forecasts]);

  let content = <Loading />;
  console.log(`isLoading: ${isLoading}`);
  if (forecasts.length > 0) {
    content = (
      <div id={classes["forecast-container"]}>
        <div className={classes["forecast-city"]}>
          {forecasts[0].city}, {forecasts[0].country}
        </div>
        <div className={classes["weather-forecast-5days"]}>
          {forecasts[1].map((forecast) => (
            <ForecastWeather
              key={forecast.id}
              city={forecasts[0].city}
              country={forecasts[0].country}
              icon={forecast.iconUrl}
              formattedDate={forecast.formattedDate}
              details={forecast.details}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <section id={classes.forecasts}>
      {error ? navigate("/weather") : isLoading ? <Loading /> : content}
    </section>
  );
};

export default Forecasts;
