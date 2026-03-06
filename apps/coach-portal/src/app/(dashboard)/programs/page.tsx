export default function ProgramsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Programs</h1>
        <p className="text-slate-500">Build and manage training programs</p>
      </div>

      <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
          <span className="text-2xl text-slate-400">P</span>
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Program Builder
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Create weekly training programs with workouts, assign them to athletes,
          and track their progress.
        </p>
        <div className="mt-4 inline-block bg-slate-100 text-slate-500 px-4 py-2 rounded-full text-sm font-medium">
          Coming in Phase 2
        </div>
      </div>
    </div>
  );
}
