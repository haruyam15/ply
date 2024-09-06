/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Heart } from 'lucide-react';
import Button from '@/components/Button';
import Tags from '@/components/Tags';
import User from '@/components/User';
import { colors } from '@/styles/colors';
import { useEffect, useState } from 'react';
import useUserStore from '@/stores/useUserStore';
import { If } from '@/components/IfElse';
import { useLikeCheck, useLikeUpdate } from '@/hooks/watch/useLike';
import { useFollowingCheck, useFollowingUpdate } from '@/hooks/watch/useFollowing';
import { IPlaylist } from '@/types/playlistTypes';

interface IPlaylistInfoProps {
  playlistId: string;
  playlistData: IPlaylist;
  playingVideoTitle: string;
}

function PlaylistInfo({ playlistId, playlistData, playingVideoTitle }: IPlaylistInfoProps) {
  const userInformation = useUserStore((state) => state.userInformation);
  const setUser = useUserStore((state) => state.setUser);
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const { mutate: mutateForLike } = useLikeUpdate(playlistId, likeCnt, setLikeCnt);
  const { mutate: mutateForFollowing } = useFollowingUpdate(isFollowing, setIsFollowing);
  const playlistOwner = playlistData.userId;

  const {
    data: isFollowingData,
    isError: isFollowingError,
    isLoading: isFollowingLoading,
  } = useFollowingCheck(userInformation.userId, playlistOwner as string, !!playlistOwner);

  const { data: isLikeData, isError: isLikeError } = useLikeCheck(
    playlistId,
    userInformation.userId,
    !!userInformation.userId,
  );

  useEffect(() => {
    setLikeCnt(playlistData.like);
  }, [playlistData]);

  useEffect(() => {
    if (isLikeData !== undefined) setIsLike(isLikeData);
  }, [isLikeData]);

  useEffect(() => {
    if (isFollowingData !== undefined) setIsFollowing(isFollowingData);
  }, [isFollowingData]);

  if (isLikeError) {
    alert('좋아요 처리에 오류가 발생했습니다.');
  }

  if (isFollowingError) {
    alert('팔로잉 처리에 오류가 발생했습니다.');
  }

  const handleEvent = {
    like() {
      const type = isLike ? 'likeDelete' : 'likeAdd';
      setIsLike(!isLike);
      mutateForLike({ type, userId: userInformation.userId });
    },
    following() {
      const type = isFollowing ? 'followDelete' : 'follow';
      mutateForFollowing({
        type,
        followerUserId: userInformation.userId,
        targetUserId: playlistOwner as string,
      });
      if (isFollowing) {
        setUser({
          ...userInformation,
          following: userInformation.following.filter((f) => f.userId !== playlistOwner),
        });
      } else {
        setUser({
          ...userInformation,
          following: [
            ...userInformation.following,
            { userId: playlistOwner, profileImage: playlistData.profileImage, nickname: userName },
          ],
        });
      }
    },
  };

  const { title, tags, content, date, userName, profileImage, userId } = playlistData;

  return (
    <div className="playlist-info" css={playlistInfo}>
      <div className="info-header">
        <div className="title">
          <p className="playlist-title">{title}</p>
          <p className="video-title">{playingVideoTitle}</p>
        </div>
        <div className="actions">
          <Button size="md" onClick={handleEvent.like}>
            <Heart
              size="18"
              fill={isLike ? colors.primaryGreen : 'transperant'}
              strokeWidth={isLike ? '0' : '2'}
            />
            <span>{likeCnt}</span>
          </Button>
          <Tags tags={tags} />
        </div>
      </div>

      <div className="owner">
        <User profileImage={profileImage} nickname={userName} userId={userId} size="lg" />
        <If test={userId !== userInformation.userId && isFollowing && !isFollowingLoading}>
          <If.Then>
            <Button onClick={handleEvent.following}>팔로잉 중</Button>
          </If.Then>
        </If>
        <If test={userId !== userInformation.userId && !isFollowing && !isFollowingLoading}>
          <If.Then>
            <Button onClick={handleEvent.following}>팔로우</Button>
          </If.Then>
        </If>
      </div>
      <div className="content">
        <p>{date}</p>
        {content}
      </div>
    </div>
  );
}

export default PlaylistInfo;

const playlistInfo = css`
  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 10px;
    margin-bottom: 20px;
    .title {
      flex-grow: 1;
      min-width: 0;
      .playlist-title {
        max-width: 100%;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .video-title {
        font-size: 16px;
      }
    }

    .actions {
      flex-shrink: 0;
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }

  .owner {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 20px;
  }

  .content {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 1.3;
    p {
      margin-bottom: 5px;
      font-size: 13px;
      color: ${colors.lightestGray};
    }
  }
`;
