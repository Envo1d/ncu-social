import { ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'

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
}: CustomAppProps) {
	const apolloClient = useApollo(pageProps)

	return (
		<ApolloProvider client={apolloClient}>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Head>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</CacheProvider>
		</ApolloProvider>
	)
}
