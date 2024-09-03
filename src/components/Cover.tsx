/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ListVideo } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CoverProps {
  imageSrc: string;
  playListLength?: number;
  playListId?: string;
}

const Cover: React.FC<CoverProps> = ({ imageSrc, playListLength, playListId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${playListId}`);
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
  height: 140px; /* 원하는 높이로 설정 */
  cursor: pointer;
`;

const coverImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
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
