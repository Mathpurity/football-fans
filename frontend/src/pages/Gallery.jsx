import { useEffect, useState } from "react";
import { getImages } from "../services/images";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const imagesPerPage = 9;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getImages();
        setImages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Gallery Fetch Error:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const indexOfLast = currentPage * imagesPerPage;
  const indexOfFirst = indexOfLast - imagesPerPage;
  const currentImages = images.slice(indexOfFirst, indexOfLast);

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= GROUP BY DATE ================= */
  const groupedImages = currentImages.reduce((groups, image) => {
    const date = new Date(image.createdAt);
    const formattedDate = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!groups[formattedDate]) {
      groups[formattedDate] = [];
    }

    groups[formattedDate].push(image);
    return groups;
  }, {});

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full animate-ping opacity-30"></div>
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full"></div>
          <div className="absolute inset-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
            📸
          </div>
        </div>
        <p className="text-blue-500 uppercase tracking-widest animate-pulse text-sm">
          Loading Gallery...
        </p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        No images available.
      </div>
    );
  }

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 space-y-16">

          {Object.entries(groupedImages).map(([date, imgs]) => (
            <div key={date}>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">
                {date}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {imgs.map((img) => {
                  const globalIndex = images.findIndex(
                    (i) => i._id === img._id
                  );

                  return (
                    <div
                      key={img._id}
                      onClick={() => setSelectedIndex(globalIndex)}
                      className="rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-2xl transition"
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.title}
                        className="w-full h-64 object-cover"
                      />

                      <div className="p-4 space-y-3">
                        <h3 className="font-bold text-lg">
                          {img.title || "Untitled"}
                        </h3>

                        {img.description && (
                          <div className="max-h-24 overflow-y-auto text-gray-600 text-sm pr-2">
                            {img.description}
                          </div>
                        )}

                        <p className="text-xs text-gray-400">
                          {new Date(img.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ================= PAGINATION CONTROLS ================= */}
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

        </div>
      </section>

      {/* ================= MODAL ================= */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedIndex].imageUrl}
              alt={images[selectedIndex].title}
              className="w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />

            <div className="bg-slate-900 text-white p-6 rounded-b-lg">
              <h2 className="text-2xl font-bold">
                {images[selectedIndex].title}
              </h2>

              {images[selectedIndex].description && (
                <div className="max-h-40 overflow-y-auto text-gray-300 mt-4 pr-2">
                  {images[selectedIndex].description}
                </div>
              )}

              <p className="text-sm text-gray-400 mt-4">
                {new Date(images[selectedIndex].createdAt).toLocaleString()}
              </p>

              <button
                onClick={() => setSelectedIndex(null)}
                className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
              >
                Close
              </button>
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full text-xl"
            >
              ‹
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full text-xl"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}