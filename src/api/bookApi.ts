import { baseApi } from "./baseApi";
import type { Book } from "../features/books/types"; // ← type-only import

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /books
    getBooks: builder.query<Book[], void>({
      query: () => "/books",
      providesTags: (res) =>
        res
          ? [
              ...res.map(({ _id }) => ({ type: "Book" as const, id: _id })),
              "Book",
            ]
          : ["Book"],
    }),

    // (add / edit / delete endpoints later)
  }),
});

export const { useGetBooksQuery } = bookApi;
