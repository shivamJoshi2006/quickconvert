'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/theme-provider';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 20,
      backdropFilter: 'blur(10px)',
      background: 'color-mix(in srgb, var(--surface) 92%, transparent)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="shell" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 0',
        gap: '12px',
      }}>
        <Link href="/" style={{
          textDecoration: 'none',
          color: 'var(--text)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 700,
          letterSpacing: '-0.01em',
        }}>
          <div className="badge" style={{ gap: '8px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            QuickConvert
          </div>
        </Link>

        <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link href="#json-csv" style={{ color: 'var(--muted)', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>JSON → CSV</Link>
          <Link href="#csv-json" style={{ color: 'var(--muted)', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>CSV → JSON</Link>
        </nav>

        <style>{`
          @media (max-width: 640px) {
            nav {
              display: none !important;
            }
          }
        `}</style>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="ghost"
            style={{
              width: 38,
              height: 38,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '12px',
            }}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <a
            href="#pro"
            className="pill"
            style={{ textDecoration: 'none', padding: '8px 14px' }}
          >
            Go Pro
          </a>
        </div>
      </div>
    </header>
  );
}
