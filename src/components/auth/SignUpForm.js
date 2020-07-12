import React from "react";
import "./Form.css";

export default function SignUpForm() {
  return (
    <div className="text-center container">
      <form action="/" className="sign-in-form">
        <i className="fa fa-user-plus fa-5x"></i>
        <h1 className="h3 mb-3 font-weight-normal">Sign up</h1>
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Name"
          required
          autoFocus
        />
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
