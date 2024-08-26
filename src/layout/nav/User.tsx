/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { If } from '@/components/IfElse'
import { colors } from '@/styles/colors'

function User({ profileImage, nickName, userId, onlyImage = false }: UserProps) {
	return (
		<div css={userWrap}>
			<If test={onlyImage}>
				<If.Then>
					<div className="profile">
						<img width="26" height="26" src={profileImage} alt="" />
					</div>
				</If.Then>
				<If.Else>
					<div className="profile">
						<img width="26" height="26" src={profileImage} alt="" />
					</div>
					<div className="user-info">
						<p>{nickName}</p>
						<span>{userId}</span>
					</div>
				</If.Else>
			</If>
		</div>
	)
}
export default User

const userWrap = css`
	width: 100%;
	display: flex;
	position: relative;
	align-items: center;
	border-radius: 8px;
	padding: 8px;
	box-sizing: border-box;

	.profile {
		display: flex;
		border: 1px solid transparent;
		border-radius: 50%;
		position: relative;
		background-clip: content-box, border-box;
		background-image: linear-gradient(#141215, #141215),
			linear-gradient(180deg, #00ffa3 0, #027f80 100%);
		background-origin: border-box;

		img {
			background-color: rgba(255, 255, 255, 0.06);
			border-radius: inherit;
			margin: 2px;
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
		}
	}
`

interface UserProps {
	profileImage: string
	nickName: string
	userId: string
	onlyImage?: boolean
}
