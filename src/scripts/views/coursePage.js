import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

import AddVideoForm from './components/adminComponents/addVideoForm.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'


import {Video} from 'cloudinary-react'

// <Video cloud_name='dd21qo4mj' publicId='oceans_ef0epk' controls='controls'></Video>



var AllCoursesPage = React.createClass({
	componentWillMount(){
		ACTIONS.fetchVideoByCourse(this.props.course)
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
				<h2>CoursesPage</h2>
				<ElementList list={this.state.videoCollection} />
				<AddVideoForm courseId={this.props.course}/>
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
	handleButton(categoryId){
		location.hash = `course/${categoryId}`
	},
	render(){
		return(
			<div className="ListItem">
				<p>Video Name: {this.props.listItemInfo.attributes.videoTitle}</p>
				<button onClick={()=>{this.handleButton(this.props.listItemInfo.attributes._id)}}> See Videos </button>
				<br />
			</div>
		) 
	}
})

export default AllCoursesPage