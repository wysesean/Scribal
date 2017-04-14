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
		// $.when(p1,p2).then(function(){})
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
				  	<track srt="location/file.srt" />
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