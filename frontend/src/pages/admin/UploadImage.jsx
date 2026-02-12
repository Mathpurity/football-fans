import { useState } from "react";
import Swal from "sweetalert2";
import { createImage } from "../../services/images";

export default function UploadImage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire({
        icon: "error",
        title: "No Image Selected",
        text: "Please select an image before uploading",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", file);

      await createImage(formData);

      Swal.fire({
        icon: "success",
        title: "Uploaded!",
        text: "Image uploaded successfully",
      });

      setTitle("");
      setDescription("");
      setFile(null);
      e.target.reset();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong while uploading",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="max-w-2xl mx-auto mt-12">
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300">
      
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Upload New Image
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Add new images to your football gallery.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter image title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-900"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            placeholder="Optional description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-900"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-xl file:border-0 file:cursor-pointer hover:file:bg-blue-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-200 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  </div>
);

}
