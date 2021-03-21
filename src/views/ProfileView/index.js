import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContextProvider";
import Cookies from "universal-cookie";
import { GoogleLogout } from "react-google-login";

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: 20,
  },
  product: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    display: "flex",
    background: "#f8f9f9",
    boxShadow: "0px 0px 11px -1px rgba(0,0,0,0.32)",
    position: "relative",
    width: "100%",
  },
  buttonDanger: {
    background: theme.btn.danger,
    textTransform: "none",
    fontSize: 18,
    color: "white",
    "&:hover": {
      opacity: 0.9,
      background: theme.btn.danger,
    },
  },
}));

const ProfileView = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get("u_lid")) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const doLogout = (res) => {
    cookies.remove("u_lid");
    navigate("/login");
  };

  return (
    <>
      <Box style={{ margin: "20px 20px" }}>
        <Typography style={{ textAlign: "center" }} variant="h3">
          My Profile
        </Typography>
      </Box>
      <Box>
        <Card
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent className={classes.container}>
            <Typography>{user.name}</Typography>
            <div
              style={{
                borderRadius: "50%",
                border: "1px solid black",
                margin: "10px 0px",
                width: 64,
                height: 64,
              }}
            >
              <image
                style={{ width: 64, height: 64 }}
                src={user.imageUrl}
              ></image>
            </div>
            <Typography>{user.email}</Typography>
          </CardContent>
        </Card>
        <div
          style={{
            padding: "0px 40px",
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {user.login_type === "google" ? (
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_OAUTH_ID}
              buttonText="Logout"
              onLogoutSuccess={doLogout}
            ></GoogleLogout>
          ) : (
            <Button
              className={classes.buttonDanger}
              fullWidth
              onClick={doLogout}
              size="large"
              type="submit"
              variant="contained"
            >
              Logout
            </Button>
          )}
        </div>
      </Box>
    </>
  );
};

export default ProfileView;
