import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

const createApolloClient = () => {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: new HttpLink({
			uri: `${process.env.APP_API_URL}`,
			credentials: process.env.APP_CREDENTIALS,
		}),
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
