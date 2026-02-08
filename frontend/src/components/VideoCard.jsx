export default function VideoCard({ video }) {
  const videoId = video.id.videoId;
  const { title, description, thumbnails } = video.snippet;

  return (
    <div className="rounded shadow bg-white overflow-hidden">
      <iframe
        className="w-full h-56"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allowFullScreen
      />

      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2">{title}</h3>
        <p className="text-xs text-gray-600 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
