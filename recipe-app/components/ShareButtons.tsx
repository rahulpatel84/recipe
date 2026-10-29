'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
  image: string;
}

export default function ShareButtons({ title, url, image }: ShareButtonsProps) {
  const fullUrl = `https://relishrealm.com${url}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex gap-3">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-soft-gray text-deep-brown hover:bg-[#1DA1F2] hover:text-white transition-colors"
        aria-label="Share on Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-soft-gray text-deep-brown hover:bg-[#1877F2] hover:text-white transition-colors"
        aria-label="Share on Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-soft-gray text-deep-brown hover:bg-[#E60023] hover:text-white transition-colors"
        aria-label="Pin on Pinterest"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      </a>
      <button
        onClick={copyToClipboard}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors outline-none focus:outline-none focus:ring-0 ${
          copied
            ? 'bg-green-500 text-white'
            : 'bg-soft-gray text-deep-brown hover:bg-deep-brown hover:text-white'
        }`}
        aria-label="Copy link"
        title={copied ? 'Copied!' : 'Copy link'}
      >
        {copied ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.723 18.654l-3.61 3.609c-2.316 2.315-6.063 2.315-8.378 0-2.315-2.316-2.315-6.062 0-8.377l3.61-3.61c2.315-2.315 6.062-2.315 8.377 0 .343.343.639.724.882 1.131l-1.654 1.654c-.143-.27-.325-.52-.546-.74-1.476-1.477-3.87-1.477-5.347 0l-3.61 3.61c-1.477 1.476-1.477 3.87 0 5.346 1.476 1.477 3.87 1.477 5.346 0l1.995-1.994c.89.372 1.84.57 2.8.58l-.865.791zm6.609-6.609l-3.61 3.609c-2.316 2.315-6.063 2.315-8.378 0-.343-.343-.639-.724-.882-1.131l1.654-1.654c.143.27.325.52.546.74 1.476 1.477 3.87 1.477 5.347 0l3.61-3.61c1.477-1.476 1.477-3.87 0-5.346-1.476-1.477-3.87-1.477-5.346 0l-1.995 1.994c-.89-.372-1.84-.57-2.8-.58l.865-.791 3.61-3.609c2.316-2.315 6.063-2.315 8.378 0 2.315 2.316 2.315 6.062 0 8.378z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
