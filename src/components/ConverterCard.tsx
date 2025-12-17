'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useToast } from '@/lib/toast-provider';

interface ConverterCardProps {
  title: string;
  onConvert: (data: string, options: any) => Promise<string>;
  inputFileType: string;
  outputFileType: string;
  options?: (state: any, setState: React.Dispatch<React.SetStateAction<any>>) => React.ReactNode;
  nativeAd?: React.ReactNode;
  defaultOptions?: any;
}

export function ConverterCard({
  title,
  onConvert,
  inputFileType,
  outputFileType,
  options,
  nativeAd,
  defaultOptions,
}: ConverterCardProps) {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'url'>('upload');
  const [isConverting, setIsConverting] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [urlInput, setUrlInput] = useState('');
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [optionStates, setOptionStates] = useState(() => defaultOptions || {});
  const [dragOver, setDragOver] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { addToast } = useToast();

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  const handleFileUpload = (file?: File) => {
    const targetFile = file;
    if (!targetFile) return;

    if (targetFile.size > 50 * 1024 * 1024) {
      addToast('File too large (max 50MB). Upgrade to Pro for bigger files.', 'error');
      return;
    }

    setFileName(targetFile.name);
    setFileSize(targetFile.size);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputData(content);
      addToast('✓ File loaded', 'success');
    };
    reader.readAsText(targetFile);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => setDragOver(false);

  const handleUrlFetch = async () => {
    if (!urlInput.trim()) {
      addToast('Please enter a URL', 'error');
      return;
    }

    setIsFetchingUrl(true);
    setFetchError('');
    try {
      const response = await fetch(urlInput);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const text = await response.text();
      setInputData(text);
      setActiveTab('paste');
      addToast('✓ Loaded from URL', 'success');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to fetch URL';
      setFetchError(msg);
      addToast(msg, 'error');
    } finally {
      setIsFetchingUrl(false);
    }
  };

  const handleConvert = async () => {
    if (!inputData.trim()) {
      addToast('Please provide data to convert', 'error');
      return;
    }

    setIsConverting(true);
    try {
      const result = await onConvert(inputData, optionStates);
      setOutputData(result);
      addToast('✓ Converted successfully', 'success');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Conversion failed';
      addToast(msg, 'error');
      setOutputData('');
    } finally {
      setIsConverting(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputData);
      addToast('✓ Copied to clipboard', 'success');
    } catch {
      addToast('Failed to copy', 'error');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([outputData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data.${outputFileType}`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('✓ Downloaded', 'success');
  };

  const removeFile = () => {
    setFileName('');
    setFileSize(0);
    setInputData('');
  };

  const clearAll = () => {
    setInputData('');
    setOutputData('');
    setFileName('');
    setFileSize(0);
    setUrlInput('');
    setFetchError('');
  };

  const outputSize = useMemo(() => new Blob([outputData]).size, [outputData]);
  const outputLines = useMemo(() => (outputData ? outputData.split('\n').length : 0), [outputData]);

  const optionsContent = useMemo(() => options?.(optionStates, setOptionStates), [options, optionStates]);

  const renderUpload = useCallback(() => (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      style={{
        border: `1px dashed ${dragOver ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '14px',
        padding: '18px',
        background: dragOver ? 'rgba(37, 99, 235, 0.06)' : 'var(--surface-muted)',
        transition: 'border-color 0.15s ease, background 0.15s ease',
      }}
    >
      <div className="stack">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="stack" style={{ gap: 6 }}>
            <strong>Drag & drop a .{inputFileType} file</strong>
            <span className="muted small">Max 50MB • 100% local</span>
          </div>
          <label className="pill" style={{ cursor: 'pointer' }}>
            Browse
            <input type="file" accept={`.${inputFileType}`} onChange={onFileInputChange} style={{ display: 'none' }} />
          </label>
        </div>

        {fileName ? (
          <div className="surface-muted" style={{ padding: 12, borderRadius: 10, border: `1px solid var(--border)` }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div className="row" style={{ gap: 10 }}>
                <span>📄</span>
                <div className="stack" style={{ gap: 4 }}>
                  <strong style={{ fontSize: '0.95rem' }}>{fileName}</strong>
                  <span className="muted small">{formatBytes(fileSize)}</span>
                </div>
              </div>
              <button className="ghost" onClick={removeFile} style={{ padding: '8px 10px' }}>Remove</button>
            </div>
          </div>
        ) : (
          <p className="small muted" style={{ marginTop: 8 }}>100% browser-based. Your file never leaves your device.</p>
        )}
      </div>
    </div>
  ), [dragOver, fileName, fileSize, inputFileType]);

  const renderPaste = (
    <div className="stack" style={{ gap: 8 }}>
      <textarea
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder={`Paste ${inputFileType.toUpperCase()} here. Example: ${inputFileType === 'json' ? '{"name":"Ada","age":27}' : 'name,age\\nAda,27'}`}
        style={{ minHeight: 260 }}
      />
      <span className="small muted">Smart detect runs on convert.</span>
    </div>
  );

  const renderUrl = (
    <div className="stack" style={{ gap: 10 }}>
      <input
        type="text"
        value={urlInput}
        onChange={(e) => setUrlInput(e.target.value)}
        placeholder="https://example.com/data.json"
        onKeyDown={(e) => e.key === 'Enter' && handleUrlFetch()}
      />
      <button onClick={handleUrlFetch} className="primary" style={{ width: '100%' }} disabled={isFetchingUrl}>
        {isFetchingUrl ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span className="spinner" />
            Fetching…
          </span>
        ) : 'Fetch from URL'}
      </button>
      {fetchError && (
        <div style={{ padding: 10, background: 'rgba(214, 69, 69, 0.1)', border: '1px solid rgba(214, 69, 69, 0.3)', borderRadius: 8, fontSize: '0.9rem', color: 'var(--danger)' }}>
          {fetchError}
        </div>
      )}
      <span className="small muted">We fetch once and keep data local.</span>
    </div>
  );

  return (
    <div className="card" style={{ padding: 20, width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <h2 style={{ marginBottom: 4 }}>{title}</h2>
          <p className="small muted">Browser-based • Private • Fast</p>
        </div>
        <div className="pill" style={{ background: 'rgba(37,99,235,0.12)' }}>
          Live
        </div>
      </div>

      <div className="grid-split">
        {/* INPUT SECTION */}
        <div className="stack" style={{ gap: 12 }}>
          <div className="tabs">
            {[
              { key: 'upload', label: 'Upload File' },
              { key: 'paste', label: 'Paste Data' },
              { key: 'url', label: 'Paste URL' },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`tab ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key as any)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'upload' && renderUpload()}
          {activeTab === 'paste' && renderPaste}
          {activeTab === 'url' && renderUrl}

          <div className="surface-muted" style={{ padding: 12, borderRadius: 10 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className="small muted">
                {inputData ? `${inputData.length} characters` : 'No data loaded'}
              </span>
              {inputData && (
                <button onClick={clearAll} className="ghost" style={{ padding: '4px 8px', fontSize: '0.85rem' }}>Clear all</button>
              )}
            </div>
          </div>
        </div>

        {/* OUTPUT SECTION */}
        <div className="stack" style={{ gap: 12 }}>
          <div className="surface-muted" style={{ padding: 12, borderRadius: 12, border: '1px solid var(--border)' }}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: outputData ? 10 : 0 }}>
              <h3 style={{ margin: 0 }}>Output Preview</h3>
              <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                {outputData && (
                  <>
                    <button onClick={handleCopy} className="ghost" style={{ padding: '6px 10px', fontSize: '0.9rem', flex: 1, minWidth: 80 }}>Copy</button>
                    <button onClick={handleDownload} className="ghost" style={{ padding: '6px 10px', fontSize: '0.9rem', flex: 1, minWidth: 80 }}>Download</button>
                  </>
                )}
              </div>
            </div>

            {outputData ? (
              <pre style={{ marginTop: 10, maxHeight: 280, width: '100%', overflow: 'auto', boxSizing: 'border-box' }}>{outputData}</pre>
            ) : (
              <div style={{
                height: 240,
                border: '1px dashed var(--border)',
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--muted)',
                marginTop: 10,
                gap: 8,
              }}>
                <span style={{ fontSize: '2rem', opacity: 0.3 }}>📄</span>
                <span>Output will appear here after conversion</span>
              </div>
            )}

            <div className="row" style={{ marginTop: 8, justifyContent: 'space-between' }}>
              <span className="small muted">{outputLines} lines • {formatBytes(outputSize)}</span>
              {isConverting && <span className="small" style={{ color: 'var(--accent)' }}>Processing…</span>}
            </div>
          </div>

          {nativeAd}
        </div>
      </div>

      {/* OPTIONS & ACTIONS */}
      <div className="stack" style={{ gap: 12, marginTop: 14 }}>
        {optionsContent && (
          <div className="surface-muted" style={{ padding: 12, borderRadius: 12, border: '1px solid var(--border)' }}>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '0.95rem' }}>⚙ Options</h3>
                <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
                  {Object.entries(optionStates).map(([key, value]) => {
                    if (typeof value === 'boolean' && value) {
                      return (
                        <div key={key} className="pill" style={{ padding: '4px 8px', fontSize: '0.8rem', background: 'rgba(37, 99, 235, 0.15)', borderColor: 'transparent' }}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      );
                    }
                    if (value && typeof value !== 'boolean') {
                      return (
                        <div key={key} className="pill" style={{ padding: '4px 8px', fontSize: '0.8rem', background: 'rgba(37, 99, 235, 0.15)', borderColor: 'transparent' }}>
                          {key}: {String(value)}
                        </div>
                      );
                    }
                    return null;
                  }).filter(Boolean)}
                </div>
              </div>
              <button className="ghost" onClick={() => setShowAdvanced(!showAdvanced)} style={{ whiteSpace: 'nowrap' }}>
                {showAdvanced ? 'Hide' : 'Edit'}
              </button>
            </div>
            {showAdvanced && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                {optionsContent}
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleConvert}
          disabled={isConverting || !inputData.trim()}
          className="primary"
          style={{ width: '100%', padding: '12px 16px' }}
        >
          {isConverting ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span className="spinner" />
              Converting…
            </span>
          ) : `Convert to ${outputFileType.toUpperCase()}`}
        </button>
      </div>
    </div>
  );
}
