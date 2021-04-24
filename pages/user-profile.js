import { Fragment } from 'react'

const UserProfilePage = ({ username }) => {
	return (
		<Fragment>
			<h1>{username}</h1>
		</Fragment>
	)
}

export default UserProfilePage

export async function getServerSideProps(context) {
	const { params, req, res } = context


	return {
		props: {
			username: 'max',
		},
	}
}
