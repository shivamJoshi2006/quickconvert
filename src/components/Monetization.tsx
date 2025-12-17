'use client';

import React from 'react';

export function AdBanner() {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
      <div className="h-20 flex items-center justify-center text-gray-500">
        {/* Google AdSense Banner Ad Placeholder - 728x90 or responsive */}
        <div
          className="text-center text-sm"
          style={{ minWidth: '320px', minHeight: '80px' }}
        >
          <p className="text-gray-400">Advertisement</p>
        </div>
      </div>
    </div>
  );
}

export function NativeAdUnit() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border border-blue-200 dark:border-gray-600">
      <div className="h-24 flex items-center justify-center text-gray-500">
        {/* Native Ad Placeholder */}
        <p className="text-sm text-gray-400">Advertisement</p>
      </div>
    </div>
  );
}

export function PremiumUpsellCard() {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border-2 border-amber-300 dark:border-amber-700">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
            ✨ Unlock Pro Features
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Level up with advanced data tools
          </p>
        </div>
        <span className="text-xs bg-amber-600 text-white px-2 py-1 rounded">PRO</span>
      </div>

      <ul className="space-y-2 mb-4">
        <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Up to 100MB file uploads</span>
        </li>
        <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Custom flattening rules</span>
        </li>
        <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Batch file conversion</span>
        </li>
        <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>No ads, save 100+ conversions</span>
        </li>
      </ul>

      <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200">
        Upgrade to Pro
      </button>
    </div>
  );
}

export function EmailCaptureWidget() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend/email service
    console.log('Email submitted:', email);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-gray-600">
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        Get advanced data tools
      </p>
      {submitted ? (
        <div className="text-center text-green-600 text-sm">
          ✓ Thanks for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-3 py-2 rounded text-sm border border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
          >
            Sign up
          </button>
        </form>
      )}
    </div>
  );
}
