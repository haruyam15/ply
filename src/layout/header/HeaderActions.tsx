/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Button from '@/components/Button'
import Signin from '@/components/sign/Signin'
import Signup from '@/components/sign/Signup'
import User from '@/components/User'
import { Link } from 'react-router-dom'
import useSignModalStore from '@/store/useSignModalStore'

import { UserData } from '@/types/User'

const TESTURL = [
	'https://avatars.githubusercontent.com/u/131119152?s=64&v=4',
	'https://avatars.githubusercontent.com/u/143858798?s=64&v=4',
	'https://avatars.githubusercontent.com/u/147500032?s=64&v=4',
	'https://avatars.githubusercontent.com/u/169154369?s=64&v=4',
	'https://avatars.githubusercontent.com/u/110523397?v=4',
]
const user: UserData = {
	information: {
		userId: 'haruyam15',
		profileImage: TESTURL[4],
		nickName: '하루얌',
		password: '1234',
	},
	like: ['playlist1', 'playlist2'],
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
	myPlayList: [],
}

function HeaderActions() {
	const { profileImage, nickName, userId } = user.information
	const openSigninModal = useSignModalStore((state) => state.openModal)
	return (
		<>
			<div css={headerActions}>
				<Link to={'/profile'}>
					<div className="user-info">
						<User profileImage={profileImage} nickName={nickName} userId={userId} size="md" />
					</div>
				</Link>
				<div onClick={() => openSigninModal('signin')}>
					<Button>로그인</Button>
				</div>
				<Signin />
				<Signup />
			</div>
		</>
	)
}

export default HeaderActions

const headerActions = css`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	padding-right: 20px;
	box-sizing: border-box;
	align-items: center;
	.user-info {
		padding-right: 10px;
	}
`
