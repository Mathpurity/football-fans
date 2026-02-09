import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Optional sections */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Football Fans?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Curated videos, exclusive images, and a growing community of fans.
        </p>
      </section>
    </>
  );
}
