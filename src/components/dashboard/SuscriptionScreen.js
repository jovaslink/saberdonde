import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "./template/Navbar";
import { Sidebar } from "./template/Sidebar";
import { Footer } from "./template/Footer";
import { SuscriptionForm } from "./stripeForm/SuscriptionForm";
import {
  isRetrySubscription,
  startRetrieveCustomerPaymentMethod,
} from "../../actions/subscriptionActions";

export const SuscriptionScreen = () => {
  const { payment, isRetry, brand, last4 } = useSelector(
    (state) => state.subscription
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (payment === "succeeded" && isRetry === false) {
      dispatch(startRetrieveCustomerPaymentMethod());
    }
  }, [payment, isRetry, dispatch]);

  const handleRetryTrue = () => {
    dispatch(isRetrySubscription(true));
  };
  return (
    <div>
      <Navbar />
      <Sidebar />
      <>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Mi suscripción</h1>
                </div>
              </div>
            </div>
          </section>

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {payment === "succeeded" && isRetry === false ? (
                  <div className="col-md-12">
                    <div className="card card-primary">
                      <div className="card-body">
                        <h4>Método de pago elegído.</h4>

                        <label htmlFor="exampleInputBorder"></label>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="icon-input">
                              <i
                                className={
                                  brand === "visa"
                                    ? "fab fa-cc-visa"
                                    : brand === "mastercard"
                                    ? "fab fa-cc-mastercard"
                                    : brand === "amex"
                                    ? "fab fa-cc-amex"
                                    : "far fa-credit-card"
                                }
                              />
                            </span>
                            <input
                              type="text"
                              className="form-control form-control-border"
                              id="exampleInputBorder"
                              placeholder="Terminacion"
                              disabled={true}
                              value={last4}
                            />
                          </div>

                          <label htmlFor="exampleInputBorder"></label>
                          <div className="card-footer">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={handleRetryTrue}
                            >
                              Actualizar método de pago
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-md-12">
                    <div className="card card-primary">
                      {isRetry ? (
                        <div className="card-body">
                          <div className="alert alert-warning alert-dismissible">
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-hidden="true"
                            >
                              &times;
                            </button>
                            <h5>
                              <i className="icon fas fa-exclamation-triangle"></i>{" "}
                              Seleccione un metodo de pago!
                            </h5>
                            Por favor intente de nuevo o introduzca otra
                            tarjeta.
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="card-body">
                        <h4>
                          Ingrese los datos de su tarjeta de crédito o débito.
                        </h4>

                        <label htmlFor="exampleInputBorder"></label>
                        <div className="form-group">
                          <SuscriptionForm />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </>

      <Footer />
    </div>
  );
};
