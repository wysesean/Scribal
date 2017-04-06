import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'

var AllCoursesPage = React.createClass({
	render() {
		return(
			<div className="AllCoursesPage">
				<NavBar />
				<h2>AllCoursesPage</h2>
				<FooterBar />
			</div>
		) 
	}
})

export default AllCoursesPage