import React from 'react'
import NavBar from './components/navBar'
import FooterBar from './components/footerBar'

var ErrorPage = React.createClass({
	render() {
		return(
			<div className="ErrorPage">
				<NavBar />
				<h2>ErrorPage</h2>
				<FooterBar />
			</div>
		) 
	}
})

export default ErrorPage