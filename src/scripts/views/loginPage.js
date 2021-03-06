import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

import NavBar from './components/navBar.js'
import LiveBackground from './components/liveBackground.js'

var LoginPage = React.createClass({
	render() {
		return(
			<div className="LoginPage">
				<NavBar />
				<LiveBackground colorScheme={"rgb(255,240,210)"}/>
				<LoginForm />
			</div>
		) 
	}
})

var LoginForm = React.createClass({
	getInitialState(){
		return{
			loginShowing: true
		}
	},
	componentDidMount(){
		if(this.tabs){
			$(this.tabs).tabs();
		}
	},
	toggleRegister(){
		this.setState({
			loginShowing: false
		})
	},
	toggleLogin(){
		this.setState({
			loginShowing: true
		})
		
	},
	render: function() {
		return(
			<div className="login-container">
				<ul ref={(input)=>this.tabs = input} className="tabs tabs-fixed-width">
					<li className="tab col s6" onClick={this.toggleLogin}><a className="black-text">login</a></li>
					<li className="tab col s6" onClick={this.toggleRegister}><a className="black-text">register</a></li>
				</ul>
				{this.state.loginShowing?<LoginComponent />:<RegisterComponent />}
			</div>
		) 
	}
})

var LoginComponent = React.createClass({
	_handleSubmit(evtObj) {
		evtObj.preventDefault()
		ACTIONS.loginUser(evtObj.target.email.value, evtObj.target.password.value)
	},
	render: function() {
		return(
			<div id="login" className="col s12">
				<form className="col s12" onSubmit={this._handleSubmit}>
					<div className="form-container">
						<h3 className="yellowText">Hello</h3>
						<div className="row">
							<div className="input-field col s12">
								<input id="email" type="email" className="validate" />
								<label htmlFor="email">Email</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="password" type="password" className="validate" />
								<label htmlFor="password">Password</label>
							</div>
						</div>
						<br />
						<center>
							<button className="btn waves-effect waves-light" type="submit">Connect</button>
							<br />
							<br />
						</center>
					</div>
				</form>
			</div>
		) 
	}
})

var RegisterComponent = React.createClass({
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
		return(
			<div id="register" className="col s12">
				<form className="col s12" onSubmit={this._handleSubmit}>
					<div className="form-container">
						<h3 className="yellowText">Welcome</h3>
						<div className="row">
							<div className="input-field col s12">
								<input name="yourName" id="name" type="text" />
								<label htmlFor="name">Name</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input name="email" id="email" type="email" className="validate" />
								<label htmlFor="email">Email</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input name="password" id="password" type="password" className="validate" />
								<label htmlFor="password">Password</label>
							</div>
						</div>
						<center>
							<button className="btn waves-effect waves-light" type="submit">Submit</button>
						</center>
					</div>
				</form>
			</div>
		) 
	}
})

// const RegisterForm = React.createClass({
// 	_handleSubmit: function(evtObj) {
// 		evtObj.preventDefault()
// 		var formEl = evtObj.target,
// 			userData = {
// 				name: formEl.yourName.value,
// 				email: formEl.email.value,
// 				password: formEl.password.value
// 			}
// 		ACTIONS.registerUser(userData)
// 	},

// 	render: function() {
// 		return (
// 			<form onSubmit={this._handleSubmit}>
// 					<input 
// 						type="text" 
// 						name="yourName"
// 						placeholder="enter your name"
// 						 />
// 					 <input 
// 					 	type="text" 
// 					 	name="email"
// 					 	placeholder="enter your email"
// 					 	 />
// 					<input 
// 						type="password" 
// 						name="password" 
// 						placeholder="enter your password"
// 						/>
// 				<button type="submit">register</button>
// 			</form>
// 			)
// 	}
// })


// const LoginForm = React.createClass({
// 	_handleSubmit: function(evtObj) {
// 		evtObj.preventDefault()
// 		ACTIONS.loginUser(evtObj.target.email.value, evtObj.target.password.value)
// 	},

// 	render: function() {
// 		return (
// 			<form onSubmit={this._handleSubmit}>
// 					 <input 
// 					 	type="text" 
// 					 	name="email"
// 					 	placeholder="enter your email"
// 					 	 />
// 					<input 
// 						type="password" 
// 						name="password" 
// 						placeholder="enter your password"
// 						/>
// 				<button type="submit">login</button>
// 			</form>
// 			)
// 	}
// })

export default LoginPage