import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"; // ✅ install react-icons if not done

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 border-t border-gray-800 -mt-3">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* 🔹 Social Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            <FaYoutube size={20} />
          </a>
        </div>

        {/* 🔹 Footer Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm md:gap-10 mb-6">
          <li className="hover:text-white cursor-pointer transition-colors">
            Help Center
          </li>
          <li className="hover:text-white cursor-pointer transition-colors">
            Terms of Use
          </li>
          <li className="hover:text-white cursor-pointer transition-colors">
            Privacy
          </li>
          <li className="hover:text-white cursor-pointer transition-colors">
            About Us
          </li>
          <li className="hover:text-white cursor-pointer transition-colors">
            Contact
          </li>
        </ul>

        {/* 🔹 Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4"></div>

        {/* 🔹 Copyright */}
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Netflix-GPT by Naveen Moka. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
