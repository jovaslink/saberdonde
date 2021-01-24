import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useForm } from "../../hooks/useForm";
import { loginEmailPassword } from "../../actions/authActions";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [handlerInputForm, stateValues] = useForm({
    email: "",
    password: "",
  });

  //destructuracion del objeto statevalues, viene del hook useForm
  const { email, password } = stateValues;

  //manejamos el envio del formulario y activamos el dispatch
  const handlerForm = (e) => {
    e.preventDefault();
    //login es una accion declarada en actions auth, regresa type(tipo de accion) y payload(datos a cargar)
    dispatch(loginEmailPassword(email, password));
  };

  //dispatch(login("123456", "jovaslink"));

  return (
    <div className="login-page">
      <div className="login-box">
        {/* /.login-logo */}
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <div className="h1">
              <b>Saber</b>Donde
            </div>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Identifícate para iniciar sesión</p>
            <form onSubmit={handlerForm}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handlerInputForm}
                  name="email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handlerInputForm}
                  name="password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                {/* /.col */}
                <div className="col-12 social-auth-links text-center mt-2 mb-3">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>

            {/* /.social-auth-links */}
            <p className="mb-1">
              <NavLink exact to="/auth/recover">
                Olvidé mi contraseña
              </NavLink>
            </p>
            <p className="mb-0">
              <NavLink className="text-center" exact to="/auth/register">
                Crear una cuenta
              </NavLink>
            </p>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
      {/* /.login-box */}
    </div>
  );
};
