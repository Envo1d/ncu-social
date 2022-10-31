import React, { FC } from 'react'

import styles from './Home.module.sass'

const Home: FC = () => {
	return (
		<>
			<div className={styles.middle}>
				<div className={styles.stories}>
					<div className={styles.story}>
						<div className="profile-photo">
							<img
								src="https://ireland.apollo.olxcdn.com/v1/files/b7aic1e76e341-UA/image"
								alt=""
							/>
						</div>
						<p className={styles.name}>User</p>
					</div>
					<div className={styles.story}>
						<div className="profile-photo">
							<img
								src="https://i.pinimg.com/originals/03/e4/ae/03e4ae5b2dbbc9f0aa47d9afbe15bd81.jpg"
								alt=""
							/>
						</div>
						<p className={styles.name}>User</p>
					</div>
					<div className={styles.story}>
						<div className="profile-photo">
							<img
								src="https://damion.club/uploads/posts/2022-09/1663235119_1-damion-club-p-risunok-na-avatarku-dlya-muzhchin-risunki-1.jpg"
								alt=""
							/>
						</div>
						<p className={styles.name}>User</p>
					</div>
					<div className={styles.story}>
						<div className="profile-photo">
							<img
								src="https://www.meme-arsenal.com/memes/3cee5d3d1dfc90a89c0092e2b656c16f.jpg"
								alt=""
							/>
						</div>
						<p className={styles.name}>User</p>
					</div>
					<div className={styles.story}>
						<div className="profile-photo">
							<img
								src="https://avatars.githubusercontent.com/u/79973093?v=4"
								alt=""
							/>
						</div>
						<p className={styles.name}>User</p>
					</div>
					<div className={styles.story}>
						<div className="profile-photo">
							<img
								src="https://yt3.ggpht.com/nwyG0ql8sxARogaFb3sgpjoNd86v7hL9W2eeEysP2LryigBtYtX-J2Mw9H1lpcB9D4sw0aCx9w=s48-c-k-c0x00ffffff-no-rj"
								alt=""
							/>
						</div>
						<p className={styles.name}>User</p>
					</div>
				</div>

				<form className={styles.create_post}>
					<div className="profile-photo">
						<img
							src="https://avatars.githubusercontent.com/u/79973093?v=4"
							alt=""
						/>
					</div>
					<input
						type="text"
						placeholder="What's on your mind?"
						id="create-post"
					/>
					<input type="submit" value="Post" className="btn btn-primary" />
				</form>

				<div className={styles.feeds}>
					<div className={styles.feed}>
						<div className={styles.head}>
							<div className={styles.user}>
								<div className="profile-photo">
									<img
										src="https://yt3.ggpht.com/nwyG0ql8sxARogaFb3sgpjoNd86v7hL9W2eeEysP2LryigBtYtX-J2Mw9H1lpcB9D4sw0aCx9w=s48-c-k-c0x00ffffff-no-rj"
										alt=""
									/>
								</div>
								<div className={styles.info}>
									<h3>User</h3>
									<small>C, 15 MINUTES AGO</small>
								</div>
							</div>
							<span className={styles.edit}>
								<i className="uil uil-ellipsis-h"></i>
							</span>
						</div>
						<div className={styles.content}>
							<img
								src="https://img.freepik.com/free-vector/neon-lights-background-theme_52683-44625.jpg?w=2000"
								alt=""
							/>
						</div>

						<div className={styles.action_buttons}>
							<div className={styles.interaction_buttons}>
								<span>
									<i className="uil uil-heart"></i>
								</span>
								<span>
									<i className="uil uil-comment-dots"></i>
								</span>
								<span>
									<i className="uil uil-share-alt"></i>
								</span>
							</div>
							<div className={styles.bookmark}>
								<span>
									<i className="uil uil-bookmark-full"></i>
								</span>
							</div>
						</div>

						<div className={styles.liked_by}>
							<span>
								<img
									src="https://avatars.githubusercontent.com/u/79973093?v=4"
									alt=""
								/>
							</span>
							<span>
								<img
									src="https://yt3.ggpht.com/nwyG0ql8sxARogaFb3sgpjoNd86v7hL9W2eeEysP2LryigBtYtX-J2Mw9H1lpcB9D4sw0aCx9w=s48-c-k-c0x00ffffff-no-rj"
									alt=""
								/>
							</span>
							<span>
								<img
									src="https://damion.club/uploads/posts/2022-09/1663235119_1-damion-club-p-risunok-na-avatarku-dlya-muzhchin-risunki-1.jpg"
									alt=""
								/>
							</span>
							<p>
								Liked by <b>User</b> and <b>2,323 others</b>
							</p>
						</div>

						<div className={styles.caption}>
							<p>
								<b>Name</b> Lorem ipsum dolor sit amet consectetur adipisicing
								elit. Atque, autem.
								<span>#lifestyle</span>
							</p>
						</div>

						<div className={`${styles.comments} text-muted`}>
							View all 300 comments
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
