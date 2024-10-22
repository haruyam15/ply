/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@/components/Button';
import { colors } from '@/styles/colors';
import Tags from '@/components/Tags';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useYoutubeDataStore from '@/stores/useYoutubeDataStore';
import forkVideoId from '@/utils/forkVideoId';
import useYoutubeFetch from '@/hooks/useYoutubeFetch';
import { PlaylistDataStore, IPlaylist } from '@/types/playlistTypes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddPlaylistProps {
  userPlyData: IPlaylist | null | undefined;
}
interface AddPlaylistRef {
  getPlaylistData: () => PlaylistDataStore;
}

const AddPlaylist = forwardRef<AddPlaylistRef, AddPlaylistProps>(({ userPlyData }, ref) => {
  const [tags, setTags] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const [content, setContent] = useState('');
  const [videoId, setVideoId] = useState('');
  const [errText, setErrText] = useState('');
  const [disclosureStatus, setDisclosureStatus] = useState(true);
  const tagValue = useRef<HTMLInputElement>(null);
  const title = useRef<HTMLInputElement>(null);
  const url = useRef<HTMLInputElement>(null);
  const youtubeDataList = useYoutubeDataStore((state) => state.youTubelistData);
  const setYoutubeListData = useYoutubeDataStore((state) => state.setYouTubelistData);
  const { data: youTubeData } = useYoutubeFetch({ videoId, enabled: !!videoId });

  useImperativeHandle(ref, () => ({
    getPlaylistData,
  }));

  const getPlaylistData = useCallback(() => {
    const playlistData: PlaylistDataStore = {
      title: '',
      content: '',
      disclosureStatus,
      tags: [],
    };
    playlistData.title = title.current?.value || '';
    playlistData.content = content;
    playlistData.disclosureStatus = disclosureStatus;
    playlistData.tags = tags;
    return playlistData;
  }, [title, content, tags, disclosureStatus]);

  const handleUrl = useCallback(async () => {
    if (url.current?.value) {
      const newVideoId = forkVideoId(url.current.value);
      if (newVideoId) {
        setVideoId(newVideoId);
      }
    } else {
      if (url.current) {
        url.current.value = '';
      }
    }
  }, [url]);

  useEffect(() => {
    if (url.current && !!videoId && youTubeData?.items) {
      if (!youTubeData?.items[0].snippet.thumbnails.maxres?.url) {
        toast.error('Youtube에서 제공되는 영상 정보를 찾을 수 없습니다.');
        url.current.value = '';
        setVideoId('');
        return;
      }
    }
    if (url.current && !!videoId && youTubeData?.items) {
      const youTubelist = {
        id: youTubeData.items[0].id,
        title: youTubeData.items[0].snippet.title,
        link: [url.current.value],
        imgUrl: [youTubeData.items[0].snippet.thumbnails.maxres.url],
        channelTitle: youTubeData.items[0].snippet.channelTitle,
      };
      setYoutubeListData(youTubelist);
      setVideoId('');
      url.current.value = '';
    }
  }, [videoId, youTubeData]);

  useEffect(() => {
    if (userPlyData) {
      if (title.current) {
        title.current.value = userPlyData.title;
      }
      setContent(userPlyData.content);
      setTags(userPlyData.tags);
      setDisclosureStatus(userPlyData.disclosureStatus as boolean);
    }
  }, [userPlyData]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: string) => {
    if (e.key === 'Enter' && !isComposing) {
      if (type === 'tag') handleAddTagChange();
      if (type === 'url') handleUrl();
    }
  };

  const handleAddTagChange = () => {
    const currentValue = tagValue.current?.value.trim();
    if (tags.length > 2) {
      setErrText('태그는 최대 3개까지 입력 가능합니다.');
    } else if (currentValue) {
      setErrText('');
      setTags((prevTags) => [...prevTags, currentValue]);
      if (tagValue.current) {
        tagValue.current.value = '';
      }
    }
  };

  const handleToggle = () => {
    setDisclosureStatus((prevStatus) => !prevStatus);
  };

  const handleDeleteTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  let imgUrl = '';
  if (youtubeDataList?.[0]?.imgUrl?.[0]) {
    imgUrl = youtubeDataList[0].imgUrl[0];
  }

  return (
    <div css={createPlaylistWrapper(imgUrl)}>
      <div css={formArea}>
        <div css={{ color: '#6b6b6b', fontSize: '14px' }}>
          <p>플레이리스트 대표 썸네일은 첫번째 영상으로 자동 설정됩니다.</p>
        </div>
        <div css={videoArea(imgUrl)}></div>
        <div>
          <p>플레이리스트 제목</p>
          <input
            css={[titleArea, { width: '100%' }]}
            type="text"
            placeholder="22자 내외로 제목을 입력해주세요."
            ref={title}
            maxLength={22}
          />
        </div>
        <p>공개 여부</p>
        <div css={disclosureStatusWrapper}>
          <input css={checkBox} type="checkbox" id="toggleBtn" onChange={handleToggle} />
          <label css={toggleBtn(disclosureStatus)} htmlFor="toggleBtn" />
        </div>
        <div>
          <p>설명</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            css={discriptionArea}
            maxLength={90}
          ></textarea>
        </div>
        <p>영상추가</p>
        <div css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            css={[titleArea, { width: '75%' }]}
            type="text"
            placeholder="YouTube 링크 입력 후 엔터를 눌러주세요."
            ref={url}
            onKeyDown={(e) => handleKeyDown(e, 'url')}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <Button size="md" onClick={handleUrl}>
            추가
          </Button>
        </div>
        <p>태그</p>
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <input
            css={[titleArea, { width: '75%' }]}
            type="text"
            placeholder="8자 내외로 태그 입력 후 엔터를 눌러주세요."
            ref={tagValue}
            onKeyDown={(e) => handleKeyDown(e, 'tag')}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            maxLength={8}
          />
          <Button size="md" onClick={handleAddTagChange}>
            추가
          </Button>
        </div>
        <Tags tags={tags} deletable={true} position={true} onClick={handleDeleteTag} />
        <p css={{ fontSize: '12px', color: `${colors.red}`, marginTop: '5px' }}>{errText}</p>
      </div>
    </div>
  );
});

