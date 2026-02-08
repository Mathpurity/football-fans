export default function SkeletonCard() {
  return (
    <div className="border rounded p-4 animate-pulse bg-white">
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
    </div>
  );
}
