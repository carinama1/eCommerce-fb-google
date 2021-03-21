import Dexie from "dexie";

const db = new Dexie("soloQStore");
db.version(2).stores({
  cart: "++item_id,userId",
  user: "++id,googleId", // Change indexes
});

class dbServices {
  storeUser(user) {
    return new Promise((resolve) => {
      resolve(db.user.add(user));
    });
  }

  getUserByGoogleID(googleId) {
    return new Promise((resolve) => {
      resolve(db.user.where("googleId").equals(googleId).first());
    });
  }

  getMyCartByUser(userId) {
    return new Promise((resolve) => {
      resolve(db.cart.where("userId").equals(userId).toArray());
    });
  }

  removeItemFromCart(id) {
    return new Promise((resolve) => {
      resolve(db.cart.where("id").equals(id).delete());
    });
  }

  finishCart(userId) {
    return new Promise((resolve) => {
      resolve(db.cart.where("userId").equals(userId).delete());
    });
  }

  addItemToCart(pokemon) {
    return new Promise((resolve) => {
      resolve(db.cart.add(pokemon));
    });
  }
}

export const DbServices = new dbServices();
