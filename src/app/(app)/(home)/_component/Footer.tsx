// components/Footer.tsx
import Link from "next/link";
import MyLogo from "./MyLogo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200   max-h-[90px] footer h-18 py-4  ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        {/* Brand */}
        <div className="text-gray-800 font-semibold text-lg">
          <MyLogo width="100" height="40" />
        </div>

        {/* Navigation */}
        <div className="flex space-x-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition">
            Explore
          </Link>
          <Link href="/about" className="hover:text-gray-900 transition">
            About
          </Link>
          <Link href="/contact-us" className="hover:text-gray-900 transition">
            Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-gray-900 transition">
          Privacy policy
          </Link>
        </div>

        {/* Socials */}
        <div className="flex space-x-5 pb-4 md:pb-0">
          {/* X (Twitter) */}
          <a
            href="https://x.com/FinoBlitz?t=p5qiLi_RN1qqUOyeas5mFA&s=09"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.8 3H17l-4.1 6.1L8.3 3H3l6.9 9.9L3.5 21h4.9l3.9-5.8 4.1 5.8h5l-7.2-10.1L20.8 3z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 10-11.63 9.88v-7h-2v-2.88h2V9.4c0-2 1.2-3.11 3-3.11.87 0 1.79.16 1.79.16v2h-1c-1 0-1.31.62-1.31 1.26v1.51h2.22l-.35 2.88h-1.87v7A10 10 0 0022 12z" />
            </svg>
          </a>

          {/* Gmail */}
          <a
            href="mailto:finoblitz@gmail.com"
            aria-label="Gmail"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18v-9.99l8 6 8-6V18H4z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
