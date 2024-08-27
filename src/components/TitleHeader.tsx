/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface TitleHeaderProps {
  profileImage: string;
  nickname: string;
  actionText: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ profileImage, nickname, actionText }) => {
  return (
    <div css={headerContainerStyle}>
      <div css={headerStyle}>
        <img src={profileImage} alt={`${nickname} 프로필 이미지`} css={profileImageStyle} />
        <span css={nicknameStyle}>
          {nickname}님의 {actionText}
        </span>
      </div>
      <div css={lineStyle}></div> {/* 흰색 선 추가 */}
    </div>
  );
};

const headerContainerStyle = css`
  display: flex;
  flex-direction: column; /* 선을 아래에 표시하기 위해 컬럼 방향으로 설정 */
  align-items: start;
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 8px; /* 텍스트와 선 사이의 간격 */
`;

const profileImageStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

const nicknameStyle = css`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

const lineStyle = css`
  width: 100%;
  height: 1px;
  background-color: #ffffff; /* 흰색 선 */
  margin-top: 8px; /* 선과 다른 요소 간의 간격 */
`;

export default TitleHeader;
