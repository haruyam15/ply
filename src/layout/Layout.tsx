import styled from '@emotion/styled'
import Topbar from '@/layout/topbar/Topbar'
import Navbar from '@/layout/nav/Navbar'
import Logo from '@/components/Logo'
import useResponsiveNav from '@/hooks/useResponsivNav'
import Container from '@/layout/Container'
function Layout() {
	useResponsiveNav()
	return (
		<Wrapper className="wrap">
			<Topbar />
			<Navbar />
			<Logo />
			<Container />
		</Wrapper>
	)
}

export default Layout

const Wrapper = styled.div`
	min-height: 100vh;
	min-width: 950px;
`
