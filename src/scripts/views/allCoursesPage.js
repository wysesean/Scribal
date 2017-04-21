import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import UTIL from '../util.js'
import { Parallax } from 'react-parallax'

import AddCourseForm from './components/adminComponents/addCourseForm.js'
import NavBar from './components/navBar.js'
import FooterBar from './components/footerBar.js'

var AllCoursesPage = React.createClass({
	componentWillMount(){
		ACTIONS.fetchCoursesByCategory(this.props.category)
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
				<Parallax bgImage="../images/2.jpg" strength={400}>
					<br />
					<center><h1>Browse online courses</h1></center>
				</Parallax>
				<ElementList list={this.state.courseCollection} />
				{UTIL.renderAdminComponent(<AddCourseForm categoryId={this.props.category}/>)}
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
	enrollButton(courseId){
		if(User.getCurrentUser()){
			ACTIONS.enrollUserToCourse(User.getCurrentUser().get('_id'),courseId)
		}
	},
	handleButton(courseId){
		location.hash = `course/${courseId}`
	},
	render(){
		return(
			<div className="ListItem">
				<p>Category: {this.props.listItemInfo.attributes.courseName}</p>
				<p>Description: {this.props.listItemInfo.attributes.description}</p>
				{User.getCurrentUser()?<button onClick={()=>{this.enrollButton(this.props.listItemInfo.attributes._id)}}>Enroll</button>:<div />}
				<button onClick={()=>{this.handleButton(this.props.listItemInfo.attributes._id)}}> See Course </button>
				<br />
			</div>
		) 
	}
})

export default AllCoursesPage