import { PopupButton } from "@typeform/embed-react";
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
        <PopupButton
          id={String(import.meta.env.VITE_APP_TYPEFORM_FEEDBACK_ID)}
          style={{ fontSize: 20 ,width: "100%", marginTop: "20px"}}
          className="my-button"
        >
          <button
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Send Your FeedBack/Query
          </button>
        </PopupButton>
      </div>
    </section>
  );
}
