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
        confirmButton: "btn btn-error",
        cancelButton: "btn btn-ghost",
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
      <div className="flex justify-center py-20">
        <span className="loading loading-dots loading-lg text-primary" />
      </div>
    );
  }
  if (isError || !book) {
    return <p className="text-center text-error py-20">Book not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="card shadow-lg bg-base-100">
        {/* Header */}
        <div className="card-body p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-semibold">{book.title}</h2>
            <div className="btn-group">
              <Link
                to={`/edit-book/${book._id}`}
                className="btn btn-outline btn-sm"
              >
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-error btn-sm">
                Delete
              </button>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <span className="font-medium">Author:</span> {book.author}
            </div>
            <div>
              <span className="font-medium">Genre:</span> {book.genre}
            </div>
            <div>
              <span className="font-medium">ISBN:</span> {book.isbn}
            </div>
            <div>
              <span className="font-medium">Copies:</span> {book.copies}
            </div>
            <div className="sm:col-span-2">
              <span className="font-medium">Available:</span>{" "}
              {book.available ? (
                <span className="badge badge-success badge-sm">Yes</span>
              ) : (
                <span className="badge badge-error badge-sm">No</span>
              )}
            </div>
          </div>

          {/* Description */}
          {book.description && (
            <div className="mt-6">
              <h3 className="text-xl font-medium mb-2">Description</h3>
              <p className="text-gray-700">{book.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
