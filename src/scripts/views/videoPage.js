import React from 'react'
import {Video} from 'cloudinary-react'

import ACTIONS from '../actions.js'
import STORE from '../store.js'

import AddLectureForm from './components/adminComponents/addLectureForm.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'


// <Video cloud_name='dd21qo4mj' publicId='oceans_ef0epk' controls='controls'></Video>
const CLOUDINARY_URL = 'https://res.cloudinary.com/dd21qo4mj/video/upload'

var VideoPage = React.createClass({
	componentWillMount(){
		ACTIONS.fetchRandomClip()
		ACTIONS.fetchLectureById(this.props.lecture)
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	componentWillUnmount(){
		STORE.reset()
		STORE.off('dataUpdated')
	},
	getInitialState(){
		return STORE.data
	},
	render() {
		return(
			<div className="VideoPage">
				<NavBar />
				<h2>Video Page</h2>
				{this.state.clipModel?<RandomClip clip={this.state.clipModel}/>:null}
				<ElementList list={this.state.lectureCollection} />
				<FooterBar />
			</div>
		) 
	}
})

var RandomClip = React.createClass({
	render: function() {

		// console.log(`${CLOUDINARY_URL}/so_${this.props.clip.attributes.startingOffset},eo_${this.props.clip.attributes.endingOffset}/${this.props.clip.attributes.lectureInfo.videoPublicId}.mp4`)
		// console.log(this.props.clip)
		// if(this.props.clip.attributes.lectureInfo !== undefined){

			if(this.props.clip&&
				this.props.clip.attributes&&
				this.props.clip.attributes.lectureInfo){
				var clipURL = `
					${CLOUDINARY_URL}
					/so_
					${this.props.clip.attributes.startingOffset}
					,eo_
					${this.props.clip.attributes.endingOffset}
					/
					${this.props.clip.attributes.lectureInfo.videoPublicId}
					.mp4`
			}
			else{
				var clipURL = ''
			}
		// }
		// else{
		// 	var clipURL = ''
		// }
		return(
			<div className="RandomClip">
				<video width="500" height="500" controls>
				  	<source src=clipUrl type="video/mp4" />
					Your browser does not support the video.
				</video>
			</div>
		) 
	}
})

var ElementList = React.createClass({
	mapListItem(singleObj){
		return(
			<ListItem key={singleObj.cid} listItemInfo={singleObj}/>
		)
	},
	render() {
		return(
			<div className="ElementList">
				{this.props.list.map(this.mapListItem)}
			</div>
		) 
	}
})

var ListItem = React.createClass({
	handleButton(videoId){
		location.hash = `video/${videoId}`
	},
	render(){
		return(
			<div className="ListItem">
				<video width="500" height="500" controls>
				  	<source src={this.props.listItemInfo.attributes.videoURL} type="video/mp4" />
					Your browser does not support the video.
				</video>
				<p>Lecture Name: {this.props.listItemInfo.attributes.lectureTitle}</p>
				<p>Description: {this.props.listItemInfo.attributes.description}</p>
				<br />
			</div>
		) 
	}
})

export default VideoPage