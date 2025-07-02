import { useGetBooksQuery } from "../../api/bookApi";
import type { Book } from "./types"; // ← type-only import

const BookList = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p className="text-red-500">Failed to load books.</p>;
  if (!books?.length) return <p>No books found.</p>;

  return (
    <section className="overflow-x-auto">
      <table className="min-w-full border divide-y">
        <thead className="bg-gray-100">
          <tr>
            {["Title", "Author", "Genre", "ISBN", "Copies", "Available"].map(
              (h) => (
                <th key={h} className="px-3 py-2 text-left">
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {books.map((b: Book) => (
            <tr key={b._id} className="odd:bg-gray-50">
              <td className="p-2">{b.title}</td>
              <td className="p-2">{b.author}</td>
              <td className="p-2">{b.genre}</td>
              <td className="p-2">{b.isbn}</td>
              <td className="p-2">{b.copies}</td>
              <td className="p-2">{b.available ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default BookList;
