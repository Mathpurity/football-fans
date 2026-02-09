export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-24 bg-gray-300 dark:bg-gray-700 rounded"
        />
      ))}
    </div>
  );
}
