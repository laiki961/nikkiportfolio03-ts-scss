import { useOktaAuth } from "@okta/okta-react";
import { Navigate, useNavigate } from "react-router-dom";
import { CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentInfoRequest } from "../../domain/dto/RequestDto";
import useInput from "../../../../hooks/use-input";
import useCart from "../../../../hooks/useCart";

const Checkout: React.FC<{}> = () => {
  const { dispatch, REDUCER_ACTIONS } = useCart();
  const { authState } = useOktaAuth();
  const navigate = useNavigate();

  const totalPriceConverted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  }).format(Number(localStorage.getItem("cartTotalPrice")));

  const [httpError, setHttpError] = useState<boolean>(false);
  const [submitDisable, setSubmitDisable] = useState<boolean>(false);
  const [transactionCompleted, setTransactionCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    if (transactionCompleted) {
      dispatch({ type: REDUCER_ACTIONS.COMPLETED });
      navigate("/restaurant/payment-completed");
    }
  }, [transactionCompleted]);

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    // reset: resetFirstNameInput,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: enteredContact,
    isValid: enteredContactIsValid,
    hasError: contactInputHasError,
    valueChangeHandler: contactChangedHandler,
    inputBlurHandler: contactBlurHandler,
  } = useInput((value: string) =>
    /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(value)
  );

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value: string) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
  );

  let formIsValid = false;
  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredContactIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const firstNameInputClasses = firstNameInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  const lastNameInputClasses = lastNameInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  const contactInputClasses = contactInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  const emailInputClasses = emailInputHasError
    ? "restaurant__form-control invalid"
    : "restaurant__form-control";

  const elements = useElements();
  const stripe = useStripe();

  async function checkout(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || !elements.getElement(CardElement)) {
      return;
    }
    setSubmitDisable(true);
    let paymentInfo = new PaymentInfoRequest(
      Number(localStorage.getItem("cartTotalPrice")) * 100,
      "CAD",
      authState?.accessToken?.claims.sub
    );
    console.log(paymentInfo);
    const url = `${process.env.REACT_APP_RESTAURANT_API}/payment/secure/payment-intent`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentInfo),
    };
    const stripeResponse = await fetch(url, requestOptions);
    if (!stripeResponse.ok) {
      setHttpError(true);
      setSubmitDisable(false);
      throw new Error("Something went wrong");
    }
    const stripeResponseJson = await stripeResponse.json();

    stripe
      .confirmCardPayment(
        stripeResponseJson.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              email: authState?.accessToken?.claims.sub,
            },
          },
        },
        { handleActions: false }
      )
      .then(async function (result: any) {
        if (result.error) {
          setSubmitDisable(false);
          alert("There was an error");
        } else {
          const url = `${process.env.REACT_APP_RESTAURANT_API}/payment/secure/payment-complete`;
          const requestOptions = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
          };
          const stripeResponse = await fetch(url, requestOptions);
          if (!stripeResponse.ok) {
            setHttpError(true);
            setSubmitDisable(false);
            throw new Error("Something went wrong");
          }
          setTransactionCompleted(true);
          setSubmitDisable(false);
        }
      });
    setHttpError(false);
  }

  if (httpError) {
    <div className='container my-5 min-vh-100'>
      <p>{httpError}</p>
    </div>;
  }

  return authState?.isAuthenticated ? (
    <section className='restaurant-checkout container'>
      <form onSubmit={checkout}>
        <div className='restaurant-checkout__user-info'>
          <div className='restaurant-checkout__title'>Contact Information</div>
          <div className={`form-group ${firstNameInputClasses}`}>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              placeholder='First Name'
              onChange={firstNameChangedHandler}
              onBlur={firstNameBlurHandler}
              value={enteredFirstName}
            ></input>
            {firstNameInputHasError && (
              <div className='error-text'>Name must not be empty.</div>
            )}
          </div>
          <div className={`form-group ${lastNameInputClasses}`}>
            <label htmlFor='firstName'>Last Name</label>
            <input
              type='text'
              placeholder='Last Name'
              onChange={lastNameChangedHandler}
              onBlur={lastNameBlurHandler}
              value={enteredLastName}
            ></input>
            {lastNameInputHasError && (
              <div className='error-text'>Name must not be empty.</div>
            )}
          </div>
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
              <div className='error-text'>
                Please enter a valid phone number.
              </div>
            )}
          </div>
          <div className={`form-group ${emailInputClasses}`}>
            <label htmlFor='email'>Email Address</label>
            <input
              type='text'
              placeholder='Email Address'
              onChange={emailChangedHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
            ></input>
            {emailInputHasError && (
              <div className='error-text'>Please enter a valid email.</div>
            )}
          </div>
          {/* <hr className='solid' />
          <div className='restaurant-checkout__title'>
            Prefered Delivery Date & Time
          </div>
          <div className='form-group'>
            <label htmlFor='date'>Date</label>
            <input type='date'></input>
          </div>
          <div className='form-group'>
            <label htmlFor='date'>Time</label>
            <input type='time'></input>
          </div> */}
          <hr className='solid' />
          <div className='restaurant-checkout__title'>Payment Details</div>
          <div className='form-group'>
            <label htmlFor='card'>Card</label>
            <CardElement id='card-element' />
          </div>
          <hr className='solid' />
          {totalPriceConverted && (
            <div className='form-group checkout-price'>
              {totalPriceConverted}
            </div>
          )}
          <div className='form-button'>
            <button
              type='submit'
              className='restaurant-btn'
              disabled={!formIsValid || submitDisable}
            >
              {submitDisable === true ? "Loading..." : "Place Order"}
            </button>
          </div>
        </div>
      </form>
    </section>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Checkout;
