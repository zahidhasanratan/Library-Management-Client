import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetBooksQuery, useDeleteBookMutation } from "../../api/bookApi";
import type { Book } from "./types";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

export default function BookList() {
  const navigate = useNavigate();
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the book.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted");
    } catch {
      toast.error("Deletion failed");
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger text-center my-5">
        ❌ Failed to load books. Please try again.
      </div>
    );
  }

  if (!books?.length) {
    return (
      <div className="alert alert-secondary text-center my-5">
        📚 No books found.
      </div>
    );
  }

  // Pagination Logic
  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const paginatedBooks = books.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container px-3 px-md-5 my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📘 Library Books</h5>
          <button
            className="btn btn-outline-light btn-sm fw-semibold"
            onClick={() => navigate("/create-book")}
          >
            + Add New Book
          </button>
        </div>

        <div className="table-responsive" style={{ maxHeight: "70vh" }}>
          <table className="table table-hover align-middle mb-0">
            <thead className="sticky-top bg-light shadow-sm">
              <tr className="text-uppercase small text-muted">
                <th>Title</th>
                <th className="d-none d-sm-table-cell">Author</th>
                <th className="d-none d-md-table-cell">Genre</th>
                <th className="d-none d-lg-table-cell">ISBN</th>
                <th className="d-none d-sm-table-cell text-center">Copies</th>
                <th className="text-center">Available</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map((b: Book) => (
                <tr key={b._id}>
                  <td>
                    <Link
                      to={`/books/${b._id}`}
                      className="text-decoration-none text-primary fw-semibold"
                    >
                      {b.title}
                    </Link>
                  </td>
                  <td className="d-none d-sm-table-cell">{b.author}</td>
                  <td className="d-none d-md-table-cell">{b.genre}</td>
                  <td className="d-none d-lg-table-cell">{b.isbn}</td>
                  <td className="d-none d-sm-table-cell text-center">
                    {b.copies}
                  </td>
                  <td className="text-center">
                    <span
                      className={`badge rounded-pill px-3 py-1 ${
                        b.available ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {b.available ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      <button
                        onClick={() => navigate(`/borrow/${b._id}`)}
                        className="btn btn-outline-success btn-sm"
                      >
                        Borrow
                      </button>
                      <button
                        onClick={() => navigate(`/edit-book/${b._id}`)}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="card-footer d-flex justify-content-center">
            <nav>
              <ul className="pagination mb-0">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        page === currentPage ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
