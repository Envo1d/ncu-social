import { gql, useQuery } from '@apollo/client'

const GET_ME = gql`
	query me {
		profile {
			id
			email
			role
		}
	}
`

const useGetMe = () => {
	return useQuery(GET_ME, {
		errorPolicy: 'all',
	})
}

export default useGetMe
