import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import GoogleButton from "../../components/googleButton";
import FacebookLogin from "react-facebook-login";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { DbServices } from "../../localbase/indexedDbDexie";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  buttonMain: {
    background: theme.btn.primary,
    textTransform: "none",
    fontSize: 18,
    color: "white",
    marginTop: 24,
    "&:hover": {
      opacity: 0.9,
      background: theme.btn.primary,
    },
  },
}));
const cookies = new Cookies();
const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("mic@vpt.id");
  const [password, setPassword] = useState("Test789&*(");

  useEffect(() => {
    if (cookies.get("u_lid")) {
      navigate("/");
    }
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  const doLogin = () => {
    // Hit Login API
    console.log(email, password);
  };

  const handleFormChange = (e) => {
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
  };

  const responseGoogle = (response) => {
    if (response) {
      cookies.set("u_lid", response.googleId, { path: "/" });
      DbServices.getUserByGoogleID(response.googleId)
        .then((data) => {
          if (!data) {
            DbServices.storeUser({
              ...response.profileObj,
              login_type: "google",
            }).then((data) => {
              navigate("/");
            });
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const responseFacebook = (response) => {
    if (response) {
      cookies.set("u_lid", response.id, { path: "/" });
      const profileObj = {
        email: response.email,
        name: response.name,
        googleId: response.id,
        imageUrl: response.picture.data.url,
        login_type: "facebook",
      };
      DbServices.getUserByGoogleID(response.id)
        .then((data) => {
          if (!data) {
            DbServices.storeUser(profileObj).then((data) => {
              navigate("/");
            });
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      {!isLoading ? (
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={() => {
              doLogin();
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on soloQ store
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  size="small"
                  name="email"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    handleFormChange(e);
                  }}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  size="small"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    handleFormChange(e);
                  }}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box>
                  <Button
                    className={classes.buttonMain}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <div style={{ marginTop: 24, textAlign: "center", opacity: 0.6 }}>
            atau masuk dengan
          </div>
          <GoogleButton onSuccess={responseGoogle} onFailure={responseGoogle} />
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 24 }}
          >
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_AUTH_ID}
              fields="name,email,picture"
              callback={responseFacebook}
            />
          </div>
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
};

export default LoginView;
