import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Profile() {
  const { userData } = useContext(UserContext);
  return (
    <div className="container">
      <div className="card">
        <h1 className="card-header">{userData.user.name}</h1>
        <div className="card-body">
          <p className="card-text">{userData.user.email}</p>
        </div>
      </div>
    </div>
  );
}
