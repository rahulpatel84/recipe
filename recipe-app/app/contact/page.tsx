import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Relish Realm',
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-20 sm:px-6 lg:px-8 font-sans">
      <h1 className="text-4xl font-bold text-dark-olive mb-8 tracking-tight font-serif">Contact Us</h1>
      <div className="prose prose-olive max-w-none text-dark-olive/80 space-y-6 text-lg leading-relaxed">
        <p>We'd love to hear from you! Whether you have a question about a recipe, a business inquiry, or just want to say hello, feel free to reach out.</p>

        <div className="mt-12 bg-sand/20 p-8 rounded-2xl border border-border-soft">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-dark-olive mb-2">Name</label>
              <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-border-soft focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta outline-none transition-colors" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-olive mb-2">Email</label>
              <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-border-soft focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta outline-none transition-colors" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-dark-olive mb-2">Message</label>
              <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-border-soft focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full bg-terracotta text-white font-bold py-4 px-8 rounded-lg hover:bg-terracotta/90 transition-colors uppercase tracking-widest text-sm">
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-border-soft">
          <div>
            <h3 className="font-bold text-dark-olive mb-2 tracking-wide">General Inquiries</h3>
            <p className="text-dark-olive/60">hello@relishrealm.com</p>
          </div>
          <div>
            <h3 className="font-bold text-dark-olive mb-2 tracking-wide">Partnerships</h3>
            <p className="text-dark-olive/60">partners@relishrealm.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
