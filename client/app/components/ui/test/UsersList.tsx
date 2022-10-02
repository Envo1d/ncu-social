import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 19,
	},
	pos: {
		marginBottom: 12,
		fontSize: 12,
	},
}))

const GET_USERS = gql`
	query {
		getAll {
			id
			username
			email
		}
	}
`

export default function UsersList() {
	const styles = useStyles()
	const { loading, error, data } = useQuery(GET_USERS, {
		fetchPolicy: 'cache-and-network',
	})

	if (error) return <div>Error loading users: {error.message}</div>
	if (loading) return <div>Loading</div>

	return (
		<Grid style={{ marginTop: '20px' }} container spacing={2}>
			{data?.getAll.map((user: any) => (
				<Grid item xs={4} key={user.id}>
					<Card className={styles.classes.root}>
						<CardContent>
							<Typography
								className={styles.classes.title}
								color="textPrimary"
								gutterBottom
							>
								{user.username}
							</Typography>
							<Typography
								className={styles.classes.pos}
								color="textSecondary"
								gutterBottom
							>
								{user.email}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	)
}
