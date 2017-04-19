import React from 'react'
import ACTIONS from '../../actions.js'

var NavBar = React.createClass({
	handleLogin(){
		location.hash = 'login'
	},
	handleHome(){
		location.hash = 'home'
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
			<div className="NavBar">
				<h1>Scribal</h1>
				<nav>
					<button onClick={this.handleLogin} id="loginButton">Login</button>
					<button onClick={this.handleHome} id="homeButton">Home</button>
					<button onClick={this.handleCategories} id="categoriesButton">Categories</button>
					<button onClick={this.handleLogout} id="lougoutButton">Logout</button>
				</nav>
			</div>
		) 
	}
})

export default NavBar