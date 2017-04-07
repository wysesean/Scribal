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
				<AddCategoryForm />
				<FooterBar />
			</div>
		) 
	}
})

const AddCategoryForm = React.createClass({
	_handleSubmit: function(evtObj) {
		evtObj.preventDefault()
		var formEl = evtObj.target,
			userData = {
				categoryName: formEl.categoryName.value,
				categoryImage: formEl.categoryImage.value,
				description: formEl.description.value
			}
		ACTIONS.addCategory(userData)
	},

	render: function() {
		return (
			<form onSubmit={this._handleSubmit} className='form-group register-form' >
					<input 
						type="text" 
						name="categoryName"
						placeholder="enter category name"
						 />
					 <input 
					 	type="text" 
					 	name="categoryImage"
					 	placeholder="enter category image"
					 	 />
					<input 
						type="text" 
						name="description" 
						placeholder="enter category description"
						/>
				<button type="submit">add category</button>
			</form>
			)
	}
})

export default CategoriesPage