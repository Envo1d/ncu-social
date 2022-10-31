import { useReactiveVar } from '@apollo/client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, PropsWithChildren, useEffect, useState } from 'react'

import userDataVar from '@/utils/apollo/user-data'

import useComponentVisible from '@/hooks/useComponentVisible'

import styles from './Layout.module.sass'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const {
		ref: menuRef,
		isComponentVisible: isMenuVisible,
		setIsComponentVisible: setIsMenuVisible,
	} = useComponentVisible(false)
	const {
		ref: themeRef,
		isComponentVisible: isThemeVisible,
		setIsComponentVisible: setIsThemeVisible,
	} = useComponentVisible(false)

	const changeBg = (bg: string) => {
		if (bg === 'light') {
			if (!theme?.includes('-')) changeTheme('light')
			else changeTheme('light', theme?.substring(theme?.indexOf('-') + 1))
		} else if (bg === 'dim') {
			if (!theme?.includes('-')) changeTheme('dim')
			else changeTheme('dim', theme?.substring(theme?.indexOf('-') + 1))
		} else {
			if (!theme?.includes('-')) changeTheme('dark')
			else changeTheme('dark', theme?.substring(theme?.indexOf('-') + 1))
		}
	}

	const changeColor = (color: string) => {
		if (color === 'default') {
			if (!theme?.includes('-')) changeTheme(theme)
			else changeTheme(theme?.substring(0, theme?.indexOf('-')))
		} else if (color === 'yellow') {
			if (!theme?.includes('-')) changeTheme(theme, 'yellow')
			else changeTheme(theme?.substring(0, theme?.indexOf('-')), 'yellow')
		} else if (color === 'red') {
			if (!theme?.includes('-')) changeTheme(theme, 'red')
			else changeTheme(theme?.substring(0, theme?.indexOf('-')), 'red')
		} else if (color === 'green') {
			if (!theme?.includes('-')) changeTheme(theme, 'green')
			else changeTheme(theme?.substring(0, theme?.indexOf('-')), 'green')
		} else {
			if (!theme?.includes('-')) changeTheme(theme, 'blue')
			else changeTheme(theme?.substring(0, theme?.indexOf('-')), 'blue')
		}
	}

	const changeTheme = (bg: string = '', color: string = '') => {
		setTheme(`${bg}${color !== '' ? '-' + color : ''}`)
	}

	const userData = useReactiveVar(userDataVar)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<>
			<div className={styles.header}>
				<div className="container">
					<h2 className={styles.logo}>
						<Link href="/">NCU</Link>
					</h2>
					<div className="search-bar">
						<i className="uil uil-search"></i>
						<input type="search" placeholder="Search" />
					</div>
					<div
						className={styles.profile_icon}
						onClick={() => setIsMenuVisible(true)}
						ref={menuRef}
					>
						<div className="profile-photo sub-btn">
							<img
								src="https://avatars.githubusercontent.com/u/79973093?v=4"
								alt="avatar"
							/>
						</div>
						<ul
							className={`${styles.dropdown_menu} ${
								isMenuVisible && styles.active
							}`}
						>
							<li
								className={styles.sub_item}
								onClick={() => {
									setIsThemeVisible(true)
									setIsMenuVisible(false)
								}}
							>
								<span>
									<i className="uil uil-palette"></i>
								</span>
								<p>Theme</p>
							</li>
							{userData.role === 'ADMIN' && (
								<li className={styles.sub_item}>
									<span>
										<i className="uil uil-shield-check"></i>
									</span>
									<Link href="/admin">Admin Panel</Link>
								</li>
							)}
							<li className={styles.sub_item}>
								<span>
									<i className="uil uil-setting"></i>
								</span>
								<Link href="/settings">Settings</Link>
							</li>
							<li className={styles.sub_item}>
								<span>
									<i className="uil uil-sign-out-alt"></i>
								</span>
								<Link href="/logout">Logout</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<>{children}</>
			<div
				className={`${styles.customize_theme} ${
					isThemeVisible && styles.active
				}`}
			>
				<div className={styles.card} ref={themeRef}>
					<h2>Customize your view</h2>
					<p className="text-muted">
						Manage your font size, color, and background
					</p>

					<div className={styles.color}>
						<h4>Color</h4>
						<div className={styles.choose_color}>
							<span
								className={`color-1 ${!theme?.includes('-') && styles.active}`}
								onClick={() => changeColor('default')}
							></span>
							<span
								className={`color-2 ${
									theme?.includes('yellow') && styles.active
								}`}
								onClick={() => changeColor('yellow')}
							></span>
							<span
								className={`color-3 ${theme?.includes('red') && styles.active}`}
								onClick={() => changeColor('red')}
							></span>
							<span
								className={`color-4 ${
									theme?.includes('green') && styles.active
								}`}
								onClick={() => changeColor('green')}
							></span>
							<span
								className={`color-5 ${
									theme?.includes('blue') && styles.active
								}`}
								onClick={() => changeColor('blue')}
							></span>
						</div>
					</div>

					<div className={styles.background}>
						<h4>Background</h4>
						<div className={styles.choose_bg}>
							<div
								className={`bg-1 ${theme?.includes('light') && styles.active}`}
								onClick={() => {
									changeBg('light')
								}}
							>
								<span></span>
								<h5>Light</h5>
							</div>
							<div
								className={`bg-2 ${theme?.includes('dim') && styles.active}`}
								onClick={() => {
									changeBg('dim')
								}}
							>
								<span></span>
								<h5>Dim</h5>
							</div>
							<div
								className={`bg-3 ${theme?.includes('dark') && styles.active}`}
								onClick={() => {
									changeBg('dark')
								}}
							>
								<span></span>
								<h5>Dark</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Layout
