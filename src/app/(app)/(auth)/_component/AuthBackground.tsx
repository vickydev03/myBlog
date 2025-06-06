import React from 'react';

interface AuthBackgroundProps {
  children: React.ReactNode;
  quote?: string;
  title: string;
  subtitle: string;
}

const AuthBackground = ({ children, quote = "TECH TALES", title, subtitle }: AuthBackgroundProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden">
        {/* Left Side - Gradient Background with Quote */}
        <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 p-16 flex flex-col justify-center overflow-hidden">
          {/* Animated Wave Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform skew-y-12 animate-wave"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12 animate-wave" style={{ animationDelay: '2s' }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform skew-y-6 animate-wave" style={{ animationDelay: '4s' }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-white/70 text-xs font-semibold mb-12 tracking-[0.2em] uppercase">
              {quote}
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              {title}
            </h1>
            
            <p className="text-white/90 text-xl leading-relaxed max-w-lg font-light">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white p-16 flex flex-col justify-center min-h-[600px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthBackground;