
import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaYoutubeSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Quick Drop
            </span>
          </Link>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm">
            Fast, reliable, and secure courier services across Bangladesh. Join thousands of happy customers today.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="#" title="Facebook" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <FaFacebook className="text-gray-700 dark:text-gray-200" />
            </Link>
            <Link href="#" title="Twitter" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <FaTwitter className="text-gray-700 dark:text-gray-200" />
            </Link>
            <Link href="#" title="YouTube" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <FaYoutubeSquare className="text-gray-700 dark:text-gray-200" />
            </Link>
          </div>
        </div>

        {/* Product Links */}
        <div className="space-y-4">
          <h3 className="text-gray-900 dark:text-white font-bold uppercase tracking-wide">Product</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><Link href="#" className="hover:text-yellow-500 transition">Features</Link></li>
            <li><Link href="#" className="hover:text-yellow-500 transition">Integrations</Link></li>
            {/* <li><Link href="#" className="hover:text-yellow-500 transition">Pricing</Link></li> */}
            <li><Link href="#" className="hover:text-yellow-500 transition">FAQ</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="space-y-4">
          <h3 className="text-gray-900 dark:text-white font-bold uppercase tracking-wide">Company</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><Link href="/about" className="hover:text-yellow-500 transition">About</Link></li>
            <li><Link href="#" className="hover:text-yellow-500 transition">Contact</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-500 transition">Privacy</Link></li>
            <li><Link href="#" className="hover:text-yellow-500 transition">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Developers Links */}
        <div className="space-y-4">
          <h3 className="text-gray-900 dark:text-white font-bold uppercase tracking-wide">Developers</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><Link href="#" className="hover:text-yellow-500 transition">Public API</Link></li>
            <li><Link href="#" className="hover:text-yellow-500 transition">Documentation</Link></li>
            <li><Link href="#" className="hover:text-yellow-500 transition">Guides</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 dark:border-gray-700 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-yellow-500">Quick Drop</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
