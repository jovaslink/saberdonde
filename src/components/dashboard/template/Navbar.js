import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { StartLogout } from "../../../actions/authActions";

export const Navbar = () => {
  const dispatch = useDispatch();
  const handlerOnclick = () => {
    dispatch(StartLogout());
  };
  return (
    <>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <div
              className="nav-link"
              data-widget="pushmenu"
              to="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </div>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link className="nav-link" to="/ayuda">
              ¿Necesitas ayuda?
            </Link>
          </li>
        </ul>

        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <>
            {/* Notifications Dropdown Menu */}
            <li className="nav-item dropdown">
              <div className="nav-link" data-toggle="dropdown" to="#">
                <i className="fas fa-user" />
              </div>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">Usuario</span>
                <div className="dropdown-divider" />
                <Link to="#" className="dropdown-item">
                  <i className="fas fa-envelope mr-2" /> Perfil
                </Link>
                <div className="dropdown-divider" />
                <Link to="#" className="dropdown-item">
                  <i className="fas fa-users mr-2" /> Configuracion
                </Link>

                <div className="dropdown-divider" />
                <button
                  onClick={handlerOnclick}
                  className="dropdown-item dropdown-footer"
                >
                  Cerrar sesión
                </button>
              </div>
            </li>
          </>

          <li className="nav-item">
            <div
              className="nav-link"
              data-widget="fullscreen"
              to="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </div>
          </li>
        </ul>
      </nav>
      {/* /.navbar */}
    </>
  );
};
