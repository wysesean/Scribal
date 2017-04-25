import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import UTIL from '../util.js'
import { Parallax } from 'react-parallax'

import AddLectureForm from './components/adminComponents/addLectureForm.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'


var AllCoursesPage = React.createClass({
	componentWillMount(){
		ACTIONS.fetchLectureByCourse(this.props.course)
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
			<div className="AllCoursesPage">
				<NavBar />
				<Parallax bgImage="../images/3.jpg" strength={400}>
					<br />
					<center><h1>Browse Lectures</h1></center>
				</Parallax>
				<div className="container">
					<ElementList list={this.state.lectureCollection} />
					{UTIL.renderAdminComponent(<AddLectureForm courseId={this.props.course}/>)}
				</div>
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
				<img src={this.props.listItemInfo.attributes.thumbnailURL} />
				<p>Lecture Name: {this.props.listItemInfo.attributes.lectureTitle}</p>
				<p>Description: {this.props.listItemInfo.attributes.description}</p>
				<button onClick={()=>{this.handleButton(this.props.listItemInfo.attributes._id)}}> See Video </button>
				<br />
			</div>
		) 
	}
})

export default AllCoursesPage