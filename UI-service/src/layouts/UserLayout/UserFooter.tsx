import React from 'react';

const UserFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              {/* Remove the image, leaving only the text */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                News<span className='text-red-500'>Hub</span>
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Topics
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-4">
                <li>
                  <a href="/topics/politics" className="hover:underline">
                    Politics
                  </a>
                </li>
                <li>
                  <a href="/topics/business" className="hover:underline">
                    Business
                  </a>
                </li>
                <li>
                  <a href="/topics/technology" className="hover:underline">
                    Technology
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-4">
                <li>
                  <a href="https://X.com/newshub" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/newshub" className="hover:underline">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com/@newshub" className="hover:underline">
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-4">
                <li>
                  <a href="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-and-conditions" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 text-center dark:text-gray-400">
            © {currentYear} <a href="/" className="hover:underline">NewsHub™</a>. All Rights Reserved.
          </span>
          <div className="flex justify-center">
            <a href="https://x.com/newshub" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <i className="text-xl fa-brands fa-x-twitter"></i>
              <span className="sr-only">Twitter page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
