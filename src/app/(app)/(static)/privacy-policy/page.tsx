import React from "react";

function PrivacyPolicyPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-sm text-gray-500 text-center mb-10">Last updated: June 27, 2025</p>

      <div className="space-y-6 leading-relaxed text-base md:text-lg">
        <p>
          At FinoBlitxz, accessible from{" "}
          <a
            href="https://finoblitz.com"
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://finoblitz.com
          </a>
          , we value your privacy. This Privacy Policy explains how we collect, use,
          and protect your personal information when you use our website.
        </p>

        <h2 className="text-2xl font-semibold mt-10">Information We Collect</h2>
        <p>We may collect the following information from you:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Name and email address (when you fill out forms)</li>
          <li>Usage data (IP address, browser info, time spent on pages, etc.)</li>
          <li>Cookies to improve your experience and analyze traffic</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10">How We Use Your Data</h2>
        <p>We use your data to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide and improve our services</li>
          <li>Respond to your messages</li>
          <li>Send occasional updates or promotions (if you opt in)</li>
          <li>Analyze usage to improve site performance</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10">Cookies</h2>
        <p>
          We use cookies to remember preferences, track user behavior, and serve
          personalized ads via Google AdSense. You can disable cookies in your browser
          settings if you prefer.
        </p>

        <h2 className="text-2xl font-semibold mt-10">Third-Party Services</h2>
        <p>
          We may use third-party tools like Google Analytics and Google AdSense. These
          services may collect information using cookies and similar technologies.
          Please refer to their privacy policies for more details.
        </p>

        <h2 className="text-2xl font-semibold mt-10">Data Security</h2>
        <p>
          We take reasonable steps to protect your personal data but cannot guarantee
          100% security due to the nature of the internet.
        </p>

        <h2 className="text-2xl font-semibold mt-10">Your Rights</h2>
        <p>You may contact us to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Request access to the data we hold about you</li>
          <li>Update or correct your data</li>
          <li>Request deletion of your data</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10">Children’s Privacy</h2>
        <p>
          We do not knowingly collect data from children under 13. If you&apos;re a parent
          and believe your child has submitted personal info, please contact us to have
          it removed.
        </p>

        <h2 className="text-2xl font-semibold mt-10">Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Changes will be posted on this
          page with an updated date at the top.
        </p>

        <h2 className="text-2xl font-semibold mt-10">Contact Us</h2>
        <p>
          If you have any questions or concerns, feel free to contact us:
        </p>
        <ul className="list-disc pl-5">
          <li>
            By email:{" "}
            <a
              href="mailto:finoblitz03@gmail.com"
              className="text-blue-600 underline hover:text-blue-800"
            >
              finoblitz03@gmail.com
            </a>
          </li>
          <li>Address: Indore, Madhya Pradesh, India</li>
        </ul>
      </div>
    </section>
  );
}

export default PrivacyPolicyPage;
