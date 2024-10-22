import getIsFollowing from '@/apis/watch/getIsFollowing';
import updateFollowing from '@/apis/watch/updateFollowing';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

interface IFollowingUpdateProps {
  type: 'follow' | 'followDelete';
  followerUserId: string;
  targetUserId: string;
}

export const useFollowingCheck = (userId: string, targetUserId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['followingCheck', userId, targetUserId],
    queryFn: () => getIsFollowing(userId, targetUserId),
    enabled: enabled,
  });
};

export const useFollowingUpdate = (
  isFollowng: boolean,
  setIsFollowing: Dispatch<SetStateAction<boolean>>,
) => {
  return useMutation({
    mutationFn: async ({ type, followerUserId, targetUserId }: IFollowingUpdateProps) => {
      const response = await updateFollowing(type, followerUserId, targetUserId);
      return response;
    },
    onMutate: async () => {
      setIsFollowing(!isFollowng);
    },
    onError: () => {
      setIsFollowing(isFollowng);
    },
  });
};
