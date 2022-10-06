import { useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { clearCache } from '@/utils/apollo/apollo-client'
import authenticatedVar from '@/utils/apollo/authenticated'
import refreshedVar from '@/utils/apollo/refreshed'
import userDataVar from '@/utils/apollo/user-data'

import useGetMe from '@/hooks/useGetMe'

interface GuardProps {
	children: JSX.Element
	excludedRoutes?: string[]
}

const Guard = ({ children, excludedRoutes }: GuardProps) => {
	const { data: user, refetch } = useGetMe()
	const authenticated = useReactiveVar(authenticatedVar)
	const refreshed = useReactiveVar(refreshedVar)
	const router = useRouter()

	useEffect(() => {
		if (!excludedRoutes?.includes(router.pathname)) {
			refetch()
			userDataVar(user?.profile)
		}
	}, [router.pathname, refetch, excludedRoutes, user?.profile])

	useEffect(() => {
		if (refreshed) {
			refreshedVar(false)
			refetch()
			userDataVar(user?.profile)
		}
	}, [refreshed, refetch, user?.profile])

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
				<>
					{router.pathname === '/admin' ? (
						<>
							{user && user.profile.role === 'ADMIN' ? (
								children
							) : (
								<>NOT FOUND</>
							)}
						</>
					) : (
						<>{user && children}</>
					)}
				</>
			)}
		</>
	)
}

export default Guard
