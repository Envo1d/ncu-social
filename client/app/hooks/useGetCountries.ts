import { useQuery } from '@apollo/client'

import * as GET_COUNTRIES from '@/schemes/country/GetCountries.graphql'

const useGetCountries = () => {
	return useQuery(GET_COUNTRIES, {
		errorPolicy: 'all',
	})
}

export default useGetCountries
