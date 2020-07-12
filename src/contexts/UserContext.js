import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        "http://localhost:5000/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/user/", {
          headers: { "x-auth-token": token },
        });

        console.log(userRes);

        setUserData({
          token: token,
          user: userRes.data,
        });
        localStorage.setItem("auth-token", token);
      }
    };
    fetchDetails();
  }, []);
  return (
    <UserContext.Provider
      value={{ userData: userData, setUserData: setUserData }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
