'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/theme-provider';

export function Header() {
  const { effectiveTheme, setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl font-bold">⚡</span>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
              Converter
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
              JSON ↔ CSV
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/json-to-csv"
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            JSON → CSV
          </Link>
          <Link
            href="/csv-to-json"
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            CSV → JSON
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-lg"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {effectiveTheme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link
            href="#"
            className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors border border-blue-200 dark:border-blue-800"
          >
            Pro
          </Link>
        </div>
      </div>
    </header>
  );
}
