const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<div style={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
			<h2>Welcome to OpenWiki</h2>
			<h4>Check out the index, or sign up to add to the knowledge base!</h4>
		</div>
	)
}

export default Home
