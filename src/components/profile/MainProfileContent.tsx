/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@/components/Button';
import { colors } from '@/styles/colors';

interface MainProfileContentProps {
  newProfileImage: string;
  newNickname: string;
  userId: string;
  setCurrentModal: (modal: 'profileImage' | 'nickname' | 'password') => void;
  handleShowConfirm: () => void;
}

const MainProfileContent: React.FC<MainProfileContentProps> = ({
  newProfileImage,
  newNickname,
  userId,
  setCurrentModal,
  handleShowConfirm,
}) => {
  return (
    <div css={contentStyle}>
      <div css={profileHeaderStyle}>
        <img src={newProfileImage} alt="Profile" css={profileImageStyle} />
        <div css={profileTextStyle}>
          <h2>{newNickname}</h2>
          <span>{userId}</span>
        </div>
      </div>
      <ul css={listStyle}>
        <li onClick={() => setCurrentModal('profileImage')}>프로필 사진 변경</li>
        <li onClick={() => setCurrentModal('nickname')}>닉네임 변경</li>
        <li onClick={() => setCurrentModal('password')}>비밀번호 변경</li>
      </ul>
      <div css={buttonWrapperStyle}>
        <Button onClick={handleShowConfirm}>적용하기</Button>
      </div>
    </div>
  );
};

const contentStyle = css`
  width: 100%;
`;

const profileHeaderStyle = css`
  display: flex;
  align-items: center;
  margin: 10px 0 20px;
`;

const profileImageStyle = css`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 30px;
  border: 2px solid ${colors.primaryGreen};
`;

const profileTextStyle = css`
  h2 {
    margin-bottom: 10px;
    font-size: 20px;
    text-align: center;
  }
  span {
    font-size: 16px;
    color: ${colors.gray};
  }
`;

const listStyle = css`
  list-style: none;
  padding: 16px 0;
  padding-bottom: 0;
  margin: 0;
  width: 100%;
  li {
    margin-bottom: 10px;
    padding: 16px;
    cursor: pointer;
    text-align: left;
    background-color: ${colors.inputGray};
    border-radius: 10px;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const buttonWrapperStyle = css`
  width: 100%;
  margin-top: 15px;

  button {
    width: 100%;
    height: 45px;
    margin: 20px 0 25px;
    border: none;
    border-radius: 10px;
    background-color: ${colors.primaryGreen};
    color: ${colors.white};
    font-size: 20px;
    cursor: pointer;
    &:hover {
      background-color: ${colors.primaryGreen};
      opacity: 0.8;
      border: none;
    }
  }
`;

export default MainProfileContent;
