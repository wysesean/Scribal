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
				<h2>LoginPage</h2>
				<FooterBar />
			</div>
		) 
	}
})

export default LoginPage