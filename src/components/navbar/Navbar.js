import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./Navbar.css";

export default function Navbar() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

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
            {!userData.user ? (
              <>
                <Link to="/signin" className="btn btn-outline-light">
                  <i className="fa fa-sign-in"></i> Sign In
                </Link>

                <Link to="/signup" className="btn btn-outline-light">
                  <i className="fa fa-user-plus"></i> Sign Up
                </Link>
              </>
            ) : (
              <>
                <div
                  className="btn btn-outline-light"
                  onClick={() => {
                    setUserData({
                      token: undefined,
                      user: undefined,
                    });
                    localStorage.setItem("auth-token", "");
                    localStorage.setItem("local-user-data", "");
                    history.push("/");
                  }}
                >
                  <i className="fa fa-sign-out"></i> Sign Out
                </div>

                <Link to="/profile" className="btn btn-outline-light">
                  <i className="fa fa-user"></i> Profile
                </Link>
              </>
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
