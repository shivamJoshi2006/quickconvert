'use client';

import React from 'react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Convert JSON & CSV
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">
            Instantly
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Private, fast, and browser-based conversion. No uploads. No tracking. No fees.
        </p>

        {/* Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 pt-4">
          <span>🔒 100% Private</span>
          <span>⚡ Instant</span>
          <span>📦 No Sign-up</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8">
          <Link
            href="#converter"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Start Converting →
          </Link>
          <a
            href="#features"
            className="px-8 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
