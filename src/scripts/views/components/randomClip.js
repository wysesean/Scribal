import React from 'react'
import ACTIONS from '../../actions.js'

const CLOUDINARY_URL = 'https://res.cloudinary.com/dd21qo4mj/video/upload'

var RandomClip = React.createClass({
	componentWillReceiveProps() {
		if (this.videoTag) {
			this.videoTag.load()
		}
	},
	render() {
		let clipURL = ''
		if(this.props.clip.get('lectureInfo')){
			const { lectureInfo , set1 , set2 } = this.props.clip.attributes;
			var randomNum = Math.round(Math.random())
			var randomSet = randomNum ? set2 : set1
			clipURL = `${CLOUDINARY_URL}/so_${randomSet.startingOffset},eo_${randomSet.endingOffset}/${lectureInfo.videoPublicId}.mp4`
		}
		return(
			<div className="RandomClip">
				<video ref={(input)=>this.videoTag = input} width="500" height="500" controls>
				  	<source id="rando" src={clipURL} type="video/mp4" />
					Your browser does not support the video.
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