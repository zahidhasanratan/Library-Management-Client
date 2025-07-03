import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 py-6 shadow-inner">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left: copyright */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Library Management. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
