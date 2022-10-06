import { useLazyQuery, useMutation } from '@apollo/client'
import { Button, Grid, Input, Paper, Stack, styled } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { VerifyEmailInput, VerifyMutation } from '@/schemes/schema-ts/graphql'
import * as GET_CODE from '@/schemes/user/GetVerifyCode.graphql'
import * as SEND_CODE from '@/schemes/user/SendVerifyCode.graphql'

import Meta from '@/utils/Meta'

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

const VeirfyPage: NextPage = () => {
	const router = useRouter()
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<VerifyEmailInput>({
		mode: 'onChange',
	})
	const [type, setType] = useState('send')

	const [getCode] = useLazyQuery(GET_CODE)
	const [sendCode, { data, error }] = useMutation<VerifyMutation>(SEND_CODE, {
		onCompleted: () => {
			setTimeout(() => {
				router.push('/settings')
			}, 1000)
		},
	})

	const onSubmit: SubmitHandler<VerifyEmailInput> = (info) => {
		sendCode({
			variables: {
				data: {
					verifyCode: info.verifyCode,
				},
			},
		})
	}

	const buttonClick = () => {
		setType('verify')
		getCode()
	}

	return (
		<>
			<Meta title="Email verification" />
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				style={{ minHeight: '100vh' }}
			>
				<StyledPaper
					sx={{
						my: 1,
						mx: 'auto',
						p: 2,
					}}
				>
					{type === 'send' ? (
						<>
							<Item>Email verification</Item>
							<Item>
								<Button onClick={() => buttonClick()}>Get code</Button>
							</Item>
						</>
					) : (
						<form onSubmit={handleSubmit(onSubmit)}>
							<Item>
								<Controller
									name="verifyCode"
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
											error={!!errors.verifyCode}
											placeholder="Verification code"
											type="text"
										/>
									)}
								/>
							</Item>
							<Button variant="contained" type="submit">
								Verify Account
							</Button>
						</form>
					)}
				</StyledPaper>
			</Grid>
		</>
	)
}

export default VeirfyPage
