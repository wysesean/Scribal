import React from 'react'
import User from '../models/userModel.js'

import NavBar from './components/navBar.js'
import LiveBackground from './components/liveBackground.js'
import FooterBar from './components/footerBar.js'

var DashboardPage = React.createClass({
	render(){
		return(
			<div className="DashboardPage">
				<NavBar />
				<LiveBackground />
				<FooterBar />
			</div>
		) 		
		
	}
})

export default DashboardPage