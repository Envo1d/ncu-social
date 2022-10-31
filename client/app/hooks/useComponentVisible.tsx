import React, { useEffect, useRef, useState } from 'react'

const useComponentVisible = (initial: boolean) => {
	const [isComponentVisible, setIsComponentVisible] = useState(initial)
	const ref = useRef<HTMLDivElement>(null)

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsComponentVisible(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [])

	return { ref, isComponentVisible, setIsComponentVisible }
}

export default useComponentVisible
