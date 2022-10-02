import { Button } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import UsersList from '@/components/ui/test/UsersList'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Main Page</title>
				<meta name="description" content="Main page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Button variant="outlined">
				<Link href="/auth">Auth</Link>
			</Button>
			<UsersList />
		</>
	)
}

export default Home
