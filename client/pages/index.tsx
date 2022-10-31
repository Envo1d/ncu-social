import type { NextPage } from 'next'

import Home from '@/components/screens/home/Home'

import Meta from '@/utils/Meta'

const HomePage: NextPage = () => {
	return (
		<>
			<Meta title="Main Page" />
			<Home />
		</>
	)
}

export default HomePage
