export default function StatCard({ title, value }) {
  const safeValue = value ?? 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">

      <p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-4 text-gray-900 dark:text-white">
        {safeValue}
      </h2>

      <div className="mt-6 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full w-2/3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 rounded-full"></div>
      </div>

    </div>
  );
}
