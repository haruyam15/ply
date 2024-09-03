/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import UserProfile from '@/components/profile/UserProfile';
import { colors } from '@/styles/colors';
import { Video, Heart } from 'lucide-react';

function Profile() {
  return (
    <div css={containerStyle}>
      <UserProfile />
      <div css={menuBoxStyle}>
        <MenuItem icon={<Video size={18} />} label="내 플레이리스트" />
        <MenuItem icon={<Heart size={18} />} label="좋아요한 플레이리스트" />
      </div>
      {/* 여기에 선택된 메뉴에 따른 컨텐츠를 표시할 수 있습니다 */}
    </div>
  );
}

const MenuItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div css={menuItemStyle}>
    {icon}
    <span css={menuLabelStyle}>{label}</span>
  </div>
);

export default Profile;

const containerStyle = css`
  margin: 0 40px;
`;

const menuBoxStyle = css`
  width: 100%;
  display: flex;
  justify-content: flex-start; /* 메뉴 항목을 왼쪽으로 정렬 */
  gap: 120px; /* 메뉴 항목 간의 간격을 조정 */
  border-bottom: 1px solid ${colors.borderGray};
  box-sizing: border-box;
  padding: 40px;
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
`;

const menuItemStyle = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${colors.lightGray};
  transition: color 0.3s ease;
  margin-top: 40px;

  &:hover {
    color: ${colors.primaryGreen};
  }
`;

const menuLabelStyle = css`
  margin-left: 10px;
`;
