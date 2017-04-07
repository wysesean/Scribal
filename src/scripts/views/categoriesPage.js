import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'


import AddCategoryForm from './components/adminComponents/addCategoryForm.js'
import ElementList from './components/elementList.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'

var CategoriesPage = React.createClass({
	componentWillMount(){
		ACTIONS.fetchCategories()
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	componentWillUnmount(){
		STORE.off('dataUpdated')
	},
	getInitialState(){
		return STORE.data
	},
	render() {
		return(
			<div className="CategoriesPage">
				<NavBar />
				<h2>CategoriesPage</h2>
				<ElementList list={this.state.categoryCollection} />
				<AddCategoryForm />
				<FooterBar />
			</div>
		) 
	}
})

export default CategoriesPage