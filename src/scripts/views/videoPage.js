import React from 'react'

import ACTIONS from '../actions.js'
import STORE from '../store.js'

import AddLectureForm from './components/adminComponents/addLectureForm.js'
import RandomClip from './components/randomClip.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'

// <Video cloud_name='dd21qo4mj' publicId='oceans_ef0epk' controls='controls'></Video>

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
				{this.state.lectureCollection?<LectureVideo video={this.state.lectureCollection.models[0]}/>:null}
				<FooterBar />
			</div>
		) 
	}
})

var LectureVideo = React.createClass({
	//Video with an initial undefined src needs to be loaded again
	componentWillReceiveProps() {
		if(this.videoTag){
			this.videoTag.load()
			var startTime, endTime, message;
		    var newTextTrack = this.videoTag.addTextTrack("captions", "sample");
		    // newTextTrack.mode = newTextTrack.SHOWING; // set track to display
		   // create some cues and add them to the new track 
			for (var i = 0; i < 30; i++) {
		    	startTime = i * 5;
		    	endTime = ((i * 5) + 5);
		    	message = "This is number " + i;
		    	newTextTrack.addCue(new TextTrackCue(startTime, endTime, message));
		    }
		    this.videoTag.play()
		}
	},
	render(){
		let srcURL = ''
		if(this.props.video){
			srcURL = this.props.video.get('videoURL')
		}
		return(
			<div className="LectureVideo">
				<video ref={(input)=>this.videoTag = input} width="500" height="500" controls>
				  	<source src={srcURL} type="video/mp4" />
					Your browser does not support the video.
				</video>
			</div>
		) 
	}
})

export default VideoPage