import { useOktaAuth } from "@okta/okta-react";
import { Navigate } from "react-router-dom";
import { CardElement } from "@stripe/react-stripe-js";
import Loading from "../../../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentInfoRequest } from "../../domain/dto/RequestDto";
import useInput from "../../../../hooks/use-input";
import useCart from "../../../../hooks/useCart";

const Checkout: React.FC<{}> = () => {
  const { authState } = useOktaAuth();
  const { totalPrice } = useCart();

  // const [httpError, setHttpError] = useState(false);
  // const [submitDisable, setSubmitDisable] = useState(false);
  // const [fees, setFees] = useState(0);
  // const [loadingFees, setLoadingFees] = useState(false);

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
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

  const resetAllInputs = () => {
    resetFirstNameInput();
    resetLastNameInput();
    resetContactInput();
    resetEmailInput();
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Clicked Submit`);

    //if success

    //if failed

    // resetAllInputs();
  };

  // useEffect(() => {
  //   const fetchFees = async () => {
  //     if (authState && authState.isAuthenticated) {
  //       const url = `${process.env.REACT_APP_RESTAURANT_API}/paymentEntities/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}`;
  //       const requestOptions = {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       };
  //       const paymentResponse = await fetch(url, requestOptions);
  //       if (!paymentResponse.ok) {
  //         throw new Error("Something went wrong!");
  //       }
  //       const paymentResponseJson = await paymentResponse.json();
  //       setFees(paymentResponseJson.amount);
  //       setLoadingFees(false);
  //     }
  //   };
  //   fetchFees().catch((error: any) => {
  //     setLoadingFees(false);
  //     setHttpError(error.message);
  //   });
  // }, [authState]);

  // const elements = useElements();
  // const stripe = useStripe();

  // async function checkout(e: React.FormEvent) {
  //   e.preventDefault();
  //   if (!stripe || !elements || !elements.getElement(CardElement)) {
  //     return;
  //   }
  //   setSubmitDisable(true);
  //   let paymentInfo = new PaymentInfoRequest(
  //     Math.round(fees * 100),
  //     "USD",
  //     authState?.accessToken?.claims.sub
  //   );

  //   const url = `${process.env.REACT_APP_RESTAURANT_API}/payment/secure/payment-intent`;
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(paymentInfo),
  //   };
  //   const stripeResponse = await fetch(url, requestOptions);
  //   if (!stripeResponse.ok) {
  //     setHttpError(true);
  //     setSubmitDisable(false);
  //     throw new Error("Something went wrong");
  //   }
  //   const stripeResponseJson = await stripeResponse.json();

  //   stripe
  //     .confirmCardPayment(
  //       stripeResponseJson.client_secret,
  //       {
  //         payment_method: {
  //           card: elements.getElement(CardElement)!,
  //           billing_details: {
  //             email: authState?.accessToken?.claims.sub,
  //           },
  //         },
  //       },
  //       { handleActions: false }
  //     )
  //     .then(async function (result: any) {
  //       if (result.error) {
  //         setSubmitDisable(false);
  //         alert("There was an error");
  //       } else {
  //         const url = `${process.env.REACT_APP_RESTAURANT_API}/payment/secure/payment-complete`;
  //         const requestOptions = {
  //           method: "PUT",
  //           headers: {
  //             Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
  //             "Content-Type": "application/json",
  //           },
  //         };
  //         const stripeResponse = await fetch(url, requestOptions);
  //         if (!stripeResponse.ok) {
  //           setHttpError(true);
  //           setSubmitDisable(false);
  //           throw new Error("Something went wrong");
  //         }
  //         setFees(0);
  //         setSubmitDisable(false);
  //       }
  //     });
  //   setHttpError(false);
  // }

  // if (loadingFees) {
  //   return <Loading />;
  // }

  // if (httpError) {
  //   <div className='container my-5 min-vh-100'>
  //     <p>{httpError}</p>
  //   </div>;
  // }

  return authState?.isAuthenticated ? (
    <section className='restaurant-checkout container text-2 min-vh-100'>
      <form>
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
              type='text'
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
          <div className='form-group checkout-price'>{totalPrice}</div>
          <div className='form-button'>
            <button
              type='submit'
              className='restaurant-btn'
              // disabled={submitDisable}
            >
              Place Order
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
