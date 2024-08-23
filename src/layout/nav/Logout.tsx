import useNavStore from '@/stores/useNavStore'
import { colors } from '@/styles/colors'
import styled from '@emotion/styled'
import { LogOut } from 'lucide-react'
function Logout() {
	const isExpand = useNavStore((state) => state.isExpand)
	const handleClick = () => {
		console.log('logout!')
	}
	return (
		<Wrapper isExpand={isExpand}>
			<button className="btn-logout" onClick={handleClick}>
				<LogOut />
				<span>Logout</span>
			</button>
		</Wrapper>
	)
}
export default Logout

const Wrapper = styled.div<{ isExpand: boolean }>`
	display: flex;
	justify-content: center;
	text-align: center;
	position: relative;
	padding: 18px;
	margin-top: 10px;
	&::before {
		background-color: ${colors.darkestGray};
		content: '';
		height: 1px;
		left: 21px;
		position: absolute;
		right: 21px;
		top: 0;
	}
	.btn-logout {
		display: flex;
		flex: 1;
		padding: 10px;
		flex-direction: row;
		align-items: center;
		color: ${colors.white};
		span {
			font-size: 15px;
			margin-left: 10px;
		}
	}
	.btn-logout:hover {
		cursor: pointer;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 6px;
	}

	${({ isExpand }) =>
		!isExpand &&
		`
      .btn-logout {
        flex-direction: column;
          span{
            margin-left:0;
            font-size:10px;
          }
      }
    `}
`
