import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { getImages } from "../services/images";

export default function Home() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getImages();
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error("Failed to fetch images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-r from-slate-900 to-black text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to Football Fans
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Explore exclusive fan moments, powerful highlights, and unforgettable
          football memories.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/videos"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            View Videos
          </Link>

          <Link
            to="/gallery"
            className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            View Gallery
          </Link>
        </div>
      </section>

      {/* ================= IMAGE SECTION ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">

          {/* ===== LOADING SPINNER ===== */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* ===== SLIDER ===== */}
          {!loading && images.length > 0 && (
            <>
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={images.length > 1}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                speed={800}
                observer={true}
                observeParents={true}
                touchStartPreventDefault={false}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {images.map((img) => (
                  <SwiperSlide key={img._id}>
                    <div
                      onClick={() => setSelectedImage(img)}
                      className="relative cursor-pointer rounded-xl overflow-hidden shadow-xl group bg-slate-800"
                    >
                      {/* TITLE BAR */}
                      <div className="absolute top-0 left-0 right-0 bg-black/70 px-4 py-2 z-10">
                        <h3 className="text-white font-semibold text-sm md:text-base truncate">
                          {img.title || "Untitled"}
                        </h3>
                      </div>

                      {/* IMAGE */}
                      <img
                        src={img.imageUrl}
                        alt={img.title}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-black/30"></div>

                      {/* DESCRIPTION */}
                      {img.description && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                          <p className="text-sm text-gray-300 line-clamp-2">
                            {img.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* GALLERY BUTTON */}
              <div className="text-center mt-12">
                <Link
                  to="/gallery"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  View Full Gallery
                </Link>
              </div>
            </>
          )}

          {/* ===== EMPTY STATE ===== */}
          {!loading && images.length === 0 && (
            <div className="text-center text-gray-400 py-20">
              No images available yet.
            </div>
          )}

        </div>
      </section>

      {/* ================= MODAL ================= */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div
            className="max-w-4xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full rounded-lg shadow-2xl"
            />

            <div className="bg-slate-900 text-white p-6 rounded-b-lg">
              <h2 className="text-2xl font-bold">
                {selectedImage.title}
              </h2>

              {selectedImage.description && (
                <p className="text-gray-300 mt-3">
                  {selectedImage.description}
                </p>
              )}

              <button
                onClick={() => setSelectedImage(null)}
                className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
