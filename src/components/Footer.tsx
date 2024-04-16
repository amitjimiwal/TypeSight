import React, { useCallback } from "react";

const Footer: React.FC = () => {
  const scrolltop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-center">
          <div
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse cursor-pointer"
            onClick={scrolltop}
          >
            <img src="/logo.png" className="h-8" alt="TypeSight Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              TypeSight
            </span>
          </div>
          {/* <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#about" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#license" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul> */}
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <span className="hover:underline" onClick={scrolltop}>
            Typesight™
          </span>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
