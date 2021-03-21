import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { DbServices } from "../localbase/indexedDbDexie";

export const UserContext = createContext({});

const cookies = new Cookies();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userID = cookies.get("u_lid");
    if (userID) {
      DbServices.getUserByGoogleID(userID)
        .then((data) => {
          if (data) {
            setUser(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
