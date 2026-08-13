/**
 * Shared image URL helper — converts relative upload paths to full URLs.
 * Uses VITE_API_URL from environment, falls back to localhost for dev.
 */
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export const getImageUrl = (image) => {
  if (!image) return '';
  if (image.startsWith('http')) return image;
  return `${API_BASE}/uploads/${image}`;
};
