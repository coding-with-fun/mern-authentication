import Axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  let token = localStorage.getItem("auth-token");
  if (token === null) {
    localStorage.setItem("auth-token", "");
    token = "";
  }

  let localUserData = localStorage.getItem("local-user-data");
  if (localUserData) localUserData = JSON.parse(localUserData);
  if (localUserData === null) {
    localStorage.setItem("local-user-data", "");
  }
  const [userData, setUserData] = useState({
    token: token,
    user: localUserData,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      if (token === null) {
        const tokenRes = await Axios.post(
          "http://localhost:5000/user/tokenIsValid",
          null,
          { headers: { "x-auth-token": token } }
        );

        let userRes = undefined;
        if (tokenRes.data) {
          userRes = await Axios.get("http://localhost:5000/user/", {
            headers: { "x-auth-token": token },
          });
          localStorage.setItem("auth-token", token);
          localStorage.setItem("local-user-data", JSON.stringify(userRes.data));
        }
        setUserData({
          token: token,
          user: tokenRes.data ? userRes.data : localUserData,
        });
      }
    };
    fetchDetails();
  }, [token, localUserData]);
  return (
    <UserContext.Provider
      value={{ userData: userData, setUserData: setUserData }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
