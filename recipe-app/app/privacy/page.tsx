import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Relish Realm',
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-20 sm:px-6 lg:px-8 font-sans">
      <h1 className="text-4xl font-bold text-dark-olive mb-8 tracking-tight font-serif">Privacy Policy</h1>
      <div className="prose prose-olive max-w-none text-dark-olive/80 space-y-6 text-lg leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">1. Introduction</h2>
        <p>Welcome to Relish Realm. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
        
        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">2. The Data We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you, including:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Identity Data:</strong> includes first name, last name, username.</li>
          <li><strong>Contact Data:</strong> includes email address.</li>
          <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting.</li>
          <li><strong>Usage Data:</strong> includes information about how you use our website.</li>
        </ul>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">3. Cookies</h2>
        <p>Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. For detailed information on the cookies we use, please see our Cookie Policy.</p>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">4. Data Security</h2>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.</p>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">5. Contact Us</h2>
        <p>If you have any questions about this privacy policy or our privacy practices, please contact us via our Contact page.</p>
      </div>
    </div>
  );
}
