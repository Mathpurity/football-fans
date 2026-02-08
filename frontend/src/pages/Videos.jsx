import { useEffect, useState } from "react";
import Container from "../components/Container";
import VideoCard from "../components/VideoCard";
import { fetchVideos } from "../services/youtube";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVideos()
      .then(setVideos)
      .catch(() => setError("Failed to load videos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Container>Loading videos...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
      <h1 className="text-3xl font-semibold mb-6">Latest Videos</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.id.videoId} video={video} />
        ))}
      </div>
    </Container>
  );
}
