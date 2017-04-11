import React from 'react'

import ACTIONS from '../actions.js'
import STORE from '../store.js'

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
				<h2>Course Page</h2>
				<ElementList list={this.state.lectureCollection} />
				<AddLectureForm courseId={this.props.course}/>
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