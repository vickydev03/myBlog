import { BarChart3, Zap, Brain, TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import SignupForm from "../component/SignupForm";
import { Lora } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
const lora = Lora({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

function SignupView() {
  return (
    <div className={cn("min-h-screen flex font bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100",lora.className)}>
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-lg space-y-8">
          {/* Logo/Brand Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                FinanceHub
              </h1>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-700">
                Join our learning community
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Start your journey with us as we explore finance, technology,
                AI, and business. Perfect for beginners who want to learn and
                grow together.
              </p>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="flex justify-center space-x-6 py-4">
            <div className="flex items-center space-x-2 text-slate-600">
              <Brain className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">Learn AI</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <BarChart3 className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium">Finance Basics</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Zap className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">Tech Updates</span>
            </div>
          </div>

          {/* Form */}
          <SignupForm />

          <div className="text-center">
            <p className="text-slate-600">
              Already part of our community?{" "}
              <Link
                prefetch
                href="/login"
                className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Continue reading our blogs
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <Image
        loading="lazy"
        width={100}
        height={100}
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Beginning the journey of learning about finance, technology and business"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 to-teal-900/90"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <div className="text-white space-y-8 max-w-md">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold leading-tight">
                Start Your Learning Journey
              </h2>
              <p className="text-emerald-100 text-lg leading-relaxed">
                We &apos re beginners just like you, sharing what we learn about
                finance, technology, and AI. Every blog post is a step forward
                in our learning adventure.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/30 backdrop-blur-sm flex items-center justify-center border border-emerald-400/20">
                  <Brain className="w-4 h-4 text-emerald-300" />
                </div>
                <span className="text-emerald-100 font-medium">
                  Simple explanations of complex topics
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/30 backdrop-blur-sm flex items-center justify-center border border-teal-400/20">
                  <BarChart3 className="w-4 h-4 text-teal-300" />
                </div>
                <span className="text-emerald-100 font-medium">
                  Finance basics for beginners
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/30 backdrop-blur-sm flex items-center justify-center border border-cyan-400/20">
                  <Zap className="w-4 h-4 text-cyan-300" />
                </div>
                <span className="text-emerald-100 font-medium">
                  Latest tech trends simplified
                </span>
              </div>
            </div>

            <div className="bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 border border-emerald-700/30">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">
                  What You &apos ll Get
                </h3>
                <ul className="space-y-2 text-emerald-100 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    <span>
                      Weekly blog posts about our learning discoveries
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    <span>
                      Beginner-friendly explanations of complex topics
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    <span>A supportive community of fellow learners</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupView;
