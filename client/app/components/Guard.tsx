import { useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { clearCache } from '@/utils/apollo/apollo-client'
import authenticatedVar from '@/utils/apollo/authenticated'

import useGetMe from '@/hooks/useGetMe'

interface GuardProps {
	children: JSX.Element
	excludedRoutes?: string[]
}

const Guard = ({ children, excludedRoutes }: GuardProps) => {
	const { data: user, refetch } = useGetMe()
	const authenticated = useReactiveVar(authenticatedVar)
	const router = useRouter()

	useEffect(() => {
		if (!excludedRoutes?.includes(router.pathname)) refetch()
	}, [router.pathname, refetch, excludedRoutes])

	useEffect(() => {
		if (!authenticated && !excludedRoutes?.includes(router.pathname)) {
			router.replace('/auth')
			clearCache()
		}
	}, [authenticated, router, excludedRoutes])

	return (
		<>
			{excludedRoutes?.includes(router.pathname) ? (
				children
			) : (
				<>{user && children}</>
			)}
		</>
	)
}

export default Guard
