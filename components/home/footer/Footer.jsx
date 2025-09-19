import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaYoutubeSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="px-4 divide-y bg-white text-gray-800 dark:bg-black dark:text-gray-200 transition-colors duration-300">
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          {/* Logo */}
          <div className="lg:w-1/3 mx-auto ">
            <Link
              rel="noopener noreferrer"
              href="#"
              className="flex justify-center space-x-3 lg:justify-center "
            >
              <span className="self-center text-2xl font-bold text-gray-900 dark:text-white">
                Quick Drop
              </span>
            </Link>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase font-bold text-gray-900 dark:text-gray-100">
                Product
              </h3>
              <ul className="space-y-1">
                <li><Link href="#">Features</Link></li>
                <li><Link href="#">Integrations</Link></li>
                <li><Link href="#">Pricing</Link></li>
                <li><Link href="#">FAQ</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="tracking-wide uppercase font-bold text-gray-900 dark:text-gray-100">
                Company
              </h3>
              <ul className="space-y-1">
                <li><Link href="#">Privacy</Link></li>
                <li><Link href="#">Terms of Service</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="uppercase font-bold text-gray-900 dark:text-gray-100">
                Developers
              </h3>
              <ul className="space-y-1">
                <li><Link href="#">Public API</Link></li>
                <li><Link href="#">Documentation</Link></li>
                <li><Link href="#">Guides</Link></li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h3 className="uppercase font-bold text-gray-900 dark:text-gray-100">
                Social media
              </h3>
              <div className="flex justify-start space-x-3">
                <Link href="#" title="Facebook" className="flex items-center p-1">
                  <FaFacebook />
                </Link>
                <Link href="#" title="Twitter" className="flex items-center p-1">
                  <FaTwitter />
                </Link>
                <Link href="#" title="YouTube" className="flex items-center p-1">
                  <FaYoutubeSquare />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 text-sm text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Quick Drop. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
