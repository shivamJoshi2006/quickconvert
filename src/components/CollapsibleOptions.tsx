'use client';

import React, { useState } from 'react';

interface CollapsibleOptionsProps {
  title?: string;
  children: React.ReactNode;
}

export function CollapsibleOptions({
  title = 'Advanced Options',
  children,
}: CollapsibleOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white">⚙️ {title}</span>
        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
          {children}
        </div>
      )}
    </div>
  );
}

interface OptionGroupProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export function OptionGroup({ label, hint, children }: OptionGroupProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      {hint && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
      {children}
    </div>
  );
}
