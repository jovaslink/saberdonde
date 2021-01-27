import { types } from "../types/types";
const initialState = {
  payment: "tu mama",
  invoice: "",
  subscription: "",
  client_secret: "",
  idPaymentMethod: "",
  idCustomer: "",
  idSubscription: "",
  idInvoice: "",
  idProduct: "",
  last4: "",
  brand: "Pedro",
  isRetry: false,
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.subscription:
      return {
        ...state,
        ...action.payload,
      };

    // case types.subscription:
    //   return {
    //     ...state,
    //     payment: action.payload.paymentIntentStatus,
    //     invoice: action.payload.invoiceStatus,
    //     subscription: action.payload.subscriptionStatus,
    //     client_secret: action.payload.client_secret,
    //     idPaymentMethod: action.payload.idPaymentMethod,
    //     idCustomer: action.payload.idCustomer,
    //     idSubscription: action.payload.idSubscription,
    //     idInvoice: action.payload.idInvoice,
    //     idProduct: action.payload.idProduct,
    //   };

    case types.subscriptionAuth:
      return {
        ...state,
        payment: action.payload.paymentIntentStatus,
        invoice: action.payload.invoiceStatus,
        subscription: action.payload.subscriptionStatus,
        idPaymentMethod: action.payload.idPaymentMethod,
      };

    case types.isRetrySubscription:
      return {
        ...state,
        isRetry: action.payload.isRetry,
      };

    case types.subscriptionBrandLast4:
      return {
        ...state,
        last4: action.payload.last4,
        brand: action.payload.brand,
      };

    case types.subscriptionOut:
      return state;

    default:
      return state;
  }
};
