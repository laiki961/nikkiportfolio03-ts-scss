import React from "react";
import { useState, useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import { config } from "../../../lib/config";

const WeatherContext = React.createContext({
  onFetch: (city) => {},
  forecasts: [],
  isLoading: null,
  error: null,
});

export const WeatherContextProvider = (props) => {
  const [city, setCity] = useState(null);
  const [forecasts, setForecasts] = useState([]);

  const {
    isLoading: isFetchingData,
    error,
    sendRequest: fetchWeather,
    resetErrorHandler,
  } = useHttp();
  const apiKey = config.OpenWeatherApiKey;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const convertForecastData = (responseDataObj) => {
    const loadedWeatherForecast = [];
    const location = {
      city: responseDataObj.city.name,
      country: responseDataObj.city.country,
    };
    for (const key in responseDataObj.list) {
      loadedWeatherForecast.push({
        id: key,
        unix_timeStamp: responseDataObj.list[key].dt,
        icon: responseDataObj.list[key].weather[0].icon,
        details: {
          description: responseDataObj.list[key].weather[0].description,
          minTemp: responseDataObj.list[key].main.temp_min,
          maxTemp: responseDataObj.list[key].main.temp_max,
          humidity: responseDataObj.list[key].main.humidity,
        },
      });
    }
    // //
    let filteredForecasts = [];
    const forecastsCopy = [];
    const todayDate = new Date(); //Sat Jan 14 2023 14:49:09 GMT-0500 (Eastern Standard Time)
    const dd = String(todayDate.getDate()).padStart(2, "0");

    for (const key in loadedWeatherForecast) {
      const unix_timeStamp_ms =
        +loadedWeatherForecast[key].unix_timeStamp * 1000;
      const date = new Date(unix_timeStamp_ms);
      const formattedDate = date.getDate(unix_timeStamp_ms);
      const formattedMonth = monthNames[date.getMonth()];
      const formattedDay = dayNames[date.getUTCDay()];
      const formattedIcon = `http://openweathermap.org/img/wn/${loadedWeatherForecast[key].icon}@2x.png`;

      forecastsCopy.push({
        id: loadedWeatherForecast[key].id,
        iconUrl: formattedIcon,
        formattedDate: {
          date: formattedDate,
          month: formattedMonth,
          day: formattedDay,
        },
        details: {
          description: loadedWeatherForecast[key].details.description,
          minTemp: loadedWeatherForecast[key].details.minTemp,
          maxTemp: loadedWeatherForecast[key].details.maxTemp,
          humidity: loadedWeatherForecast[key].details.humidity,
        },
      });

      filteredForecasts = forecastsCopy
        .filter((item) => item.formattedDate.date > +dd)
        .filter(
          (value, index, array) =>
            array
              .map((item) => item.formattedDate.date)
              .indexOf(value.formattedDate.date) === index
        );
    }
    setForecasts([location, filteredForecasts]);
  };

  useEffect(() => {
    city &&
      fetchWeather(
        {
          url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
        },
        convertForecastData
      );
  }, [city, fetchWeather]);

  const setCityValue = (city) => {
    setCity(city);
  };

  const weatherContext = {
    onFetch: setCityValue,
    forecasts,
    isLoading: isFetchingData,
    resetErrorHandler,
    error,
  };

  return (
    <WeatherContext.Provider value={weatherContext}>
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
