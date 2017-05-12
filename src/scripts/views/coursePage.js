import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import UTIL from '../util.js'

import AddLectureForm from './components/adminComponents/addLectureForm.js'
import NavBar from './components/navBar.js'
import LiveBackground from './components/liveBackground.js'
import FooterBar from './components/footerBar.js'


var AllCoursesPage = React.createClass({
	getInitialState(){
		return STORE.data
	},
	componentWillMount(){
		ACTIONS.fetchLectureByCourse(this.props.course)
		ACTIONS.fetchCoursesByCategory(this.props.category)
		ACTIONS.fetchCategoryById(this.props.category)
		if(User.getCurrentUser()){
			ACTIONS.fetchUserEnrolledCourses(User.getCurrentUser().get('_id'))
		}
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	componentDidMount(){
		if(this.parallax){
			$('.parallax').parallax()
		}
	},
	componentWillUnmount(){
		STORE.reset()
		STORE.off('dataUpdated')
	},
	handleLink(categoryId){
		location.hash = `category/${categoryId}/courses`
	},
	enrollUser(userId, courseId){
	},
	renderEnrollButton(){
		var enrollButton = <div />

		if(User.getCurrentUser()){
			var isEnrolled = false,
				courseId = this.props.course
			if(this.state.enrollmentCollection.models[0]){
				this.state.enrollmentCollection.models.forEach((el)=>{
					if(el.attributes.courseInfo._id===courseId){
						enrollButton =	<button className="category-button" onClick={()=>ACTIONS.unenrollUserFromCourse(User.getCurrentUser().get("_id"), this.props.course)}>Unenroll</button>
					}
				})
			}
			else{
				enrollButton = <button className="category-button" onClick={()=>ACTIONS.enrollUserToCourse(User.getCurrentUser().get("_id"), this.props.course)}>Enroll</button>
			}
		}
		return enrollButton
	},
	render() {
		return(
			<div className="CoursesPage">
				<NavBar />
				<div className="parallax-container">
					{this.state.categoryCollection.attributes?<h1 className="parallax-title">Lectures for {this.state.courseCollection.models[0].attributes.courseName}</h1>:<div />}
					<div ref={(e)=>this.parallax = e} className="parallax">
						<div className="live-container">
							{this.state.categoryCollection.attributes?<LiveBackground colorScheme={this.state.categoryCollection.attributes.colorScheme} />:<div />}
						</div>
					</div>
				</div>
				<div className="container content-container">
					{this.state.categoryCollection.attributes?<h3>{this.state.courseCollection.models[0].attributes.description}</h3>:<div />}
					<center>
						<button className="category-button" onClick={()=>this.handleLink(this.props.category)}>Back to Courses</button>
						{this.renderEnrollButton()}
						<div className="table-container">
							<ElementList categoryName={this.props.category} courseName={this.props.course} list={this.state.lectureCollection} />
							{UTIL.renderAdminComponent(<AddLectureForm courseId={this.props.course}/>)}
						</div>
					</center>
				</div>
				<FooterBar />
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
			<table className="responsive-table bordered highlight centered">
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
	secondsToTime (seconds) {
	    var hours   = Math.floor(seconds / 3600)
	    var minutes = Math.floor((seconds - (hours * 3600)) / 60)
	    var seconds = Math.round(seconds - (hours * 3600) - (minutes * 60))
	    var time = ""

	    if (hours != 0) {
	      time = hours+":"
	    }
	    if (minutes != 0 || time !== "") {
	      minutes = (minutes < 10 && time !== "") ? "0"+minutes : String(minutes)
	      time += minutes+":"
	    }
	    if (time === "") {
	      time = seconds+"s"
	    }
	    else {
	      time += (seconds < 10) ? "0"+seconds : String(seconds)
	    }
	    return time
	},
	render(){
		return(
			<tr>
				<td>
					<img onClick={()=>this.handleButton(this.props.listItemInfo.attributes._id)} 
						className="responsive-image" width="100" 
						src={this.props.listItemInfo.attributes.thumbnailURL}
					/>
				</td>
				<td>
					<p>{this.props.listItemInfo.attributes.lectureTitle}</p>
				</td>
				<td>
					<p>{this.secondsToTime(this.props.listItemInfo.attributes.videoLength)}</p>
				</td>
				<td>
					<button className="card-btn" onClick={()=>this.handleButton(this.props.listItemInfo.attributes._id)}>View Now</button>
				</td>
			</tr>
		) 
	}
})

export default AllCoursesPage