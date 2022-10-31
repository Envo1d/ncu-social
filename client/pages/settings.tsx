import { NextPage } from 'next'
import React from 'react'

import Settings from '@/components/screens/settings/Settings'

import Meta from '@/utils/Meta'

const SettingsPage: NextPage = () => {
	return (
		<>
			<Meta title="Settings" />
			<Settings />
		</>
	)
}

export default SettingsPage
