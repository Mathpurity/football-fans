import { useEffect, useState } from "react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import StatCard from "../../components/admin/StatCard";
import Skeleton from "../../components/admin/Skeleton";
import { getStats } from "../../services/stats";
import { getAdminImages, deleteImage } from "../../services/images";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  

  const imagesPerPage = 6;

  useEffect(() => {
    fetchStats();
    fetchImages();
  }, []);

  async function fetchStats() {
    try {
      const data = await getStats();
      setStats(data);
    } catch {
      setError(true);
      setStats({ images: 0, videos: 0, messages: 0 });
    }
  }

  async function fetchImages() {
    try {
      const data = await getAdminImages();
      setImages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    } finally {
      setLoadingImages(false);
    }
  }

  async function handleDelete(id) {
    const confirm = await Swal.fire({
      title: "Delete Image?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteImage(id);
      setImages((prev) => prev.filter((img) => img._id !== id));
      Swal.fire("Deleted!", "Image removed successfully.", "success");
    } catch {
      Swal.fire("Error", "Failed to delete image.", "error");
    }
  }

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const indexOfLast = currentPage * imagesPerPage;
  const indexOfFirst = indexOfLast - imagesPerPage;
  const currentImages = images.slice(indexOfFirst, indexOfLast);

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-10">

        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Overview
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Monitor platform activity.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg">
            Failed to load stats — showing defaults.
          </div>
        )}

        {!stats ? (
          <Skeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard title="Images" value={stats?.images} />
            <StatCard title="Videos" value={stats?.videos} />
            <StatCard title="Messages" value={stats?.messages} />
          </div>
        )}

       {/* ================= IMAGE MANAGEMENT ================= */}
<div className="mt-10">
  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
    Uploaded Images ({images.length})
  </h3>

  {/* ================= BEAUTIFUL LOADER ================= */}
  {loadingImages ? (
    <div className="flex flex-col items-center justify-center py-24 space-y-6">

      <div className="relative w-24 h-24">

        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 animate-ping opacity-30"></div>

        {/* Static Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-500"></div>

        {/* Center Icon */}
        <div className="absolute inset-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
          ⚙
        </div>
      </div>

      <p className="text-blue-600 uppercase tracking-widest text-sm animate-pulse">
        Loading Images...
      </p>

    </div>
  ) : images.length === 0 ? (
    <p className="text-gray-500">No images uploaded yet.</p>
  ) : (
    <>
      {/* ================= PAGINATION LOGIC ================= */}
      {(() => {
        const imagesPerPage = 6;
        const totalPages = Math.ceil(images.length / imagesPerPage);
        const indexOfLast = currentPage * imagesPerPage;
        const indexOfFirst = indexOfLast - imagesPerPage;
        const currentImages = images.slice(indexOfFirst, indexOfLast);

        return (
          <>
            {/* ================= IMAGE GRID ================= */}
            <div className="grid md:grid-cols-3 gap-6">
              {currentImages.map((img) => (
                <div
                  key={img._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-gray-800 dark:text-white">
                      {img.title || "Untitled"}
                    </h4>

                    {img.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {img.description}
                      </p>
                    )}

                    <p className="text-xs text-gray-400">
                      {new Date(img.createdAt).toLocaleString()}
                    </p>

                    <button
                      onClick={() => handleDelete(img._id)}
                      className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= PAGINATION CONTROLS ================= */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-10">

                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition"
                >
                  Prev
                </button>

                <span className="font-semibold text-gray-700 dark:text-white">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition"
                >
                  Next
                </button>

              </div>
            )}
          </>
        );
      })()}
    </>
  )}
</div>

   </div>
    </DashboardLayout>
  );
}