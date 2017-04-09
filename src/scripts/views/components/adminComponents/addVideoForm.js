import React from 'react'
import ACTIONS from '../../../actions.js'
import $ from 'jquery'

//------------------
//SCHEMA FOR VIDEO
//------------------
// referenceURL: {type: String, required: true},
// videoLength: {type: Number, required: true},
// courseIndex: {type: Number, required: true},
// description: {type: String},
// views: {type:Number, default: 0},

const AddVideoForm = React.createClass({
	_handleSubmit(evtObj) {
		evtObj.preventDefault()
		var formEl = evtObj.target,
			userData = {

			}
		ACTIONS.addVideoToCourse(this.props.course, userData)
	},

	render() {
		return (
			<form onSubmit={this._handleSubmit}>
				<input 
					type="file" 
					name="video"
					placeholder="browse video"
					 />
				<button type="submit">add Video</button>
			</form>
		)
	}
})

export default AddVideoForm