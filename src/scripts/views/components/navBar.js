import React from 'react'

var NavBar = React.createClass({
	handleHome(){
		location.hash = 'home'
	},
	handleCategories(){
		location.hash = 'categories'
	},
	handleCourses(){
		location.hash = 'courses'
	},
	handleCourse(){
		location.hash = 'course'
	},
	handleVideo(){
		location.hash = 'video'
	},
	handleErrorPage(){
		location.hash = 'errorPage'
	},
	render() {
		return(
			<div className="NavBar">
				<h1>Scribal</h1>
				<nav>
					<button onClick={this.handleHome} id="homeButton">Home</button>
					<button onClick={this.handleCategories} id="categoriesButton">Categories</button>
					<button onClick={this.handleCourses} id="coursesButton">Courses</button>
					<button onClick={this.handleCourse} id="courseButton">Course</button>
					<button onClick={this.handleVideo} id="videoButton">Video</button>
					<button onClick={this.handleErrorPage} id="errorPageButton">ErrorPage</button>
				</nav>
			</div>
		) 
	}
})

export default NavBar