import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetBookQuery, useDeleteBookMutation } from "../../api/bookApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading, isError } = useGetBookQuery(id!);
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete this book?",
      text: book?.title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    try {
      await deleteBook(id!).unwrap();
      toast.success("Book removed");
      navigate("/books");
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

  if (isError || !book) {
    return (
      <div className="alert alert-danger text-center my-5">
        ❌ Book not found.
      </div>
    );
  }

  return (
    <div className="container px-3 px-md-5 my-4">
      <div className="card shadow border-0">
        <div className="card-body">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-4">
            <h3 className="mb-0">{book.title}</h3>
            <div className="btn-group btn-group-sm">
              <Link
                to={`/edit-book/${book._id}`}
                className="btn btn-outline-primary"
              >
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>

          {/* Book Details Grid */}
          <div className="row g-3 mb-4">
            <div className="col-sm-6">
              <strong>Author:</strong> {book.author}
            </div>
            <div className="col-sm-6">
              <strong>Genre:</strong> {book.genre}
            </div>
            <div className="col-sm-6">
              <strong>ISBN:</strong> {book.isbn}
            </div>
            <div className="col-sm-6">
              <strong>Copies:</strong> {book.copies}
            </div>
            <div className="col-12">
              <strong>Available:</strong>{" "}
              <span
                className={`badge ${
                  book.available ? "bg-success" : "bg-danger"
                }`}
              >
                {book.available ? "Yes" : "No"}
              </span>
            </div>
          </div>

          {/* Description */}
          {book.description && (
            <div>
              <h5 className="mb-2">Description</h5>
              <p className="text-muted">{book.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
