import { useState } from "react";
import Container from "../components/Container";
import { success, error } from "../utils/notify";
import { sendMessage } from "../services/messages";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return error("Please fill all fields");
    }

    try {
      setLoading(true);

      await sendMessage(form);

      success("Message sent successfully 🎉");
      setForm({ name: "", email: "", message: "" });
    } catch {
      error("Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Contact Us
        </h1>

        <form onSubmit={submit} className="space-y-5">

          <input
            name="name"
            placeholder="Your name"
            className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Your email"
            className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your message"
            className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
            rows={5}
            value={form.message}
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded flex items-center justify-center gap-2 transition hover:bg-gray-800"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>

        </form>
      </div>
    </Container>
  );
}
