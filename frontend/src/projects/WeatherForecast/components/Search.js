import { useContext } from "react";
import { useHistory } from "react-router-dom";
import useInput from "../hooks/use-input";
import WeatherContext from "../store/weather-context";
import Button from "../ui/Button";
import Input from "../ui/Input";

const Search = ({ className }) => {
  const { onFetch, error } = useContext(WeatherContext);
  const history = useHistory();

  const isNotEmpty = (value) => value.trim() !== "";
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (cityIsValid) {
    formIsValid = true;
  }

  const cityInputClasses = cityHasError ? "invalid" : "";

  const submitHandler = (e) => {
    e.preventDefault();
    cityBlurHandler();
    if (!formIsValid) {
      history.push("/weather");
    } else {
      onFetch(cityValue);
      if (error) {
        history.push("/weather");
      }
      history.push(`/weather/${cityValue.toLowerCase()}`);
    }
    resetCityInput();
  };

  let errorText = "";
  if (className !== "navbar") {
    if (cityHasError) {
      errorText = <p className='error-text'>City must not be empty.</p>;
    }
    if (error) {
      errorText = (
        <p className='error-text'>
          {error} <br />
          Please enter a valid city.
        </p>
      );
    }
  }

  return (
    <form
      className={`search ${className} ${cityInputClasses} `}
      onSubmit={submitHandler}
    >
      <Input
        type='text'
        id='city'
        onChange={cityChangedHandler}
        onBlur={cityBlurHandler}
        value={cityValue}
      />
      {errorText}
      <Button type='submit'>Get Weather</Button>
    </form>
  );
};

export default Search;
