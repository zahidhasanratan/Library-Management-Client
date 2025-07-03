import { useParams, useNavigate } from "react-router-dom";
import { useBorrowBookMutation } from "../../api/borrowApi";
import { useGetBookQuery } from "../../api/bookApi";
import { useState } from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";

export default function BorrowForm() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading, isError } = useGetBookQuery(bookId!);
  const [borrowBook] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState(
    dayjs().add(7, "day").format("YYYY-MM-DD")
  );

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity > book.copies) {
      toast.error("Not enough copies available");
      return;
    }
    try {
      await borrowBook({ bookId: book._id, quantity, dueDate }).unwrap();
      toast.success("Book borrowed!");
      navigate("/borrow-summary");
    } catch {
      toast.error("Borrow failed");
    }
  };

  return (
    <div className="container px-3 px-md-5 my-4">
      <div className="card shadow border-0 max-w-lg mx-auto">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">{`📚 Borrow "${book.title}"`}</h5>
        </div>

        <div className="card-body">
          <p className="text-muted mb-4">
            Available copies: <strong>{book.copies}</strong>
          </p>

          <form onSubmit={onSubmit} className="row g-3">
            {/* Quantity */}
            <div className="col-12 col-md-6">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                min={1}
                max={book.copies}
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
                className="form-control"
                required
              />
            </div>

            {/* Due Date */}
            <div className="col-12 col-md-6">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-control"
                required
              />
            </div>

            {/* Submit */}
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-success w-100 fw-semibold"
              >
                Confirm Borrow
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
