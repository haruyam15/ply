import postComment from '@/apis/watch/postComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface INewCommentData {
  content: string;
  date: string;
  writer: string;
}

export const useCommentAdd = (playlistId: string, profileImage: string, userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCommentData: INewCommentData) => {
      const response = await postComment(playlistId, newCommentData);
      return response;
    },
    onMutate: async (newCommentData) => {
      const previousData = queryClient.getQueryData(['watch', 'comment', playlistId]);
      const {
        content: commentsContent,
        date: commentsDate,
        writer: commentsWriter,
      } = newCommentData;
      if (previousData) {
        queryClient.setQueryData(
          ['watch', 'comments', playlistId],
          [
            {
              ...previousData,
              comments: {
                _id: Math.random().toString(),
                commentsContent,
                commentsDate,
                commentsWriter,
                profileImage: profileImage,
                userName: userId,
              },
            },
          ],
        );
      }
      return {
        previousData,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watch', 'comment', playlistId] });
    },
    onError: (_error, _newCommentData, context) => {
      if (context) {
        queryClient.setQueryData(['watch', 'comment', playlistId], context.previousData);
      }
    },
  });
};
