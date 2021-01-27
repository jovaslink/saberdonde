import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; //elementos para los componentes
import { useDispatch, useSelector } from "react-redux";
import {
  newSubscription,
  startSubscriptionAuth,
  isRetrySubscription,
  retryInvoiceWithNewPaymentMethod,
  subscriptionAuth,
} from "../../../actions/subscriptionActions";
import { startLoading, finishLoading } from "../../../actions/uiActions";

export const CheckOutForm = () => {
  const dispatch = useDispatch();
  const { subscription, ui } = useSelector((state) => state);
  const { loading } = ui;
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (subscription.payment === "requires_action") {
      Swal.fire({
        title: "Validando...",
        text: "Casi terminamos...",
        allowOutsideClick: false,
        showConfirmButton: false,

        willOpen: () => {
          Swal.showLoading();
        },
      });
      stripe
        .confirmCardPayment(subscription.client_secret, {
          payment_method: subscription.idPaymentMethod,
        })
        .then((result) => {
          if (result.error) {
            Swal.close();

            Swal.fire("ERROR", result.error.message, "error");
            dispatch(finishLoading());

            dispatch(
              subscriptionAuth("requires_payment_method", "open", "incomplete")
            );

            //throw result;
          } else {
            if (result.paymentIntent.status === "succeeded") {
              // Show a success message to your customer.
              dispatch(startSubscriptionAuth());
              Swal.close();
              Swal.fire("Éxito", "Método de pago aceptado", "success");
              dispatch(isRetrySubscription(false));
              dispatch(finishLoading());
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [
    subscription.payment,
    stripe,
    subscription.client_secret,
    subscription.idPaymentMethod,
    dispatch,
  ]);

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        color: "#000",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "18px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#000" },
        "::placeholder": { color: "#000" },
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startLoading());
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      //console.log("[error]", error);
      Swal.fire("ERROR", error.message, "error");
      dispatch(finishLoading());
    } else {
      if (subscription.isRetry === false) {
        //enviar paymethod a dispatch newSuscription
        dispatch(newSubscription(paymentMethod));
      } else {
        //enviar paymethod a dispatch newSuscription

        dispatch(
          retryInvoiceWithNewPaymentMethod(
            subscription.idCustomer,
            paymentMethod.id,
            subscription.idInvoice
          )
        );
      }
    }
  };
  const handleRetryFalse = () => {
    dispatch(isRetrySubscription(false));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="form-control form-control-border"
          options={CARD_OPTIONS}
        />
        <label htmlFor="exampleInputBorder"></label>
        <div className="card-footer">
          {subscription.isRetry === true ? (
            <button
              className="btn btn-danger mx-2"
              disabled={!stripe || loading}
              onClick={handleRetryFalse}
            >
              Cancelar
            </button>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="btn btn-success"
            disabled={!stripe || loading}
          >
            Suscribirse
          </button>
        </div>
      </form>
    </>
  );
};
