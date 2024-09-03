import getIsLike from '@/apis/watch/getIsLike';
import updateLike from '@/apis/watch/updateLike';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface ILikeUpdateProps {
  type: 'likeAdd' | 'likeDelete';
  userId: string;
}

export const useLikeCheck = (playlistId: string, userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['likeCheck', playlistId],
    queryFn: () => getIsLike(userId, playlistId),
    enabled: enabled,
  });
};

export const useLikeUpdate = (playlistId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type, userId }: ILikeUpdateProps) => {
      const response = await updateLike(type, userId, playlistId);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likeCheck', playlistId] });
    },
  });
};
