import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useInput from "../../../../hooks/use-input";
import { ReservationInfoRequestDto } from "../../domain/dto/backend-dto";
import { makeReservation } from "../../Store/reservationSlice";
import { useAppDispatch, useAppSelector } from "../../Store/store";

const Reservation = () => {
  const { bookings, status, error } = useAppSelector(
    (state) => state.reservation
  );
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>("");

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: enteredPersons,
    isValid: enteredPersonsIsValid,
    hasError: personsInputHasError,
    valueChangeHandler: personsChangedHandler,
    inputBlurHandler: personsBlurHandler,
    reset: resetPersonsInput,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: enteredContact,
    isValid: enteredContactIsValid,
    hasError: contactInputHasError,
    valueChangeHandler: contactChangedHandler,
    inputBlurHandler: contactBlurHandler,
    reset: resetContactInput,
  } = useInput((value: string) =>
    /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(value)
  );

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value: string) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
  );

  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangedHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: enteredTime,
    isValid: enteredTimeIsValid,
    hasError: timeInputHasError,
    valueChangeHandler: timeChangedHandler,
    inputBlurHandler: timeBlurHandler,
    reset: resetTimeInput,
  } = useInput((value: string) => value.trim() !== "");

  const resetAllInputs = () => {
    resetNameInput();
    resetPersonsInput();
    resetContactInput();
    resetEmailInput();
    resetDateInput();
    resetTimeInput();
  };

  function convertPhoneNumber(phoneNumber: string) {
    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, "");
    // Use regex to match the digits to the US format
    const regex = /^(\d{3})(\d{3})(\d{4})$/;
    const match = digits.match(regex);
    // If there is a match, format the phone number
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    // Otherwise, return the original phone number
    return phoneNumber;
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Clicked Submit`);

    const reservationInfoRequestDto: ReservationInfoRequestDto = {
      name: enteredName,
      contact: convertPhoneNumber(enteredContact),
      email: enteredEmail,
      date: enteredDate,
      time: enteredTime,
      persons: enteredPersons,
    };
    console.log(reservationInfoRequestDto);
    dispatch(makeReservation(reservationInfoRequestDto));
    if (status === "succeeded") {
      resetAllInputs();
      setMessage(
        "We have received your booking information! Can't wait to see you!"
      );
    }
    if (error !== null) {
      setMessage(error);
    }
  };

  const nameInputClasses = nameInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  const personsInputClasses = personsInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  const contactInputClasses = contactInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  const emailInputClasses = emailInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  const dateInputClasses = dateInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  const timeInputClasses = timeInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredPersonsIsValid &&
    enteredContactIsValid &&
    enteredEmailIsValid &&
    enteredDateIsValid &&
    enteredTimeIsValid
  ) {
    formIsValid = true;
  }

  return (
    <section className='restaurant-reservation container'>
      {/* <Row> */}
      <div className='restaurant-reservation__img'>
        {/* <Col className='restaurant-reservation__right'> */}
        <img
          src={require("../../images/reservation.jpeg")}
          className='reservation-img'
        ></img>
        {/* <Calendar /> */}
        {/* </Col> */}
      </div>
      {/* <Col lg={7} className='restaurant-reservation__left'> */}
      <div className='restaurant-reservation__form-container'>
        <div className='restaurant-reservation__title'>
          Make a reservation online
        </div>
        <form onSubmit={submitHandler} className='restaurant-reservation__form'>
          <Row>
            <Col>
              <div className={`form-group ${nameInputClasses}`}>
                <label htmlFor='Name'>Name</label>
                <input
                  type='text'
                  placeholder='Name'
                  onChange={nameChangedHandler}
                  onBlur={nameBlurHandler}
                  value={enteredName}
                ></input>
                {nameInputHasError && (
                  <div className='error-text'>Name must not be empty.</div>
                )}
              </div>
            </Col>
            <Col>
              <div className={`form-group ${personsInputClasses}`}>
                <label htmlFor='person'>No. of person(s)</label>
                <input
                  type='number'
                  placeholder='No. of person(s)'
                  onChange={personsChangedHandler}
                  onBlur={personsBlurHandler}
                  value={enteredPersons}
                ></input>
                {personsInputHasError && (
                  <div className='error-text'>
                    Please enter a number greater than 0.
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <div className={`form-group ${contactInputClasses}`}>
            <label htmlFor='contact'>Contact Number</label>
            <input
              type='number'
              placeholder='Contact Number'
              onChange={contactChangedHandler}
              onBlur={contactBlurHandler}
              value={enteredContact}
            ></input>
            {contactInputHasError && (
              <div className='error-text'>Please enter a valid contact no.</div>
            )}
          </div>
          <div className={`form-group ${emailInputClasses}`}>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              placeholder='Email address'
              onChange={emailChangedHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
            ></input>
            {emailInputHasError && (
              <div className='error-text'>Please enter an valid email.</div>
            )}
          </div>
          <Row>
            <Col>
              <div className={`form-group ${dateInputClasses}`}>
                <label htmlFor='date'>Date</label>
                <input
                  type='date'
                  placeholder='Date'
                  onChange={dateChangedHandler}
                  onBlur={dateBlurHandler}
                  value={enteredDate}
                ></input>
                {dateInputHasError && (
                  <div className='error-text'>Please select a future date.</div>
                )}
              </div>
            </Col>
            <Col>
              <div className={`form-group ${timeInputClasses}`}>
                <label htmlFor='time'>Time</label>
                <input
                  type='time'
                  placeholder='time'
                  onChange={timeChangedHandler}
                  onBlur={timeBlurHandler}
                  value={enteredTime}
                ></input>
                {timeInputHasError && (
                  <div className='error-text'>
                    Our opening hours is between 10am - 10pm.
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <div className='form-button'>
            <span className={`form-group`}>{message}</span>
            <button className='restaurant-btn' disabled={!formIsValid}>
              Book a table
            </button>
          </div>
        </form>
      </div>
      {/* </Col> */}
      {/* </Row> */}
    </section>
  );
};

export default Reservation;
