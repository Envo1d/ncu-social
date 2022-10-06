import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import React from 'react'

import * as LOGOUT from '@/schemes/auth/Logout.graphql'
import { LogoutMutation } from '@/schemes/schema-ts/graphql'

import authenticatedVar from '@/utils/apollo/authenticated'

const Logout: NextPage = () => {
	const [logout, { error }] = useMutation<LogoutMutation>(LOGOUT, {
		errorPolicy: 'all',
		onCompleted: () => {
			authenticatedVar(false)
		},
	})
	logout()
	return <></>
}

export default Logout
