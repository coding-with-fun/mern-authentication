import React from "react";

export default function AlertMessage(props) {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      {props.message}
      <button
        type="button"
        className="close"
        onClick={props.clearMessage}
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
