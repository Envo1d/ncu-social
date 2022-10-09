import { useQuery } from '@apollo/client'
import { NextPage } from 'next'

import * as GET_PROFILE from '@/schemes/user/GetProfile.graphql'

import Meta from '@/utils/Meta'

const ProfilePage: NextPage = () => {
	const { data, loading } = useQuery(GET_PROFILE)

	return (
		<>
			<Meta title="Profile" />
			{loading === true ? <>Loading...</> : <div></div>}
		</>
	)
}

export default ProfilePage
