import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
// import Head from "next/head";

export const metadata: Metadata = {
  title:
    "About FinoBlitz – Empowering Professionals with Financial & Tech Insights",
  description:
    "Discover how FinoBlitz helps professionals grow through expert content in business, finance, technology, and AI. Learn about our mission and approach.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About FinoBlitz – Your Partner in Financial and Business Growth",
    description:
      "FinoBlitz delivers expert-driven content to help professionals excel in business, finance, and technology. Learn about our mission, vision, and values.",
    url: "https://www.finoblitz.com/about",
    type: "website",
    images: [
      {
        url: "https://www.finoblitz.com/images/about-hero.jpg",
        width: 1200,
        height: 630,
        alt: "About FinoBlitz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About FinoBlitz – Helping You Grow Smarter in Finance & Tech",
    description:
      "Explore FinoBlitz's mission to empower professionals with actionable insights across business, finance, technology, and AI.",
    images: ["https://www.finoblitz.com/images/about-hero.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden">
          <Image
            src="/images/about-hero.jpg"
            alt="FinoBlitz - Empowering professionals through knowledge"
            fill
            className="object-cover brightness-[0.85]"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-lora text-4xl md:text-6xl font-bold text-white mb-4">
              About FinoBlitz
            </h1>
            <p className="font-lora text-xl text-white max-w-3xl">
              Empowering professionals with insights on business, finance,
              technology, and AI
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="max-w-5xl mx-auto py-16 px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-lora text-3xl font-bold mb-6 text-gray-800">
                Our Mission
              </h2>
              <p className="font-lora text-lg text-gray-600 mb-4">
                At FinoBlitz, we believe that knowledge is the cornerstone of
                professional growth and business success. Our mission is to
                demystify complex topics in business, finance, technology, and
                artificial intelligence, making them accessible to professionals
                at every stage of their journey.
              </p>
              <p className="font-lora text-lg text-gray-600">
                Whether you&apos;re taking your first steps in understanding
                financial markets or looking to implement cutting-edge AI
                solutions in your business, our content is crafted to provide
                valuable insights that drive real-world results.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px]">
              <Image
                src="/images/mission.jpg"
                alt="Our mission at FinoBlitz"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* What We Cover Section */}
        <section className="bg-gray-50 py-16 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-lora text-3xl font-bold mb-12 text-center text-gray-800">
              What We Cover
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-lora text-xl font-bold mb-3 text-gray-800">
                  Business & Finance
                </h3>
                <p className="font-lora text-gray-600">
                  From investment strategies to financial planning, we cover the
                  essentials of business growth and financial literacy that
                  every professional needs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-lora text-xl font-bold mb-3 text-gray-800">
                  Technology & Innovation
                </h3>
                <p className="font-lora text-gray-600">
                  Stay ahead of the curve with our insights on emerging
                  technologies and digital transformation strategies that can
                  revolutionize your business.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="font-lora text-xl font-bold mb-3 text-gray-800">
                  AI & Automation
                </h3>
                <p className="font-lora text-gray-600">
                  Explore practical applications of artificial intelligence and
                  automation that can enhance efficiency and drive innovation in
                  your organization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="max-w-5xl mx-auto py-16 px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[300px] md:h-[400px]">
              <Image
                src="/images/community.jpg"
                alt="Our approach at FinoBlitz"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-lora text-3xl font-bold mb-6 text-gray-800">
                Our Approach
              </h2>
              <p className="font-lora text-lg text-gray-600 mb-4">
                We believe in making complex topics approachable. Our content
                ranges from beginner-friendly introductions to advanced
                analyses, ensuring there&apos;s something valuable for everyone.
              </p>
              <p className="font-lora text-lg text-gray-600 mb-4">
                Each article is meticulously researched and crafted by experts
                who bring real-world experience and academic knowledge to the
                table. We prioritize accuracy, clarity, and actionable insights
                that you can implement immediately.
              </p>
              <Link
                href="/contact-us"
                className="font-lora inline-block mt-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Get in touch with our team →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section with New Image */}
        <section className="bg-gray-900 text-white py-16 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-lora text-3xl md:text-4xl font-bold mb-6">
                  Join Our Community of Forward-Thinking Professionals
                </h2>
                <p className="font-lora text-xl mb-8 text-gray-300">
                  Stay updated with our latest insights and join the
                  conversation about the future of business, finance, and
                  technology.
                </p>
                <Link
                  href="/contact-us"
                  className="font-lora inline-block bg-white text-gray-900 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Connect With Us
                </Link>
              </div>
              {/* <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/community.png"
                priority
                alt="Join our community"
                fill
                className="object-cover"
              />
            </div> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
