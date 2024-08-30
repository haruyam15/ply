export default function forkVideoId(url: string): string | null {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : null;
}
