import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for Relish Realm',
};

export default function CookiePolicy() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-20 sm:px-6 lg:px-8 font-sans">
      <h1 className="text-4xl font-bold text-dark-olive mb-8 tracking-tight font-serif">Cookie Policy</h1>
      <div className="prose prose-olive max-w-none text-dark-olive/80 space-y-6 text-lg leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">1. What Are Cookies</h2>
        <p>Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">2. How We Use Cookies</h2>
        <p>We use cookies to understand how you use our site and to improve your experience. This includes personalizing content and advertising. By continuing to use our site, you accept our use of cookies, revised Privacy Policy and Terms of Use.</p>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">3. Types of Cookies We Use</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Essential Cookies:</strong> These are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website.</li>
          <li><strong>Analytical/Performance Cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
          <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website.</li>
          <li><strong>Targeting Cookies:</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed.</li>
        </ul>

        <h2 className="text-2xl font-bold text-dark-olive mt-8 font-serif">4. Managing Cookies</h2>
        <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
      </div>
    </div>
  );
}
