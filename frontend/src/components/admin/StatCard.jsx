export default function StatCard({ title, value, loading }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow">
      {loading ? (
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
      ) : (
        <>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </>
      )}
    </div>
  );
}
