import { baseApi } from "./baseApi";
import type { Book } from "../features/books/types";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ───── READ ───── */
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

    getBook: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Book", id }],
    }),

    /* ───── CREATE ───── */
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (body) => ({ url: "/books", method: "POST", body }),
      invalidatesTags: ["Book"],
    }),

    /* ───── UPDATE ───── */
    updateBook: builder.mutation<Book, { id: string; body: Partial<Book> }>({
      query: ({ id, body }) => ({ url: `/books/${id}`, method: "PATCH", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Book", id }],
    }),

    /* ───── DELETE ───── */
    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/books/${id}`, method: "DELETE" }),
      invalidatesTags: (_r, _e, id) => [{ type: "Book", id }],
    }),
  }),
});

/* Export every generated hook */
export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
