import { makeVar } from '@apollo/client'

type UserData = {
	role: string
	avatarUrl: string
	isVerified: boolean
	username: string
}

const userDataVar = makeVar({} as UserData)

export default userDataVar
