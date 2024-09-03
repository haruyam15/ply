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
import { PlaylistDataStore, UserPlyDataStore } from '@/types/playlistTypes';

interface AddPlaylistProps {
  userPlyData: UserPlyDataStore | null;
}
interface AddPlaylistRef {
  getPlaylistData: () => PlaylistDataStore;
}

const AddPlaylist = forwardRef<AddPlaylistRef, AddPlaylistProps>(({ userPlyData }, ref) => {
  const [tags, setTags] = useState<string[]>([]);
  const [link, setLink] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [videoId, setVideoId] = useState('');
  const [disclosureStatus, setDisclosureStatus] = useState(true);
  const tagValue = useRef<HTMLInputElement>(null);
  const title = useRef<HTMLInputElement>(null);
  const url = useRef<HTMLInputElement>(null);
  const setYouTubelistData = useYoutubeDataStore((state) => state.setYouTubelistData);

  useImperativeHandle(ref, () => ({
    getPlaylistData,
  }));

  const getPlaylistData = useCallback(() => {
    const playlistData: PlaylistDataStore = {
      title: '',
      content: '',
      disclosureStatus: false,
      tags: [],
    };
    playlistData.title = title.current?.value || '';
    playlistData.content = content;
    playlistData.disclosureStatus = disclosureStatus;
    playlistData.tags = tags;
    return playlistData;
  }, [title, content, tags]);

  const handleUrl = useCallback(async () => {
    if (url.current?.value) {
      const newVideoId = forkVideoId(url.current.value);
      if (newVideoId) {
        setLink([...link, url.current?.value]);
        setImgUrl([`https://img.youtube.com/vi/${newVideoId}/hqdefault.jpg`, ...imgUrl]);
        setVideoId(newVideoId);
        url.current.value = '';
      }
    } else {
      if (url.current) {
        url.current.value = '';
      }
    }
  }, [url]);

  const { data: youTubeData } = useYoutubeFetch(videoId, !!videoId);
  useEffect(() => {
    if (!!videoId && youTubeData?.items) {
      const youTubelist = {
        id: youTubeData.items[0].id,
        title: youTubeData.items[0].snippet.title,
        link,
        imgUrl,
        channelTitle: youTubeData.items[0].snippet.channelTitle,
      };
      setYouTubelistData(youTubelist);
      setVideoId('');
    }
  }, [videoId, youTubeData]);

  useEffect(() => {
    if (userPlyData) {
      if (title.current) {
        title.current.value = userPlyData.title;
      }
      const imgUrlArr = userPlyData.imgUrl.map((url) => url ?? '');
      setImgUrl(imgUrlArr);
      setContent(userPlyData.content);
      setTags(userPlyData.tags);
      setDisclosureStatus(userPlyData.disclosureStatus);
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
    if (currentValue) {
      setTags((prevTags) => [...prevTags, currentValue]);
      if (tagValue.current) {
        tagValue.current.value = '';
      }
    }
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleDeleteTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  return (
    <div css={createPlaylistWrapper(imgUrl[0])}>
      <div css={formArea}>
        <div css={{ marginTop: '15px', color: '#6b6b6b', fontSize: '14px' }}>
          <p>플레이리스트 대표 썸네일은 첫번째 영상으로 자동 설정됩니다.</p>
        </div>
        <div css={videoArea(imgUrl[0])}></div>
        <div>
          <p>플레이리스트 제목</p>
          <input
            css={[titleArea, { width: '100%' }]}
            type="text"
            placeholder="제목을 입력해주세요."
            ref={title}
          />
        </div>
        <p>공개 여부</p>
        <div css={disclosureStatusWrapper}>
          <label htmlFor="public">
            <input
              type="radio"
              name="disclosureStatus"
              id="public"
              checked={disclosureStatus === true}
              onChange={() => setDisclosureStatus(true)}
            />
            <p>공개</p>
          </label>
          <label htmlFor="nondisclosure" css={{ marginLeft: '20px' }}>
            <input
              type="radio"
              name="disclosureStatus"
              id="nondisclosure"
              checked={disclosureStatus === false}
              onChange={() => setDisclosureStatus(false)}
            />
            <p>비공개</p>
          </label>
        </div>
        <div>
          <p>설명</p>
          <textarea
            value={content}
            onChange={(e) => handleContent(e)}
            css={discriptionArea}
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
            placeholder="태그 입력 후 엔터를 눌러주세요."
            ref={tagValue}
            onKeyDown={(e) => handleKeyDown(e, 'tag')}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <Button size="md" onClick={handleAddTagChange}>
            추가
          </Button>
        </div>
        <Tags tags={tags} deletable={true} position={true} onClick={handleDeleteTag} />
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
    margin-bottom: 0;
  }
  & div:nth-of-type(7),
  & div:nth-of-type(8) {
    margin-bottom: 10px;
  }
`;

const videoArea = (imgUrl: string) => css`
  width: 100%;
  height: 230px;
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
  margin-top: 15px;
  border-bottom: 1px solid ${colors.white};
  color: ${colors.white};
  padding: 3px;
  box-sizing: border-box;
`;

const disclosureStatusWrapper = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 10px;
  & label {
    height: 20px;
    display: flex;
    align-items: center;
    accent-color: ${colors.black};
    & p {
      padding-top: 3px;
      margin-left: 5px;
    }
  }
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
