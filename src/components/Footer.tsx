import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-light border-top py-3 mt-auto shadow-sm">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left: Copyright */}
        <p className="mb-2 mb-md-0 text-muted small">
          © {new Date().getFullYear()} Library Management. All rights reserved.
        </p>

        {/* Right: Optional Links */}
        <div className="d-flex gap-3">
          <Link to="/books" className="text-muted small text-decoration-none">
            All Books
          </Link>
          <Link
            to="/borrow-summary"
            className="text-muted small text-decoration-none"
          >
            Borrow Summary
          </Link>
        </div>
      </div>
    </footer>
  );
}
