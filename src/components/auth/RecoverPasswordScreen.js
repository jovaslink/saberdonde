import React from "react";
import { NavLink } from "react-router-dom";

export const RecoverPasswordScreen = () => {
  return (
    <div className="login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <div className="h1">
              <b>Saber</b>Donde
            </div>
          </div>
          <div className="card-body">
            <p className="login-box-msg">
              ¿Olvidaste tu contraseña? Aquí puedes recuperarla facilmente.
            </p>
            <form action="recover-password.html" method="post">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Recuperar mi contraseña
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
            <p className="mt-3 mb-1">
              <NavLink to="/auth/login">Login</NavLink>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
      {/* /.login-box */}
    </div>
  );
};
