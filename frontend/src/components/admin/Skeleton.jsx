export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-gray-200 dark:bg-gray-700 h-40 rounded-2xl"
        />
      ))}
    </div>
  );
}
