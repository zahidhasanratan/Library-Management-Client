// src/api/borrowApi.ts
import { baseApi } from "./baseApi";
import type { Borrow, BorrowSummary } from "../features/borrow/types";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<
      Borrow,
      { bookId: string; quantity: number; dueDate: string }
    >({
      query: ({ bookId, quantity, dueDate }) => ({
        url: `/borrows/${bookId}`, // include the bookId in the URL
        method: "POST",
        body: { quantity, dueDate }, // backend will read req.body.quantity & req.body.dueDate
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),

    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => "/borrows/summary",
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
