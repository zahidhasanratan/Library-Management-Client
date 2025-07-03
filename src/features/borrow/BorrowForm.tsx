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
      <div className="flex justify-center py-20">
        <span className="loading loading-dots loading-lg text-primary" />
      </div>
    );
  }
  if (isError || !book) {
    return <p className="text-center text-error py-20">Book not found.</p>;
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
    <div className="container mx-auto px-4 py-6">
      <div className="card shadow-lg max-w-lg mx-auto">
        <div className="card-body p-6 space-y-4">
          <h2 className="card-title text-2xl">{`Borrow "${book.title}"`}</h2>
          <p className="text-gray-600">
            Available copies: <span className="font-medium">{book.copies}</span>
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                min={1}
                max={book.copies}
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Due Date</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <button type="submit" className="btn btn-success w-full">
              Confirm Borrow
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
