import { colors } from '@/styles/colors'
import styled from '@emotion/styled'
import useNavStore from '@/stores/useNavStore'
import React, { useState } from 'react'
import { If } from '@/components/IfElse'
import User from '@/components/nav/User'

const FOLLOWING = 'Following'
const FOLLOWERS = 'Followers'
const TESTURL =
	'https://nng-phinf.pstatic.net/MjAyNDA1MThfODcg/MDAxNzE1OTU4MjMwMzgx.JivAuuhZuV6HsMcpc-CLRAwiBdPlr27TO2BLkkAYdTYg.17f1NyoSdVRtrLsg00f1X7sa0dhAF-prsz7npZjPQBog.JPEG/%EB%8C%80%EC%83%81_%ED%9B%84%ED%9E%88021.jpg?type=f120_120_na'

function FollowingFollowers() {
	const isExpand = useNavStore((state) => state.isExpand)
	const [selected, setSelected] = useState('Following')
	const handleTab = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement
		setSelected(target.innerText)
	}

	return (
		<Wrapper isExpand={isExpand}>
			<If test={isExpand}>
				<If.Then>
					<ul className="tab">
						<li>
							<button onClick={handleTab} aria-selected={selected === FOLLOWING}>
								Following
							</button>
						</li>
						<li>
							<button onClick={handleTab} aria-selected={selected === FOLLOWERS}>
								Followers
							</button>
						</li>
					</ul>
					{selected === FOLLOWING && (
						<ul className="f-list">
							<li>
								<User
									profileImage={TESTURL}
									nickName="하루얌"
									userId="haruyam15"
									isExpand={isExpand}
								/>
							</li>
						</ul>
					)}

					{selected === FOLLOWERS && (
						<ul className="f-list">
							<li>
								<User
									profileImage={TESTURL}
									nickName="하루얌"
									userId="haruyam15"
									isExpand={isExpand}
								/>
							</li>
						</ul>
					)}
				</If.Then>
				<If.Else>
					<div className="f-wrap">
						<p>Following</p>
						<ul className="f-list">
							<li>
								<User
									profileImage={TESTURL}
									nickName="하루얌"
									userId="haruyam15"
									isExpand={isExpand}
								/>
							</li>
						</ul>
					</div>
					<div className="f-wrap">
						<p>Followers</p>
						<ul className="f-list">
							<li>
								<User
									profileImage={TESTURL}
									nickName="하루"
									userId="haruyam15"
									isExpand={isExpand}
								/>
							</li>
						</ul>
					</div>
				</If.Else>
			</If>
		</Wrapper>
	)
}

export default FollowingFollowers

const Wrapper = styled.div<{ isExpand: boolean }>`
	position: relative;
	padding: 18px;
	min-height: 370px;
	box-sizing: border-box;
	&::before {
		background-color: ${colors.darkestGray};
		content: '';
		height: 1px;
		left: 21px;
		position: absolute;
		right: 21px;
		top: 0;
	}

	${(props) =>
		props.isExpand &&
		`
    .tab {
			margin: 0 auto 22px;
			display: flex;
			justify-content: space-between;
			text-align: center;

				li {
					flex: 1;
					position: relative;
				}
				li:hover {
					background: rgba(255, 255, 255, 0.1);
					border-radius: 6px;
					cursor: pointer;
				}
				li:last-child::before {
					content: '';
					width: 1px;
					height: 15px;
					border-left: 1px solid #fff;
					position: absolute;
					left: 0;
					top: 10px;
				}
				button {
					width: 100%;
					display: block;
					padding: 10px 10px 13px;
					color: ${colors.gray};
				}
				button:hover {
					color: ${colors.lightestGray};
				}
				button[aria-selected='true'] {
					color: ${colors.lightestGray};
				}
				button[aria-selected='true']::after {
					content: '';
					height: 3px;
					position: absolute;
					left: 10px;
					right: 10px;
					bottom: 1px;
					background-color: ${colors.white};
					border-radius: 2px;
					box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
				}
		}

		.f-list {
			padding-bottom:5px;
				li {
					margin-bottom:5px;
				}
		}
  `}

	.f-wrap {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 10px;
		&:last-child {
			padding-top: 20px;
		}
		&:last-child::before {
			background-color: #333d4b;
			content: '';
			height: 1px;
			left: 21px;
			position: absolute;
			right: 21px;
			top: 0;
			margin: 0 -18px;
		}
		p {
			margin-bottom: 10px;
			font-size: 10px;
		}
	}

	.f-list {
		li:hover {
			cursor: pointer;
			background: rgba(255, 255, 255, 0.1);
			border-radius: 6px;
		}
	}
`
