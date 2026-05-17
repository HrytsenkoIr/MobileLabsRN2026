import { configureStore, combineReducers } from "@reduxjs/toolkit";

import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import usersReducer from "./slices/usersSlice";
import ordersReducer from "./slices/ordersSlice";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  users: usersReducer,
  orders: ordersReducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);