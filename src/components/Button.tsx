/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { colors } from '@/styles/colors'
import React from 'react'

function Button({ children }: ButtonProps) {
	return <button css={btn}>{children}</button>
}

export default Button

interface ButtonProps {
	children: React.ReactNode
}

const btn = css`
	height: 30px;
	border: 1px solid rgba(255, 255, 255, 0.12);
	border-radius: 8px;
	font-size: 12px;
	font-weight: 700;
	padding: 0 13px;
	color: ${colors.white};

	&:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
`
