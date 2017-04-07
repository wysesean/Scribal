import React from 'react'
import ACTIONS from '../../../actions.js'

const AddCourseForm = React.createClass({
	_handleSubmit(evtObj) {
		evtObj.preventDefault()
		var formEl = evtObj.target,
			userData = {
				courseName: formEl.courseName.value,
				courseImage: formEl.courseImage.value,
				description: formEl.description.value,
				categoryInfo: this.props.categoryId
			}
		ACTIONS.addCourseToCategory(this.props.categoryId, userData)
	},

	render() {
		return (
			<form onSubmit={this._handleSubmit}>
				<input 
					type="text" 
					name="courseName"
					placeholder="enter course name"
					 />
				 <input 
				 	type="text" 
				 	name="courseImage"
				 	placeholder="enter course image"
				 	 />
				<input 
					type="text" 
					name="description" 
					placeholder="enter course description"
					/>
				<button type="submit">add course</button>
			</form>
		)
	}
})

export default AddCourseForm