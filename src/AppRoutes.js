import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Home, Navbar, SignInForm, SignUpForm } from "./components";
import { UserContext } from "./contexts/UserContext";

export default function AppRoutes() {
  const { userData } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/signin"
            render={() =>
              userData.user ? <Redirect to="/" /> : <SignInForm />
            }
          />
          <Route
            path="/signup"
            render={() =>
              userData.user ? <Redirect to="/" /> : <SignUpForm />
            }
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}
