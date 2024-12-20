import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "./product.types";

export const productApi = createApi({
  reducerPath: "api/products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (build) => ({
    getProducts: build.query<IProduct[], number>({
      query: (limit: number) => `products?limit=${limit}`,
    }),
    // Хотел добавить addProduct через RTK Query, но API с которого я брал данные, не принимает в себя данные через POST.
    // Поэтому я сделал addProduct локально. Ниже написал код, как это работало бы на RTK Query

    // addProduct: build.mutation<IProduct, Partial<IProduct>>({
    //   query: (newProduct) => ({
    //     url: "products",
    //     method: "POST",
    //     body: newProduct,
    //   }),
  }),
});

export const { useGetProductsQuery } = productApi;
