import { useGetBorrowSummaryQuery } from "../../api/borrowApi";

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

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
        ❌ Failed to load borrow summary. Please try again.
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="alert alert-secondary text-center my-5">
        📚 No borrow records yet.
      </div>
    );
  }

  return (
    <div className="container px-3 px-md-5 my-4">
      <div className="card shadow border-0">
        {/* Header */}
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📊 Borrow Summary</h5>
        </div>

        {/* Table */}
        <div className="table-responsive" style={{ maxHeight: "70vh" }}>
          <table className="table table-hover align-middle mb-0">
            <thead className="sticky-top bg-light shadow-sm">
              <tr className="text-uppercase small text-muted">
                <th>Title</th>
                <th className="d-none d-sm-table-cell">ISBN</th>
                <th className="text-center">Total Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((s) => (
                <tr key={s.bookId}>
                  <td>{s.title}</td>
                  <td className="d-none d-sm-table-cell">{s.isbn}</td>
                  <td className="text-center fw-bold">{s.totalBorrowed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
