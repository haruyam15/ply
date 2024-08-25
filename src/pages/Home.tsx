/** @jsxImportSource @emotion/react */
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { css } from '@emotion/react'

// Home 컴포넌트 정의
const Home: React.FC = () => {
	// 컴포넌트 내부에서 데이터 선언
	const videos = [
		'https://www.youtube.com/embed/pERDk4KoW-s',
		'https://www.youtube.com/embed/dQw4w9WgXcQ',
		'https://www.youtube.com/embed/C0DPdy98e4c',
	]

	const iframes = [
		'https://www.youtube.com/embed/pERDk4KoW-s',
		'https://example.com',
		'https://example.com',
	]

	// Slider 설정
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
	}

	return (
		<div css={containerStyle}>
			{/* 캐러셀 섹션 */}
			<div css={carouselStyle}>
				<Slider {...settings}>
					{videos.map((videoSrc, index) => (
						<div key={index}>
							<iframe
								src={videoSrc}
								title={`video ${index + 1}`}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								css={iframeStyle}
							></iframe>
						</div>
					))}
				</Slider>
			</div>

			{/* 그리드 섹션 */}
			<div css={gridContainerStyle}>
				{iframes.map((iframeSrc, index) => (
					<div key={index} css={gridItemStyle}>
						<iframe
							src={iframeSrc}
							title={`iframe ${index + 1}`}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				))}
			</div>
		</div>
	)
}

// 스타일 정의
const containerStyle = css`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
`

const carouselStyle = css`
	width: 100%;
	margin: 0 auto;
	overflow: hidden;
	max-height: 300px;

	.slick-arrow {
		display: block; /* 화살표 버튼 표시 */
		background-color: rgba(0, 0, 0, 0.5); /* 버튼 배경 색상 */
		color: white;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		z-index: 1; /* 버튼이 다른 요소 위에 오도록 설정 */
	}

	.slick-prev {
		left: 10px; /* 왼쪽 버튼 위치 조정 */
	}

	.slick-next {
		right: 10px; /* 오른쪽 버튼 위치 조정 */
	}

	.slick-slide {
		display: flex;
		justify-content: center;
		align-items: center;

		iframe {
			width: 100%;
			height: 300px; /* 캐러셀의 세로 높이 조정 */
			display: block;
		}
	}
`

const gridContainerStyle = css`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 20px;
	padding: 20px;
`

const gridItemStyle = css`
	border: 1px solid #ddd;
	padding: 10px;

	iframe {
		width: 100%;
		height: 200px;
	}
`

const iframeStyle = css`
	width: 100%; /* iframe의 전체 너비 사용 */
	height: 300px; /* iframe의 높이를 캐러셀 컨테이너에 맞춤 */
`

export default Home
