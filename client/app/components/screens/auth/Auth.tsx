import { useMutation } from '@apollo/client'
import { Box, Button, Input, Paper, Stack, styled } from '@mui/material'
import Head from 'next/head'
import Router from 'next/router'
import React, { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import * as LOGIN from '@/schemes/auth/Login.graphql'
import * as REGISTER from '@/schemes/auth/Register.graphql'
import {
	LoginInput,
	LoginMutation,
	RegisterInput,
	RegisterMutation,
} from '@/schemes/schema-ts/graphql'

import { validEmail } from '@/shared/regex'

const StyledPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	maxWidth: 400,
	color: theme.palette.text.primary,
}))

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}))

const Auth: FC = () => {
	const [authType, setAuthType] = useState('Login')

	const handleButtonClick = () => {
		setAuthType(authType === 'Login' ? 'Register' : 'Login')
		reset()
	}

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<RegisterInput>({
		mode: 'onChange',
	})

	const [
		registerUser,
		{ data: regData, error: regError, loading: regLoading },
	] = useMutation<RegisterMutation>(REGISTER, { errorPolicy: 'all' })

	const [loginUser, { data: logData, error: logError, loading: logLoading }] =
		useMutation<LoginMutation>(LOGIN, { errorPolicy: 'all' })

	const onSubmitRegistration: SubmitHandler<RegisterInput> = (info) => {
		registerUser({
			variables: {
				data: info,
			},
		})
	}

	const onSubmitLogin: SubmitHandler<LoginInput> = (info) => {
		loginUser({
			variables: {
				data: info,
			},
		})
	}

	if (regData || logData) Router.replace('/')

	return (
		<>
			<Head>
				<title>{authType}</title>
			</Head>
			<Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
				<StyledPaper
					sx={{
						my: 1,
						mx: 'auto',
						p: 2,
					}}
				>
					<Stack spacing={2}>
						<Item>
							<h1>{authType}</h1>
						</Item>
						{regError?.graphQLErrors.map(({ message }, i) => (
							<Item key={i}>{message}</Item>
						))}
						{regError?.clientErrors.map(({ message }, i) => (
							<Item key={i}>{message}</Item>
						))}
						{regError?.networkError && (
							<Item>{regError?.networkError.message}</Item>
						)}
						{logError?.graphQLErrors.map(({ message }, i) => (
							<Item key={i}>{message}</Item>
						))}
						{logError?.clientErrors.map(({ message }, i) => (
							<Item key={i}>{message}</Item>
						))}
						{logError?.networkError && (
							<Item>{logError?.networkError.message}</Item>
						)}
						<form
							onSubmit={
								authType === 'Login'
									? handleSubmit(onSubmitLogin)
									: handleSubmit(onSubmitRegistration)
							}
						>
							<Stack spacing={1}>
								{authType === 'Register' && (
									<>
										<Item>
											<Controller
												name="firstName"
												control={control}
												defaultValue=""
												rules={{
													required: true,
												}}
												render={({ field: { ref, ...field } }) => (
													<Input
														{...field}
														inputRef={ref}
														fullWidth
														error={!!errors.firstName}
														placeholder="First Name"
														type="text"
													/>
												)}
											/>
										</Item>
										<Item>
											<Controller
												name="lastName"
												control={control}
												defaultValue=""
												rules={{
													required: true,
												}}
												render={({ field: { ref, ...field } }) => (
													<Input
														{...field}
														inputRef={ref}
														fullWidth
														error={!!errors.lastName}
														placeholder="Last Name"
														type="text"
													/>
												)}
											/>
										</Item>
										<Item>
											<Controller
												name="username"
												control={control}
												defaultValue=""
												rules={{
													required: true,
												}}
												render={({ field: { ref, ...field } }) => (
													<Input
														{...field}
														inputRef={ref}
														fullWidth
														error={!!errors.username}
														placeholder="Username"
														type="text"
													/>
												)}
											/>
										</Item>
									</>
								)}
								<Item>
									<Controller
										name="email"
										control={control}
										defaultValue=""
										rules={{
											required: true,
											pattern: {
												value: validEmail,
												message: 'Please enter valid email',
											},
										}}
										render={({ field: { ref, ...field } }) => (
											<Input
												{...field}
												inputRef={ref}
												fullWidth
												error={!!errors.email}
												placeholder="Email"
												type="email"
											/>
										)}
									/>
								</Item>
								<Item>
									<Controller
										name="password"
										control={control}
										defaultValue=""
										rules={{
											required: true,
											minLength: 6,
										}}
										render={({ field: { ref, ...field } }) => (
											<Input
												{...field}
												inputRef={ref}
												fullWidth
												error={!!errors.password}
												placeholder="Password"
												type="password"
											/>
										)}
									/>
								</Item>
							</Stack>
							<Stack spacing={3} mt={2}>
								<Button variant="contained" type="submit">
									{authType}
								</Button>
							</Stack>
						</form>
					</Stack>
					<Stack mt={3} spacing={5}>
						{authType === 'Login' ? (
							<Button onClick={() => handleButtonClick()}>
								Don&apos;t have an account yet? Sign Up
							</Button>
						) : (
							<Button onClick={() => handleButtonClick()}>
								Already have an account? Log in
							</Button>
						)}
					</Stack>
				</StyledPaper>
			</Box>
		</>
	)
}

export default Auth
