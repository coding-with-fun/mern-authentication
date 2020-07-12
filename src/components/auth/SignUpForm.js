import React from "react";
import "./Form.css";
import { useState } from "react";
import Axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: inputEmail,
      password: inputPassword,
      confirmPassword: confirmPassword,
    };

    await Axios.post("http://localhost:5000/user/register", newUser);

    const loginRes = await Axios.post("http://localhost:5000/user/login", {
      email: inputEmail,
      password: inputPassword,
    });

    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });

    localStorage.setItem("auth-token", loginRes.data.token)

    history.push("/")
  };

  return (
    <div className="text-center container">
      <form onSubmit={submit} className="sign-up-form">
        <i className="fa fa-user-plus fa-5x"></i>
        <h1 className="h3 mb-3 font-weight-normal">Sign up</h1>
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          onChange={(e) => setInputEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setInputPassword(e.target.value)}
          required
        />
        <input
          type="password"
          id="confirmPassword"
          className="form-control"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          value="Sign up"
        />
      </form>
    </div>
  );
}
