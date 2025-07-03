export interface Borrow {
  _id: string;
  bookId: string;
  quantity: number;
  dueDate: string;
}

export interface BorrowSummary {
  isbn: string;
  title: string;
  totalBorrowed: number;
}
