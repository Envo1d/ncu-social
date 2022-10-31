import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
	createHttpLink,
	from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getCookie } from 'cookies-next'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'

import * as REFRESH from '@/schemes/auth/Refresh.graphql'

import refreshedVar from '@/utils/apollo/refreshed'

import authenticatedVar from './authenticated'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

const httpLink = createHttpLink({
	uri: `${process.env.APP_API_URL}`,
	credentials: process.env.APP_CREDENTIALS,
})

const authLink = setContext((_, { headers }) => {
	const token = getCookie('accessToken')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const logoutLink = onError(({ graphQLErrors }) => {
	if (graphQLErrors?.length) {
		if ((graphQLErrors[0].extensions?.response as any)?.statusCode === 403) {
			authenticatedVar(false)
			refreshedVar(false)
		}
		if ((graphQLErrors[0].extensions?.response as any)?.statusCode === 401) {
			const client = initializeApollo()
			client.mutate({
				mutation: REFRESH,
				errorPolicy: 'all',
			})
			refreshedVar(true)
		}
	}
})

const createApolloClient = () => {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: from([logoutLink, authLink, httpLink]),
		cache: new InMemoryCache(),
		connectToDevTools: true,
	})
}

export const initializeApollo = (initialState: any = null) => {
	const _apolloClient = apolloClient ?? createApolloClient()
	if (initialState) {
		const existingCache = _apolloClient.extract()
		const data = merge(existingCache, initialState, {
			arrayMerge: (destinationArray, sourceArray) => [
				...sourceArray,
				...destinationArray.filter((d) =>
					sourceArray.every((s) => !isEqual(d, s))
				),
			],
		})
		_apolloClient.cache.restore(data)
	}
	if (typeof window === 'undefined') return _apolloClient
	if (!apolloClient) apolloClient = _apolloClient
	return _apolloClient
}

export const addApolloState = (
	client: ApolloClient<NormalizedCacheObject>,
	pageProps: { props: any }
) => {
	pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
	return pageProps
}

export const useApollo = (pageProps: any) => {
	const state = pageProps[APOLLO_STATE_PROP_NAME]
	const store = useMemo(() => initializeApollo(state), [state])
	return store
}

export const clearCache = () => {
	apolloClient?.resetStore()
}
