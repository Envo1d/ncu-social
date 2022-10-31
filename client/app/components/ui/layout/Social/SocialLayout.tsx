import Link from 'next/link'
import React, { FC, PropsWithChildren, useEffect, useState } from 'react'

import styles from './SocialLayout.module.sass'

const SocialLayout: FC<PropsWithChildren> = ({ children }) => {
	const [active, setActive] = useState(1)

	useEffect(() => {}, [active])

	return (
		<>
			<div className={styles.main}>
				<div className="container">
					<div className={styles.left}>
						<Link href="/profile">
							<div className={styles.profile}>
								<div className="profile-photo">
									<img
										src="https://avatars.githubusercontent.com/u/79973093?v=4"
										alt=""
									/>
								</div>
								<div>
									<h4>User</h4>
									<p className="text-muted">@suer1</p>
								</div>
							</div>
						</Link>

						<div className={styles.side_bar}>
							<div
								className={`${styles.menu_item} ${
									active === 1 && styles.active
								}`}
								onClick={() => setActive(1)}
							>
								<span>
									<i className="uil uil-home"></i>
								</span>
								<h3>Home</h3>
							</div>
							<div
								className={`${styles.menu_item} ${
									active === 2 && styles.active
								}`}
								onClick={() => setActive(2)}
							>
								<span>
									<i className="uil uil-compass"></i>
								</span>
								<h3>Explore</h3>
							</div>
							<div
								className={`${styles.menu_item} ${
									active === 3 && styles.active
								}`}
								onClick={() => setActive(3)}
							>
								<span>
									<i className="uil uil-bell">
										<small className={styles.notification_count}>9+</small>
									</i>
								</span>
								<h3>Notifications</h3>
							</div>
							<div
								className={`${styles.menu_item} ${
									active === 4 && styles.active
								}`}
								onClick={() => setActive(4)}
							>
								<span>
									<i className="uil uil-envelope-alt">
										<small className={styles.notification_count}>3</small>
									</i>
								</span>
								<h3>Messages</h3>
							</div>
							<div
								className={`${styles.menu_item} ${
									active === 5 && styles.active
								}`}
								onClick={() => setActive(5)}
							>
								<span>
									<i className="uil uil-bookmark"></i>
								</span>
								<h3>Bookmarks</h3>
							</div>
							<div
								className={`${styles.menu_item} ${
									active === 6 && styles.active
								}`}
								onClick={() => setActive(6)}
							>
								<span>
									<i className="uil uil-shopping-bag"></i>
								</span>
								<h3>
									<Link href="/marketplace">Marketplace</Link>
								</h3>
							</div>
						</div>
					</div>
					<>{children}</>
					<div className={styles.right}>
						<div className={styles.friend_requests}>
							<h4>Requests</h4>
							<div className={styles.request}>
								<div className={styles.info}>
									<div className="profile-photo">
										<img
											src="https://i.pinimg.com/736x/14/df/bf/14dfbf0e75988b5daa3aaccddba0eb6d.jpg"
											alt=""
										/>
									</div>
									<div>
										<h5>User</h5>
										<p className="text-muted">8 mutual friends</p>
									</div>
								</div>
								<div className={styles.action}>
									<button className="btn btn-primary">Accept</button>
									<button className="btn">Decline</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SocialLayout
