import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import axiosPrivate from "../../redux/axiosPrivate";

const Payment = (props) => {
  const [stripePromise, setStripePromise] = useState(null);

  const getPublishableKey = async () => {
    const { data } = await axiosPrivate.get(`/publishable-key`);
    setStripePromise(loadStripe(data.publishableKey));
  };
  useEffect(() => {
    getPublishableKey();
  }, []);

  return (
    <>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <StripeCheckoutForm {...props} />
        </Elements>
      )}
    </>
  );
};

export default Payment;
