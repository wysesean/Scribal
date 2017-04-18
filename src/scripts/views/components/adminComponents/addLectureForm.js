import React from 'react'
import ACTIONS from '../../../actions.js'
import $ from 'jquery'
import request from 'superagent'

import LoadingIcon from '../loadingIcon.js'
//------------------
//SCHEMA FOR LECTURE
//------------------
// lectureTitle: {type:String, required: true},
// videoURL: {type: String, required: true},
// thumbnailURL: {type:String, required: true},
// videoLength: {type: Number, required: true},
// courseIndex: {type: Number, required: true},
// description: {type: String},

// courseInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},

// const CLOUDINARY_UPLOAD_PRESET = 'sjgfpzzo'
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dd21qo4mj/upload'

const AddVideoForm = React.createClass({
	getInitialState(){
		return{
			loadingGif: false
		}
	},
	handleSubmit(evtObj){
		evtObj.preventDefault()
		this.setState({
			loadingGif:true
		})
		console.log('input accepted')
		var formEl = evtObj.target,
			formData = {
				lectureName: formEl.lectureTitle.value,
				lectureImage: formEl.courseIndex.value,
				description: formEl.description.value
			}
		ACTIONS.uploadLecture(formEl.fileUpload.files[0])
			.end((err, response)=>{
				this.setState({
					loadingGif:false
				})
				if(err){
					console.log('error uploading',err)

				}
				if(response.body.secure_url !== ''){
					console.log('video uploaded')
					var lectureObj = {
						lectureTitle: formEl.lectureTitle.value,
						videoURL: response.body.secure_url,
						thumbnailURL: `https://res.cloudinary.com/dd21qo4mj/video/upload/h_200/${response.body.public_id}.jpg`,
						videoPublicId: response.body.public_id,
						videoLength: response.body.duration,
						courseIndex: formEl.courseIndex.value,
						description: formEl.description.value,
						courseInfo: this.props.courseId
					}
					ACTIONS.addLectureToCourse(this.props.courseId,lectureObj)
				}
			})
	},
	render() {
		return (
			<div className='AddVideoForm'>
				{this.state.loadingGif?<LoadingIcon />:''}
				<form onSubmit={this.handleSubmit}>
					<input type='text' name='lectureTitle' placeholder='enter lecture title' required/>
					<input type='text' name='courseIndex' placeholder='enter index' />
					<input type='text' name='description' placeholder='enter description' required/>
					<input type='file' name='fileUpload' required/>
					<button type='submit'>Submit Lecture</button>
				</form>
			</div>
		)
	}
})

export default AddVideoForm