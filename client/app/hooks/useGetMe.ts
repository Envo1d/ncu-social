import { gql, useQuery } from '@apollo/client'

import * as GET_ME from '@/schemes/user/GetMe.graphql'

const useGetMe = () => {
	return useQuery(GET_ME, {
		errorPolicy: 'all',
	})
}

export default useGetMe
