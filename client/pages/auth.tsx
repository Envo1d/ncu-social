import { NextPage } from 'next'
import Head from 'next/head'

import Auth from '../app/components/screens/auth/Auth'

const AuthPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Auth Page</title>
			</Head>
			<Auth />
		</>
	)
}

export default AuthPage
