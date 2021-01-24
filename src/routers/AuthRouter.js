import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { RecoverPasswordScreen } from "../components/auth/RecoverPasswordScreen";

export const AuthRouter = () => {
  return (
    <div>
      <div>
        <Switch>
          <Route exact path="/auth/login" component={LoginScreen} />
          <Route exact path="/auth/register" component={RegisterScreen} />
          <Route exact path="/auth/recover" component={RecoverPasswordScreen} />

          <Redirect to="login" />
        </Switch>
      </div>
    </div>
  );
};
