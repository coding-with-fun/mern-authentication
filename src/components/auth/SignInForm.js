import Axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import AlertMessage from "../AlertMessage";
import "./Form.css";

export default function SignInForm() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();

    try {
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
    } catch (error) {
      error.response.data.message && setError(error.response.data.message);
    }
  };

  return (
    <div className="text-center container">
      <form onSubmit={login} className="sign-in-form">
        <i className="fa fa-sign-in fa-5x"></i>
        <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
        {error && (
          <AlertMessage
            message={error}
            clearMessage={() => setError(undefined)}
          />
        )}
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
