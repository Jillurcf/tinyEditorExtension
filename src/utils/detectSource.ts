// src/utils/detectSource.ts

type SourceType = 'microsoft_office' | 'google_docs' | 'excel' | 'unknown';

/**
 * Detects the source of the pasted HTML content.
 * @param html - The HTML content to analyze.
 * @returns The detected source type.
 */
const detectSource = (html: string): SourceType => {
  if (html.includes('mso-')) {
    return 'microsoft_office';
  }
  if (html.includes('docs.google.com')) {
    return 'google_docs';
  }
  if (html.includes('<table') && html.includes('Excel')) {
    return 'excel';
  }
  return 'unknown';
};

export default detectSource;
