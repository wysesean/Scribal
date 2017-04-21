import React from 'react'
import ACTIONS from '../../actions.js'

var NavBar = React.createClass({
	handleLogin(){
		location.hash = 'login'
	},
	handleHome(){
		location.hash = 'home'
	},
	handleDashboard(){
		location.hash = 'dashboard'
	},
	handleCategories(){
		location.hash = 'categories'
	},
	handleLogout(){
		ACTIONS.logoutUser()
		location.hash = 'login'
	},
	render() {
		return(
			<div className="navbar-fixed">
				<nav className="white">
					<div className="nav-wrapper">
						<a href="#" className="brand-logo center">Scribal</a>
						<ul id="nav-mobile" className="left hide-on-med-and-down">
							<li><a href="#dashboard">Dashboard</a></li>
							<li><a href="#categories">Categories</a></li>
						</ul>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li><a href="#login">Login/Register</a></li>
						</ul>
					</div>
				</nav>
			</div>
		) 
	}
})


export default NavBar