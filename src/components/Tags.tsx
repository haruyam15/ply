/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { colors } from '@/styles/colors'

function Tags() {
	return (
		<ul css={tags}>
			<li>윤하</li>
			<li>라이브</li>
			<li>페스티벌</li>
			<li>뷰티풀 민트 라이프</li>
		</ul>
	)
}

export default Tags

const tags = css`
	display: flex;
	align-items: center;
	gap: 5px;
	li {
		display: flex;
		align-items: center;
		height: 25px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 5px;
		font-size: 11px;
		font-weight: 700;
		padding: 0 13px;
		color: ${colors.white};
	}
`
