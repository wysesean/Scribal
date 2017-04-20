import React from 'react'
import User from '../../models/userModel.js'
import ACTIONS from '../../actions.js'
import STORE from '../../store.js'

var UserDashboard = React.createClass({
	getInitialState(){
		return STORE.data
	},
	componentWillMount(){
		if(User.getCurrentUser()){
			ACTIONS.fetchUserEnrolledCourses(User.getCurrentUser().get('_id'))
		}
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	componentWillUnmount(){
		STORE.reset()
		STORE.off('dataUpdated')
	},
	render(){
		return(
			<div className="UserDashboard">
				<p>User dashboard</p>
				<CoursesEnrolled courses={this.state.enrollmentCollection} />
			</div>
		) 
	}
})


var CoursesEnrolled = React.createClass({
	createCourses(el){
		var courseProps = {
			name: el.get('courseInfo').courseName,
			description: el.get('courseInfo').description,
			courseImg: el.get('courseInfo').courseImg,
			linkId: el.get('courseInfo')._id,
			enrollDate: el.get('courseInfo').createdAt,
			percentageComplete: el.get('percentageComplete'),
			lecturesWatched: el.get('lecturesWatched')
		}
		return (<Course key={el.cid} {...courseProps}/>)
	},
	render(){
		return(
			<div className="CoursesEnrolled">
				{this.props.courses.models.map(this.createCourses)}
			</div>
		) 
	}
})

var Course = React.createClass({
	render() {
		return(
			<div className="Course">
				<p>Course id = {this.props.name}</p>
			</div>
		) 
	}
})
export default UserDashboard