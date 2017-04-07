import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'

var LoginPage = React.createClass({
	render() {
		return(
			<div className="LoginPage">
				<NavBar />
				<h2>Register</h2>
				<RegisterForm />
				<h2>Login</h2>
				<LoginForm />
				<FooterBar />
			</div>
		) 
	}
})

const RegisterForm = React.createClass({
	_handleSubmit: function(evtObj) {
		evtObj.preventDefault()
		var formEl = evtObj.target,
			userData = {
				name: formEl.yourName.value,
				email: formEl.email.value,
				password: formEl.password.value
			}
		ACTIONS.registerUser(userData)
	},

	render: function() {
		return (
			<form onSubmit={this._handleSubmit}>
					<input 
						type="text" 
						name="yourName"
						placeholder="enter your name"
						 />
					 <input 
					 	type="text" 
					 	name="email"
					 	placeholder="enter your email"
					 	 />
					<input 
						type="password" 
						name="password" 
						placeholder="enter your password"
						/>
				<button type="submit">register</button>
			</form>
			)
	}
})


const LoginForm = React.createClass({
	_handleSubmit: function(evtObj) {
		evtObj.preventDefault()
		ACTIONS.loginUser(evtObj.target.email.value, evtObj.target.password.value)
	},

	render: function() {
		return (
			<form onSubmit={this._handleSubmit}>
					 <input 
					 	type="text" 
					 	name="email"
					 	placeholder="enter your email"
					 	 />
					<input 
						type="password" 
						name="password" 
						placeholder="enter your password"
						/>
				<button type="submit">login</button>
			</form>
			)
	}
})

export default LoginPage