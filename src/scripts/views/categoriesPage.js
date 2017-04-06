import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'

var CategoriesPage = React.createClass({
	componentWillMount(){
		console.log('no problem here')
	},
	render() {
		return(
			<div className="CategoriesPage">
				<NavBar />
				<h2>CategoriesPage</h2>
				<FooterBar />
			</div>
		) 
	}
})

export default CategoriesPage