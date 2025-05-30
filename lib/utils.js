import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

/**
 * Combines Tailwind CSS classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to a more readable format
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Generate excerpt from markdown content
 */
export function generateExcerpt(content, maxLength = 160) {
  if (!content) return '';
  
  // Remove markdown syntax
  let plainText = content
    .replace(/#+\s+(.*)/g, '$1') // Headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1') // Italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/!\[(.*?)\]\(.*?\)/g, '') // Images
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/`(.*?)`/g, '$1') // Inline code
    .replace(/\n/g, ' ') // Newlines
    .replace(/\s+/g, ' ') // Multiple spaces
    .trim();
  
  // Truncate to maxLength
  if (plainText.length > maxLength) {
    plainText = plainText.substring(0, maxLength) + '...';
  }
  
  return plainText;
}

/**
 * Get estimated reading time for an article
 */
export function getReadingTime(content) {
  if (!content) return '0 min read';
  
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} min read`;
}

/**
 * Check if current page is active
 */
export function isActivePage(currentPath, pagePath) {
  if (!currentPath || !pagePath) return false;
  
  // Exact match
  if (currentPath === pagePath) return true;
  
  // Check if current path starts with pagePath (for nested routes)
  if (pagePath !== '/' && currentPath.startsWith(pagePath)) return true;
  
  return false;
}