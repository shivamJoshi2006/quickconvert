import React from "react";

export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: 24 }}>
      <div className="shell" style={{ padding: "16px 0" }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: 4, color: 'var(--text)' }}>QuickConvert</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 12 }}>Fast, private file format conversion in your browser</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="/privacy-policy" style={{ fontSize: "0.85rem", color: "var(--muted)", textDecoration: "none" }}>Privacy</a>
          <span className="muted" style={{ opacity: 0.5 }}>|</span>
          <a href="/terms" style={{ fontSize: "0.85rem", color: "var(--muted)", textDecoration: "none" }}>Terms</a>
          <span className="muted" style={{ opacity: 0.5 }}>|</span>
          <a href="/about" style={{ fontSize: "0.85rem", color: "var(--muted)", textDecoration: "none" }}>About</a>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center', marginTop: 12, opacity: 0.7 }}>© {new Date().getFullYear()} QuickConvert. All conversions happen locally in your browser.</p>
      </div>
    </footer>
  );
}
