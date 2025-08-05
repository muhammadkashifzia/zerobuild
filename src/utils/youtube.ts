/**
 * Extracts the YouTube video ID from various YouTube URL formats
 * @param url - The YouTube URL (watch, youtu.be, embed, etc.)
 * @returns The video ID or null if invalid
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  // Handle youtu.be format
  const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuBeMatch) return youtuBeMatch[1];

  // Handle youtube.com/watch format
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];

  // Handle youtube.com/embed format
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch) return embedMatch[1];

  // Handle youtube.com/v format
  const vMatch = url.match(/youtube\.com\/v\/([a-zA-Z0-9_-]+)/);
  if (vMatch) return vMatch[1];

  return null;
}

/**
 * Converts a YouTube URL to an embed URL
 * @param url - The YouTube URL
 * @returns The embed URL or null if invalid
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;
  
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Gets the YouTube thumbnail URL
 * @param url - The YouTube URL
 * @param quality - The thumbnail quality ('default', 'medium', 'high', 'maxres')
 * @returns The thumbnail URL or null if invalid
 */
export function getYouTubeThumbnailUrl(url: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'maxres'): string | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;
  
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
} 