/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { UserData } from '@/types/User'
import Button from '@/components/Button'
import Tags from '@/components/Tags'
import User from '@/components/User'
import { Heart } from 'lucide-react'

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

function PlaylistInfo() {
	const { profileImage, nickName, userId } = user.information
	return (
		<div className="playlist-info" css={info}>
			<div className="info-header">
				<div className="title">
					<p className="playlist-title">180513 뷰티풀 민트 라이프 2018</p>
					<p className="video-title">연애조건</p>
				</div>
				<div className="actions">
					<Button size="md">
						<Heart size="18" /> <span>244</span>
					</Button>
					<Tags />
				</div>
			</div>

			<div className="owner">
				<User profileImage={profileImage} nickName={nickName} userId={userId} size="lg" />
			</div>

			<div className="content">
				180513 뷰티풀 민트 라이프 셋리스트
				<br />
				연애조건
				<br />
				Stay With me <br />
				소나기
				<br />
				우산
				<br />
				Airplane Mode
			</div>
		</div>
	)
}

export default PlaylistInfo

const info = css`
	.info-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		gap: 10px;
		margin-bottom: 20px;
		.title {
			flex-grow: 1;
			min-width: 0;
			.playlist-title {
				max-width: 100%;
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 5px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.video-title {
				font-size: 16px;
			}
		}

		.actions {
			flex-shrink: 0;
			display: flex;
			gap: 5px;
			align-items: center;
		}
	}

	.owner {
		margin-bottom: 20px;
	}

	.content {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 15px;
		box-sizing: border-box;
		font-size: 15px;
		line-height: 1.3;
	}
`
