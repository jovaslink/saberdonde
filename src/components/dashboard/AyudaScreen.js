import React from "react";
import { Navbar } from "./template/Navbar";
import { Sidebar } from "./template/Sidebar";
import { Footer } from "./template/Footer";

export const AyudaScreen = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">¿Necesitas ayuda?</h1>
              </div>
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
      </div>
      <Footer />
    </>
  );
};
