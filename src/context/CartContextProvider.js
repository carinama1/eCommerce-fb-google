import React, { createContext, useEffect, useState } from "react";
import { DbServices } from "../localbase/indexedDbDexie";
import Cookies from "universal-cookie";

export const CartContext = createContext({});
const cookies = new Cookies();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userID = cookies.get("u_lid");
    if (userID) {
      DbServices.getUserByGoogleID(userID).then((user) => {
        if (user.googleId) {
          DbServices.getMyCartByUser(user.googleId)
            .then((data) => {
              setCart(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
