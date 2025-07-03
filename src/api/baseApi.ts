import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Root RTK Query instance.
 * All feature endpoints (books, borrows, …) extend this.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_API_URL ?? "https://libraraywithui.vercel.app/api",
  }),
  tagTypes: ["Book", "Borrow"],
  endpoints: () => ({}),
});
