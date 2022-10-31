import { useQuery } from '@apollo/client'
import React, { FC } from 'react'

import * as PROFILE from '@/schemes/user/GetProfileInfo.graphql'

import useGetCountries from '@/hooks/useGetCountries'

import styles from './Settings.module.sass'

const Settings: FC = () => {
	const { data, error, loading } = useQuery(PROFILE)
	const {} = useGetCountries()

	return (
		<>
			<div className={styles.main}>
				<div className="container">
					<h3>General settings</h3>
					<div className="box">
						<div className="item">
							<h5>Name</h5>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Settings
