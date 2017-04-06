import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

//Views
import HomePage from './views/homePage.js'
import AboutPage from './views/aboutPage.js'
import CategoriesPage from './views/categoriesPage.js'
import AllCoursesPage from './views/allCoursesPage.js'
import CoursePage from './views/coursePage.js'
import VideoPage from './views/videoPage.js'
import ErrorPage from './views/errorPage.js'

const app = function() {
	var MainRouter = Backbone.Router.extend({
		routes:{
			'home': 'showHomePage',
			'about': 'showAboutPage',
			'categories': 'showCategoriesPage',
			'courses/:categoryId': 'showAllCoursesPage',
			'course/:coursesId': 'showCoursePage',
			'video/:videoId': 'showVideoPage',
			'': 'handleRedirect',
			'*errorPage': 'showErrorPage' 
		},
		showHomePage(){
			ReactDOM.render(<HomePage />, document.querySelector('.container'))
		},
		showAboutPage(){
			ReactDOM.render(<AboutPage />, document.querySelector('.container'))
		},
		showCategoriesPage(){
			ReactDOM.render(<CategoriesPage />, document.querySelector('.container'))
		},
		showAllCoursesPage(categoryId){
			ReactDOM.render(<AllCoursesPage category={categoryId}/>, document.querySelector('.container'))
		},
		showCoursePage(courseId){
			ReactDOM.render(<CoursePage course={courseId}/>, document.querySelector('.container'))
		},
		showVideoPage(videoId){
			ReactDOM.render(<VideoPage video={videoId}/>, document.querySelector('.container'))
		},
		handleRedirect(){
			location.hash = 'home'
		},
		showErrorPage(){
			ReactDOM.render(<ErrorPage />, document.querySelector('.container'))
		}
	})

	new MainRouter()
	Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..