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

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [toggleExpand])
}

export default useResponsiveNav
