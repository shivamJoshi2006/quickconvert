/**
 * Tests for CSV and JSON conversion utilities
 * 
 * To run tests:
 * 1. Install: npm install -D @types/jest jest ts-jest
 * 2. Configure jest.config.js
 * 3. Run: npm test
 * 
 * Example tests shown below - copy to proper test files
 */

// NOTE: These tests require Jest to be installed.
// This file demonstrates the test structure.
// For now, see converters working in the application at:
// - /json-to-csv page
// - /csv-to-json page

// Example of how to import and test:
// import { parseCSV, toCSV } from './csv-parser';
// import { parseJSON, jsonToCSV } from './json-converter';

export const testExamples = {
  csvParserTests: `
    describe('CSV Parser', () => {
      test('should parse simple CSV line', () => {
        const result = parseCSVLine('a,b,c', ',');
        expect(result).toEqual(['a', 'b', 'c']);
      });

      test('should handle quoted fields with commas', () => {
        const result = parseCSVLine('"a,b",c,d', ',');
        expect(result).toEqual(['a,b', 'c', 'd']);
      });

      test('should auto-detect delimiters', () => {
        const csv = 'name;age;city\\nJohn;30;NYC';
        const delimiter = autoDetectDelimiter(csv);
        expect(delimiter).toBe(';');
      });
    })
  `,
  
  jsonConverterTests: `
    describe('JSON Converter', () => {
      test('should convert JSON to CSV', () => {
        const json = '[{"name":"John","age":30}]';
        const result = jsonToCSV(json);
        expect(result).toContain('name,age');
      });

      test('should flatten nested objects', () => {
        const obj = { name: 'John', address: { city: 'NYC' } };
        const result = flattenObject(obj);
        expect(result['address.city']).toBe('NYC');
      });
    })
  `,
};

// Quick validation functions (no external dependencies)
export function validateCsvParsing() {
  const csv = 'name,age\nJohn,30';
  try {
    const result = require('./csv-parser').parseCSV(csv);
    return { success: true, rows: result.rows.length };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export function validateJsonConversion() {
  const json = '[{"name":"John","age":30}]';
  try {
    const result = require('./json-converter').parseJSON(json);
    return { success: true, isArray: result.isArray };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

