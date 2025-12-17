'use client';

import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { useToast } from '@/lib/toast-provider';
import { jsonToCSV, parseJSON, formatBytes } from '@/lib/json-converter';

interface JSONToCSVProps {
  title?: string;
}

export function JSONToCSVConverter({ title = 'JSON to CSV' }: JSONToCSVProps) {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [delimiter, setDelimiter] = useState(',');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [flattenNested, setFlattenNested] = useState(true);
  const { addToast } = useToast();

  const handleConvert = async () => {
    if (!jsonInput.trim()) {
      addToast('Please enter JSON data', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const csv = jsonToCSV(jsonInput, {
        delimiter,
        includeHeaders,
        flattenNested,
      });
      setCsvOutput(csv);
      addToast('Conversion successful!', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Conversion failed';
      addToast(message, 'error');
      setCsvOutput('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!csvOutput) {
      addToast('No data to download', 'error');
      return;
    }

    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `converted-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded CSV file', 'success');
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(csvOutput).then(() => {
      addToast('Copied to clipboard!', 'success');
    });
  };

  const handleClear = () => {
    setJsonInput('');
    setCsvOutput('');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">📥</span>
              JSON Input
            </label>
            {jsonInput && (
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {formatBytes(new Blob([jsonInput]).size)}
              </span>
            )}
          </div>

          <FileUpload
            onFileSelect={(content, fileName) => {
              setJsonInput(content);
              setCsvOutput('');
            }}
            accept=".json"
            maxSizeMB={20}
          />

          <div className="relative">
            <textarea
              value={jsonInput}
              onChange={(e) => {
                setJsonInput(e.target.value);
                setCsvOutput('');
              }}
              placeholder="Paste your JSON here or upload a file above...&#10;&#10;Example:&#10;[&#10;  { &quot;name&quot;: &quot;John&quot;, &quot;age&quot;: 30 },&#10;  { &quot;name&quot;: &quot;Jane&quot;, &quot;age&quot;: 25 }&#10;]"
              className="textarea-enhanced h-96 shadow-md hover:shadow-lg"
            />
            {jsonInput && (
              <button
                onClick={() => setJsonInput('')}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all duration-200 hover:scale-110"
                title="Clear input"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">📤</span>
              CSV Output
            </label>
            {csvOutput && (
              <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                {formatBytes(new Blob([csvOutput]).size)}
              </span>
            )}
          </div>

          <div className="relative">
            <textarea
              value={csvOutput}
              readOnly
              placeholder="CSV output will appear here after conversion..."
              className="textarea-enhanced h-96 shadow-md bg-gray-50 dark:bg-slate-900/50"
            />
            {csvOutput && (
              <div className="absolute top-4 right-4 flex gap-3">
                <button
                  onClick={handleCopyOutput}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
                  title="Copy to clipboard"
                >
                  <span>📋</span>
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
                  title="Download CSV"
                >
                  <span>⬇️</span>
                  Download
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Options Section */}
      <div className="card shadow-xl">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          Conversion Options
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Delimiter
            </label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="input-enhanced text-base"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>

          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={includeHeaders}
                onChange={(e) => setIncludeHeaders(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              Include Headers
            </label>
          </div>

          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={flattenNested}
                onChange={(e) => setFlattenNested(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              Flatten Nested Objects
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 pt-2">
        <button
          onClick={handleConvert}
          disabled={isLoading || !jsonInput}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-3"
        >
          <span className="text-2xl">{isLoading ? '⏳' : '🔄'}</span>
          {isLoading ? 'Converting...' : 'Convert to CSV'}
        </button>

        {csvOutput && (
          <>
            <button
              onClick={handleDownload}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl
                transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <span className="text-2xl">⬇️</span>
              Download
            </button>
            <button
              onClick={handleCopyOutput}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl
                transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <span className="text-2xl">📋</span>
              Copy
            </button>
          </>
        )}

        {(jsonInput || csvOutput) && (
          <button
            onClick={handleClear}
            className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl
              transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <span className="text-2xl">🗑️</span>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
