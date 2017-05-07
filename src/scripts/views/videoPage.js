import React from 'react'
import videojs from 'video.js'
import $ from 'jquery'
import ReactModal from 'react-modal'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import $$ from 'jquery'

import AddLectureForm from './components/adminComponents/addLectureForm.js'
import RandomClip from './components/randomClip.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'




var VideoPage = React.createClass({
	getInitialState(){
		return STORE.data
	},
	componentWillMount(){
		if(User.getCurrentUser()){	
			ACTIONS.userWatchedLecture(User.getCurrentUser().get('_id'),this.props.lecture)
		}
		ACTIONS.fetchRandomClip()
			.then(()=>{
				ACTIONS.fetchTranscription(this.props.lecture)
					.then(()=> {
						ACTIONS.fetchLectureById(this.props.lecture)
							.then(()=>{
								ACTIONS.fetchLectureByCourse(this.props.course)
							})
					}
				)
			})

		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	componentWillReceiveProps(nextProps){
		STORE.set({modalShowing:true})
		ACTIONS.fetchRandomClip()
			.then(()=>{
				ACTIONS.fetchTranscription(nextProps.lecture)
					.then(()=> {
						ACTIONS.fetchLectureById(nextProps.lecture)
							.then(()=>{
								ACTIONS.fetchLectureByCourse(nextProps.course)
							})
					}
				)
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
					className="Modal"
					overlayClassName="Overlay"
				>
					<center>
						{this.state.clipModel.get('lectureInfo')?<RandomClip clip={this.state.clipModel}/>:<div />}
					</center>
				</ReactModal>
				<NavBar />
				<div className="row video-row">
					<div className="col s3">
						<ElementList categoryName={this.props.category} courseName={this.props.course} list={this.state.lectureCollection} />
					</div>
					<div className="col s9">
						<center>
							{this.state.transcriptionModel.get('transcriptionCollection')&&this.state.lecturePlaying?<LectureVideo videoURL={this.state.lecturePlaying} transcription={this.state.transcriptionModel}/>:<div />}
						</center>
					</div>
				</div>
				<FooterBar />
			</div>
		) 
	}
})


var LectureVideo = React.createClass({
	componentDidMount() {
		this.mainVideo = videojs(
			this.mainVideoTag,
			{
				html5:{
					nativeTextTracks: false //thank you windows machines for causing head aches
				}
			},
			()=>{
				//Sets the confidence and completion for cc button on videojs
				let confidence = Math.floor(this.props.transcription.get('confidence') * 100)
				let completion = Math.floor(this.props.transcription.get('completion') * 100)
				//initialize track
				let track = this.mainVideo.addTextTrack("captions", `English Completion_${completion}%  Confidence_${confidence}%`,"en")
				let transcriptionCollection = this.props.transcription.get('transcriptionCollection')
				//Add captions with time stamps
				transcriptionCollection.forEach((el)=>{
					if(el.transcription){
						track.addCue(new VTTCue(
							el.startingOffset,
							el.endingOffset,
							el.transcription
						))
					}
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
				src: this.props.videoURL,
				controls: true,
				type: 'video/mp4'
			}
		return(
			<div className="video-wrapper">
				<div className="video-content">
					<video 
						ref={(input)=>this.mainVideoTag = input}
	 					className="video-js vjs-fluid vjs-default-skin vjs-big-play-centered" 
	 					{...videoOptions}>
					</video>
				</div>
			</div>
		) 
	}
})
var ElementList = React.createClass({
	mapListItem(singleObj){
		return(
			<ListItem categoryName={this.props.categoryName} courseName={this.props.courseName} key={singleObj.cid} listItemInfo={singleObj}/>
		)
	},
	render() {
		return(
			<table className="bordered highlight">
				<tbody>
					{this.props.list.map(this.mapListItem)}
				</tbody>
			</table>
		) 
	}
})

var ListItem = React.createClass({
	handleButton(videoId){
		location.hash = `category/${this.props.categoryName}/course/${this.props.courseName}/video/${videoId}`
	},
	render(){
		let activeVideo = ""
		let currentVideoId = location.hash.split('/').pop()
		if(this.props.listItemInfo.attributes._id===currentVideoId){
			activeVideo = " activeVideo"
		}
		return(
			<tr className={activeVideo} onClick={()=>this.handleButton(this.props.listItemInfo.attributes._id)} >
				<td>
					<img 
						className="responsive-image" width="100" 
						src={this.props.listItemInfo.attributes.thumbnailURL}
					/>
				</td>
				<td>
					<p>{this.props.listItemInfo.attributes.lectureTitle}</p>
				</td>
			</tr>
		) 
	}
})
export default VideoPage