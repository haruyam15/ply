import useNavStore from '@/stores/useNavStore'
import styled from '@emotion/styled'
function Container() {
	const isExpand = useNavStore((state) => state.isExpand)
	return <Wrapper isExpand={isExpand}></Wrapper>
}
export default Container

const Wrapper = styled.div<{ isExpand: boolean }>`
	padding-top: 60px;
	padding-left: ${({ isExpand }) => (isExpand ? '240px' : '78px')};
	min-height: 100vh;
	box-sizing: border-box;
`
