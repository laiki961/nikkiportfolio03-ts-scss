import ForecastDetails from "./ForecastDetails";
import WeatherContext from "../store/weather-context";
import Loading from "../../../components/Loading/Loading";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Forecast = () => {
  const { forecasts, isLoading, error } = useContext(WeatherContext);
  const history = useHistory();

  useEffect(() => {}, [forecasts]);

  let content = <Loading />;
  if (forecasts.length > 0) {
    content = (
      <div className='weather__forecast-container'>
        <div className='weather__forecast-city'>
          {forecasts[0].city}, {forecasts[0].country}
        </div>
        <div className='weather__forecast-5days'>
          {forecasts[1].map((forecast) => (
            <ForecastDetails
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
    <section className='weather__forecasts'>
      {error ? history.push("/weather") : isLoading ? <Loading /> : content}
    </section>
  );
};

export default Forecast;
