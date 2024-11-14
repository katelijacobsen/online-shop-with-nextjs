"use client";

const Footer = () => {
  return (
    <footer className="bg-gray-50 rounded-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            {/* <img src={0} className="h-8" alt="Logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Logo Name
            </span>
          </a>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="#" className="hover:underline">
            Design by Katja Mähleke
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
