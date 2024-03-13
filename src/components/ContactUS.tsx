export default function ContactUS() {
  return (
    <section
      id="contact"
      className="py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="relative max-w-xl mx-auto">
        <svg
          aria-hidden="true"
          className="absolute left-full transform translate-x-1/2"
          fill="none"
          height="404"
          viewBox="0 0 404 404"
          width="404"
        >
          <defs>
            <pattern
              height="20"
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              patternUnits="userSpaceOnUse"
              width="20"
              x="0"
              y="0"
            >
              <rect
                className="text-gray-200"
                fill="currentColor"
                height="4"
                width="4"
                x="0"
                y="0"
              />
            </pattern>
          </defs>
          <rect
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            height="404"
            width="404"
          />
        </svg>
        <svg
          aria-hidden="true"
          className="absolute right-full bottom-0 transform -translate-x-1/2"
          fill="none"
          height="404"
          viewBox="0 0 404 404"
          width="404"
        >
          <defs>
            <pattern
              height="20"
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              patternUnits="userSpaceOnUse"
              width="20"
              x="0"
              y="0"
            >
              <rect
                className="text-gray-200"
                fill="currentColor"
                height="4"
                width="4"
                x="0"
                y="0"
              />
            </pattern>
          </defs>
          <rect
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            height="404"
            width="404"
          />
        </svg>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight  sm:text-4xl">
            Have Questions?
          </h2>
          <p className="mt-4 text-lg leading-6 tex dark:text-green-200">
            Please feel free to call or email us, or use our contact form to get
            in touch with us. We look forward to hearing from you!
          </p>
        </div>
        <div className="mt-12">
          <form
            action="#"
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            method="POST"
          >
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="first-name"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  autoComplete="given-name"
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  id="first-name"
                  name="first-name"
                  type="text"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  autoComplete="email"
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  id="email"
                  name="email"
                  type="email"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="subject"
              >
                Subject
              </label>
              <div className="mt-1">
                <input
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  id="subject"
                  name="subject"
                  type="text"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="message"
              >
                Your Message
              </label>
              <div className="mt-1">
                <textarea
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                  id="message"
                  name="message"
                  rows={4}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
