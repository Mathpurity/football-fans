export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-16">

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm text-gray-600">

        {/* ================= BRAND ================= */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            Football Fans
          </h2>
          <p>
            A digital community sharing unforgettable football moments,
            powerful highlights, and fan experiences from around the world.
          </p>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/gallery" className="hover:text-blue-600 transition">
                Gallery
              </a>
            </li>
            <li>
              <a href="/videos" className="hover:text-blue-600 transition">
                Videos
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* ================= CONTACT INFO ================= */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">
            Contact
          </h3>

          <p>Email: info@footballfans.com</p>
          <p>Phone: +234 000 000 0000</p>

          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-blue-600 transition">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              YouTube
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Instagram
            </a>
          </div>
        </div>

      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Football Fans Fellowship. All rights reserved.
      </div>

    </footer>
  );
}