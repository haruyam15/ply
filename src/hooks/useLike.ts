import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLike } from '@/apis/watch/postLike';

interface ILikeUpdateProps {
  type: 'likeAdd' | 'likeDelete';
  userId: string;
}

export const useLikeUpdate = (playlistId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type, userId }: ILikeUpdateProps) => {
      const response = await updateLike(type, userId, playlistId);
      return response;
    },
    // onMutate: async () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likeCheck', playlistId] });
    },
  });
};
