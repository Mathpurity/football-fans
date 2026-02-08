import { useState } from "react";
import Container from "../components/Container";
import { success, error } from "../utils/notify";

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

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error();

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
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>

        <form onSubmit={submit} className="space-y-4">
          <input
            name="name"
            placeholder="Your name"
            className="border p-3 w-full rounded"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Your email"
            className="border p-3 w-full rounded"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your message"
            className="border p-3 w-full rounded"
            rows={5}
            value={form.message}
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </Container>
  );
}
