import React from "react";
import { RefreshCw, Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  const handleRefresh = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 relative">
      <div className="max-w-md w-full text-center">
        {/* Error Icon with Animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center animate-pulse">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-red-100 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Something went wrong
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              We encountered an unexpected error. Do not worry, our team
              has been notified and we are working to fix it.
            </p>
          </div>

          {/* Error Details (if available) */}
          {/* {error && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Error Details:
              </h3>
              <p className="text-xs text-gray-500 font-mono break-all">
                {error.message || "Unknown error occurred"}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-400 mt-1">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )} */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleRefresh}
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 hover:scale-105 active:scale-95"
              size="lg"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-105 active:scale-95"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>

          {/* Support Information */}
          {/* <div className="pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Need help? Contact our{" "}
              <a 
                href="mailto:support@example.com" 
                className="text-gray-700 hover:text-gray-900 underline transition-colors duration-200"
              >
                support team
              </a>
            </p>
          </div> */}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-200 rounded-full opacity-60 animate-bounce"></div>
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-gray-300 rounded-full opacity-40 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gray-200 rounded-full opacity-50 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
};

export default ErrorPage;
