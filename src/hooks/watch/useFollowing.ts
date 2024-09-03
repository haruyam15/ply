import getIsFollowing from '@/apis/watch/getIsFollowing';
import updateFollowing from '@/apis/watch/updateFollowing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface IFollowingUpdateProps {
  type: 'follow' | 'followDelete';
  followerUserId: string;
  targetUserId: string;
}

export const useFollowingCheck = (
  playlistId: string,
  userId: string,
  targetUserId: string,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ['followingCheck', playlistId],
    queryFn: () => getIsFollowing(userId, targetUserId),
    enabled: enabled,
  });
};

export const useFollowingUpdate = (playlistId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type, followerUserId, targetUserId }: IFollowingUpdateProps) => {
      const response = await updateFollowing(type, followerUserId, targetUserId);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followingCheck', playlistId] });
    },
  });
};
