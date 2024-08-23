import NavList from '@/layout/nav/NavList'
import styled from '@emotion/styled'
import FollowingFollowers from '@/layout/nav/FollowingFollowers'
import useNavStore from '@/stores/useNavStore'
import Banner from '@/layout/nav/Banner'
import NavToggle from '@/layout/nav/NavToggle'
import Logout from '@/layout/nav/Logout'

function Navbar() {
	const { isExpand } = useNavStore()

	return (
		<Nav isExpand={isExpand}>
			<div className="nav-inner">
				<NavToggle />
				<div className="scroll-area">
					<NavList />
					<FollowingFollowers />
					{isExpand && <Banner />}
					<Logout />
				</div>
			</div>
		</Nav>
	)
}

export default Navbar

const Nav = styled.nav<{ isExpand: boolean }>`
	position: fixed;
	left: 0;
	bottom: 0;
	top: 0;
	box-sizing: content-box;
	width: ${({ isExpand }) => (isExpand ? '240px' : '78px')};
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
