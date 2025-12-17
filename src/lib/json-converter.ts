/**
 * JSON Converter Utility
 * Handles JSON parsing, validation, and CSV conversion
 */

export interface JSONToCsvOptions {
  delimiter?: string;
  includeHeaders?: boolean;
  customColumnOrder?: string[];
  flattenNested?: boolean;
}

export interface CSVToJsonOptions {
  arrayOfObjects?: boolean; // true = array of objects, false = array of arrays
  prettyPrint?: boolean;
}

/**
 * Flatten nested JSON object using dot notation
 */
export function flattenObject(
  obj: any,
  prefix = '',
  flattened: Record<string, any> = {}
): Record<string, any> {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        flattenObject(value, newKey, flattened);
      } else if (Array.isArray(value)) {
        // Convert arrays to JSON string representation
        flattened[newKey] = JSON.stringify(value);
      } else {
        flattened[newKey] = value;
      }
    }
  }
  return flattened;
}

/**
 * Parse and validate JSON
 */
export function parseJSON(jsonText: string): {
  data: any;
  isArray: boolean;
  isArrayOfObjects: boolean;
} {
  const trimmed = jsonText.trim();

  if (!trimmed) {
    throw new Error('JSON text is empty');
  }

  let data;
  try {
    data = JSON.parse(trimmed);
  } catch (error) {
    throw new Error(
      `Invalid JSON: ${error instanceof Error ? error.message : 'Parse error'}`
    );
  }

  const isArray = Array.isArray(data);
  let isArrayOfObjects = false;

  if (isArray && data.length > 0) {
    isArrayOfObjects = typeof data[0] === 'object' && data[0] !== null;
  }

  return { data, isArray, isArrayOfObjects };
}

/**
 * Convert JSON array to CSV
 */
export function jsonToCSV(
  jsonText: string,
  options: JSONToCsvOptions = {}
): string {
  const {
    delimiter = ',',
    includeHeaders = true,
    customColumnOrder,
    flattenNested = true,
  } = options;

  const { data, isArray, isArrayOfObjects } = parseJSON(jsonText);

  if (!isArray) {
    throw new Error('JSON must be an array of objects to convert to CSV');
  }

  if (data.length === 0) {
    return '';
  }

  if (!isArrayOfObjects) {
    throw new Error('JSON array must contain objects (not primitives)');
  }

  // Flatten nested objects if needed
  let processedData = data;
  if (flattenNested) {
    processedData = data.map((item: any) =>
      flattenObject(item)
    );
  }

  // Determine headers
  let headers: string[] = customColumnOrder || [];
  if (headers.length === 0) {
    const headerSet = new Set<string>();
    for (const row of processedData) {
      Object.keys(row).forEach(key => headerSet.add(key));
    }
    headers = Array.from(headerSet).sort();
  }

  // Build CSV
  const lines: string[] = [];

  if (includeHeaders) {
    lines.push(
      headers
        .map(h => escapeCSVField(h, delimiter))
        .join(delimiter)
    );
  }

  for (const row of processedData) {
    const values = headers.map(header => {
      const value = row[header];
      return escapeCSVField(value, delimiter);
    });
    lines.push(values.join(delimiter));
  }

  return lines.join('\n');
}

/**
 * Convert CSV to JSON
 */
export function csvToJSON(
  csvData: {
    headers: string[];
    rows: Record<string, string | null>[] | string[][];
  },
  options: CSVToJsonOptions = {}
): string {
  const { arrayOfObjects = true, prettyPrint = true } = options;

  let result: any;

  if (arrayOfObjects) {
    // The rows already contain objects if parsed with headers
    result = Array.isArray(csvData.rows) && csvData.rows.length > 0
      ? typeof csvData.rows[0] === 'object' &&
        !Array.isArray(csvData.rows[0])
        ? csvData.rows
        : csvData.rows.map((row: any) => {
            const obj: Record<string, any> = {};
            if (Array.isArray(row)) {
              for (let i = 0; i < csvData.headers.length; i++) {
                obj[csvData.headers[i]] = row[i];
              }
            } else {
              return row;
            }
            return obj;
          })
      : [];
  } else {
    // Convert objects back to arrays
    result = csvData.rows.map((row: any) => {
      if (Array.isArray(row)) return row;
      return csvData.headers.map(header => row[header]);
    });
  }

  return prettyPrint
    ? JSON.stringify(result, null, 2)
    : JSON.stringify(result);
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

/**
 * Format bytes for display
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate file size
 */
export function validateFileSize(
  file: File,
  maxSizeMB: number = 20
): { valid: boolean; error?: string } {
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit (${formatBytes(file.size)})`,
    };
  }
  return { valid: true };
}
