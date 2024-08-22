import styled from '@emotion/styled'
import { colors } from '@/styles/colors'
import Search from '@/components/topbar/Search'
import Btns from '@/components/topbar/Btns'

function Topbar() {
	return (
		<Header>
			<Search />
			<Btns />
		</Header>
	)
}

export default Topbar

const Header = styled.header`
	width: 100%;
	height: 60px;
	background-color: ${colors.black};
	color: ${colors.veryLightGray};
	left: 0;
	min-width: 800px;
	position: fixed;
	top: 0;
	z-index: 11000;
`
