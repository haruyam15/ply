/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ListVideo } from 'lucide-react';

interface CoverProps {
  imageSrc: string;
  playListLength?: number;
}

const Cover: React.FC<CoverProps> = ({ imageSrc, playListLength }) => {
  return (
    <div css={coverStyle}>
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
