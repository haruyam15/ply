import postComment from '@/apis/watch/postComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface INewCommentData {
  content: string;
  date: string;
  writer: string;
}

export const useCommentAdd = (playlistId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCommentData: INewCommentData) => {
      const response = await postComment(playlistId, newCommentData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watch', 'comment', playlistId] });
    },
  });
};
