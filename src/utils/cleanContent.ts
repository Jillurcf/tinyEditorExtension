// src/utils/cleanContent.ts

import sanitizeHtml from 'sanitize-html';
import { SourceType } from './detectSource';

/**
 * Cleans and sanitizes HTML content based on source and formatting preference.
 * @param html - The raw HTML content to clean.
 * @param source - The detected source of the content.
 * @param keepFormatting - Whether to retain original formatting.
 * @returns The cleaned HTML content.
 */
const cleanContent = (html: string, source: SourceType, keepFormatting: boolean): string => {
  if (!keepFormatting) {
    // Strip all tags and return plain text
    return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
  }

  // Define allowed tags and attributes
  let allowedTags: string[] = [
    'p', 'b', 'i', 'strong', 'em', 'ul', 'ol', 'li', 'br',
    'span', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
  ];

  let allowedAttributes: { [key: string]: string[] } = {
    '*': ['style', 'class'],
    'a': ['href', 'name', 'target'],
    'img': ['src', 'alt'],
    'table': ['border', 'cellpadding', 'cellspacing'],
  };

  // Customize based on source if needed
  if (source === 'microsoft_office') {
    // Example: Remove mso-specific styles
    allowedAttributes['*'] = allowedAttributes['*'].filter(attr => attr !== 'style');
    // Further cleaning can be implemented here
  }

  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
    // Additional options like transforming tags can be added here
  });
};

export default cleanContent;
