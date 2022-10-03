import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Main Page</title>
				<meta name="description" content="Main page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Link href="/auth">Auth</Link>
		</>
	)
}

export default Home
