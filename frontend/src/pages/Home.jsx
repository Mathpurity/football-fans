import Container from "../components/Container";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-black to-gray-800 text-white">
      <Container>
        <div className="min-h-[70vh] flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Football Fans Hub ⚽
          </h1>

          <p className="text-lg max-w-2xl mb-8 text-gray-200">
            Discover the latest football moments, watch highlights,
            explore galleries, and connect with fans around the world.
          </p>

          <div className="flex gap-4">
            <Link
              to="/videos"
              className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition"
            >
              Watch Videos
            </Link>

            <Link
              to="/gallery"
              className="border border-white px-6 py-3 rounded hover:bg-white hover:text-black transition"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
