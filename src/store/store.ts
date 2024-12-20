import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./product/product.api";
import localProductsReducer from "./product/productSlice"

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    localProducts: localProductsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type TypeRootStore = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;