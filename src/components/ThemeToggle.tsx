'use client';

import React from 'react';
import { useTheme } from '@/lib/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme, effectiveTheme } = useTheme();

  return (
    <button
      onClick={() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
      }}
      className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 
        hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700
        transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110 active:scale-95
        border border-gray-300 dark:border-gray-600"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label="Toggle theme"
    >
      {effectiveTheme === 'light' ? (
        <svg className="w-6 h-6 text-gray-800 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-yellow-400 transition-transform duration-300 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414l-.707-.707zM5 8a1 1 0 100-2H4a1 1 0 100 2h1z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
}
