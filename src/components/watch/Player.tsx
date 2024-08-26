/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

function Player() {
	return (
		<div className="player" css={player}>
			<iframe
				src="https://www.youtube.com/embed/ockq7VfdZxc?list=PL74Zf6m2qP_637hyH0i1PKtr-3OGPIbi3"
				title="180513 뷰티풀 민트 라이프 2018 윤하 - 연애조건"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
			></iframe>
		</div>
	)
}

export default Player

const player = css`
	position: relative;
	padding-bottom: 56.25%;
	border-radius: 8px;
	overflow: hidden;
	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: none;
	}
`
