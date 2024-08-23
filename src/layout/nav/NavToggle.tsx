import useNavStore from '@/stores/useNavStore'
import { Menu } from 'lucide-react'
import styled from '@emotion/styled'
import { colors } from '@/styles/colors'

function NavToggle() {
	const { isExpand, toggleExpand } = useNavStore()
	const handleNavExpand = () => {
		toggleExpand(!isExpand)
	}
	return (
		<Wrapper>
			<button className="nav-toggle" onClick={handleNavExpand}>
				<Menu size={30} />
			</button>
		</Wrapper>
	)
}
export default NavToggle

const Wrapper = styled.div`
	box-sizing: border-box;
	.nav-toggle {
		color: ${colors.white};
		padding: 20px 4px 6px 23px;
	}
`
