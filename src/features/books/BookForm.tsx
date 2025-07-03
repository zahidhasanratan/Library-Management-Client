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
});

type FormData = z.infer<typeof schema>;

interface Props {
  mode: "create" | "edit";
}

export default function BookForm({ mode }: Props) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

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
    },
  });

  useEffect(() => {
    if (mode === "edit" && book) {
      reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description ?? "",
        copies: book.copies,
      });
    }
  }, [mode, book, reset]);

  if (mode === "edit" && isBookLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (mode === "edit" && bookError) {
    return (
      <div className="alert alert-danger text-center my-5">
        ❌ Failed to load book.
      </div>
    );
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
    <div className="container px-3 px-md-5 my-4">
      <div className="card shadow border-0 max-w-lg mx-auto">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            {mode === "create" ? "📘 Add New Book" : "✏️ Edit Book"}
          </h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            <div className="col-12">
              <label className="form-label">Title</label>
              <input
                {...register("title")}
                className="form-control"
                placeholder="Book Title"
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Author</label>
              <input
                {...register("author")}
                className="form-control"
                placeholder="Author Name"
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Genre</label>
              <input
                {...register("genre")}
                className="form-control"
                placeholder="Genre"
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">ISBN</label>
              <input
                {...register("isbn")}
                className="form-control"
                placeholder="ISBN Number"
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Copies</label>
              <input
                type="number"
                {...register("copies")}
                className="form-control"
                placeholder="Number of Copies"
              />
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                {...register("description")}
                className="form-control"
                rows={3}
                placeholder="Description"
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold"
                disabled={isSubmitting}
              >
                {mode === "create" ? "Add Book" : "Update Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
