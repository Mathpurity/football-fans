import { useEffect, useState } from "react";
import { getImages } from "../services/images";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

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

  // -------- GROUP BY DATE --------
  const groupedImages = images.reduce((groups, image) => {
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

  // -------- BEAUTIFUL LOADER --------
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6 bg-gray-50 min-h-screen">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 animate-ping opacity-30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-500"></div>
          <div className="absolute inset-3 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl shadow-xl">
            ⚽
          </div>
        </div>

        <p className="text-blue-600 text-sm tracking-widest uppercase animate-pulse">
          Loading Gallery...
        </p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="py-32 text-center text-gray-500">
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

              {/* DATE HEADER */}
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">
                {date}
              </h2>

              {/* GRID */}
              <div className="grid md:grid-cols-3 gap-6">
                {imgs.map((img) => {
                  const globalIndex = images.findIndex(
                    (i) => i._id === img._id
                  );

                  return (
                    <div
                      key={img._id}
                      onClick={() => setSelectedIndex(globalIndex)}
                      className="rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-xl transition"
                    >
                      {/* IMAGE */}
                      <img
                        src={img.imageUrl}
                        alt={img.title}
                        className="w-full h-64 object-cover"
                      />

                      {/* CONTENT */}
                      <div className="p-4 space-y-3">

                        <h3 className="font-bold text-lg">
                          {img.title || "Untitled"}
                        </h3>

                        {/* SCROLLABLE CAPTION */}
                        {img.description && (
                          <div className="max-h-24 overflow-y-auto text-gray-600 text-sm pr-2">
                            {img.description}
                          </div>
                        )}

                        {/* TIME */}
                        <p className="text-xs text-gray-400">
                          Uploaded at{" "}
                          {new Date(img.createdAt).toLocaleTimeString()}
                        </p>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* -------- MODAL -------- */}
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

              {/* SCROLLABLE MODAL CAPTION */}
              {images[selectedIndex].description && (
                <div className="max-h-40 overflow-y-auto text-gray-300 mt-4 pr-2">
                  {images[selectedIndex].description}
                </div>
              )}

              <p className="text-sm text-gray-400 mt-4">
                {new Date(
                  images[selectedIndex].createdAt
                ).toLocaleString()}
              </p>

              <button
                onClick={() => setSelectedIndex(null)}
                className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
              >
                Close
              </button>
            </div>

            {/* PREV */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full text-xl"
            >
              ‹
            </button>

            {/* NEXT */}
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
