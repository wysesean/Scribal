import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

//Views
import LoginPage from './views/loginPage.js'
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
			'login': 'showLoginPage',
			'home': 'showHomePage',
			'about': 'showAboutPage',
			'categories': 'showCategoriesPage',
			'courses/:categoryId': 'showAllCoursesPage',
			'course/:coursesId': 'showCoursePage',
			'video/:videoId': 'showVideoPage',
			'': 'handleRedirect',
			'*errorPage': 'showErrorPage' 
		},
		showLoginPage(){
			ReactDOM.render(<LoginPage />, document.querySelector('.container'))
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
		showVideoPage(lectureId){
			ReactDOM.render(<VideoPage lecture={lectureId}/>, document.querySelector('.container'))
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

export const app_name = init()
app()
