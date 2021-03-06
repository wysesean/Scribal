import React from 'react'
import User from '../models/userModel.js'

import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'
import UserDashboard from './components/userDashboard.js'

var DashboardPage = React.createClass({
	render(){
		return(
			<div className="DashboardPage">
				<NavBar />
				<h2>DashboardPage</h2>
				{User.getCurrentUser()?<h2>Current user = {User.getCurrentUser().get('email')}</h2>:<div />}
				{User.getCurrentUser()?<UserDashboard />:<div />}
				<FooterBar />
			</div>
		) 		
		
	}
})

export default DashboardPage