import React from "react";
import { NavLink } from "react-router-dom";
import validator from "validator";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { newRegister } from "../../actions/authActions";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [handlerInputForm, stateValues] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = stateValues;

  const handlerForm = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(newRegister(name, email, password));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      Swal.fire("ERROR", "El nombre es requerido", "error");

      return false;
    } else if (!validator.isEmail(email)) {
      Swal.fire("ERROR", "Email invalido", "error");

      return false;
    } else if (password.length < 5 || password !== password2) {
      Swal.fire(
        "ERROR",
        "El password no coincide o es menor a 5 caracteres",
        "error"
      );

      return false;
    }

    return true;
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <div className="h1">
              <b>Saber</b>Donde
            </div>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Crear una nueva cuenta</p>
            <form onSubmit={handlerForm}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full name"
                  name="name"
                  value={name}
                  onChange={handlerInputForm}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handlerInputForm}
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
                  name="password"
                  value={password}
                  onChange={handlerInputForm}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype password"
                  name="password2"
                  value={password2}
                  onChange={handlerInputForm}
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
                    Crear cuenta
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>

            <NavLink className="text-center" exact to="/auth/login">
              Ya tengo una cuenta
            </NavLink>
          </div>
          {/* /.form-box */}
        </div>
        {/* /.card */}
      </div>
      {/* /.register-box */}
    </div>
  );
};
