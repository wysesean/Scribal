import React from 'react'
import videojs from 'video.js';
import $ from 'jquery'

import ACTIONS from '../actions.js'
import STORE from '../store.js'

import AddLectureForm from './components/adminComponents/addLectureForm.js'
import RandomClip from './components/randomClip.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'

// <Video cloud_name='dd21qo4mj' publicId='oceans_ef0epk' controls='controls'></Video>

var VideoPage = React.createClass({
	componentWillMount(){
		$.when(
			ACTIONS.fetchTranscription(this.props.lecture)
		)
		.then(
			ACTIONS.fetchLectureById(this.props.lecture)
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
				{this.state.clipModel?<RandomClip clip={this.state.clipModel}/>:null}
				{this.state.lectureCollection?<LectureVideo video={this.state.lectureCollection.models[0]} transcription={this.state.transcriptionModel}/>:null}
				<FooterBar />
			</div>
		) 
	}
})

var LectureVideo = React.createClass({
	// Video with an initial undefined src needs to be loaded again
	componentWillReceiveProps() {
		if(this.mainVideoTag){
			if(this.props.transcription.get('transcriptionCollection')){
				var player = videojs('player')
				//removes tracks created on re-render
				if(player.textTracks().tracks_.length>1){
					for(let i=0; i<=player.textTracks().tracks_.length;i++){
						array.splice(0, 1);
					}
				}
				var track = player.addTextTrack("captions", "English","en")
				let transcriptionCollection = this.props.transcription.get('transcriptionCollection')
				transcriptionCollection.forEach((el)=>{
					console.log('adding cue', el.transcription)
					track.addCue(new VTTCue(
						el.startingOffset,
						el.endingOffset,
						el.transcription
					))
				})
			track.mode = "showing";

			}
		}

	},
	// destroy player on unmount
	componentWillUnmount() {
	  if (this.mainVideoTag) {
	    this.mainVideoTag.dispose()
	  }
	},
	render(){
		let srcURL = ''
		if(this.props.video){
			srcURL = this.props.video.get('videoURL')
		}
		const videoJsOptions = {
			controls: true,
			src: srcURL,
			type: 'video/mp4',
			width: 500,
			height: 500
		}
		return(
			<div className="data-vjs-player">
				<video id='player' ref={(input)=>this.mainVideoTag = input} className="video-js" { ...videoJsOptions }>
				</video>
			</div>
		) 
	}
})

export default VideoPage