import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | QuickConvert",
  description:
    "Terms of service for QuickConvert. Provided as-is, no warranties. You are responsible for your data.",
};

export default function TermsPage() {
  return (
    <div className="shell section">
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 12 }}>Terms of Service</h1>
        <p className="small muted" style={{ marginBottom: 16 }}>Effective date: {new Date().getFullYear()}</p>

        <p style={{ marginBottom: 12 }}>
          By using QuickConvert, you agree to these terms and conditions. We aim to keep them simple, fair, and transparent.
        </p>

        <h3 style={{ margin: "16px 0 8px" }}>Use License</h3>
        <p style={{ marginBottom: 12 }}>
          QuickConvert grants you a limited, non-exclusive, non-transferable license to use this online conversion tool for personal and commercial purposes. You may not:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li>Reproduce, duplicate, or copy the software for other purposes.</li>
          <li>Reverse engineer, disassemble, or decompile the code.</li>
          <li>Use the service for illegal purposes or in violation of applicable laws.</li>
          <li>Attempt to gain unauthorized access to the service or its systems.</li>
          <li>Harass, abuse, or interfere with the service or other users.</li>
        </ul>

        <h3 style={{ margin: "16px 0 8px" }}>As-Is Provision</h3>
        <p style={{ marginBottom: 12 }}>
          <strong>QuickConvert is provided "AS-IS" without warranties or guarantees of any kind.</strong> We make no representations regarding:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li>Accuracy of conversions or output data.</li>
          <li>Suitability for a particular purpose or use case.</li>
          <li>Uninterrupted availability or operation.</li>
          <li>Compatibility with all file types or formats.</li>
          <li>Protection against data loss or corruption.</li>
        </ul>

        <h3 style={{ margin: "16px 0 8px" }}>No Warranties</h3>
        <p style={{ marginBottom: 12 }}>
          We disclaim all implied warranties, including merchantability, fitness for a particular purpose, and non-infringement. QuickConvert does not warrant that:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li>The service will meet your specific needs or expectations.</li>
          <li>Conversions will be error-free or complete.</li>
          <li>The service will be available at all times without interruption.</li>
        </ul>

        <h3 style={{ margin: "16px 0 8px" }}>Your Responsibility</h3>
        <p style={{ marginBottom: 12 }}>
          <strong>You are responsible for your data and how you use this service.</strong> Specifically:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li>Verify conversions are accurate before using them in production or critical workflows.</li>
          <li>Maintain your own backups of important files.</li>
          <li>Ensure your use complies with all applicable laws and regulations.</li>
          <li>Be aware that data in your browser can be lost if you close the tab or clear cache.</li>
        </ul>

        <h3 style={{ margin: "16px 0 8px" }}>Limitation of Liability</h3>
        <p style={{ marginBottom: 12 }}>
          <strong>QuickConvert and its creators are not liable for any indirect, incidental, special, or consequential damages</strong> arising from your use of this service, including:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li>Data loss or corruption.</li>
          <li>Loss of revenue, profits, or business.</li>
          <li>Loss of use or productivity.</li>
          <li>Errors or inaccuracies in conversion output.</li>
          <li>Interruption or unavailability of the service.</li>
        </ul>
        <p style={{ marginBottom: 12 }}>
          Even if advised of the possibility of such damages, QuickConvert's total liability shall not exceed the amount you paid (if any) to use the service.
        </p>

        <h3 style={{ margin: "16px 0 8px" }}>Availability & Service Interruptions</h3>
        <p style={{ marginBottom: 12 }}>
          QuickConvert is provided on a best-effort basis. We may:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li>Temporarily interrupt the service for maintenance or updates.</li>
          <li>Modify or discontinue features or the entire service at any time without notice.</li>
          <li>Change technical requirements or supported formats.</li>
        </ul>

        <h3 style={{ margin: "16px 0 8px" }}>Prohibited Content & Conduct</h3>
        <p style={{ marginBottom: 12 }}>
          You agree not to use QuickConvert for:
        </p>
        <ul style={{ paddingLeft: 18, marginBottom: 12, lineHeight: 1.6 }}>
          <li>Illegal activities or content.</li>
          <li>Harassment, abuse, or threats toward others.</li>
          <li>Transmitting malware or harmful code.</li>
          <li>Violating intellectual property rights.</li>
          <li>Spamming or fraudulent activities.</li>
        </ul>

        <h3 style={{ margin: "16px 0 8px" }}>Changes to This Agreement</h3>
        <p style={{ marginBottom: 12 }}>
          We may modify these terms at any time. Significant changes will be posted on this page with a new effective date. Your continued use of QuickConvert after changes means you accept the updated terms.
        </p>

        <h3 style={{ margin: "16px 0 8px" }}>Governing Law</h3>
        <p style={{ marginBottom: 12 }}>
          These terms and your use of QuickConvert are governed by applicable law in your jurisdiction. Any disputes shall be resolved in the courts of that jurisdiction.
        </p>

        <h3 style={{ margin: "16px 0 8px" }}>Contact</h3>
        <p style={{ marginBottom: 12 }}>
          If you have questions about these terms or your use of QuickConvert, contact us at <a href="mailto:legal@quickconvert.dev">legal@quickconvert.dev</a>.
        </p>
      </div>
    </div>
  );
}
