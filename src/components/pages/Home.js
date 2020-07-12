import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Home() {
  const { userData } = useContext(UserContext);
  return (
    <div>
      <h1>Hello { userData.user ? userData.user.name : "Guest" }</h1>
    </div>
  );
}
