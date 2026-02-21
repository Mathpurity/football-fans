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
          const sorted = [...data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setImages(sorted);
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

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About Football Fans
            </h2>

            <p className="text-gray-400 mb-4 leading-relaxed">
              Football Fans is a growing digital platform dedicated to sharing
              unforgettable moments, powerful match highlights, and passionate
              fan experiences from around the world.
            </p>

            <p className="text-gray-400 mb-4 leading-relaxed">
              Our mission is to create a community where football lovers can
              relive exciting memories, celebrate victories, and stay inspired
              by the beautiful game.
            </p>

            <p className="text-gray-400 leading-relaxed">
              This platform continues to grow with new content, exclusive
              uploads, and exciting features built for fans by fans.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-72 h-72 md:w-80 md:h-80 border-4 border-blue-600 rounded-2xl overflow-hidden shadow-2xl bg-slate-800 flex items-center justify-center">
              <img
                src="https://via.placeholder.com/400x400.png?text=Owner+Photo"
                alt="Owner"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-center py-2">
                <p className="text-sm text-gray-300">
                  Founder / Owner
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RECENT PHOTOS SECTION ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">

          {/* SECTION TITLE */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Recent Photos
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              Explore the latest uploaded moments from our football community.
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* BEAUTIFUL LOADER */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 space-y-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 animate-ping opacity-30"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-500"></div>
                <div className="absolute inset-2 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                  ⚽
                </div>
              </div>

              <p className="text-blue-400 text-sm tracking-widest animate-pulse uppercase">
                Loading Recent Photos...
              </p>
            </div>
          )}

          {/* SLIDER */}
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
                }}
                speed={800}
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
                      <div className="absolute top-0 left-0 right-0 bg-black/70 px-4 py-2 z-10">
                        <h3 className="text-white font-semibold text-sm md:text-base truncate">
                          {img.title || "Untitled"}
                        </h3>
                      </div>

                      <img
                        src={img.imageUrl}
                        alt={img.title}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/30"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

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
