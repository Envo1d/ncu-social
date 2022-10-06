import { useQuery } from '@apollo/client'
import { Box, Button, CircularProgress, Grid } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

import * as PROFILE from '@/schemes/user/GetProfile.graphql'

import Meta from '@/utils/Meta'

const SettingsPage: NextPage = () => {
	const { data, error, loading } = useQuery(PROFILE)

	return (
		<Grid container justifyContent="center">
			<Meta title="Settings" />
			{data ? (
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					style={{ minHeight: '100vh', maxWidth: 1000 }}
				>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableBody>
								<TableRow
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										First Name
									</TableCell>
									<TableCell align="center">
										{data?.profile?.firstName}
									</TableCell>
								</TableRow>
								<TableRow
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										Last Name
									</TableCell>
									<TableCell align="center">
										{data?.profile?.lastName}
									</TableCell>
								</TableRow>
								<TableRow
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										Username
									</TableCell>
									<TableCell align="center">
										{data?.profile?.username}
									</TableCell>
								</TableRow>
								<TableRow
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										Avatar
									</TableCell>
									<TableCell align="center">TODO: Avatar</TableCell>
								</TableRow>
								<TableRow
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										Gender
									</TableCell>
									<TableCell align="center">{data?.profile?.gender}</TableCell>
								</TableRow>
								<TableRow
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										Country
									</TableCell>
									<TableCell align="center">{data?.profile?.country}</TableCell>
								</TableRow>
								<TableRow
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										Email
									</TableCell>
									<TableCell align="center">
										{data?.profile?.email}
										{' | '}
										{data?.profile?.isVerified === 'true' ? (
											'✅'
										) : (
											<Button variant="outlined" color="error" size="small">
												<Link href="/verify">❌</Link>
											</Button>
										)}
									</TableCell>
								</TableRow>
								<TableRow
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										Password
									</TableCell>
									<TableCell align="center">TODO: password</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			) : (
				<Box sx={{ display: 'flex' }}>
					<CircularProgress />
				</Box>
			)}
		</Grid>
	)
}

export default SettingsPage
