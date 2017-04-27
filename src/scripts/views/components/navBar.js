import React from 'react'
import ACTIONS from '../../actions.js'
import User from '../../models/userModel.js'

var NavBar = React.createClass({
	componentDidMount(){
		//Initializes materialize button collapse
		if(this.buttonCollapse){
			$(".dropdown-button").dropdown({
		      inDuration: 300,
		      outDuration: 225,
		      belowOrigin: true, // Displays dropdown below the button
		    })
		}
	},
	handleLogout(){
		ACTIONS.logoutUser()
		location.hash = 'login'
	},
	//Renders login or logour button on desktop view 
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
	//Renders login or logout button on mobile view
	dropDownLogin(){
		if(location.hash!=="#login"){
			return User.getCurrentUser()?
				<li><a onClick={this.handleLogout} className="wave-effect">Logout</a></li>:
				<li><a href="#login" className="wave-effect">Login</a></li>
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
						<a className="dropdown-button hide-on-large-only" ref={(input)=>this.buttonCollapse = input} data-activates="dropdown1"><i className="material-icons left">menu</i></a>
						<a href="#" className="brand-logo center">Scribal</a>

						<ul id="nav-mobile" className="left hide-on-med-and-down">
							<li><a href="#categories">Categories</a></li>
						</ul>
						<ul className="right hide-on-med-and-down">
							{User.getCurrentUser()?<li><a href="#dashboard">Profile</a></li>:<div />}
							{this.loginConditions()}	
						</ul>
						<ul id="dropdown1" className="left hide-on-large-only dropdown-content">
							{User.getCurrentUser()?<li><a href="#dashboard">Profile</a></li>:<div />}
							<li className="divider"></li>
							<li><a href="#categories">Categories</a></li>
							<li className="divider"></li>
							{this.dropDownLogin()}	
						</ul>
					</div>
				</nav>
			</div>
		) 
	}
})


export default NavBar