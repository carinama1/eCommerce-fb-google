import { Box, makeStyles, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Home from "@material-ui/icons/Home";
import Person from "@material-ui/icons/Person";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContextProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
    position: "relative",
    paddingBottom: 60,
  },
  bottomNav: {
    background: "white",
    borderRadius: "5px 5px 0px 0px",
    boxShadow: "0px 0px 11px -1px rgba(0,0,0,0.32)",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 12,
    height: 60,
    padding: "0px 60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btnNav: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 56,
    height: 56,
    padding: 5,
    position: "relative",
    "&:hover": {
      opacity: 0.9,
      background: theme.btn.primary,
      color: "white",
    },
  },
}));
const BotNavBar = () => {
  const classes = useStyles();
  const { cart } = useContext(CartContext);

  return (
    <Box className={classes.bottomNav}>
      <RouterLink to="/" style={{ color: "black" }}>
        <Box className={classes.btnNav}>
          <Home />
          <Typography>Home</Typography>
        </Box>
      </RouterLink>
      <RouterLink to="/profile" style={{ color: "black" }}>
        <Box className={classes.btnNav}>
          <Person />
          <Typography>Profile</Typography>
        </Box>
      </RouterLink>
      <RouterLink to="/cart" style={{ color: "black" }}>
        <Box className={classes.btnNav}>
          <ShoppingCart />
          <Typography>Cart</Typography>
          {cart.length >= 1 && (
            <Box
              style={{
                position: "absolute",
                top: -4,
                right: 5,
                width: 18,
                height: 18,
                background: "green",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: 12,
                color: "white",
              }}
            >
              {cart.length}
            </Box>
          )}
        </Box>
      </RouterLink>
    </Box>
  );
};

export default BotNavBar;
