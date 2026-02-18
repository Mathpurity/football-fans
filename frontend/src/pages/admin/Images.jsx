import { useEffect, useState } from "react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import {
  getAdminImages,
  createImage,
  updateImage,
  deleteImage,
} from "../../services/images";
import Swal from "sweetalert2";

export default function ImagesAdmin() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await getAdminImages();
      setImages(data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch images", "error");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!form.image) {
      return Swal.fire("Error", "Please select an image", "error");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("image", form.image);

      await createImage(formData);

      Swal.fire("Success", "Image uploaded successfully", "success");

      setForm({ title: "", description: "", image: null });
      fetchImages();
    } catch (error) {
      Swal.fire("Error", "Upload failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Image?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteImage(id);
      Swal.fire("Deleted", "Image removed", "success");
      fetchImages();
    } catch (error) {
      Swal.fire("Error", "Failed to delete", "error");
    }
  };

  const handleApprove = async (image) => {
    try {
      await updateImage(image._id, {
        isApproved: !image.isApproved,
      });

      Swal.fire(
        "Updated",
        image.isApproved ? "Image unapproved" : "Image approved",
        "success"
      );

      fetchImages();
    } catch (error) {
      Swal.fire("Error", "Failed to update", "error");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Upload Image</h2>

          <form onSubmit={handleUpload} className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="border p-3 rounded"
            />

            <input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-3 rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
              className="border p-3 rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-3 bg-black text-white py-3 rounded hover:bg-gray-800 transition"
            >
              {loading ? "Uploading..." : "Upload Image"}
            </button>
          </form>
        </div>

        {/* Image Count */}
        <div className="mb-6 font-semibold text-gray-700">
          Total Images: {images.length}
        </div>

        {/* Images Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image._id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg">
                  {image.title || "Untitled"}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  {image.description}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      image.isApproved
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {image.isApproved ? "Approved" : "Pending"}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(image)}
                      className="text-blue-600 text-sm"
                    >
                      {image.isApproved ? "Unapprove" : "Approve"}
                    </button>

                    <button
                      onClick={() => handleDelete(image._id)}
                      className="text-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
