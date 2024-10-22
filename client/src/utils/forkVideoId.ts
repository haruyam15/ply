export default function forkVideoId(url: string): string | null {
  // `v=` 형식의 URL에서 유튜브 영상 ID 추출
  let match = url.match(/v=([^&]+)/);
  if (match) {
    return match[1];
  }
  // `vi/{videoId}/` 형식의 URL에서 유튜브 영상 ID 추출
  match = url.match(/vi\/([^/]+)\//);
  return match ? match[1] : null;
}
