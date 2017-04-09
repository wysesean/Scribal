import React from 'react'
import ACTIONS from '../../../actions.js'
import $ from 'jquery'
import Dropzone from 'react-dropzone'
import request from 'superagent'
//------------------
//SCHEMA FOR VIDEO
//------------------
// referenceURL: {type: String, required: true},
// videoLength: {type: Number, required: true},
// courseIndex: {type: Number, required: true},
// description: {type: String},
// views: {type:Number, default: 0},

const CLOUDINARY_UPLOAD_PRESET = 'sjgfpzzo'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dd21qo4mj/upload'

const AddVideoForm = React.createClass({
	getInitialState(){
		return{
			uploadedFileURL: ''
		}
	},
	onVideoDrop(files){
		console.log('input accepted')
		this.setState({
			loadingGif: true,
			uploadedFile: files[0]
		})
		ACTIONS.uploadVideo(files[0])
			.end((err, response)=>{
				if(err){
					console.log('error uploading',err)
					this.setState({
						loadingGif:false
					})
				}
				if(response.body.secure_url !== ''){
					console.log('video uploaded')
					this.setState({
						loadingGif:false
					})
				}
			})
	},

	render() {
		return (
			<div className='AddVideoForm'>
				<Dropzone
					multiple={false}
					accept='video/*'
					onDrop={this.onVideoDrop}>
					<p>Drop an image or click to select a file to upload.</p>
				
				</Dropzone>
			</div>
		)
	}
})

export default AddVideoForm