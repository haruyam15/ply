/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ListVideo } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CoverProps {
  imageSrc: string;
  playListLength?: number;
  playListId?: string;
  youtubeVideoId?: string | null;
}

const Cover: React.FC<CoverProps> = ({ imageSrc, playListLength, playListId, youtubeVideoId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${playListId}?v=${youtubeVideoId}`);
  };

  return (
    <div css={coverStyle} onClick={handleClick}>
      <img src={imageSrc} alt="cover" css={coverImageStyle} />
      {playListLength && (
        <div css={overlayTextStyle}>
          {<ListVideo />}
          {playListLength}
        </div>
      )}
    </div>
  );
};

const coverStyle = css`
  position: relative;
  width: 100%;
  height: 140px;
  cursor: pointer;

  &:hover img {
    filter: brightness(30%); /* 이미지 어둡게 */
  }
`;

const coverImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition: filter 0.2s ease; /* 부드러운 전환 효과 */
`;

const overlayTextStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px 4px;
  border-radius: 4px;
  font-size: 12px;
`;

export default Cover;
