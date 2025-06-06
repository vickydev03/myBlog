// "use client"
import Image from "next/image";
import React from "react";
import { TrendingUp, BarChart3, Brain, Zap } from "lucide-react";
import Link from "next/link";
import LoginForm from "@/app/(app)/(auth)/_component/LoginForm";
// import { useRouter } from 'next/navigation';

function LoginView() {
  return (
    <div className="min-h-screen flex font-lora bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-lg space-y-8">
          {/* Logo/Brand Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                FinanceHub
              </h1>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-700">
                Welcome back to our learning community
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Continue reading our latest blog posts about finance,
                technology, AI, and business. Join us as we learn and grow
                together in these exciting fields.
              </p>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="flex justify-center space-x-6 py-4">
            <div className="flex items-center space-x-2 text-slate-600">
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">AI Topics</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <BarChart3 className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">Finance Basics</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Tech News</span>
            </div>
          </div>

          {/* Form */}
          <LoginForm />

          <div className="text-center">
            <p className="text-slate-600">
              New to our community?{" "}
              <Link
                href="/signup"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Join our learning journey
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <Image
          width={800}
          height={600}
          priority
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Learning about finance and technology through blogging and research"
          className="absolute inset-0 w-full h-full object-cover"
         sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-indigo-900/90"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <div className="text-white space-y-8 max-w-md">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold leading-tight">
                Learning Finance & Tech Together
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Follow our journey as we explore the world of finance, discover
                new technologies, and share what we learn about AI and business
                trends.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/30 backdrop-blur-sm flex items-center justify-center border border-blue-400/20">
                  <Brain className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-blue-100 font-medium">
                  Beginner-friendly AI explanations
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/30 backdrop-blur-sm flex items-center justify-center border border-indigo-400/20">
                  <BarChart3 className="w-4 h-4 text-indigo-300" />
                </div>
                <span className="text-blue-100 font-medium">
                  Simple finance market insights
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/30 backdrop-blur-sm flex items-center justify-center border border-purple-400/20">
                  <Zap className="w-4 h-4 text-purple-300" />
                </div>
                <span className="text-blue-100 font-medium">
                  Latest tech trends we discover
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-3 border-white/30 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">📚</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-3 border-white/30 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">💡</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-3 border-white/30 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🚀</span>
                </div>
              </div>
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Join 100+ fellow learners
                </p>
                <p className="text-blue-200/80 text-xs">
                  Growing our knowledge together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
