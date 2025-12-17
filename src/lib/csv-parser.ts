/**
 * CSV Parser Utility
 * Handles parsing CSV text into structured data
 */

export interface CSVParseOptions {
  hasHeader?: boolean;
  delimiter?: string;
  autoDetectDelimiter?: boolean;
}

export interface CSVParseResult {
  headers: string[];
  rows: Record<string, string | null>[] | string[][];
  rawData: string;
}

/**
 * Auto-detect delimiter from CSV text
 * Tries to determine if the CSV uses comma, semicolon, or tab
 */
export function autoDetectDelimiter(csvText: string): string {
  const lines = csvText.trim().split('\n').slice(0, 5); // Check first 5 lines
  const candidates = [',', ';', '\t', '|'];
  
  let bestDelimiter = ',';
  let bestScore = 0;

  for (const delimiter of candidates) {
    let score = 0;
    for (const line of lines) {
      const count = line.split(delimiter).length - 1;
      if (count > 0) score += count;
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestDelimiter = delimiter;
    }
  }

  return bestDelimiter;
}

/**
 * Parse CSV text into rows (handles quoted fields and escaped quotes)
 */
export function parseCSVLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let insideQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i += 2;
        continue;
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
        i++;
        continue;
      }
    }

    if (char === delimiter && !insideQuotes) {
      result.push(current.trim());
      current = '';
      i++;
      continue;
    }

    current += char;
    i++;
  }

  result.push(current.trim());
  return result;
}

/**
 * Parse CSV text into structured data
 */
export function parseCSV(
  csvText: string,
  options: CSVParseOptions = {}
): CSVParseResult {
  const {
    hasHeader = true,
    autoDetectDelimiter: shouldAutoDetect = true,
  } = options;

  const trimmedText = csvText.trim();
  if (!trimmedText) {
    throw new Error('CSV text is empty');
  }

  const lines = trimmedText.split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    throw new Error('No valid CSV lines found');
  }

  let delimiter = options.delimiter || ',';
  
  if (shouldAutoDetect && !options.delimiter) {
    delimiter = autoDetectDelimiter(trimmedText);
  }

  // Parse header
  let headers: string[] = [];
  let dataStartIndex = 0;

  if (hasHeader && lines.length > 0) {
    headers = parseCSVLine(lines[0], delimiter);
    dataStartIndex = 1;
  }

  // Parse data rows
  const rows: Record<string, string | null>[] = [];

  for (let i = dataStartIndex; i < lines.length; i++) {
    const values = parseCSVLine(lines[i], delimiter);

    if (hasHeader) {
      const row: Record<string, string | null> = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j] || null;
      }
      rows.push(row);
    }
  }

  return {
    headers,
    rows,
    rawData: trimmedText,
  };
}

/**
 * Convert CSV object array back to CSV string
 */
export function toCSV(
  data: Record<string, any>[],
  options: { delimiter?: string; includeHeaders?: boolean } = {}
): string {
  const { delimiter = ',', includeHeaders = true } = options;

  if (data.length === 0) {
    return '';
  }

  const headers = Object.keys(data[0]);
  const lines: string[] = [];

  if (includeHeaders) {
    lines.push(
      headers
        .map(h => escapeCSVField(h, delimiter))
        .join(delimiter)
    );
  }

  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      return escapeCSVField(value, delimiter);
    });
    lines.push(values.join(delimiter));
  }

  return lines.join('\n');
}

/**
 * Escape CSV field value according to RFC 4180
 */
function escapeCSVField(value: any, delimiter: string): string {
  if (value === null || value === undefined) {
    return '';
  }

  const stringValue = String(value);

  // Check if field needs quoting
  if (
    stringValue.includes(delimiter) ||
    stringValue.includes('\n') ||
    stringValue.includes('\r') ||
    stringValue.includes('"')
  ) {
    // Escape quotes by doubling them
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}
