'use client';

import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { useToast } from '@/lib/toast-provider';
import { parseCSV, autoDetectDelimiter } from '@/lib/csv-parser';
import { csvToJSON, formatBytes } from '@/lib/json-converter';

interface CSVToJSONProps {
  title?: string;
}

export function CSVToJSONConverter({ title = 'CSV to JSON' }: CSVToJSONProps) {
  const [csvInput, setCsvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasHeader, setHasHeader] = useState(true);
  const [arrayOfObjects, setArrayOfObjects] = useState(true);
  const [prettyPrint, setPrettyPrint] = useState(true);
  const [autoDetectDelim, setAutoDetectDelim] = useState(true);
  const [customDelimiter, setCustomDelimiter] = useState(',');
  const { addToast } = useToast();

  const handleConvert = async () => {
    if (!csvInput.trim()) {
      addToast('Please enter CSV data', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const delimiter = autoDetectDelim
        ? autoDetectDelimiter(csvInput)
        : customDelimiter;

      const csvData = parseCSV(csvInput, {
        hasHeader,
        delimiter,
        autoDetectDelimiter: autoDetectDelim,
      });

      const json = csvToJSON(csvData, {
        arrayOfObjects,
        prettyPrint,
      });

      setJsonOutput(json);
      addToast('Conversion successful!', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Conversion failed';
      addToast(message, 'error');
      setJsonOutput('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!jsonOutput) {
      addToast('No data to download', 'error');
      return;
    }

    const blob = new Blob([jsonOutput], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `converted-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded JSON file', 'success');
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(jsonOutput).then(() => {
      addToast('Copied to clipboard!', 'success');
    });
  };

  const handleClear = () => {
    setCsvInput('');
    setJsonOutput('');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">📥</span>
              CSV Input
            </label>
            {csvInput && (
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {formatBytes(new Blob([csvInput]).size)}
              </span>
            )}
          </div>

          <FileUpload
            onFileSelect={(content, fileName) => {
              setCsvInput(content);
              setJsonOutput('');
            }}
            accept=".csv"
            maxSizeMB={20}
          />

          <div className="relative">
            <textarea
              value={csvInput}
              onChange={(e) => {
                setCsvInput(e.target.value);
                setJsonOutput('');
              }}
              placeholder="Paste your CSV here or upload a file above...&#10;&#10;Example:&#10;name,age,city&#10;John,30,NYC&#10;Jane,25,LA"
              className="textarea-enhanced h-96 shadow-md hover:shadow-lg"
            />
            {csvInput && (
              <button
                onClick={() => setCsvInput('')}
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
              JSON Output
            </label>
            {jsonOutput && (
              <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                {formatBytes(new Blob([jsonOutput]).size)}
              </span>
            )}
          </div>

          <div className="relative">
            <textarea
              value={jsonOutput}
              readOnly
              placeholder="JSON output will appear here after conversion..."
              className="textarea-enhanced h-96 shadow-md bg-gray-50 dark:bg-slate-900/50"
            />
            {jsonOutput && (
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
                  title="Download JSON"
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
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={hasHeader}
                onChange={(e) => setHasHeader(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              CSV has headers
            </label>
          </div>

          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={autoDetectDelim}
                onChange={(e) => setAutoDetectDelim(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              Auto-detect delimiter
            </label>
          </div>

          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={arrayOfObjects}
                onChange={(e) => setArrayOfObjects(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              Array of objects
            </label>
          </div>

          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={prettyPrint}
                onChange={(e) => setPrettyPrint(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              Pretty print
            </label>
          </div>

          {!autoDetectDelim && (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Custom Delimiter
              </label>
              <select
                value={customDelimiter}
                onChange={(e) => setCustomDelimiter(e.target.value)}
                className="input-enhanced text-base"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="\t">Tab</option>
                <option value="|">Pipe (|)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 pt-2">
        <button
          onClick={handleConvert}
          disabled={isLoading || !csvInput}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-3"
        >
          <span className="text-2xl">{isLoading ? '⏳' : '🔄'}</span>
          {isLoading ? 'Converting...' : 'Convert to JSON'}
        </button>

        {jsonOutput && (
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

        {(csvInput || jsonOutput) && (
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
