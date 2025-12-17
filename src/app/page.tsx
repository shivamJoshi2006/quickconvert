'use client';

import React, { useState } from 'react';
import { Header } from '@/components/SimpleHeader';
import { ConverterCard } from '@/components/ConverterCard';
import { jsonToCSV, csvToJSON } from '@/lib/json-converter';
import { parseCSV, autoDetectDelimiter } from '@/lib/csv-parser';

const defaultJsonOptions = {
  delimiter: ',',
  includeHeaders: true,
  flattenNested: true,
};

const defaultCsvOptions = {
  delimiter: ',',
  autoDetect: true,
  hasHeader: true,
  arrayOfObjects: true,
  prettyPrint: true,
};

export default function Page() {
  const [activeConverter, setActiveConverter] = useState<'json-csv' | 'csv-json'>('json-csv');
  const handleJsonToCsvConvert = async (data: string, opts: any) => {
    return jsonToCSV(data, {
      delimiter: opts.delimiter || ',',
      includeHeaders: opts.includeHeaders !== false,
      flattenNested: opts.flattenNested !== false,
    });
  };

  const handleCsvToJsonConvert = async (data: string, opts: any) => {
    const delimiter = opts.autoDetect ? autoDetectDelimiter(data) : opts.delimiter || ',';
    const parsed = parseCSV(data, {
      hasHeader: opts.hasHeader !== false,
      delimiter,
      autoDetectDelimiter: opts.autoDetect !== false,
    });
    return csvToJSON(parsed, {
      arrayOfObjects: opts.arrayOfObjects !== false,
      prettyPrint: opts.prettyPrint !== false,
    });
  };

  const jsonOptions = (state: any, setState: React.Dispatch<React.SetStateAction<any>>) => (
    <div className="grid-two">
      <div>
        <label htmlFor="delimiter">Delimiter</label>
        <select
          id="delimiter"
          value={state.delimiter || ','}
          onChange={(e) => setState((s: any) => ({ ...s, delimiter: e.target.value }))}
        >
          <option value=",">Comma (,)</option>
          <option value=";">Semicolon (;)</option>
          <option value="\t">Tab</option>
          <option value="|">Pipe (|)</option>
        </select>
      </div>
      <div className="row" style={{ alignItems: 'center' }}>
        <input
          id="headers"
          type="checkbox"
          checked={state.includeHeaders !== false}
          onChange={(e) => setState((s: any) => ({ ...s, includeHeaders: e.target.checked }))}
          style={{ width: 18, height: 18 }}
        />
        <label htmlFor="headers" style={{ margin: 0 }}>Include headers</label>
      </div>
      <div className="row" style={{ alignItems: 'center' }}>
        <input
          id="flatten"
          type="checkbox"
          checked={state.flattenNested !== false}
          onChange={(e) => setState((s: any) => ({ ...s, flattenNested: e.target.checked }))}
          style={{ width: 18, height: 18 }}
        />
        <label htmlFor="flatten" style={{ margin: 0 }}>Flatten nested fields</label>
      </div>
    </div>
  );

  const csvOptions = (state: any, setState: React.Dispatch<React.SetStateAction<any>>) => (
    <div className="grid-two">
      <div>
        <label htmlFor="csv-delimiter">Delimiter</label>
        <select
          id="csv-delimiter"
          value={state.delimiter || ','}
          onChange={(e) => setState((s: any) => ({ ...s, delimiter: e.target.value }))}
          disabled={state.autoDetect !== false}
        >
          <option value=",">Comma (,)</option>
          <option value=";">Semicolon (;)</option>
          <option value="\t">Tab</option>
          <option value="|">Pipe (|)</option>
        </select>
      </div>
      <div className="row" style={{ alignItems: 'center' }}>
        <input
          id="auto-detect"
          type="checkbox"
          checked={state.autoDetect !== false}
          onChange={(e) => setState((s: any) => ({ ...s, autoDetect: e.target.checked }))}
          style={{ width: 18, height: 18 }}
        />
        <label htmlFor="auto-detect" style={{ margin: 0 }}>Auto-detect delimiter</label>
      </div>
      <div className="row" style={{ alignItems: 'center' }}>
        <input
          id="has-header"
          type="checkbox"
          checked={state.hasHeader !== false}
          onChange={(e) => setState((s: any) => ({ ...s, hasHeader: e.target.checked }))}
          style={{ width: 18, height: 18 }}
        />
        <label htmlFor="has-header" style={{ margin: 0 }}>Has headers</label>
      </div>
      <div className="row" style={{ alignItems: 'center' }}>
        <input
          id="array-objects"
          type="checkbox"
          checked={state.arrayOfObjects !== false}
          onChange={(e) => setState((s: any) => ({ ...s, arrayOfObjects: e.target.checked }))}
          style={{ width: 18, height: 18 }}
        />
        <label htmlFor="array-objects" style={{ margin: 0 }}>Array of objects</label>
      </div>
      <div className="row" style={{ alignItems: 'center' }}>
        <input
          id="pretty-print"
          type="checkbox"
          checked={state.prettyPrint !== false}
          onChange={(e) => setState((s: any) => ({ ...s, prettyPrint: e.target.checked }))}
          style={{ width: 18, height: 18 }}
        />
        <label htmlFor="pretty-print" style={{ margin: 0 }}>Pretty print</label>
      </div>
    </div>
  );

  const nativeAd = (
    <div className="ad-box" style={{ marginTop: 6, minHeight: 250 }}>
      <div className="small muted">Native Ad Placement</div>
      <div className="small muted" style={{ marginTop: 4 }}>300x250</div>
    </div>
  );

  const proCard = (
    <div id="pro" className="pro-card" style={{ height: '100%', display: 'none' }}>
      <style>{`
        @media (min-width: 960px) {
          #pro {
            display: block !important;
          }
        }
      `}</style>
      <div className="pill" style={{ width: 'fit-content', marginBottom: 10 }}>Pro</div>
      <h3 style={{ marginBottom: 6 }}>Unlock Professional Features</h3>
      <p className="small" style={{ marginBottom: 14 }}>For teams and power users who need more.</p>
      <ul style={{ listStyle: 'none', display: 'grid', gap: 8, padding: 0, marginBottom: 14 }}>
        {['Files up to 500MB', 'Batch folder conversion', 'Advanced schema tools', 'Priority email support', 'Ad-free experience'].map((item) => (
          <li key={item} className="row" style={{ gap: 8 }}>
            <span style={{ color: 'var(--accent)' }}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button className="primary" style={{ width: '100%' }}>Upgrade to Pro</button>
    </div>
  );

  return (
    <div>
      <Header />

      {/* Converter Tabs */}
      <div className="tab-strip">
        <button
          className={`tab-strip-button ${activeConverter === 'json-csv' ? 'active' : ''}`}
          onClick={() => setActiveConverter('json-csv')}
        >
          JSON → CSV
        </button>
        <button
          className={`tab-strip-button ${activeConverter === 'csv-json' ? 'active' : ''}`}
          onClick={() => setActiveConverter('csv-json')}
        >
          CSV → JSON
        </button>
      </div>

      <main className="shell section" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Show only one converter at a time */}
        {activeConverter === 'json-csv' ? (
          <section id="json-csv" style={{ paddingTop: 0 }}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ marginBottom: 4 }}>JSON to CSV</h2>
                <p className="small muted">Perfect for spreadsheets, exports, and BI pipelines.</p>
              </div>
            </div>

            <div className="grid-split" style={{ alignItems: 'stretch' }}>
              <ConverterCard
                title="JSON to CSV Converter"
                onConvert={handleJsonToCsvConvert}
                inputFileType="json"
                outputFileType="csv"
                options={jsonOptions}
                nativeAd={nativeAd}
                defaultOptions={defaultJsonOptions}
              />
              {proCard}
            </div>
          </section>
        ) : (
          <section id="csv-json" style={{ paddingTop: 0 }}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ marginBottom: 4 }}>CSV to JSON</h2>
                <p className="small muted">For APIs, imports, and data pipelines.</p>
              </div>
            </div>

            <div className="grid-split" style={{ alignItems: 'stretch' }}>
              <ConverterCard
                title="CSV to JSON Converter"
                onConvert={handleCsvToJsonConvert}
                inputFileType="csv"
                outputFileType="json"
                options={csvOptions}
                nativeAd={nativeAd}
                defaultOptions={defaultCsvOptions}
              />
              {proCard}
            </div>
          </section>
        )}

        <section style={{ textAlign: 'center', paddingBottom: 40 }}>
          <div className="badge" style={{ margin: '0 auto 10px auto' }}>100% Private</div>
          <h3 style={{ marginBottom: 6 }}>Your data never leaves your device</h3>
          <p className="small muted">All conversions happen locally in your browser. No uploads, no storage, no tracking.</p>
        </section>

        {/* Trust Links Section */}
        <section style={{ borderTop: '1px solid var(--border)', paddingTop: 32, paddingBottom: 0, textAlign: 'center' }}>
          <h4 style={{ marginBottom: 12, fontSize: '0.95rem', fontWeight: 600 }}>Trust & Transparency</h4>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 }}>
            <a href="/privacy-policy" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Privacy Policy</a>
            <span className="muted" style={{ opacity: 0.3 }}>•</span>
            <a href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Terms of Service</a>
            <span className="muted" style={{ opacity: 0.3 }}>•</span>
            <a href="/about" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>About QuickConvert</a>
          </div>
          <p className="small muted" style={{ fontSize: '0.85rem' }}>Read our privacy-first approach, data handling practices, and what makes QuickConvert different.</p>
        </section>
      </main>
    </div>
  );
}
