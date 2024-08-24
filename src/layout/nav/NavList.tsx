import { colors } from '@/styles/colors'
import { Heart, History, House, Video } from 'lucide-react'
import styled from '@emotion/styled'
import useNavStore from '@/stores/useNavStore'
import { Link } from 'react-router-dom'

function NavList() {
	const isExpand = useNavStore((state) => state.isExpand)
	return (
		<Ul isExpand={isExpand}>
			<li>
				<Link to={'/'}>
					<House />
					<span>Home</span>
				</Link>
			</li>
			<li>
				<Link to={'/timeline'}>
					<History />
					<span>Timeline</span>
				</Link>
			</li>
			<li>
				<Link to={'/playlist'}>
					<Video />
					<span>Playlist</span>
				</Link>
			</li>
			<li>
				<Link to={'/Like'}>
					<Heart />
					<span>Like</span>
				</Link>
			</li>
		</Ul>
	)
}

export default NavList

const Ul = styled.ul<{ isExpand: boolean }>`
	padding: 18px;
	li {
		a {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 8px;
			font-size: 18px;
			font-weight: bold;
			color: ${colors.lightestGray};
			span {
				margin-left: 10px;
				padding-top: 3px;
			}
		}

		.svg-playlist {
			padding-left: 3px;
		}

		${({ isExpand }) =>
			!isExpand &&
			`
      a {
			padding-left: 0;
			display: block;
			font-size: 10px;
			line-height: 15px;
			padding: 6px 0 4px;
			text-align: center;
			box-sizing: border-box;
      }
    `}
	}

	li:hover {
		cursor: pointer;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 6px;
	}
`
