import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { CartContext } from "../context/CartContextProvider";
import { UserContext } from "../context/UserContextProvider";
import { DbServices } from "../localbase/indexedDbDexie";

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
    position: "relative",
    width: 165,
  },
}));
const imageData =
  "data:image/jpeg;base64,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";

const Product = ({ item }) => {
  const classes = useStyles();
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const addItemToCart = (item) => {
    const newItem = { ...item, userId: user.googleId };
    const newCart = [...cart];
    newCart.push(newItem);
    DbServices.addItemToCart(newItem)
      .then((data) => {
        setCart(newCart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className={classes.product}>
      <img
        style={{ width: 125, height: 120, marginBottom: 16 }}
        alt="products"
        src={imageData}
      ></img>
      <div
        style={{
          fontWeight: "bold",
          textOverflow: "hidden",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        variant="h5"
      >
        {item.title}
      </div>
      <Typography style={{ fontSize: 12, margin: "4px 0" }}>
        {item.category}
      </Typography>
      <Typography style={{ fontSize: 16, fontWeight: "bold", color: "green" }}>
        ${item.price}
      </Typography>
      <Box
        style={{
          position: "absolute",
          top: -16,
          right: -10,
          width: 32,
          height: 32,
          background: "green",
          borderRadius: "50%",
          display: "flex",
        }}
        onClick={() => addItemToCart(item)}
      >
        <AddShoppingCartIcon
          style={{ margin: "auto", color: "white", fontSize: "medium" }}
        />
      </Box>
    </Container>
  );
};
export default Product;
