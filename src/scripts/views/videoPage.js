import React from 'react'
import videojs from 'video.js'
import $ from 'jquery'
import ReactModal from 'react-modal'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

import AddLectureForm from './components/adminComponents/addLectureForm.js'
import RandomClip from './components/randomClip.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'

var VideoPage = React.createClass({
	getInitialState(){
		return STORE.data
	},
	componentWillMount(){
		
		// if(User.getCurrentUser()){
		// 	ACTIONS.userWatchedLecture(User.getCurrentUser().get('_id'),this.props.lecture)
		// }
		ACTIONS.fetchRandomClip()
			.then(()=>{
				ACTIONS.fetchTranscription(this.props.lecture)
					.then(()=> {
						ACTIONS.fetchLectureById(this.props.lecture)
					}
				)
			})
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	componentWillUnmount(){
		STORE.reset()
		STORE.off('dataUpdated')
	},
	handleCloseModal(){
		this.setState({
			modalShowing: false
		})
	},
	render() {
		return(
			<div className="VideoPage">
				<ReactModal 
					isOpen={this.state.modalShowing} 
					shouldCloseOnOverlayClick={false}
					contentLabel="randomModal Modal"
					parentSelector={() => document.body}
					style={{
					     overlay: {
					       backgroundColor: 'papayawhip'
					     },
					   }}
				>
					<center>
						{this.state.clipModel.get('lectureInfo')?<RandomClip clip={this.state.clipModel}/>:<div />}
					</center>
				</ReactModal>
				<NavBar />	
				<center>
					{this.state.transcriptionModel.get('transcriptionCollection')&&this.state.lectureCollection.models[0]?<LectureVideo video={this.state.lectureCollection.models[0]} transcription={this.state.transcriptionModel}/>:<div />}
				</center>
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
				let confidence = Math.floor(this.props.transcription.get('confidence') * 100)
				let completion = Math.floor(this.props.transcription.get('completion') * 100)
				//initialize track
				let track = this.mainVideo.addTextTrack("captions", `English Completion_${completion}%  Confidence_${confidence}%`,"en")
				let transcriptionCollection = this.props.transcription.get('transcriptionCollection')
				//Add captions with time stamps
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
				<video 
					ref={(input)=>this.mainVideoTag = input}
					data-setup={{fluid: true}}
 					className="video-js vjs-default-skin vjs-big-play-centered" 
 					{...videoOptions}>
				</video>
			</div>
		) 
	}
})

export default VideoPage