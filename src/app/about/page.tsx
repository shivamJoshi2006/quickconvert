import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | QuickConvert",
  description:
    "Learn about QuickConvert. Privacy-first, browser-based JSON and CSV converter for developers, analysts, and students.",
};

export default function AboutPage() {
  return (
    <div className="shell section">
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 12 }}>About QuickConvert</h1>
        <p className="small muted" style={{ marginBottom: 24 }}>Fast, private, browser-based file format conversion for modern developers and data professionals.</p>

        <h3 style={{ margin: "24px 0 12px" }}>What is QuickConvert?</h3>
        <p style={{ marginBottom: 12 }}>
          QuickConvert is a free, online file converter designed for <strong>JSON to CSV conversion</strong> and <strong>CSV to JSON conversion</strong>. Built with privacy and performance in mind, QuickConvert runs entirely in your browser, ensuring your data never leaves your device. Whether you're preparing data exports for spreadsheets, building API integrations, or managing data pipelines, QuickConvert provides instant, reliable format conversion without uploads or accounts.
        </p>
        <p style={{ marginBottom: 12 }}>
          Unlike traditional online converters, QuickConvert performs all processing locally in your web browser. This means <strong>no file uploads to servers, no data storage, and no third-party processing</strong>—just fast, private conversion on your device.
        </p>

        <h3 style={{ margin: "24px 0 12px" }}>Who QuickConvert is For</h3>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.8 }}>
          <li><strong>Developers & Engineers:</strong> Working with APIs, microservices, data pipelines, and file transformations. QuickConvert handles common format conversions without writing custom code.</li>
          <li><strong>Data Analysts & Business Professionals:</strong> Preparing data for spreadsheets, business intelligence tools, and reporting platforms. Convert large datasets quickly without manual formatting.</li>
          <li><strong>Students & Researchers:</strong> Learning data formats, working on projects, and understanding how JSON and CSV structures differ. Educational and low-stakes experimentation.</li>
          <li><strong>System Administrators & DevOps:</strong> Managing configuration files, data exports, and integration tasks. Reliable format conversion as part of workflows.</li>
          <li><strong>Anyone with Privacy Concerns:</strong> Converting files without uploading sensitive data to remote servers. QuickConvert is ideal for confidential, proprietary, or sensitive data.</li>
        </ul>

        <h3 style={{ margin: "24px 0 12px" }}>Why Browser-Based Conversion Matters</h3>
        <p style={{ marginBottom: 12 }}>
          Traditional online converters upload your files to servers, introducing several risks and limitations:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.8 }}>
          <li><strong>Privacy Risk:</strong> Files may be logged, analyzed, or stored.</li>
          <li><strong>Performance Issues:</strong> Upload/download adds latency and bandwidth usage.</li>
          <li><strong>File Size Limits:</strong> Servers often restrict file sizes.</li>
          <li><strong>Data Security:</strong> Transmission and storage introduce potential vulnerabilities.</li>
          <li><strong>Dependency on Availability:</strong> If the service is down, you can't convert files.</li>
        </ul>
        <p style={{ marginBottom: 12 }}>
          QuickConvert solves these problems by running conversion <strong>entirely in your browser</strong>:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.8 }}>
          <li><strong>Complete Privacy:</strong> Files stay on your device; nothing is transmitted to servers.</li>
          <li><strong>Instant Processing:</strong> No upload/download time—conversions happen immediately.</li>
          <li><strong>Larger File Support:</strong> Limited only by your device's browser memory.</li>
          <li><strong>Offline Capable:</strong> Works without internet after the page loads (with future updates).</li>
          <li><strong>No Account Required:</strong> Start converting instantly; no login, no tracking.</li>
        </ul>

        <h3 style={{ margin: "24px 0 12px" }}>Our Privacy & Performance Philosophy</h3>
        <p style={{ marginBottom: 12 }}>
          QuickConvert is built on three core principles:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.8 }}>
          <li><strong>Privacy First:</strong> Your data is yours. We never collect, store, or analyze file contents. All conversions happen on your device in your browser.</li>
          <li><strong>Performance Second:</strong> Browser-based processing means conversions are fast, with zero server latency. Even large files convert in milliseconds.</li>
          <li><strong>Simplicity Always:</strong> No accounts, no setup, no complexity. Visit the site, paste or upload your file, and convert instantly.</li>
        </ul>

        <h3 style={{ margin: "24px 0 12px" }}>Supported Formats & Features</h3>
        <p style={{ marginBottom: 12 }}>
          <strong>Current Formats:</strong>
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.8 }}>
          <li><strong>JSON:</strong> Convert to CSV with nested field flattening, custom delimiters, and header options.</li>
          <li><strong>CSV:</strong> Convert to JSON with auto-delimiter detection, header mapping, and array/object output.</li>
        </ul>
        <p style={{ marginBottom: 12 }}>
          <strong>Future Expansion:</strong> We're exploring support for Excel (XLSX), XML, YAML, and more formats—all staying true to our privacy-first, browser-based approach.
        </p>

        <h3 style={{ margin: "24px 0 12px" }}>Technical Highlights</h3>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.8 }}>
          <li><strong>Built with Next.js & React:</strong> Modern, fast web stack with server-side rendering for SEO and static page optimization.</li>
          <li><strong>100% Browser Processing:</strong> All conversion logic runs in your browser using JavaScript. No server-side computation.</li>
          <li><strong>HTTPS & Secure Transport:</strong> All connections are encrypted; your browser connection is secure.</li>
          <li><strong>Progressive Web App (PWA):</strong> Install QuickConvert on your device for offline-ready usage.</li>
          <li><strong>Responsive Design:</strong> Works seamlessly on desktop, tablet, and mobile devices.</li>
          <li><strong>Dark Mode Support:</strong> Comfortable experience in light or dark environments.</li>
        </ul>

        <h3 style={{ margin: "24px 0 12px" }}>The Team & Community</h3>
        <p style={{ marginBottom: 12 }}>
          QuickConvert is maintained by a small team committed to privacy-respecting, developer-friendly tools. We listen to user feedback and continuously improve the converter to meet real-world needs.
        </p>
        <p style={{ marginBottom: 12 }}>
          Have ideas, bug reports, or feature requests? We'd love to hear from you at <a href="mailto:feedback@quickconvert.dev">feedback@quickconvert.dev</a>.
        </p>

        <h3 style={{ margin: "24px 0 12px" }}>Security & Trust</h3>
        <p style={{ marginBottom: 12 }}>
          <strong>No Data Collection:</strong> We do not collect personal information, file contents, or conversion logs.
        </p>
        <p style={{ marginBottom: 12 }}>
          <strong>No Third-Party Integrations for Data:</strong> Your files are never sent to external services (except ads, which see no data).
        </p>
        <p style={{ marginBottom: 12 }}>
          <strong>Open Approach to Ads:</strong> QuickConvert uses Google AdSense to support development. Ads are delivered independently; advertisers never see your data.
        </p>
        <p style={{ marginBottom: 12 }}>
          See our <a href="/privacy-policy">Privacy Policy</a> for complete details.
        </p>

        <h3 style={{ margin: "24px 0 12px" }}>Get Started</h3>
        <p style={{ marginBottom: 12 }}>
          Ready to convert your files? Head to the <a href="/">home page</a> and start converting. No sign-up, no limits—just instant, private conversion.
        </p>

        <p style={{ marginBottom: 12, paddingTop: 16, borderTop: "1px solid var(--border)", marginTop: 24 }}>
          Questions or feedback? Reach out at <a href="mailto:hello@quickconvert.dev">hello@quickconvert.dev</a>.
        </p>
      </div>
    </div>
  );
}
