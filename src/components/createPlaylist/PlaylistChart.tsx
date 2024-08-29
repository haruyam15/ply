/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/colors';
import { css } from '@emotion/react';
import { MessageCircleWarning, AlignJustify, Dot, EllipsisVertical } from 'lucide-react';

const PlaylistChart: React.FC = () => {
  const youTubeData = [
    {
      title: '[MV] 이영지 - Small girl feat. 도경수 (D.O.)',
      imgUrl: 'https://img.youtube.com/vi/11iZcYbq_is/hqdefault.jpg',
      channelTitle: '이영지',
      viewCount: '2877만회',
      publishedAt: '2개월 전',
    },
    {
      title: '[MV] 이영지 - Small girl feat. 도경수 (D.O.)',
      imgUrl: 'https://img.youtube.com/vi/11iZcYbq_is/hqdefault.jpg',
      channelTitle: '이영지',
      viewCount: '2877만회',
      publishedAt: '2개월 전',
    },
  ];
  return (
    <div css={playlistChartWrapper}>
      {youTubeData ? (
        <ul css={{ width: '100%' }}>
          {youTubeData.map((data, index) => (
            <li css={listArea} key={index}>
              <AlignJustify />
              <div css={videoArea(data.imgUrl)}></div>
              <div css={youtubeDataArea}>
                <p>{data.title}</p>
                <div css={etcArea}>
                  <span>{data.channelTitle}</span>
                  <Dot />
                  <span>조회수 {data.viewCount}</span>
                  <Dot />
                  <span>{data.publishedAt}</span>
                </div>
              </div>
              <div css={{ position: 'absolute', right: '20px', top: '15px' }}>
                <EllipsisVertical />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <MessageCircleWarning />
          <p>영상을 추가해 보새요.</p>
        </>
      )}
    </div>
  );
};

export default PlaylistChart;

const playlistChartWrapper = css`
  width: calc(100% - 450px);
  margin-left: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: top;
  font-size: 22px;
  color: #6b6b6b;
  & p {
    margin-left: 10px;
  }
`;
const listArea = css`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  position: relative;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const videoArea = (imgUrl: string) => css`
  width: 220px;
  height: 160px;
  background-color: #222;
  border-radius: 5px;
  overflow: hidden;
  margin-left: 20px;
  ${imgUrl &&
  `
  background-image: url(${imgUrl});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  `}
`;
const youtubeDataArea = css`
  display: flex;
  align-items: top;
  flex-direction: column;
  height: 100%;
  padding-top: 20px;
  & p {
    color: ${colors.white};
    font-size: 18px;
    margin-bottom: 20px;
  }
`;
const etcArea = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-left: 10px;
`;
