import NavList from '@/components/nav/NavList'
import { colors } from '@/styles/colors'
import styled from '@emotion/styled'
import FollowingFollowers from '@/components/nav/FollowingFollowers'
import { Menu } from 'lucide-react'
import useNavStore from '@/stores/useNavStore'
import Banner from '@/components/nav/Banner'

function Nav() {
	const { isExpand, setExpand } = useNavStore((state) => ({
		isExpand: state.isExpand,
		setExpand: state.setExpand,
	}))

	const handleNavExpand = () => {
		setExpand(!isExpand)
	}

	return (
		<NavBar isExpand={isExpand}>
			<div className="nav-inner">
				<div className="nav-top">
					<button onClick={handleNavExpand}>
						<Menu size={30} />
					</button>
				</div>
				<div className="scroll">
					<NavList />
					<FollowingFollowers />
					{isExpand && <Banner />}
				</div>
			</div>
		</NavBar>
	)
}

export default Nav

const NavBar = styled.nav<{ isExpand: boolean }>`
	position: fixed;
	left: 0;
	bottom: 0;
	top: 0;
	box-sizing: content-box;
	width: 240px;
	z-index: 12000;

	.nav-inner {
		background-color: #141517;
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
		width: 100%;
		z-index: 13000;

		.nav-top {
			button {
				color: ${colors.white};
				padding: 20px 4px 6px 23px;
				box-sizing: border-box;
			}
		}
		.scroll {
			overflow-y: auto;
			scrollbar-width: none;
		}
	}

	${(props) =>
		!props.isExpand &&
		`
      width: 78px;
    `}
`
