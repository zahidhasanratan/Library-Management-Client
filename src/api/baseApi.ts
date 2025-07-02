import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Root RTK Query instance.
 * All feature endpoints (books, borrows, …) extend this.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
  }),
  tagTypes: ["Book", "Borrow"],
  endpoints: () => ({}),
});
