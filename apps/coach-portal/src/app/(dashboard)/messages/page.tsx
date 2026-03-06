export default function MessagesPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
        <p className="text-slate-500">
          Communicate with your athletes
        </p>
      </div>

      <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
          <span className="text-2xl text-slate-400">M</span>
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Messaging
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Direct messages and workout feedback with your athletes, powered by
          Supabase Realtime.
        </p>
        <div className="mt-4 inline-block bg-slate-100 text-slate-500 px-4 py-2 rounded-full text-sm font-medium">
          Coming in Phase 4
        </div>
      </div>
    </div>
  );
}
