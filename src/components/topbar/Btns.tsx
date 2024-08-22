import Button from '@/components/Button'
import styled from '@emotion/styled'

function Btns() {
	return (
		<>
			<BtnWrap>
				<Button>로그인</Button>
			</BtnWrap>
		</>
	)
}

export default Btns

const BtnWrap = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	padding-right: 20px;
	box-sizing: border-box;
	align-items: center;
`
