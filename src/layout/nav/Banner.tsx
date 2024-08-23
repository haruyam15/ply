import styled from '@emotion/styled'

function Banner() {
	return (
		<Wrapper>
			<img src="./assets/banner.png" alt="" />
		</Wrapper>
	)
}

export default Banner

const Wrapper = styled.div`
	padding: 30px 18px 18px;
	position: relative;
	&::before {
		background-color: #333d4b;
		content: '';
		height: 1px;
		left: 21px;
		position: absolute;
		right: 21px;
		top: 0;
	}
`
