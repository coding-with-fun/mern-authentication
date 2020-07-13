import React from "react";
import "./PageNotFound.css";
import { useHistory } from "react-router-dom";

export default function PageNotFound() {
  const history = useHistory();
  return (
    <div class="site">
      <div class="sketch">
        <div class="bee-sketch red"></div>
        <div class="bee-sketch blue"></div>
      </div>

      <h1>
        404:
        <small>Page Not Found</small>
        <div className="btn" onClick={() => history.push("/")}>Click me to go back!</div>
      </h1>
    </div>
  );
}
