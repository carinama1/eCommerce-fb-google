import React from "react";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./components/GlobalStyles";
import { ThemeProvider } from "@material-ui/core";

const App = () => {
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
