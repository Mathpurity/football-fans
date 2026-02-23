export async function fetchVideos() {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/youtube/videos`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }

  return res.json();
}