import { ApolloProvider } from '@apollo/client'
import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react'
import type { AppProps } from 'next/app'
import React from 'react'

import Guard from '@/components/Guard'
import Layout from '@/components/ui/layout/Layout'

import { useApollo } from '@/utils/apollo/apollo-client'

import createEmotionCache from '@/config/createEmotionCache'
import theme from '@/config/theme'

import '../styles/globals.scss'

const clientSideEmotionCache = createEmotionCache()

interface CustomAppProps extends AppProps {
	emotionCache?: EmotionCache
	initialApolloState: any
}

export default function MyApp({
	Component,
	pageProps,
	emotionCache = clientSideEmotionCache,
	...appProps
}: CustomAppProps) {
	const apolloClient = useApollo(pageProps)
	const isLayoutNotNeeded = ['/auth', '/verify'].includes(
		appProps.router.pathname
	)
	const LayoutComponent = isLayoutNotNeeded ? React.Fragment : Layout
	return (
		<ApolloProvider client={apolloClient}>
			<CacheProvider value={emotionCache}>
				<ThemeProvider theme={theme}>
					<Guard excludedRoutes={['/auth']}>
						<LayoutComponent>
							<Component {...pageProps} />
						</LayoutComponent>
					</Guard>
				</ThemeProvider>
			</CacheProvider>
		</ApolloProvider>
	)
}
