import Image from "next/image";
import { Mail, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple, Elegant Hero */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-lora text-4xl md:text-5xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="font-lora text-xl text-gray-200 max-w-2xl mx-auto">
            Interested in promoting your business or product on FinoBlitz? We
            offer targeted exposure to professionals in business, finance, and
            technology.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/promotion.jpg"
              alt="Business promotion"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-lora text-3xl font-bold text-gray-800 mb-4">
                Paid Promotions
              </h2>
              <p className="font-lora text-gray-600 mb-6">
                We offer strategic promotional opportunities for businesses that
                align with our audience&apos;s interests. Our readers are
                professionals seeking insights on business growth, financial
                literacy, and technological innovation.
              </p>
              <p className="font-lora text-gray-600">
                Reach out to discuss how we can help showcase your products or
                services to our engaged audience.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h3 className="font-lora text-lg font-semibold text-gray-800 mb-1">
                  Email Us
                </h3>
                <a
                  href="mailto:promotions@finoblitz.com"
                  className="font-lora text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
                >
                  promotions@finoblitz.com
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h3 className="font-lora text-lg font-semibold text-gray-800 mb-1">
                  Facebook
                </h3>
                <a
                  href="https://facebook.com/finoblitz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-lora text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
                >
                  facebook.com/finoblitz
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h3 className="font-lora text-lg font-semibold text-gray-800 mb-1">
                  X (Twitter)
                </h3>
                <a
                  href="https://twitter.com/finoblitz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-lora text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
                >
                  @finoblitz
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotion Options */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-lora text-3xl font-bold text-center text-gray-800 mb-12">
            Promotion Options
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="font-lora text-xl font-bold mb-3 text-gray-800">
                Sponsored Articles
              </h3>
              <p className="font-lora text-gray-600">
                In-depth content about your product or service, written in our
                signature style and shared with our audience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
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
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <h3 className="font-lora text-xl font-bold mb-3 text-gray-800">
                Banner Ads
              </h3>
              <p className="font-lora text-gray-600">
                Strategic placement of your brand across our platform, targeting
                professionals in your industry.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
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
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-lora text-xl font-bold mb-3 text-gray-800">
                Product Reviews
              </h3>
              <p className="font-lora text-gray-600">
                Honest, in-depth reviews of your products or services by our
                expert team, shared with our audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-lora text-3xl font-bold text-gray-800 mb-6">
            Ready to Promote Your Business?
          </h2>
          <p className="font-lora text-xl text-gray-600 mb-8">
            Contact us today to discuss how we can help you reach our audience
            of business and finance professionals.
          </p>
          <a
            href="mailto:promotions@finoblitz.com"
            className="font-lora inline-flex items-center gap-2 bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Mail className="h-5 w-5" />
            Email Us Now
          </a>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-lora text-2xl font-bold mb-2">FinoBlitz</h2>
          <p className="font-lora text-gray-400 mb-6">
            Business • Finance • Technology • AI
          </p>
          <p className="font-lora text-sm text-gray-500">
            © {new Date().getFullYear()} FinoBlitz. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
