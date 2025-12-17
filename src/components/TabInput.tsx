'use client';

import React, { useState, useRef } from 'react';
import { useToast } from '@/lib/toast-provider';
import { validateFileSize } from '@/lib/json-converter';

type TabType = 'upload' | 'paste' | 'url';

interface TabInputProps {
  onDataReceived: (data: string, source: string) => void;
  accept?: string;
  maxSizeMB?: number;
  placeholder?: string;
}

export function TabInput({
  onDataReceived,
  accept = '.json,.csv',
  maxSizeMB = 20,
  placeholder = 'Paste your data here...',
}: TabInputProps) {
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  const [pastedData, setPastedData] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const handleFileSelect = async (file: File) => {
    const validation = validateFileSize(file, maxSizeMB);
    if (!validation.valid) {
      addToast(validation.error || 'File too large', 'error');
      return;
    }

    try {
      const content = await file.text();
      onDataReceived(content, `Uploaded: ${file.name}`);
      addToast(`Loaded ${file.name}`, 'success');
    } catch (error) {
      addToast('Failed to read file', 'error');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileSelect(files[0]);
  };

  const handlePaste = () => {
    if (pastedData.trim()) {
      onDataReceived(pastedData, 'Pasted');
      setPastedData('');
      addToast('Data loaded', 'success');
    }
  };

  const handleUrlFetch = async () => {
    if (!urlInput.trim()) {
      addToast('Enter a URL', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(urlInput, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/csv, text/*',
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const text = await response.text();
      if (!text.trim()) throw new Error('Empty response');

      onDataReceived(text, `URL: ${new URL(urlInput).hostname}`);
      setUrlInput('');
      addToast('Data fetched successfully', 'success');
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : 'Failed to fetch',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-6">
        {(['upload', 'paste', 'url'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium text-sm transition-all border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {tab === 'upload' && '📁 Upload'}
            {tab === 'paste' && '📋 Paste'}
            {tab === 'url' && '🔗 URL'}
          </button>
        ))}
      </div>

      {activeTab === 'upload' && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
            }}
            className="hidden"
          />
          <div className="text-4xl mb-2">📂</div>
          <p className="font-medium text-gray-900 dark:text-white">
            Drag file here or click to browse
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Max {maxSizeMB}MB
          </p>
        </div>
      )}

      {activeTab === 'paste' && (
        <div className="space-y-3">
          <textarea
            value={pastedData}
            onChange={(e) => setPastedData(e.target.value)}
            placeholder={placeholder}
            className="w-full h-64 p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handlePaste}
            disabled={!pastedData.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Load Data
          </button>
        </div>
      )}

      {activeTab === 'url' && (
        <div className="space-y-3">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://api.example.com/data.json"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleUrlFetch}
            disabled={isLoading || !urlInput.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? '⏳ Fetching...' : '🚀 Fetch Data'}
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Supports JSON and CSV from publicly accessible URLs
          </p>
        </div>
      )}
    </div>
  );
}
