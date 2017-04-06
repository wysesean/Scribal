import React from 'react'
import NavBar from './components/navBar'
import FooterBar from './components/footerBar'

var CoursePage = React.createClass({
	render() {
		return(
			<div className="CoursePage">
				<NavBar />
				<h2>CoursePage</h2>
				<FooterBar />
			</div>
		) 
	}
})

export default CoursePage