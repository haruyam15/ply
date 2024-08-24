import Topbar from '@/layout/topbar/Topbar'
import Navbar from '@/layout/nav/Navbar'
import Logo from '@/components/Logo'
import useResponsiveNav from '@/hooks/useResponsivNav'
import useNavStore from '@/stores/useNavStore'
import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'

function Layout() {
	const isExpand = useNavStore((state) => state.isExpand)
	useResponsiveNav()
	return (
		<Wrapper className="wrap">
			<Topbar />
			<Navbar />
			<Logo />
			<Container isExpand={isExpand}>
				<Outlet />
			</Container>
		</Wrapper>
	)
}
export default Layout

const Wrapper = styled.div`
	min-height: 100vh;
	min-width: 950px;
`

const Container = styled.div<{ isExpand: boolean }>`
	padding-top: 60px;
	padding-left: ${({ isExpand }) => (isExpand ? '240px' : '78px')};
	min-height: 100vh;
	box-sizing: border-box;
`
