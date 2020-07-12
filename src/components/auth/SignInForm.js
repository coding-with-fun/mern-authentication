import React, { useState, useContext } from "react";
import "./Form.css";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function SignInForm() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();

    const loginRes = await Axios.post("http://localhost:5000/user/login", {
      email: inputEmail,
      password: inputPassword,
    });

    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });

    localStorage.setItem("auth-token", loginRes.data.token);

    history.push("/");
  };

  return (
    <div className="text-center container">
      <form onSubmit={login} className="sign-in-form">
        <i className="fa fa-sign-in fa-5x"></i>
        <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          onChange={(e) => setInputEmail(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setInputPassword(e.target.value)}
          required
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
