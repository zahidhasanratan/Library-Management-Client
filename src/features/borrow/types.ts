export interface Borrow {
  _id: string;
  bookId: string;
  quantity: number;
  dueDate: string;
}

export interface BorrowSummary {
  bookId: string; // ✅ Added this line
  title: string;
  isbn: string;
  totalBorrowed: number;
}
