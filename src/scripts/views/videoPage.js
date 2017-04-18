import React from 'react'
import videojs from 'video.js';
import $ from 'jquery'

import ACTIONS from '../actions.js'
import STORE from '../store.js'

import AddLectureForm from './components/adminComponents/addLectureForm.js'
import RandomClip from './components/randomClip.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'

var VideoPage = React.createClass({
	componentWillMount(){
		ACTIONS.fetchTranscription(this.props.lecture)
			.then(()=> {
				ACTIONS.fetchLectureById(this.props.lecture)
			}
		)
		ACTIONS.fetchRandomClip()
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
				{this.state.clipModel.get('lectureInfo')?<RandomClip clip={this.state.clipModel}/>:null}
				{this.state.transcriptionModel.get('transcriptionCollection')&&this.state.lectureCollection.models[0]?<LectureVideo video={this.state.lectureCollection.models[0]} transcription={this.state.transcriptionModel}/>:null}

				<FooterBar />
			</div>
		) 
	}
})


var LectureVideo = React.createClass({
	componentDidMount() {
		this.mainVideo = videojs(
			this.mainVideoTag,
			{},
			()=>{
				//Adds captions to the video
				var track = this.mainVideo.addTextTrack("captions", "English","en")
				let transcriptionCollection = this.props.transcription.get('transcriptionCollection')
				transcriptionCollection.forEach((el)=>{
					track.addCue(new VTTCue(
						el.startingOffset,
						el.endingOffset,
						el.transcription
					))
				})
				track.mode = "showing";
			}
		)
	},
	// destroy player on unmount
	componentWillUnmount() {
	  this.mainVideo.dispose()
	  this.mainVideo = undefined
	},
	render(){
		let videoOptions = {
				src: this.props.video.get('videoURL'),
				controls: true,
				type: 'video/mp4',
				width: 500,
				height: 500
			}
		return(
			<div className="data-vjs-player">
				<video ref={(input)=>this.mainVideoTag = input} className="video-js" {...videoOptions}>
				</video>
			</div>
		) 
	}
})

export default VideoPage