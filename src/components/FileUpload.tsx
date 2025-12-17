'use client';

import React, { useRef, useState } from 'react';
import { useToast } from '@/lib/toast-provider';
import { validateFileSize } from '@/lib/json-converter';

interface FileUploadProps {
  onFileSelect: (content: string, fileName: string) => void;
  accept?: string;
  maxSizeMB?: number;
}

export function FileUpload({
  onFileSelect,
  accept = '.json,.csv',
  maxSizeMB = 20,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragover, setIsDragover] = useState(false);
  const { addToast } = useToast();

  const handleFile = async (file: File) => {
    // Validate file size
    const validation = validateFileSize(file, maxSizeMB);
    if (!validation.valid) {
      addToast(validation.error || 'File too large', 'error');
      return;
    }

    try {
      const content = await file.text();
      onFileSelect(content, file.name);
      addToast(`Uploaded: ${file.name}`, 'success');
    } catch (error) {
      addToast('Failed to read file', 'error');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragover(true);
  };

  const handleDragLeave = () => {
    setIsDragover(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragover(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`
        border-3 border-dashed rounded-2xl p-10 text-center cursor-pointer
        transition-all duration-300 shadow-md hover:shadow-xl
        ${
          isDragover
            ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 scale-105'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-slate-800'
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-4">
        <div className={`transition-transform duration-300 ${isDragover ? 'scale-110' : ''}`}>
          <svg
            className="w-16 h-16 text-blue-500 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {isDragover ? 'Drop file here!' : 'Drag and drop your file'}
          </p>
          <p className="text-base text-gray-600 dark:text-gray-400">
            or click to browse • max {maxSizeMB}MB
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Accepts: {accept.replace(/\./g, '').toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
