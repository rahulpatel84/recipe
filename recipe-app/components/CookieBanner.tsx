'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-soft p-4 md:p-6 shadow-2xl z-50 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
      <div className="flex-1 max-w-4xl">
        <p className="text-sm md:text-base text-dark-olive/80 leading-relaxed">
          We use cookies to improve your experience on our site, show personalized content, and analyze our traffic. 
          By clicking "Accept All", you consent to our use of cookies. Read our{' '}
          <Link href="/privacy" className="text-terracotta hover:underline font-medium">Privacy Policy</Link>{' '}
          and{' '}
          <Link href="/cookie-policy" className="text-terracotta hover:underline font-medium">Cookie Policy</Link>{' '}
          for more information.
        </p>
      </div>
      <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-end">
        <button 
          onClick={declineCookies}
          className="px-6 py-2.5 text-sm font-bold tracking-widest uppercase text-dark-olive bg-sand/30 hover:bg-sand/50 rounded-lg transition-colors"
        >
          Decline
        </button>
        <button 
          onClick={acceptCookies}
          className="px-6 py-2.5 text-sm font-bold tracking-widest uppercase text-white bg-terracotta hover:bg-terracotta/90 rounded-lg transition-colors shadow-sm"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
