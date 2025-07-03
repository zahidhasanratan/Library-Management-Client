import { useNavigate, useParams } from "react-router-dom";
import {
  useAddBookMutation,
  useGetBookQuery,
  useUpdateBookMutation,
} from "../../api/bookApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useEffect } from "react";

const schema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  isbn: z.string().min(5),
  description: z.string().optional(),
  copies: z.coerce.number().min(1),
  available: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

interface Props {
  mode: "create" | "edit";
}

export default function BookForm({ mode }: Props) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Only fetch when editing
  const {
    data: book,
    isLoading: isBookLoading,
    isError: bookError,
  } = useGetBookQuery(id!, { skip: mode === "create" });

  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });

  // When book loads, populate the form
  useEffect(() => {
    if (mode === "edit" && book) {
      reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description ?? "",
        copies: book.copies,
        available: book.available,
      });
    }
  }, [mode, book, reset]);

  // Show spinner while loading book
  if (mode === "edit" && isBookLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-dots loading-lg text-primary" />
      </div>
    );
  }
  if (mode === "edit" && bookError) {
    return <p className="text-center text-error py-20">Failed to load book.</p>;
  }

  const onSubmit = async (vals: FormData) => {
    const payload = { ...vals, available: vals.copies > 0 };
    try {
      if (mode === "create") {
        await addBook(payload).unwrap();
        toast.success("Book added");
      } else {
        await updateBook({ id: id!, body: payload }).unwrap();
        toast.success("Book updated");
      }
      navigate("/books");
    } catch {
      toast.error("Save failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="card shadow-lg max-w-md mx-auto">
        <div className="card-body p-6 space-y-4">
          <h2 className="card-title text-2xl">
            {mode === "create" ? "Add New Book" : "Edit Book"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                {...register("title")}
                placeholder="Book Title"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Author</span>
              </label>
              <input
                {...register("author")}
                placeholder="Author Name"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Genre</span>
              </label>
              <input
                {...register("genre")}
                placeholder="Genre"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">ISBN</span>
              </label>
              <input
                {...register("isbn")}
                placeholder="ISBN Number"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Copies</span>
              </label>
              <input
                type="number"
                {...register("copies")}
                placeholder="Number of Copies"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description")}
                placeholder="Description"
                className="textarea textarea-bordered w-full"
              />
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("available")}
                className="checkbox checkbox-primary"
              />
              <span>Available</span>
            </label>

            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={isSubmitting}
            >
              {mode === "create" ? "Add Book" : "Update Book"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
