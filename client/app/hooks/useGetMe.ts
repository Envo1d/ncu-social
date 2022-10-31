import { useQuery } from '@apollo/client'

import * as GET_ME from '@/schemes/user/GetProfileInfo.graphql'

const useGetMe = () => {
	return useQuery(GET_ME, {
		errorPolicy: 'all',
	})
}

export default useGetMe
