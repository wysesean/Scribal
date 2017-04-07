import React from 'react'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'

import User from '../models/userModel.js'

var HomePage = React.createClass({
	render(){
		return(
			<div className="HomePage">
				<NavBar />
				<h2>HomePage</h2>
				{User.getCurrentUser()?<h2>Current user = {User.getCurrentUser().attributes.email}</h2>:""}
				<FooterBar />
			</div>
		) 		
		
	}
})

export default HomePage