/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	/** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
	DateTime: any
}

export type LoginInput = {
	email: Scalars['String']
	password: Scalars['String']
}

export type Mutation = {
	__typename?: 'Mutation'
	getNewTokens: SignResponse
	login: SignResponse
	register: SignResponse
	verifyEmail: Scalars['Boolean']
}

export type MutationLoginArgs = {
	data: LoginInput
}

export type MutationRegisterArgs = {
	data: RegisterInput
}

export type MutationVerifyEmailArgs = {
	data: VerifyEmailInput
}

export type Query = {
	__typename?: 'Query'
	getAll: Array<User>
	profile: User
	sendVerificationCode: Scalars['Boolean']
}

export type RegisterInput = {
	email: Scalars['String']
	firstName: Scalars['String']
	lastName: Scalars['String']
	password: Scalars['String']
	username: Scalars['String']
}

export type SignResponse = {
	__typename?: 'SignResponse'
	id: Scalars['String']
	accessToken: Scalars['String']
	user: UserInfoResponse
}

export type User = {
	__typename?: 'User'
	avatarUrl?: Maybe<Scalars['String']>
	country?: Maybe<Scalars['String']>
	email: Scalars['String']
	firstName: Scalars['String']
	gender?: Maybe<Scalars['String']>
	id: Scalars['ID']
	isVerified: Scalars['String']
	lastName: Scalars['String']
	passwordHash: Scalars['String']
	registeredAt: Scalars['DateTime']
	role: Scalars['String']
	status: Scalars['String']
	updatedAt: Scalars['DateTime']
	username: Scalars['String']
}

export type UserInfoResponse = {
	__typename?: 'UserInfoResponse'
	email: Scalars['String']
	id: Scalars['String']
	role: Scalars['String']
}

export type VerifyEmailInput = {
	verifyCode: Scalars['String']
}

export type LoginMutationVariables = Exact<{
	data: LoginInput
}>

export type LoginMutation = {
	__typename?: 'Mutation'
	login: {
		__typename?: 'SignResponse'
		accessToken: string
		user: { __typename?: 'UserInfoResponse'; role: string }
	}
}

export type RegisterMutationVariables = Exact<{
	data: RegisterInput
}>

export type RegisterMutation = {
	__typename?: 'Mutation'
	register: {
		__typename?: 'SignResponse'
		accessToken: string
		user: { __typename?: 'UserInfoResponse'; role: string }
	}
}

export const LoginDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Login' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'LoginInput' },
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'login' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'data' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'data' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'user' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'role' } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>
export const RegisterDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Register' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'RegisterInput' },
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'register' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'data' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'data' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'user' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'role' } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>
