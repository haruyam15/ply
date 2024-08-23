import { colors } from '@/styles/colors'
import { Heart, History, House, Video } from 'lucide-react'
import styled from '@emotion/styled'
import useNavStore from '@/stores/useNavStore'

function NavList() {
	const isExpand = useNavStore((state) => state.isExpand)
	return (
		<Ul isExpand={isExpand}>
			<li>
				<House />
				<span>Home</span>
			</li>
			<li>
				<History />
				<span>Timeline</span>
			</li>
			<li>
				<Video />
				<span>Playlist</span>
			</li>
			<li>
				<Heart />
				<span>Like</span>
			</li>
		</Ul>
	)
}

export default NavList

const Ul = styled.ul<{ isExpand: boolean }>`
	padding: 18px;
	li {
		color: ${colors.lightestGray};
		font-size: 10px;
		line-height: 15px;
		padding: 6px 0 4px;
		text-align: center;
		box-sizing: border-box;

		span {
			padding-left: 0;
			display: block;
		}

		.svg-playlist {
			padding-left: 3px;
		}

		${(props) =>
			props.isExpand &&
			`
      width: 100%;
      display: flex;
      align-items: center;
      padding: 8px;
      font-size: 18px;
      font-weight: bold;

      span {
        padding-left: 16px;
        
      }
    `}
	}

	li:hover {
		cursor: pointer;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 6px;
	}
`
