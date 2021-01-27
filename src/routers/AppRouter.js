import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";

import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AuthRouter } from "./AuthRouter";
import { DashboardRouter } from "./DashboardRouter";
import { login } from "../actions/authActions";
import { getSubscriptionDb } from "../actions/subscriptionActions";

export default function AppRouter() {
  //const isLoggedIn = true;
  const dispatch = useDispatch();
  //manejamos el loading general
  const [checking, setCheking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //preguntar a firebase si el usuario esta logeado, si esta logeado enviar datos a state login
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.email));
        setIsLoggedIn(true);
        dispatch(getSubscriptionDb());
      } else {
        setIsLoggedIn(false);
      }
      setCheking(false);
    });
  }, [dispatch, setCheking, setIsLoggedIn]);

  if (checking) {
    return (
      <div className="row m-0 justify-content-center align-items-center vh-100">
        <div className="col-sm-4 ">
          <div className="text-center">
            <div className="spinner-grow text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
          />

          <PrivateRoute
            isAuthenticated={isLoggedIn}
            path="/"
            component={DashboardRouter}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
}
