import React from "react";

import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            Product List
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="addcategory" className="nav-link">
                  Add Category
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="addproduct" className="nav-link">
                  Add Product
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="mt-5 pt-5 bt-5">
        <Outlet />
      </main>
    </div>
  );
}
