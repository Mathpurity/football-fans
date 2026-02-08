export async function fetchVideos() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/youtube/videos`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }

  return res.json();
}
