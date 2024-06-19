export default function getBaseUrl(url) {
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.protocol}//${parsedUrl.host}`;
    } catch (error) {
      console.error('Invalid URL:', error);
      return null;
    }
  }