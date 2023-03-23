import { useOktaAuth } from "@okta/okta-react";
import { Navigate } from "react-router-dom";
import { CardElement } from "@stripe/react-stripe-js";
import Loading from "../../../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import PaymentInfoRequest from "../../domain/dto/PaymentInfoRequest";

const Checkout: React.FC<{}> = () => {
  const { authState } = useOktaAuth();

  const [httpError, setHttpError] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [fees, setFees] = useState(0);
  const [loadingFees, setLoadingFees] = useState(false);

  useEffect(() => {
    const fetchFees = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_RESTAURANT_API}/paymentEntities/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const paymentResponse = await fetch(url, requestOptions);
        if (!paymentResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const paymentResponseJson = await paymentResponse.json();
        setFees(paymentResponseJson.amount);
        setLoadingFees(false);
      }
    };
    fetchFees().catch((error: any) => {
      setLoadingFees(false);
      setHttpError(error.message);
    });
  }, [authState]);

  const elements = useElements();
  const stripe = useStripe();

  async function checkout(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || !elements.getElement(CardElement)) {
      return;
    }
    setSubmitDisable(true);
    let paymentInfo = new PaymentInfoRequest(
      Math.round(fees * 100),
      "USD",
      authState?.accessToken?.claims.sub
    );

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
          setFees(0);
          setSubmitDisable(false);
        }
      });
    setHttpError(false);
  }

  if (loadingFees) {
    return <Loading />;
  }

  if (httpError) {
    <div className='container my-5 min-vh-100'>
      <p>{httpError}</p>
    </div>;
  }

  return authState?.isAuthenticated ? (
    <section className='restaurant-checkout container text-2 min-vh-100'>
      <form onSubmit={checkout}>
        <div className='restaurant-checkout__user-info'>
          <div className='restaurant-checkout__title'>Contact Information</div>
          <div className='restaurant-checkout__form-group'>
            <label htmlFor='firstName'>First Name</label>
            <input type='text' placeholder='First Name'></input>
          </div>
          <div className='restaurant-checkout__form-group'>
            <label htmlFor='firstName'>Last Name</label>
            <input type='text' placeholder='Last Name'></input>
          </div>
          <div className='restaurant-checkout__form-group'>
            <label htmlFor='contact'>Contact Number</label>
            <input type='text' placeholder='Contact Number'></input>
          </div>
          <div className='restaurant-checkout__form-group'>
            <label htmlFor='email'>Email Address</label>
            <input type='text' placeholder='Email Address'></input>
          </div>
          <hr className='solid' />
          <div className='restaurant-checkout__title'>
            Prefered Delivery Date & Time
          </div>
          <div className='restaurant-checkout__form-group'>
            <label htmlFor='date'>Date</label>
            <input type='date'></input>
          </div>
          <div className='restaurant-checkout__form-group'>
            <label htmlFor='date'>Time</label>
            <input type='time'></input>
          </div>
          <hr className='solid' />
          <div className='restaurant-checkout__title'>Payment Details</div>
          <div className='restaurant-checkout__form-group'>
            <label htmlFor='card'>Card</label>
            <CardElement id='card-element' />
          </div>
          <hr className='solid' />
          <div className='restaurant-checkout__form-button'>
            <button
              type='submit'
              className='restaurant-btn'
              disabled={submitDisable}
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </section>
  ) : (
    <Navigate to={"/"} />
  );
};

export default Checkout;
