export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          FitPulse AI
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Fitness tracking, simplified.</h1>
        <p className="text-lg text-muted-foreground">
          The app is running in a static fallback mode while the database and Prisma client are unavailable.
          This keeps the home page loading and lets you continue the build without crashing on startup.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/login"
            className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Go to login
          </a>
          <a
            href="/dashboard"
            className="rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:bg-accent"
          >
            Open dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
