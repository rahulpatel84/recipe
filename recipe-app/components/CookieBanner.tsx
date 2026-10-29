'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = window.setTimeout(() => setShowBanner(true), 0);
      return () => window.clearTimeout(timer);
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
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border-soft bg-white p-5 shadow-[0_20px_60px_rgba(29,41,34,.18)] sm:bottom-6 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex-1">
        <p className="text-sm text-dark-olive/65 leading-6">
          We use cookies to improve your experience on our site, show personalized content, and analyze our traffic. 
          Read our{' '}
          <Link href="/privacy" className="text-terracotta hover:underline font-medium">Privacy Policy</Link>{' '}
          and{' '}
          <Link href="/cookie-policy" className="text-terracotta hover:underline font-medium">Cookie Policy</Link>{' '}
          for more information.
        </p>
      </div>
      <div className="flex shrink-0 items-center justify-end gap-2">
        <button 
          onClick={declineCookies}
          className="rounded-xl px-4 py-2.5 text-sm font-bold text-dark-olive/60 transition hover:bg-soft-gray"
        >
          Decline
        </button>
        <button 
          onClick={acceptCookies}
          className="rounded-xl bg-dark-olive px-4 py-2.5 text-sm font-bold text-white transition hover:bg-terracotta"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
