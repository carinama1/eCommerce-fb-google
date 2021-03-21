import { createMuiTheme } from "@material-ui/core";
import { kDangerColor, kMainColor } from "./constant";
import shadows from "./shadows";
import typography from "./typography";

const theme = createMuiTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: "#ffffff",
      paper: "#ffffff",
    },
    primary: {
      main: "#333333",
      contrastText: "white",
    },
    secondary: {
      main: kDangerColor,
    },
    bg: {
      main: "#ffffff",
    },
    text: {
      primary: "#263238",
      secondary: "#546e7a",
    },
  },
  btn: {
    primary: kMainColor,
    danger: kDangerColor,
  },
  shadows,
  typography,
});

export default theme;
