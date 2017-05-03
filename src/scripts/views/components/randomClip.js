import React from 'react'
import ACTIONS from '../../actions.js'
import videojs from 'video.js';


const CLOUDINARY_URL = 'https://res.cloudinary.com/dd21qo4mj/video/upload'

var RandomClip = React.createClass({
	//Video with an initial undefined src needs to be loaded again
	componentDidMount() {
		this.clipVideo = videojs(this.clipVideoTag)
	},
	// destroy player on unmount
	componentWillUnmount() {
	   this.clipVideo.dispose()	 
	},
	render() {
		let clipURL = ''
		if(this.props.clip.get('lectureInfo')){
			const { lectureInfo , set1 , set2 } = this.props.clip.attributes;
			var randomNum = Math.round(Math.random())
			var randomSet = randomNum ? set2 : set1
			clipURL = `${CLOUDINARY_URL}/so_${randomSet.startingOffset},eo_${randomSet.endingOffset}/${lectureInfo.videoPublicId}.mp4`
		}
		const videoJsOptions = {
			controls: true,
			src: clipURL,
			type: 'video/mp4',
			width: 500,
			height: 500
		}
		return(
			<div className="data-vjs-player">
				<video id='clipPlayer' ref={(input)=>this.clipVideoTag = input} className="video-js vjs-default-skin vjs-big-play-centered" { ...videoJsOptions }>
								</video>
				<TranscriptionInput clip={this.props.clip} set={randomNum}/>
			</div>
		) 
	}
})

var TranscriptionInput = React.createClass({
	handleInput(e){
		if(e.key === 'Enter'){
			ACTIONS.transcribeClip(this.props.clip, this.props.set, e.target.value)
		}
	},
	render(){
		return(
			<div className="TranscriptionInput">
				<input onKeyPress={this.handleInput} type='text' placeholder='transcribe me' />
			</div>
		) 
	}
})

export default RandomClip