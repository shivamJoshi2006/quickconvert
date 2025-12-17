'use client';

import React, { useState } from 'react';
import { useToast } from '@/lib/toast-provider';
import { formatBytes } from '@/lib/json-converter';

interface OutputPanelProps {
  data: string;
  fileName?: string;
  onDownload?: (data: string, fileName: string) => void;
}

export function OutputPanel({
  data,
  fileName = 'converted',
  onDownload,
}: OutputPanelProps) {
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(data).then(() => {
      setCopied(true);
      addToast('Copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(data, fileName);
    }
  };

  const dataSize = formatBytes(new Blob([data]).size);
  const lineCount = data.split('\n').length - 1;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>📊 {lineCount} lines</span>
          <span>💾 {dataSize}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
          {onDownload && (
            <button
              onClick={handleDownload}
              className="px-3 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              ⬇️ Download
            </button>
          )}
        </div>
      </div>

      <pre className="w-full h-80 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto text-gray-900 dark:text-gray-100 text-sm font-mono leading-relaxed">
        <code>{data}</code>
      </pre>
    </div>
  );
}
