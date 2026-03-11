import { useEffect, useState } from "react";
import { confirmDelete, success } from "../../utils/notify";
import {
  getMessages,
  deleteMessage,
  markMessageAsRead,
} from "../../services/messages";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getMessages();
      const list = Array.isArray(data) ? data : [];

      setMessages(list);

      // Mark unread messages as read
      const unreadMessages = list.filter((msg) => !msg.read);

      if (unreadMessages.length > 0) {
        await Promise.all(
          unreadMessages.map((msg) => markMessageAsRead(msg._id))
        );

        setMessages((prev) =>
          prev.map((msg) => ({
            ...msg,
            read: true,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  async function remove(id) {
    const result = await confirmDelete("Delete this message?");

    if (!result.isConfirmed) return;

    try {
      await deleteMessage(id);
      success("Message deleted");
      load();
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 animate-ping opacity-30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-500"></div>
          <div className="absolute inset-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
            ✉
          </div>
        </div>

        <p className="text-blue-600 uppercase tracking-widest text-sm animate-pulse">
          Loading Messages...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Inbox</h1>

      {messages.length === 0 && (
        <p className="text-gray-500">No messages yet.</p>
      )}

      <div className="space-y-6">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`border rounded-xl p-5 shadow hover:shadow-lg transition ${
              !m.read ? "bg-blue-50 border-blue-400" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="font-semibold text-lg">{m.name}</p>
                <p className="text-sm text-gray-600">{m.email}</p>

                {!m.read && (
                  <span className="inline-block mt-2 text-xs bg-blue-600 text-white px-2 py-1 rounded">
                    NEW
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-400 whitespace-nowrap">
                {new Date(m.createdAt).toLocaleString()}
              </p>
            </div>

            <p className="my-4 text-gray-700 whitespace-pre-line">
              {m.message}
            </p>

            <button
              onClick={() => remove(m._id)}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}