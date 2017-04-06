import React from 'react'
import NavBar from './components/navBar'
import FooterBar from './components/footerBar'

var AboutPage = React.createClass({
	render() {
		return(
			<div className="AboutPage">
				<NavBar />
				<h2>About Page</h2>
				<FooterBar />
			</div>
		) 
	}
})

export default AboutPage