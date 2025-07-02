import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookList from "../features/books/BookList";

const AppRouter = () => (
  <BrowserRouter>
    <Navbar />
    <main className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<BookList />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default AppRouter;
