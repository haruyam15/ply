import Button from '@/components/Button'
import User from '@/layout/nav/User'
import styled from '@emotion/styled'
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

function HeaderActions() {
	const { profileImage, nickName, userId } = user.information
	return (
		<>
			<Wrapper>
				<div className="user-info">
					<User profileImage={profileImage} nickName={nickName} userId={userId} />
				</div>
				<Button>로그인</Button>
			</Wrapper>
		</>
	)
}

export default HeaderActions

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	padding-right: 20px;
	box-sizing: border-box;
	align-items: center;
`

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
