import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | QuickConvert",
  description:
    "Learn how QuickConvert protects your privacy. All conversions happen locally in your browser. No uploads, no storage, no tracking.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="shell section">
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 12 }}>Privacy Policy</h1>
        <p className="small muted" style={{ marginBottom: 16 }}>Effective date: {new Date().getFullYear()}</p>

        <p style={{ marginBottom: 12 }}>
          <strong>QuickConvert is privacy-first.</strong> We believe your data is yours alone. This policy explains how QuickConvert protects your privacy when converting files between JSON, CSV, and other formats.
        </p>

        <h3 style={{ margin: "16px 0 8px" }}>Browser-Based Processing: Files Never Leave Your Device</h3>
        <p style={{ marginBottom: 12 }}>
          QuickConvert performs all conversions entirely in your web browser using JavaScript. <strong>Your files never leave your device.</strong> When you upload a file or paste data:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li>Data is processed locally in your browser's memory.</li>
          <li>No files are transmitted to our servers or any third-party service.</li>
          <li>No data is stored on our servers after your session ends.</li>
          <li>No conversion records or logs are kept.</li>
          <li>You maintain complete control over your data at all times.</li>
        </ul>

        <h3 style={{ margin: "16px 0 8px" }}>What We Don't Collect</h3>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li><strong>No file content:</strong> We never see, store, or process the contents of your files on our servers.</li>
          <li><strong>No personal accounts:</strong> QuickConvert requires no sign-up, login, or personal information.</li>
          <li><strong>No personal data:</strong> We do not collect names, emails, or other identifying information.</li>
          <li><strong>No usage analytics:</strong> We do not track which files you convert or your conversion history.</li>
        </ul>

        <h3 style={{ margin: "16px 0 8px" }}>Advertising & AdSense Disclosure</h3>
        <p style={{ marginBottom: 12 }}>
          QuickConvert uses <strong>Google AdSense</strong> to display ads and support ongoing development. Here's what this means for your privacy:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li>Google AdSense may place cookies or use similar tracking technologies to serve relevant ads.</li>
          <li>Google's ad serving is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.</li>
          <li>You can opt out of personalized ads through <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google Ad Settings</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.</li>
          <li>Ads are served independently of your conversion data; advertisers never see your files.</li>
        </ul>

        <h3 style={{ margin: "16px 0 8px" }}>Third-Party Cookies & Analytics</h3>
        <p style={{ marginBottom: 12 }}>
          QuickConvert may use third-party services for site analytics and ad delivery (e.g., Google Analytics). These services:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li>Place cookies in your browser to help us understand site traffic and performance.</li>
          <li>Track usage patterns, page visits, and device information (not your personal data or file content).</li>
          <li>Are governed by the privacy policies of those third parties.</li>
          <li>Allow you to manage preferences through browser settings or opt-out tools.</li>
        </ul>

        <h3 style={{ margin: "16px 0 8px" }}>Your Browser Privacy Controls</h3>
        <p style={{ marginBottom: 12 }}>
          You have full control over cookies and tracking in your browser:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li>Clear cookies, cache, and browsing history in your browser settings.</li>
          <li>Disable third-party cookies if your browser supports it.</li>
          <li>Use private/incognito browsing mode to avoid persistent cookies.</li>
          <li>Install browser extensions that block tracking or ads.</li>
        </ul>

        <h3 style={{ margin: "16px 0 8px" }}>Data Security</h3>
        <p style={{ marginBottom: 12 }}>
          Because all conversions happen locally in your browser, data security depends on your device and browser. We recommend:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li>Keeping your browser and operating system up to date.</li>
          <li>Using a trusted, updated browser.</li>
          <li>Being cautious when accessing QuickConvert on shared devices.</li>
        </ul>

        <h3 style={{ margin: "16px 0 8px" }}>HTTPS & Secure Connection</h3>
        <p style={{ marginBottom: 12 }}>
          QuickConvert is served over HTTPS, which encrypts your connection to the site. This protects your data in transit, though all conversions still occur on your device.
        </p>

        <h3 style={{ margin: "16px 0 8px" }}>Policy Changes</h3>
        <p style={{ marginBottom: 12 }}>
          We may update this Privacy Policy to reflect changes in our service or privacy practices. Significant changes will be noted on this page, with a new effective date.
        </p>

        <h3 style={{ margin: "16px 0 8px" }}>Questions or Concerns?</h3>
        <p style={{ marginBottom: 12 }}>
          If you have questions about how QuickConvert handles your privacy, or if you have concerns about this policy, please contact us at <a href="mailto:privacy@quickconvert.dev">privacy@quickconvert.dev</a>.
        </p>
      </div>
    </div>
  );
}
