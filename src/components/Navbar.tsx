import { NavLink } from "react-router-dom";

const link =
  "px-3 py-2 rounded hover:bg-indigo-100 transition-colors font-medium";

const Navbar = () => (
  <header className="bg-white shadow">
    <nav className="container mx-auto flex items-center justify-between p-4">
      <h1 className="text-xl font-bold">📚 Library</h1>
      <NavLink to="/books" className={link}>
        All Books
      </NavLink>
    </nav>
  </header>
);

export default Navbar;
