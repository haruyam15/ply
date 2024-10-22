import getIsLike from '@/apis/watch/getIsLike';
import updateLike from '@/apis/watch/updateLike';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

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

export const useLikeUpdate = (
  playlistId: string,
  likeCnt: number,
  setLikeCnt: Dispatch<SetStateAction<number>>,
) => {
  return useMutation({
    mutationFn: async ({ type, userId }: ILikeUpdateProps) => {
      const response = await updateLike(type, userId, playlistId);
      return response;
    },
    onMutate: async ({ type }) => {
      console.log(type);
      const previousLikeCnt = likeCnt;
      setLikeCnt((prev) => (type === 'likeAdd' ? prev + 1 : prev - 1));
      return { previousLikeCnt };
    },
    onError: (_error, _type, context) => {
      if (context) {
        setLikeCnt(context.previousLikeCnt);
      }
    },
  });
};
