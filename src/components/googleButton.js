import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { GoogleLogin } from "react-google-login";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  buttonGoogle: {
    background: theme.btn.primary,
    color: "white",
    marginTop: 24,
    padding: 2,
    height: 50,
    boxShadow: "-4px 8px 13px -12px rgba(0,0,0,1)",
    "&:hover": {
      opacity: 0.9,
      background: theme.btn.primary,
    },
  },
}));

const GoogleButton = ({ onSuccess, onFailure }) => {
  const classes = useStyles();

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_OAUTH_ID}
      className={classes.buttonMain}
      onSuccess={onSuccess}
      onFailure={onFailure}
      render={(renderProps) => (
        <Button
          className={classes.buttonGoogle}
          onClick={renderProps.onClick}
          fullWidth
          style={{ textTransform: "none" }}
          size="large"
          variant="contained"
        >
          <div
            style={{
              background: "white",
              width: 46,
              height: 46,
              padding: 4,
              borderRadius: 5,
            }}
          >
            <img
              alt="Under development"
              style={{ width: "90%", height: "90%", padding: "auto" }}
              className={classes.image}
              src="/static/google.png"
            />
          </div>
          <div style={{ flex: 1, fontSize: 18 }}>
            <span>Sign in with Google</span>
          </div>
        </Button>
      )}
    ></GoogleLogin>
  );
};

export default GoogleButton;
