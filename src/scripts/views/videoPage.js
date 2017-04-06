import React from 'react'
import NavBar from './components/navBar'
import FooterBar from './components/footerBar'

var VideoPage = React.createClass({
	render() {
		return(
			<div className="VideoPage">
				<NavBar />
				<h2>VideoPage</h2>
				<FooterBar />
			</div>
		) 
	}
})

export default VideoPage