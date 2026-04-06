export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-3xl bg-secondary" />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-3xl bg-secondary" />
      <div className="h-96 animate-pulse rounded-3xl bg-secondary" />
    </div>
  );
}
