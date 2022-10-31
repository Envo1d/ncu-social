import { ApolloProvider } from '@apollo/client'
import { ThemeProvider, useTheme } from 'next-themes'
import type { AppProps } from 'next/app'
import React from 'react'

import Guard from '@/components/Guard'
import Layout from '@/components/ui/layout/Layout'
import SocialLayout from '@/components/ui/layout/Social/SocialLayout'

import { useApollo } from '@/utils/apollo/apollo-client'

import '../styles/globals.scss'

interface CustomAppProps extends AppProps {
	initialApolloState: any
}

const themes = [
	'light',
	'light-yellow',
	'light-red',
	'light-green',
	'light-blue',
	'dim',
	'dim-yellow',
	'dim-red',
	'dim-green',
	'dim-blue',
	'dark',
	'dark-yellow',
	'dark-red',
	'dark-green',
	'dark-blue',
]

export default function MyApp({
	Component,
	pageProps,
	...appProps
}: CustomAppProps) {
	const apolloClient = useApollo(pageProps)
	const isLayoutNotNeeded = ['/auth', '/verify', '/admin'].includes(
		appProps.router.pathname
	)
	const isSocialLayoutNeeded = ['/settings'].includes(appProps.router.pathname)
	const LayoutComponent = isLayoutNotNeeded ? React.Fragment : Layout
	const LayoutModuleComponent = isLayoutNotNeeded
		? React.Fragment
		: isSocialLayoutNeeded
		? React.Fragment
		: SocialLayout

	return (
		<ApolloProvider client={apolloClient}>
			<Guard excludedRoutes={['/auth']}>
				<ThemeProvider themes={themes}>
					<LayoutComponent>
						<LayoutModuleComponent>
							<Component {...pageProps} />
						</LayoutModuleComponent>
					</LayoutComponent>
				</ThemeProvider>
			</Guard>
		</ApolloProvider>
	)
}
