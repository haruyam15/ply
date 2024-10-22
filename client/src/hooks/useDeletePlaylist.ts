// hooks/useDeletePlaylist.ts
import { useState } from 'react';

const useDeletePlaylist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePlaylist = async (playlistId: string, onSuccess?: () => void) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/playlistDelete/${playlistId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('삭제 성공');
        onSuccess?.(); // 삭제 성공 시 콜백 호출
      } else {
        const errorData = await response.json();
        console.error('삭제 실패:', errorData);
        setError('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('삭제 요청 중 오류 발생:', error);
      setError('삭제 요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    deletePlaylist,
  };
};

export default useDeletePlaylist;
