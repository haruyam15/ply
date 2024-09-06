/** @jsxImportSource @emotion/react */

import { colors } from '@/styles/colors';
import { css } from '@emotion/react';
import { CirclePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TitleHeaderProps {
  profileImage: string;
  nickname: string;
  actionText: string;
  showAddPlaylistButton?: boolean; // 버튼 표시 여부를 결정하는 새로운 prop 추가
}

const TitleHeader: React.FC<TitleHeaderProps> = ({
  profileImage,
  nickname,
  actionText,
  showAddPlaylistButton = false,
}) => {
  const navigate = useNavigate();
  return (
    <div css={headerContainerStyle}>
      <div css={headerStyle}>
        <div css={textContainerStyle}>
          <img src={profileImage} alt={`${nickname} 프로필 이미지`} css={profileImageStyle} />
          <span css={nicknameStyle}>{nickname}</span>
          <div css={actionTextStyle}>님의 {actionText}</div>
        </div>
        {showAddPlaylistButton && ( // showAddPlaylistButton이 true일 때만 버튼 표시
          <button css={addButtonStyle} onClick={() => navigate('/managePlaylist')}>
            <CirclePlus size={18} css={iconStyle} /> {/* 아이콘 추가 */}
            <span css={buttonTextStyle}>추가</span>
          </button>
        )}
      </div>
      <div css={lineStyle}></div>
    </div>
  );
};

const headerContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between; /* 좌우 끝으로 요소 배치 */
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

const textContainerStyle = css`
  display: flex;
  align-items: center;
`;

const profileImageStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

const nicknameStyle = css`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.white};
`;

const actionTextStyle = css`
  font-size: 16px;
  color: ${colors.lightestGray};
  margin-left: 4px;
  margin-top: 4px;
`;

const addButtonStyle = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  background: none;
  padding: 6px;
  color: inherit;
  font: inherit;
  margin-top: 2px;

  &:hover {
    background-color: ${colors.darkestGray};
    border-radius: 5px;
  }
`;

const iconStyle = css`
  margin-right: 4px; /* 아이콘과 텍스트 사이 간격 */
  margin-left: 4px;
  color: ${colors.lightestGray};
`;

const buttonTextStyle = css`
  margin-right: 6px;
  font-size: 16px; /* 텍스트 스타일을 닉네임과 맞춤 */
  font-weight: bold;
  color: ${colors.lightestGray};
`;

const lineStyle = css`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderGray};
  margin-top: 8px;
`;

export default TitleHeader;
