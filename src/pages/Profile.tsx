/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import UserProfile from '@/components/profile/UserProfile';
import { colors } from '@/styles/colors';
import { Music, Headphones, Star, Clock, Users } from 'lucide-react';

function Profile() {
  return (
    <div css={containerStyle}>
      <UserProfile />
      <div css={menuBoxStyle}>
        <MenuItem icon={<Music size={18} />} label="내 플레이리스트" />
        <MenuItem icon={<Headphones size={18} />} label="최근 들은 곡" />
        <MenuItem icon={<Star size={18} />} label="좋아요한 곡" />
        <MenuItem icon={<Clock size={18} />} label="감상 기록" />
        <MenuItem icon={<Users size={18} />} label="팔로잉 아티스트" />
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
  justify-content: space-between;
  border-bottom: 1px solid ${colors.borderGray};
  box-sizing: border-box;
  padding: 15px 0;
  font-size: 16px;
  font-weight: 500;
`;

const menuItemStyle = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${colors.lightGray};
  transition: color 0.3s ease;
  margin-top: 20px;

  &:hover {
    color: ${colors.primaryGreen};
  }
`;

const menuLabelStyle = css`
  margin-left: 8px;
`;
