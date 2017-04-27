import React from 'react'
import ACTIONS from '../../../actions.js'

const AddCategoryForm = React.createClass({
	_handleSubmit(evtObj) {
		evtObj.preventDefault()
		var formEl = evtObj.target,
			userData = {
				categoryName: formEl.categoryName.value,
				categoryImage: formEl.categoryImage.value,
				description: formEl.description.value,
				colorScheme: formEl.colorScheme.value
			}
		ACTIONS.addCategory(userData)
	},

	render() {
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
				<input
					type="text"
					name="colorScheme"
					placeholder="enter color scheme rgb() format"
					/>
				<button type="submit">add category</button>
			</form>
			)
	}
})

export default AddCategoryForm