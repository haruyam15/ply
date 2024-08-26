/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { colors } from '@/styles/colors'
import Search from '@/layout/header/Search'
import HeaderActions from '@/layout/header/HeaderActions'

function Header() {
	return (
		<header css={header} className="header">
			<Search />
			<HeaderActions />
		</header>
	)
}

export default Header

const header = css`
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
