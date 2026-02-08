import { useEffect, useState } from "react";
import Container from "../components/Container";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/images`)
      .then((r) => r.json())
      .then(setImages);
  }, []);

  return (
    <Container>
      <h1 className="text-3xl font-semibold mb-6">Gallery</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <img key={img._id} src={img.imageUrl} alt={img.title} />
        ))}
      </div>
    </Container>
  );
}
