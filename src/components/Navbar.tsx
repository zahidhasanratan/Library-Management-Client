import { NavLink } from "react-router-dom";
import { BookOpenIcon } from "@heroicons/react/24/outline";

const navItems = [
  { to: "/books", label: "All Books" },
  { to: "/create-book", label: "Add Book" },
  { to: "/borrow-summary", label: "Borrow Summary" },
];

export default function Navbar() {
  return (
    <header className="bg-white border-bottom shadow-sm sticky-top">
      <div className="container py-3 d-flex justify-content-between align-items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="d-flex align-items-center text-decoration-none text-dark fs-4 fw-semibold"
        >
          <BookOpenIcon
            className="me-2"
            style={{ width: 24, height: 24, color: "#0d6efd" }}
          />
          Library
        </NavLink>

        {/* Navigation Links */}
        <div className="d-flex gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-dark bg-light hover-bg-secondary"
                }`
              }
              style={{ transition: "all 0.2s ease" }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
