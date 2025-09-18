import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaYoutubeSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="px-4 divide-y dark:bg-gray-100 dark:text-gray-800">
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div className="lg:w-1/3 mx-auto ">
            <Link
              rel="noopener noreferrer"
              href="#"
              className="flex justify-center space-x-3 lg:justify-center "
            >
              {/* <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-600">
                
              </div> */}
              <span className="self-center text-2xl font-bold ">
                Quick Drop
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase dark:text-gray-900 font-bold">
                Product
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Features
                  </Link>
                </li>
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase dark:text-gray-900 font-bold">
                Company
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="uppercase dark:text-gray-900 font-bold">
                Developers
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Public API
                  </Link>
                </li>
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="uppercase dark:text-gray-900 font-bold">
                Social media
              </div>
              <div className="flex justify-start space-x-3">
                <Link
                  rel="noopener noreferrer"
                  href="#"
                  title="Facebook"
                  className="flex items-center p-1"
                >
                  <FaFacebook />
                </Link>
                <Link
                  rel="noopener noreferrer"
                  href="#"
                  title="Twitter"
                  className="flex items-center p-1"
                >
                  <FaTwitter />
                </Link>
                <Link
                  rel="noopener noreferrer"
                  href="#"
                  title="YouTube"
                  className="flex items-center p-1"
                >
                  <FaYoutubeSquare />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 text-sm text-center dark:text-gray-600">
          © {new Date().getFullYear()} Quick Drop. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
