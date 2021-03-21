import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import Product from "../../components/Product";
import { eCommerceData } from "../../data/ecommercedata";

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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  product: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    display: "flex",
    background: "#f8f9f9",
    flexDirection: "column",
    boxShadow: "0px 0px 11px -1px rgba(0,0,0,0.32)",
    width: 165,
  },
}));

function HomeView() {
  const classes = useStyles();
  return (
    <div>
      <Box style={{ margin: "20px 20px" }}>
        <Typography variant="h3">All Products</Typography>
      </Box>
      <Box>
        <Card>
          <CardContent className={classes.container}>
            {eCommerceData.map((item) => {
              return <Product key={item.id} item={item} />;
            })}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default HomeView;
