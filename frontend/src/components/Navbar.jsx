import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="font-bold text-xl">
          FootballFans
        </Link>

        {/* DESKTOP LINKS */}
        <nav className="hidden md:flex gap-6">
          <Link to="/gallery">Gallery</Link>
          <Link to="/videos">Videos</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <nav className="md:hidden bg-white border-t">
          <Link onClick={() => setOpen(false)} className="block p-4" to="/gallery">
            Gallery
          </Link>
          <Link onClick={() => setOpen(false)} className="block p-4" to="/videos">
            Videos
          </Link>
          <Link onClick={() => setOpen(false)} className="block p-4" to="/contact">
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
