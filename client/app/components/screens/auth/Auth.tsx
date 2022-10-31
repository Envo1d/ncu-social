import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import * as LOGIN from '@/schemes/auth/Login.graphql'
import * as REGISTER from '@/schemes/auth/Register.graphql'
import {
	Country,
	LoginInput,
	LoginMutation,
	RegisterInput,
	RegisterMutation,
} from '@/schemes/schema-ts/graphql'

import Meta from '@/utils/Meta'
import authenticatedVar from '@/utils/apollo/authenticated'
import { validMessage } from '@/utils/string/form-message'

import { validEmail } from '@/shared/regex'

import useGetCountries from '@/hooks/useGetCountries'

import styles from './Auth.module.sass'

const Auth: FC = () => {
	const [authType, setAuthType] = useState('Sign In')
	const [country, setCountry] = useState('')

	const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCountry(event.target.value)
	}

	const router = useRouter()

	const handleClick = () => {
		setAuthType(authType === 'Sign In' ? 'Sign Up' : 'Sign In')
		reset()
	}

	const { data } = useGetCountries()

	const {
		handleSubmit,
		formState: { errors },
		register,
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
			<div className={styles.container}>
				<div
					className={`${styles.box} ${
						authType === 'Sign Up' && styles.register
					}`}
				>
					<form
						className={styles.form}
						onSubmit={
							authType === 'Sign In'
								? handleSubmit(onSubmitLogin)
								: handleSubmit(onSubmitRegistration)
						}
					>
						<h2>{authType}</h2>
						{authType === 'Sign Up' && (
							<>
								<div className={styles.inputBox}>
									<input
										type="text"
										required
										{...register('firstName', {
											required: {
												value: true,
												message: validMessage.required('First Name'),
											},
											minLength: {
												value: 3,
												message: validMessage.minLenght('First Name', 3),
											},
										})}
									/>
									<span>
										{errors?.firstName?.message
											? errors?.firstName.message
											: 'First Name'}
									</span>
									<i></i>
								</div>
								<div className={styles.inputBox}>
									<input
										type="text"
										required
										{...register('lastName', {
											required: {
												value: true,
												message: validMessage.required('Last Name'),
											},
											minLength: {
												value: 3,
												message: validMessage.minLenght('Last Name', 3),
											},
										})}
									/>
									<span>
										{errors?.lastName?.message
											? errors?.lastName.message
											: 'Last Name'}
									</span>
									<i></i>
								</div>
								<div className={styles.inputBox}>
									<input
										type="text"
										required
										{...register('username', {
											required: {
												value: true,
												message: validMessage.required('Username'),
											},
											minLength: {
												value: 3,
												message: validMessage.minLenght('Username', 3),
											},
										})}
									/>
									<span>
										{errors?.username?.message
											? errors?.username?.message
											: 'Username'}
									</span>
									<i></i>
								</div>
								<div className={styles.inputBox}>
									<select
										required
										value={country}
										{...register('countryId', {
											required: {
												value: true,
												message: validMessage.required('Country'),
											},
											onChange: selectChange,
										})}
									>
										<option disabled></option>
										{data?.countries?.map((country: Country) => (
											<option key={country.id} value={country.id}>
												{country.title}
											</option>
										))}
									</select>
									<span>
										{errors?.countryId?.message
											? errors?.countryId.message
											: 'Country'}
									</span>
									<i></i>
								</div>
							</>
						)}
						<div className={styles.inputBox}>
							<input
								type="email"
								required
								{...register('email', {
									required: {
										value: true,
										message: validMessage.required('Email'),
									},
									pattern: {
										value: validEmail,
										message: validMessage.valid('Email'),
									},
								})}
							/>
							<span>
								{errors?.email?.message ? errors?.email?.message : 'Email'}
							</span>
							<i></i>
						</div>
						<div className={styles.inputBox}>
							<input
								type="password"
								required
								{...register('password', {
									required: {
										value: true,
										message: validMessage.required('Password'),
									},
									minLength: {
										value: 6,
										message: validMessage.minLenght('Password', 6),
									},
									maxLength: {
										value: 20,
										message: validMessage.maxLenght('Password', 20),
									},
								})}
							/>
							<span>
								{errors?.password?.message
									? errors?.password?.message
									: 'Password'}
							</span>
							<i></i>
						</div>
						<div className={styles.links}>
							<span onClick={() => handleClick()}>
								{authType === 'Sign In' ? 'Sign Up' : 'Sign In'}
							</span>
						</div>
						<input
							type="submit"
							value={authType === 'Sign In' ? 'Login' : 'Register'}
							className="btn btn-primary"
						/>
					</form>
				</div>
			</div>
		</>
	)
}

export default Auth
