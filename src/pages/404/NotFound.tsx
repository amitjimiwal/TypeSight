/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ih4uWSIM4eh
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Link} from "react-router-dom"

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-9xl font-bold tracking-tighter">404</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Oops, the page you are looking for could not be found.
        </p>
      </div>
      <Link
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        to="/"
      >
        Go to Home
      </Link>
    </main>
  )
}