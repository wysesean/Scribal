import React from 'react'
import User from '../models/userModel.js'
import ACTIONS from '../actions.js'

import NavBar from './components/navBar.js'
import LiveBackground from './components/liveBackground.js'
import FooterBar from './components/footerBar.js'

var HomePage = React.createClass({
	render(){
		return(
			<div className="HomePage">
				<NavBar />
				<MainText />
				<LiveBackground />
				<HomePageFoot />
				<FooterBar />
			</div>
		) 		
		
	}
})

var MainText = React.createClass({
	render() {
		return(
			<div className="MainText">
				<h1 className="flow-text">What would you like to learn?</h1>
				<a href="#categories" className="waves-effect waves-light btn">Browse free online courses</a>
			</div>
		) 
	}
})

var HomePageFoot = React.createClass({
	render() {
		return(
			<div className="HomePageFoot">
				<p className="flow-text">Join a community of people who are helping make education more accessible. Learn together as a community at Scribal. Try high quality online education brought to you by <a href="http://www.berkeley.edu/"><span className="berkeleyLink">Berkeley University.</span></a></p> 
			</div>
		) 
	}
})

export default HomePage