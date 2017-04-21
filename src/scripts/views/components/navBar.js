import React from 'react'
import ACTIONS from '../../actions.js'
import User from '../../models/userModel.js'

var NavBar = React.createClass({
	handleLogout(){
		ACTIONS.logoutUser()
		location.hash = 'login'
	},
	loginConditions(){
		if(location.hash!=="#login"){
			return User.getCurrentUser()?
				<li><a onClick={this.handleLogout} className="wave-effect btn">Logout</a></li>:
				<li><a href="#login" className="wave-effect btn">Login</a></li>
		}
		else{
			return <div />
		}
					
	},
	render() {
		return(
			<div className="navbar-fixed">
				<nav className="white">
					<div className="nav-wrapper">
						<a href="#" className="brand-logo center">Scribal</a>
						<ul id="nav-mobile" className="left hide-on-med-and-down">
							<li><a href="#categories">Categories</a></li>
							{User.getCurrentUser()?<li><a href="#dashboard">Dashboard</a></li>:<div />}
						</ul>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
						{this.loginConditions()}	
						</ul>
					</div>
				</nav>
			</div>
		) 
	}
})


export default NavBar