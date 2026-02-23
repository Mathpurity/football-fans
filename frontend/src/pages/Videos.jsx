import { useEffect, useState } from "react";
import Container from "../components/Container";
import VideoCard from "../components/VideoCard";
import { fetchVideos } from "../services/youtube";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const videosPerPage = 6;

  useEffect(() => {
    fetchVideos()
      .then((data) => setVideos(data))
      .catch(() => setError("Failed to load videos"))
      .finally(() => setLoading(false));
  }, []);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const indexOfLast = currentPage * videosPerPage;
  const indexOfFirst = indexOfLast - videosPerPage;
  const currentVideos = videos.slice(indexOfFirst, indexOfLast);

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-24 space-y-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 animate-ping opacity-30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500"></div>
            <div className="absolute inset-2 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
              ▶
            </div>
          </div>
          <p className="text-blue-500 animate-pulse uppercase text-sm tracking-widest">
            Loading Videos...
          </p>
        </div>
      </Container>
    );
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
      <h1 className="text-3xl font-semibold mb-8">Latest Videos</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentVideos.map((video) => (
          <VideoCard key={video.id.videoId} video={video} />
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
            className="px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition"
          >
            Prev
          </button>

          <span className="font-semibold text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
            className="px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition"
          >
            Next
          </button>
        </div>
      )}
    </Container>
  );
}