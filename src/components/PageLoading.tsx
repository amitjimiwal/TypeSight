export default function PageLoading() {
  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-4">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Loading Page{" "}
          <span className="animate-bounce text-3xl font-extrabold">.</span>
          <span className="animate-bounce text-3xl font-extrabold">.</span>
          <span className="animate-bounce text-3xl font-extrabold">.</span>
          <span className="animate-bounce text-3xl font-extrabold">.</span>
        </p>
      </div>
    </main>
  );
}
