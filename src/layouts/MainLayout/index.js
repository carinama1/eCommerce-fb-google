import React from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import TopBar from "./TopBar";
import CartContextProvider from "../../context/CartContextProvider";
import BotNavBar from "../../components/BotNavbar";
import UserContextProvider from "../../context/UserContextProvider";

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
    borderRadius: "50%",
    padding: 5,
    position: "relative",
    "&:hover": {
      opacity: 0.9,
      background: theme.btn.primary,
      color: "white",
    },
  },
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <UserContextProvider>
        <CartContextProvider>
          <div className={classes.wrapper}>
            <div className={classes.contentContainer}>
              <div className={classes.content}>
                <Outlet />
              </div>
              <BotNavBar />
            </div>
          </div>
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
};

export default MainLayout;
