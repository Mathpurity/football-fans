import { useEffect, useState } from "react";
import StatCard from "../../components/admin/StatCard";
import Skeleton from "../../components/admin/Skeleton";
import { getStats } from "../../services/stats";
import { getAdminImages, deleteImage } from "../../services/images";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../utils/auth";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const imagesPerPage = 6;

  /* ================= AUTO LOGOUT ================= */
  useEffect(() => {
    let inactivityTimer;
    let warningTimer;

    const logoutUser = () => {
      clearToken();
      localStorage.removeItem("user");
      navigate("/admin/login", { replace: true });
    };

    const showWarning = () => {
      Swal.fire({
        title: "Session Expiring",
        text: "You will be logged out in 30 seconds due to inactivity.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Stay Logged In",
        cancelButtonText: "Logout Now",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          resetTimer();
        } else {
          logoutUser();
        }
      });

      warningTimer = setTimeout(logoutUser, 30000);
    };

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      inactivityTimer = setTimeout(showWarning, 5 * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [navigate]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchStats();
    fetchImages();
  }, []);

  async function fetchStats() {
    try {
      const data = await getStats();

      setStats({
        images: data?.images || 0,
        videos: data?.videos || 0,
        messages: data?.messages || 0,
      });
    } catch (error) {
      console.error("Stats fetch error:", error);
      setError(true);

      setStats({
        images: 0,
        videos: 0,
        messages: 0,
      });
    }
  }

  async function fetchImages() {
    try {
      const data = await getAdminImages();
      setImages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch images:", error);
      Swal.fire("Error", "Failed to load images", "error");
    } finally {
      setLoadingImages(false);
    }
  }

  /* ================= DELETE IMAGE ================= */
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

  function changePage(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ================= UI ================= */
  return (
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
          <StatCard title="Images" value={stats.images} />
          <StatCard title="Videos" value={stats.videos} />
          <StatCard title="Messages" value={stats.messages} />
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          Uploaded Images ({images.length})
        </h3>

        {loadingImages ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 animate-ping opacity-30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-500"></div>
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
            <div className="grid md:grid-cols-3 gap-6">
              {currentImages.map((img) => (
                <div
                  key={img._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title || "Untitled"}
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

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
                  className="px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition"
                >
                  Prev
                </button>

                <span className="font-semibold text-gray-700 dark:text-white">
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
          </>
        )}
      </div>
    </div>
  );
}