import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { DashboardScreen } from "../components/dashboard/DashboardScreen";
import { SuscriptionScreen } from "../components/dashboard/SuscriptionScreen";
import { AyudaScreen } from "../components/dashboard/AyudaScreen";

export const DashboardRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={DashboardScreen} />
        <Route exact path="/suscripcion" component={SuscriptionScreen} />
        <Route exact path="/ayuda" component={AyudaScreen} />

        <Redirect to="dashboard" />
      </Switch>{" "}
    </>
  );
};
