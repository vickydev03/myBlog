"use client";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-full opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-40 animate-bounce delay-500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-l from-purple-200 to-pink-200 rounded-full opacity-30 animate-bounce delay-700"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 404 Number with creative styling */}
        <div className="mb-8 relative">
          <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 select-none leading-none tracking-tight">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-gray-200 rounded-full animate-spin opacity-20"></div>
          </div>
        </div>

        {/* Error content */}
        <div className="mb-12 space-y-6">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 tracking-wide">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            The page you &apos re looking for might have been moved, deleted, or
            perhaps you just mistyped the URL.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/"
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <Home size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-3 bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Go Back</span>
          </button>
        </div>

        {/* Helpful suggestions */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            What can you do?
          </h3>
          <ul className="text-gray-600 space-y-2 text-sm md:text-base">
            <li>• Check if the URL is typed correctly</li>
            <li>• Go back to the previous page</li>
            <li>• Visit our homepage to find what you &apos re looking for</li>
          </ul>
        </div>

        {/* Error details */}
        <div className="mt-8 text-gray-400 text-sm">
          <p>Error 404 • {location.pathname}</p>
        </div>
      </div>

      {/* Decorative floating dots */}
      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/5 w-2 h-2 bg-purple-300 rounded-full animate-ping delay-300 opacity-30"></div>
      <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-pink-300 rounded-full animate-ping delay-700 opacity-25"></div>
    </div>
  );
};

export default NotFound;
