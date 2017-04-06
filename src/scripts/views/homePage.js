import React from 'react'
import NavBar from './components/navBar'
import FooterBar from './components/footerBar'

var HomePage = React.createClass({
	render() {
		return(
			<div className="HomePage">
				<NavBar />
				<h2>HomePage</h2>
				<FooterBar />
			</div>
		) 
	}
})

export default HomePage