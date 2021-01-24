import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-sb elevation-4">
        {/* Brand Logo */}

        <Link className="brand-link" to="/dashboard">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="SaberDonde Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Comercios</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="Avatar Comercio"
              />
            </div>
            <div className="info">
              <Link to="/dashboard" className="d-block">
                <div className="desborde">Nombre del comercio</div>
              </Link>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

              <li className="nav-item">
                <NavLink className="nav-link" exact to="/dashboard">
                  <i className="nav-icon fas fa-cog" />

                  <p>Dashboard</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/suscripcion">
                  <i className="nav-icon fas fa-credit-card" />

                  <p>Mi suscripción</p>
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
      {/* Content Wrapper. Contains page content */}
    </>
  );
};
