import React from "react";
import { useState, useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import { config } from "../../../lib/config";

const WeatherContext = React.createContext({
  onFetch: (city) => {},
  enteredCityInUrl: false,
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

    let filteredForecasts = [];
    const todayDate = new Date(); //Sat Jan 14 2023 14:49:09 GMT-0500 (Eastern Standard Time)
    const forecastDays = 5;
    const targetDateTimeStamp = todayDate.setDate(
      todayDate.getDate() + forecastDays
    ); //1680639107329

    for (const key in loadedWeatherForecast) {
      const unix_timeStamp_ms =
        +loadedWeatherForecast[key].unix_timeStamp * 1000;
      const date = new Date(unix_timeStamp_ms);
      const formattedIcon = `http://openweathermap.org/img/wn/${loadedWeatherForecast[key].icon}@2x.png`;

      if (targetDateTimeStamp > unix_timeStamp_ms) {
        filteredForecasts.push({
          id: loadedWeatherForecast[key].id,
          iconUrl: formattedIcon,
          formattedDate: {
            date: date.getDate(unix_timeStamp_ms),
            month: monthNames[date.getMonth()],
            day: dayNames[date.getUTCDay()],
          },
          details: {
            description: loadedWeatherForecast[key].details.description,
            minTemp: loadedWeatherForecast[key].details.minTemp,
            maxTemp: loadedWeatherForecast[key].details.maxTemp,
            humidity: loadedWeatherForecast[key].details.humidity,
          },
        });
      }
    }

    const uniqueDates = {};
    filteredForecasts = filteredForecasts.filter((item) => {
      if (!uniqueDates[item.formattedDate.date]) {
        uniqueDates[item.formattedDate.date] = true;
        return true;
      }
      return false;
    });
    setForecasts([location, filteredForecasts]);
  };

  useEffect(() => {
    const enteredCity = window.location.pathname.split("/")[2];
    if (enteredCity !== undefined) {
      setCity(enteredCity);
    }

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
