import React from 'react'
import User from '../../models/userModel.js'

var UserDashboard = React.createClass({
	render(){
		return(
			<div className="UserDashboard">
				<p>User dashboard</p>
				<CoursesEnrolled courses={User.getCurrentUser().get('coursesSelected')} />
			</div>
		) 
	}
})


var CoursesEnrolled = React.createClass({
	createCourses(el){
		return (<Course key={el._id}courseInfo={el} />)
	},
	render(){
		return(
			<div className="CoursesEnrolled">
				{this.props.courses.map(this.createCourses)}
			</div>
		) 
	}
})

var Course = React.createClass({
	render() {
		console.log(this.props)
		return(
			<div className="Course">
				<p>Course id = {this.props.courseInfo.course}</p>
			</div>
		) 
	}
})
export default UserDashboard