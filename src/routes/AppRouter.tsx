import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookList from "../features/books/BookList";
import BookForm from "../features/books/BookForm";
import BookDetails from "../features/books/BookDetails";
import BorrowForm from "../features/borrow/BorrowForm";
import BorrowSummary from "../features/borrow/BorrowSummary";
import Footer from "../components/Footer"; // optional

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          {/* ---------- Public pages ---------- */}
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<BookList />} />{" "}
          {/* list + row actions */}
          <Route path="/create-book" element={<BookForm mode="create" />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/edit-book/:id" element={<BookForm mode="edit" />} />
          <Route path="/borrow/:bookId" element={<BorrowForm />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
          {/* ----------- 404 fallback --------- */}
          <Route
            path="*"
            element={<p className="text-center my-12">404 — Not found</p>}
          />
        </Routes>
      </main>
      <Footer /> {/* remove if you don’t want a footer */}
    </BrowserRouter>
  );
}
