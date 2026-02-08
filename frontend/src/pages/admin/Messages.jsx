import { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";
import { confirmDelete, success } from "../../utils/notify";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/messages`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    setMessages(await res.json());
  }

  async function remove(id) {
    const result = await confirmDelete("Delete this message?");
    if (!result.isConfirmed) return;

    await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/messages/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    success("Message deleted");
    load();
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Inbox</h1>

      {messages.length === 0 && (
        <p className="text-gray-500">No messages yet.</p>
      )}

      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m._id} className="border rounded p-4 bg-white shadow">
            <p className="font-semibold">{m.name}</p>
            <p className="text-sm text-gray-600">{m.email}</p>
            <p className="my-3">{m.message}</p>

            <button
              onClick={() => remove(m._id)}
              className="text-red-600 underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