export default AddPlaylist;

const createPlaylistWrapper = (imgUrl: string) => css`
  width: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  ${imgUrl &&
  `
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(${imgUrl});
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    filter: blur(7px);
    z-index: 0;
  }
  `}

  & > * {
    position: relative;
    z-index: 1;
  }
`;

const formArea = css`
  width: 370px;
  padding: 30px 0;
  & div {
    margin-bottom: 40px;
  }
  & div:nth-of-type(1) {
    margin-bottom: 7px;
  }
  & div:nth-of-type(7),
  & div:nth-of-type(8) {
    margin-bottom: 10px;
  }
`;

const videoArea = (imgUrl: string) => css`
  width: 100%;
  height: 220px;
  background-color: #222;
  border-radius: 5px;
  overflow: hidden;
  ${imgUrl &&
  `
    background-image: url(${imgUrl});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 5px;
  `}
`;

const titleArea = css`
  margin-top: 10px;
  border-bottom: 1px solid ${colors.white};
  color: ${colors.white};
  padding: 3px;
  box-sizing: border-box;
`;

const disclosureStatusWrapper = css`
  display: flex;
  z-index: 0;
`;

const checkBox = css`
  display: none;
`;

const toggleBtn = (disclosureStatus: boolean) => css`
  z-index: 10;
  width: 120px;
  height: 28px;
  border-radius: 30px;
  background-color: ${colors.gray};
  font-size: 14px;
  margin-top: 15px;

  ::before {
    display: flex;
    position: absolute;
    content: '공개';
    padding-left: 15px;
    justify-content: flex-start;
    align-items: center;
    width: 90px;
    height: 28px;
    color: #2b2b2b;
    transition: all 0.2s ease-in-out;
  }
  ::after {
    display: flex;
    position: relative;
    content: '비공개';
    justify-content: center;
    align-items: center;
    width: 75px;
    left: 50px;
    top: -1px;
    height: 30px;
    color: ${colors.black};
    border-radius: 30px;
    background-color: ${colors.primaryGreen};
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.16);
    transition: all 0.2s ease-in-out;
  }
  ${disclosureStatus &&
  `
    &::before {
      padding-right: 15px;
      content: '비공개';
      justify-content: flex-end;
    }
    &::after {
      content: '공개';
      width: 60px;
      height: 30px;
      top: -1px;
      left: 0;
      box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.16);
    }
  `}
`;

const discriptionArea = css`
  resize: none;
  width: 100%;
  height: 80px;
  border: 1px solid ${colors.white};
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  color: ${colors.white};
  margin-top: 15px;
`;
