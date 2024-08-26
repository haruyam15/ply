/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { colors } from '@/styles/colors'
import { Link } from 'react-router-dom'

interface UserData {
	information: UserInformation
	subscription: string[]
	following: UserInformation[]
	followers: UserInformation[]
}

interface UserInformation {
	userId: string
	profileImage: string
	nickName: string
}

const TESTURL = [
	'https://avatars.githubusercontent.com/u/131119152?s=64&v=4',
	'https://avatars.githubusercontent.com/u/143858798?s=64&v=4',
	'https://avatars.githubusercontent.com/u/147500032?s=64&v=4',
	'https://avatars.githubusercontent.com/u/169154369?s=64&v=4',
	'https://avatars.githubusercontent.com/u/110523397?v=4',
]
const user: UserData = {
	information: { userId: 'haruyam15', profileImage: TESTURL[4], nickName: '하루얌' },
	subscription: ['playlist1', 'playlist2'],
	following: [
		{
			userId: 'Sonseongoh',
			nickName: '성오',
			profileImage: TESTURL[0],
		},
		{
			userId: 'dhkim511',
			nickName: '도형',
			profileImage: TESTURL[1],
		},
		{
			userId: 'love1ace',
			nickName: '동영',
			profileImage: TESTURL[2],
		},
		{
			userId: 'ssumanlife',
			nickName: '수민',
			profileImage: TESTURL[3],
		},
		{
			userId: 'abcde',
			nickName: 'hahaha',
			profileImage: TESTURL[4],
		},
	],
	followers: [
		{ userId: 'Sonseongoh', nickName: '성오', profileImage: TESTURL[0] },
		{ userId: 'dhkim511', nickName: '도형', profileImage: TESTURL[1] },
		{ userId: 'love1ace', nickName: '동영', profileImage: TESTURL[2] },
		{ userId: 'ssumanlife', nickName: '수민', profileImage: TESTURL[3] },
	],
}

const Profile = () => {
	return (
		<div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
			<img css={profileImage} src={user.information.profileImage} />
			<div css={{ marginLeft: '30px' }}>
				<h1 css={{ fontSize: '32px' }}>{user.information.nickName}</h1>
				<div
					css={{
						width: '300px',
						display: 'flex',
						justifyContent: 'space-between',
						margin: '30px 5px 20px',
						color: `${colors.lightestGray}`,
					}}
				>
					<p>@{user.information.userId}</p>
					<Link to="/follow" css={{ color: `${colors.lightestGray}` }}>
						팔로워 {user.followers.length}
					</Link>
					<Link to="/playlist" css={{ color: `${colors.lightestGray}` }}>
						플레이리스트 {user.subscription.length}
					</Link>
				</div>
				<button css={profileEditOrFollowerBtn}>프로필 수정</button>
			</div>
		</div>
	)
}

export default Profile

const profileImage = css`
	width: 230px;
	height: 230px;
	border-radius: 50%;
`
const profileEditOrFollowerBtn = css`
	width: 100px;
	height: 30px;
	background-color: ${colors.gray};
	color: ${colors.white};
	font-weight: 500;
	border: none;
	border-radius: 15px;
	:hover {
		background-color: #878787;
	}
`
