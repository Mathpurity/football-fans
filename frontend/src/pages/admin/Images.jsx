import { useEffect, useState } from "react";
import {
  getAdminImages,
  createImage,
  updateImage,
  deleteImage,
} from "../../services/images";




export default function ImagesAdmin() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setImages(await getAdminImages());
  }

  async function add() {
    if (!title || !imageUrl) return alert("Title and Image URL required");

    await createImage({ title, imageUrl, isApproved: false });
    setTitle("");
    setImageUrl("");
    refresh();
  }

  function startEdit(img) {
    setEditingId(img._id);
    setEditTitle(img.title);
    setEditImageUrl(img.imageUrl);
  }

  async function saveEdit(id) {
    await updateImage(id, {
      title: editTitle,
      imageUrl: editImageUrl,
    });
    setEditingId(null);
    refresh();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Images</h1>

      {/* ADD NEW IMAGE */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button onClick={add} className="bg-black text-white px-4">
          Add
        </button>
      </div>

      {/* IMAGE LIST */}
      <ul className="space-y-3">
        {images.map((img) => (
          <li key={img._id} className="border p-3">
            {editingId === img._id ? (
              /* EDIT MODE */
              <div className="space-y-2">
                <input
                  className="border p-2 w-full"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  className="border p-2 w-full"
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                />

                <div className="space-x-2">
                  <button
                    onClick={() => saveEdit(img._id)}
                    className="bg-green-600 text-white px-3 py-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 py-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* VIEW MODE */
              <div className="flex justify-between items-center">
                <span>
                  <strong>{img.title}</strong> —{" "}
                  {img.isApproved ? "Approved" : "Hidden"}
                </span>

                <div className="space-x-2">
                  <button
                    onClick={() => startEdit(img)}
                    className="underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      updateImage(img._id, {
                        isApproved: !img.isApproved,
                      }).then(refresh)
                    }
                    className="underline"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => deleteImage(img._id).then(refresh)}
                    className="text-red-600 underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
