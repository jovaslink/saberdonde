import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js"; //conexion con stripe
import { Elements } from "@stripe/react-stripe-js"; //elementos para los componentes
import { CheckOutForm } from "./CheckOutForm";

export const SuscriptionForm = () => {
  // const stripePromise = loadStripe(
  //   "pk_test_2eIAwJetfh5E7BlS3NEEvQup00epa2fCb5"

  // );

  const [stripePromise] = useState(() =>
    loadStripe("pk_test_2eIAwJetfh5E7BlS3NEEvQup00epa2fCb5")
  );

  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm />
    </Elements>
  );
};
