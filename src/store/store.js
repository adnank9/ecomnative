import cartReducer from "../reducer/cart-reducer";
import wishlistReducer from "../reducer/whishlist-reducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

export default store;
