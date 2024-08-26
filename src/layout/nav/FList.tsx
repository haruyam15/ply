/** @jsxImportSource @emotion/react */
import User from '@/components/User'
import useNavStore from '@/stores/useNavStore'
import { Tab } from '@/types/Nav'
import { UserData } from '@/types/User'
import { css } from '@emotion/react'

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

function FList({ tab }: FListProps) {
	const isExpand = useNavStore((state) => state.isExpand)
	return (
		<ul css={fList(isExpand)}>
			{user[tab].map((f, i) => (
				<li key={i}>
					<User
						profileImage={f.profileImage}
						nickName={f.nickName}
						userId={f.userId}
						onlyImage={!isExpand}
					/>
				</li>
			))}
		</ul>
	)
}

export default FList

const fList = (isExpand: boolean) => css`
	padding-bottom: 5px;
	li {
		margin-bottom: 5px;
		padding: 8px;
		box-sizing: border-box;
	}
	li:hover {
		cursor: pointer;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 6px;
	}
	${!isExpand &&
	`
		li{
			padding:4px
		}
  `}
`

interface FListProps {
	tab: Tab
}
