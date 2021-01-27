import axios from "axios";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading } from "./uiActions";

//Actualizamos el state subscription paymentIntentStatus, invoiceStatus, subscriptionStatus
// export const subscription = (
//   paymentIntentStatus,
//   invoiceStatus,
//   subscriptionStatus,
//   client_secret,
//   idPaymentMethod,
//   idCustomer,
//   idSubscription,
//   idInvoice,
//   idProduct
// ) => {
//   return {
//     type: types.subscription,
//     payload: {
//       paymentIntentStatus,
//       invoiceStatus,
//       subscriptionStatus,
//       client_secret,
//       idPaymentMethod,
//       idCustomer,
//       idSubscription,
//       idInvoice,
//       idProduct,
//     },
//   };
// };
export const subscription = (sub) => {
  return {
    type: types.subscription,
    payload: sub,
  };
};

export const isRetrySubscription = (isRetry) => {
  return {
    type: types.isRetrySubscription,
    payload: {
      isRetry,
    },
  };
};

export const subscriptionAuth = (
  paymentIntentStatus,
  invoiceStatus,
  subscriptionStatus,
  idPaymentMethod
) => {
  return {
    type: types.subscriptionAuth,
    payload: {
      paymentIntentStatus,
      invoiceStatus,
      subscriptionStatus,
      idPaymentMethod,
    },
  };
};

export const startSubscriptionAuth = () => {
  return async (dispatch, getState) => {
    const {
      idInvoice,
      idSubscription,
      idPaymentMethod,
    } = getState().subscription;

    const { data: invoice } = await axios.post(
      "http://localhost:3001/api/getinvoice",
      {
        idInvoice,
      }
    );

    const { data: subs } = await axios.post(
      "http://localhost:3001/api/getsubscription",
      {
        idSubscription,
      }
    );

    dispatch(
      subscriptionAuth(
        "succeeded",
        invoice.status,
        subs.status,
        idPaymentMethod
      )
    );
  };
};

//Crear suscripcion Stripe
export const newSubscription = (paymentMethod) => {
  return async (dispatch, getState) => {
    Swal.fire({
      title: "Procesando...",
      text: "Espere un momento...",
      allowOutsideClick: false,
      showConfirmButton: false,

      willOpen: () => {
        Swal.showLoading();
      },
    });

    const { id } = paymentMethod;
    const { email, name } = getState().auth;

    const { data: newSub } = await axios.post(
      "http://localhost:3001/api/sbsubscription",
      {
        id,
        email,
        name,
      }
    );

    const idInvoice = newSub.latest_invoice.id;

    const { data: invoice } = await axios.post(
      "http://localhost:3001/api/getinvoice",
      {
        idInvoice,
      }
    );

    if (newSub.status === "active") {
      const objSub = {
        payment: "succeeded",
        invoice: invoice.status,
        subscription: newSub.status,
        client_secret: null,
        idPaymentMethod: id,
        idCustomer: newSub.customer,
        idSubscription: newSub.id,
        idInvoice: idInvoice,
        idProduct: newSub.items.data[0].price.product,
      };

      dispatch(subscription(objSub));
      Swal.close();
      dispatch(finishLoading());
      Swal.fire("Éxito", "Método de pago aceptado", "success");
      //console.log(newSub.items.data[0].price.product);
    } else {
      /*
       newSub.latest_invoice.payment_intent.status,
          invoice.status,
          newSub.status,
          newSub.latest_invoice.payment_intent.client_secret,
          id,
          newSub.customer,
          newSub.id,
          idInvoice,
          newSub.items.data[0].price.product*/

      const objSub = {
        payment: newSub.latest_invoice.payment_intent.status,
        invoice: invoice.status,
        subscription: newSub.status,
        client_secret: newSub.latest_invoice.payment_intent.client_secret,
        idPaymentMethod: id,
        idCustomer: newSub.customer,
        idSubscription: newSub.id,
        idInvoice: idInvoice,
        idProduct: newSub.items.data[0].price.product,
      };

      dispatch(subscription(objSub));

      if (
        newSub.latest_invoice.payment_intent.status ===
        "requires_payment_method"
      ) {
        Swal.close();
        Swal.fire(
          "ERROR",
          "Hubo un problema con su tarjeta, intente con otra",
          "error"
        );
        dispatch(isRetrySubscription(true));
        dispatch(finishLoading());
      }
    }
  };
};

export const retryInvoiceWithNewPaymentMethod = (
  customerId,
  paymentMethodId,
  invoiceId
) => {
  return (dispatch, getState) => {
    const { idSubscription } = getState().subscription;
    axios
      .post("http://localhost:3001/api/retry-invoice", {
        customerId: customerId,
        paymentMethodId: paymentMethodId,
        invoiceId: invoiceId,
      })
      .then((result) => {
        if (result.error) {
          // The card had an error when trying to attach it to a customer.
          throw result;
        }
        //console.log(result.data);
        axios
          .post("http://localhost:3001/api/getsubscription", {
            idSubscription,
          })
          .then((subs) => {
            //console.log(subs.data.status);
            if (subs.data.status === "active") {
              dispatch(
                subscriptionAuth(
                  "succeeded",
                  "paid",
                  subs.data.status,
                  paymentMethodId
                )
              );
              dispatch(isRetrySubscription(false));
              Swal.fire("Éxito", "Método de pago aceptado", "success");
            } else {
              dispatch(
                subscriptionAuth(
                  "requires_action",
                  "open",
                  subs.data.status,
                  paymentMethodId
                )
              );
            }
          })
          .catch((error) => {
            Swal.fire("ERROR", error.message, "error");
          });

        dispatch(finishLoading());
      });
  };
};

export const startRetrieveCustomerPaymentMethod = () => {
  return async (dispatch, getState) => {
    const { idPaymentMethod: paymentMethodId } = getState().subscription;
    const { data } = await axios.post(
      "http://localhost:3001/api/retrieve-customer-payment-method",
      {
        paymentMethodId,
      }
    );

    dispatch(RetrieveCustomerPaymentMethod(data.card.last4, data.card.brand));
    dispatch(updateSubscriptionDb());
  };
};

export const RetrieveCustomerPaymentMethod = (last4, brand) => {
  return {
    type: types.subscriptionBrandLast4,
    payload: {
      last4,
      brand,
    },
  };
};

export const getSubscriptionDb = () => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;

    db.collection("subscription")
      .where("uid", "==", uid)
      .get()
      .then((snapSubscription) => {
        snapSubscription.forEach((snapHijo) => {
          const objSub = snapHijo.data();
          delete objSub.uid;
          dispatch(subscription(objSub));
        });
      })
      .catch((err) => {
        console.log("ES UN ERROR", err);
      });
  };
};

export const newSubscriptionDb = (uid) => {
  return async () => {
    const newSubscr = {
      uid: uid,
      payment: "",
      invoice: "",
      subscription: "",
      client_secret: "",
      idPaymentMethod: "",
      idCustomer: "",
      idSubscription: "",
      idInvoice: "",
      idProduct: "",
      last4: "",
      brand: "",
      isRetry: false,
    };

    await db.collection("subscription").doc(uid).set(newSubscr);
  };
};

export const updateSubscriptionDb = () => {
  return (dispatch, getState) => {
    const { auth, subscription } = getState();

    db.collection("subscription")
      .doc(auth.uid)
      .update(subscription)
      .then((result) => {})
      .catch((e) => {
        console.log(e);
      });
  };
};
