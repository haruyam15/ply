import styled from '@emotion/styled'

function Logo() {
	return (
		<>
			<H1>
				<img src="./src/assets/logo.png" />
			</H1>
		</>
	)
}

export default Logo

const H1 = styled.h1`
	position: fixed;
	top: 0;
	left: 63px;
	padding-top: 15px;
	box-sizing: border-box;
	z-index: 13000;

	img {
		width: 110px;
	}
`
