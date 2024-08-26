/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import NavList from '@/layout/nav/NavList'
import FollowingFollowers from '@/layout/nav/FollowingFollowers'
import useNavStore from '@/stores/useNavStore'
import Banner from '@/layout/nav/Banner'
import Logout from '@/layout/nav/Logout'
import NavTop from '@/layout/nav/NavTop'

function Navbar() {
	const { isExpand } = useNavStore()

	return (
		<nav css={nav(isExpand)}>
			<div className="nav-inner">
				<NavTop />
				<div className="scroll-area">
					<NavList />
					<FollowingFollowers />
					{isExpand && <Banner />}
					<Logout />
				</div>
			</div>
		</nav>
	)
}

export default Navbar

const nav = (isExpand: boolean) => css`
	position: fixed;
	left: 0;
	bottom: 0;
	top: 0;
	box-sizing: content-box;
	width: ${isExpand ? '240px' : '78px'};
	z-index: 12000;

	.nav-inner {
		background-color: #141517;
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
		width: 100%;
		z-index: 13000;

		.scroll-area {
			overflow-y: auto;
			scrollbar-width: none;
		}
	}
`
