import React from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  image: {
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
  buttonMain: {
    background: theme.btn.primary,
    color: "white",
    "&:hover": {
      opacity: 0.9,
      background: theme.btn.primary,
    },
  },
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Box textAlign="center">
          <img
            alt="Under development"
            className={classes.image}
            src="/static/images/undraw_page_not_found_su7k.svg"
          />
        </Box>
        <Typography align="center" color="textPrimary" variant="h1">
          404: The page you are looking for isn’t here
        </Typography>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 24 }}
        >
          <RouterLink to="/login">
            <Button className={classes.buttonMain}>GO TO HOMEPAGE</Button>
          </RouterLink>
        </div>
      </Container>
    </Box>
  );
};

export default NotFoundView;
