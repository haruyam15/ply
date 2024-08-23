import throttle from 'lodash/throttle'

import useNavStore from '@/stores/useNavStore'
import { useEffect } from 'react'

const useResponsiveNav = () => {
	const { toggleExpand } = useNavStore()

	useEffect(() => {
		const handleResize = throttle(() => {
			if (window.innerWidth <= 900) {
				toggleExpand(false)
			} else {
				toggleExpand(true)
			}
		}, 300)

		handleResize()
		// 이벤트 리스너 등록
		window.addEventListener('resize', handleResize)

		// 컴포넌트 언마운트 시 이벤트 리스너 정리
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [toggleExpand])
}

export default useResponsiveNav
