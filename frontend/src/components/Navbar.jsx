import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Football Fans
        </Link>

        <div className="space-x-4">
          <Link to="/gallery" className="hover:underline">
            Gallery
          </Link>
          <Link to="/videos" className="hover:underline">
            Videos
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
