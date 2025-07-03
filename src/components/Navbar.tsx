import { NavLink } from "react-router-dom";
import { BookOpenIcon } from "@heroicons/react/24/outline";

const navItems = [
  { to: "/books", label: "All Books" },
  { to: "/create-book", label: "Add Book" },
  { to: "/borrow-summary", label: "Borrow Summary" },
];

export default function Navbar() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between py-4">
          {/* Logo with icon */}
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-gray-800"
          >
            <BookOpenIcon className="h-6 w-6 text-blue-600" />
            <span>Library</span>
          </NavLink>

          {/* Navigation menu */}
          <nav>
            <ul className="flex space-x-6 list-none m-0 p-0">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      [
                        "inline-block px-3 py-2 rounded-md text-base font-medium transition",
                        isActive
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-100",
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Placeholder for right side (e.g. icons) */}
          <div className="w-8" />
        </div>
      </div>
    </header>
  );
}
