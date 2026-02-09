import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
        
        {/* TEXT */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            The Home of <span className="text-green-400">Football Fans</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-xl">
            Watch highlights, explore galleries, and connect with the football
            community — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/videos"
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded font-semibold"
            >
              Watch Videos
            </Link>

            <Link
              to="/gallery"
              className="border border-white/30 hover:bg-white/10 px-6 py-3 rounded"
            >
              View Gallery
            </Link>
          </div>
        </div>

        {/* IMAGE / VISUAL */}
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl" />
          <img
            src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d"
            alt="Football"
            className="relative rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
