export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page title */}
      <div className="h-8 w-40 bg-slate-200 dark:bg-slate-700 rounded-lg" />

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
            <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-6" />
          <div className="h-72 bg-slate-100 dark:bg-slate-700 rounded-lg" />
        </div>
        <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-6" />
          <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-lg" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex gap-4 items-center">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-3 w-28 bg-slate-100 dark:bg-slate-700/50 rounded" />
            </div>
            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
