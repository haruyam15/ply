/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { If } from '@/components/IfElse';
import { colors } from '@/styles/colors';
import { Link } from 'react-router-dom';

interface IUserProps {
  profileImage: string;
  nickname: string;
  userId: string;
  onlyImage?: boolean;
  size?: Size;
  onClick?: () => void;
}

type Size = 'sm' | 'md' | 'lg' | 'xl';

function User({
  profileImage,
  nickname,
  userId,
  onlyImage = false,
  size = 'sm',
  onClick,
}: IUserProps) {
  return (
    <Link to={`/profile/${userId}`}>
      <div css={userWrap(size)} onClick={onClick}>
        <If test={onlyImage}>
          <If.Then>
            <div className="profile">
              <img src={profileImage} alt="" />
            </div>
          </If.Then>
          <If.Else>
            <div className="profile">
              <img width="26" height="26" src={profileImage} alt="" />
            </div>
            <div className="user-info">
              <p>{nickname}</p>
              <span>{userId}</span>
            </div>
          </If.Else>
        </If>
      </div>
    </Link>
  );
}
export default User;

const userWrap = (size: Size) => css`
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 8px;
  box-sizing: border-box;

  .profile {
    display: flex;
    border: 1px solid ${colors.primaryGreen};
    border-radius: 50%;
    position: relative;
    background-clip: content-box, border-box;
    background-image: linear-gradient(#141215, #141215),
      linear-gradient(180deg, #00ffa3 0, #027f80 100%);
    background-origin: border-box;

    img {
      width: 26px;
      height: 26px;
      background-color: rgba(255, 255, 255, 0.06);
      border-radius: inherit;
      padding: 2px;
      box-sizing: border-box;
      object-fit: cover;
    }
  }

  .user-info {
    color: ${colors.lightestGray};
    margin-left: 10px;
    overflow: hidden;
    font-size: 15px;
    p {
      font-weight: bold;
    }
    span {
      font-size: 12px;
      color: ${colors.lightestGray};
    }
  }

  ${size === 'md' &&
  `
	.profile {
		img{
			width:36px;
			height:36px
		}
	}

	.user-info {
		font-size: 16px;
		span {
			font-size: 14px;
		}
	}
  `}

  ${size === 'lg' &&
  `
	.profile {
		img{
			width:46px;
			height:46px
		}
	}
	.user-info {
		font-size: 18px;
		span {
			font-size: 16px;
		}
	}
  `}

  ${size === 'xl' &&
  `
	.profile {
		img{
			width:150px;
			height:150px;
		}
	}
	.user-info {
    margin-left: 20px;
		font-size: 22px;
		span {
			font-size: 18px;
		}
	}
  `}
`;
