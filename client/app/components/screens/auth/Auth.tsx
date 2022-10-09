import { useMutation } from '@apollo/client'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
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

import Meta from '@/utils/Meta'
import authenticatedVar from '@/utils/apollo/authenticated'

import { validEmail } from '@/shared/regex'

function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link color="inherit" href="http://localhost:3000">
				NCU
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

const Auth: FC = () => {
	const [authType, setAuthType] = useState('Sign In')

	const router = useRouter()

	const handleClick = () => {
		setAuthType(authType === 'Sign In' ? 'Sign Up' : 'Sign In')
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

	const [registerUser, { error: regError }] = useMutation<RegisterMutation>(
		REGISTER,
		{
			errorPolicy: 'all',
			onCompleted: () => {
				authenticatedVar(true)
				router.push('/')
			},
		}
	)

	const [loginUser, { error: logError }] = useMutation<LoginMutation>(LOGIN, {
		errorPolicy: 'all',
		onCompleted: () => {
			authenticatedVar(true)
			router.push('/')
		},
	})

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

	return (
		<>
			<Meta title={authType} />
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{authType}
					</Typography>
					<Box
						component="form"
						onSubmit={
							authType === 'Sign In'
								? handleSubmit(onSubmitLogin)
								: handleSubmit(onSubmitRegistration)
						}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							{authType !== 'Sign In' && (
								<>
									<Grid item xs={12} sm={6}>
										<Controller
											name="firstName"
											control={control}
											defaultValue=""
											rules={{
												required: true,
											}}
											render={({ field: { ref, ...field } }) => (
												<TextField
													{...field}
													inputRef={ref}
													error={errors.firstName !== undefined}
													autoComplete="given-name"
													required
													fullWidth
													id="firstName"
													label="First Name"
													autoFocus
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Controller
											name="lastName"
											control={control}
											defaultValue=""
											rules={{
												required: true,
											}}
											render={({ field: { ref, ...field } }) => (
												<TextField
													{...field}
													inputRef={ref}
													error={errors.lastName !== undefined}
													required
													fullWidth
													id="lastName"
													label="Last Name"
													autoComplete="family-name"
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Controller
											name="username"
											control={control}
											defaultValue=""
											rules={{
												required: true,
											}}
											render={({ field: { ref, ...field } }) => (
												<TextField
													{...field}
													inputRef={ref}
													error={errors.username !== undefined}
													required
													fullWidth
													id="username"
													label="Username"
												/>
											)}
										/>
									</Grid>
								</>
							)}
							<Grid item xs={12}>
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
										<TextField
											{...field}
											inputRef={ref}
											error={errors.email !== undefined}
											required
											fullWidth
											id="email"
											label="Email Address"
											autoComplete="email"
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Controller
									name="password"
									control={control}
									defaultValue=""
									rules={{
										required: true,
										minLength: 6,
									}}
									render={({ field: { ref, ...field } }) => (
										<TextField
											{...field}
											inputRef={ref}
											error={errors.password !== undefined}
											required
											fullWidth
											label="Password"
											type="password"
											id="password"
											autoComplete="new-password"
										/>
									)}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							{authType}
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link
									href="#"
									variant="body2"
									onClick={(e) => {
										e.preventDefault()
										handleClick()
									}}
								>
									{authType === 'Sign In'
										? "Don't have an account yet? Sign Up"
										: 'Already have an account? Sign In'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</>
	)
}

export default Auth
