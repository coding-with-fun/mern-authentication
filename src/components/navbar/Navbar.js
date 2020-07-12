import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navigation">
      {/* Fixed navbar */}
      <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
        <Link to="/" className="navbar-brand nav-logo">
          SoftVan
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse flex-row-reverse nav-links"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            {!false ? (
              <>
                <Link to="/signin" className="btn btn-outline-light">
                  <i class="fa fa-fw fa-sign-in"></i> Sign In
                </Link>
                <Link to="/signup" className="btn btn-outline-light">
                  <i class="fa fa-fw fa-user-plus"></i> Sign Up
                </Link>
              </>
            ) : (
              <Link to="/" className="btn btn-outline-light">
                <i class="fa fa-fw fa-user"></i> Logout
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Begin page content */}
      <div className="content-body">
        <div className="container"></div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <span className="text-muted">
            © 2020 Copyright:
            <a href="https://github.com/harsh2124/" target="blank">
              <b> Harsh Patel</b>
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
